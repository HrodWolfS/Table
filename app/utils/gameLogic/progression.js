import { getItemByRegion } from "@/app/data/inventory";
import { QUESTS_CONFIG } from "@/app/data/quests";
import { getProgress, saveProgress } from "@/app/utils/localStorage";
import { REGIONS } from "../../data/regions";

/**
 * Vérifie si une région est débloquée
 * @param {string} regionId - ID de la région
 * @param {Object} userProgress - Progression de l'utilisateur
 * @returns {boolean}
 */
export const checkRegionUnlock = (regionId, userProgress) => {
  const region = REGIONS[regionId];
  if (!region) return false;

  // Vérifier si toutes les régions requises sont débloquées
  const hasUnlockedRegions = region.unlockedBy.every((requiredRegionId) =>
    userProgress.unlockedRegions.includes(requiredRegionId)
  );

  // Vérifier si le joueur possède tous les items requis
  const hasRequiredItems = region.requiredItems.every((itemId) =>
    userProgress.inventory?.some((item) => item.id === itemId)
  );

  // Vérifier si toutes les quêtes des régions requises sont complétées
  const hasCompletedRequiredQuests = region.unlockedBy.every(
    (requiredRegionId) => {
      const requiredRegion = REGIONS[requiredRegionId];
      const regionProgress = userProgress.regions[requiredRegionId];
      if (!regionProgress?.completedQuests) return false;
      return requiredRegion.quests.every((questId) =>
        regionProgress.completedQuests.includes(questId)
      );
    }
  );

  return hasUnlockedRegions && hasRequiredItems && hasCompletedRequiredQuests;
};

/**
 * Structure initiale pour un nouveau joueur
 */
export const initialUserProgress = {
  completedTables: [],
  scores: {},
  unlockedRegions: ["vallee_debuts"],
  rewards: ["starter_sword"],
  currentRegion: "vallee_debuts",
  completedQuests: [],
  regions: {
    vallee_debuts: {
      completedQuests: [],
      highScores: {},
      bestTimes: {},
    },
  },
};

export const updateProgress = (quest, rewards) => {
  const userProgress = getProgress();

  // Assurez-vous que completedQuests existe
  if (!userProgress.completedQuests) {
    userProgress.completedQuests = [];
  }

  // Assurez-vous que la région existe dans userProgress
  if (!userProgress.regions[quest.regionId]) {
    userProgress.regions[quest.regionId] = {
      completedQuests: [],
      highScores: {},
      bestTimes: {},
    };
  }

  // Ajouter l'ID de la quête aux quêtes complétées globales
  if (!userProgress.completedQuests.includes(quest.id)) {
    userProgress.completedQuests.push(quest.id);
  }

  // Ajouter l'ID de la quête aux quêtes complétées de la région
  if (
    !userProgress.regions[quest.regionId].completedQuests.includes(quest.id)
  ) {
    userProgress.regions[quest.regionId].completedQuests.push(quest.id);
  }

  // Vérifier si la région est complétée
  const regionConfig = QUESTS_CONFIG[quest.regionId];
  if (regionConfig) {
    const completedQuests =
      userProgress.regions[quest.regionId].completedQuests;
    const allQuestsCompleted = regionConfig.quests.every((q) =>
      completedQuests.includes(q.id)
    );

    // Si toutes les quêtes sont complétées, ajouter l'item de la région suivante
    if (allQuestsCompleted) {
      const nextRegionId = Object.keys(REGIONS).find((id) =>
        REGIONS[id].unlockedBy.includes(quest.regionId)
      );

      if (nextRegionId) {
        const nextRegionItem = getItemByRegion(nextRegionId);
        if (nextRegionItem) {
          if (!userProgress.inventory) {
            userProgress.inventory = [];
          }

          // Vérifier si l'item n'est pas déjà dans l'inventaire
          if (
            !userProgress.inventory.some(
              (item) => item.id === nextRegionItem.id
            )
          ) {
            console.log(
              "Ajout de l'item",
              nextRegionItem.id,
              "pour la région",
              nextRegionId
            );
            userProgress.inventory.push(nextRegionItem);
          }
        }
      }
    }
  }

  // Mettre à jour l'XP et les pièces si des récompenses sont fournies
  if (rewards) {
    userProgress.totalXP = (userProgress.totalXP || 0) + (rewards.xp || 0);
    userProgress.totalCoins =
      (userProgress.totalCoins || 0) + (rewards.coins || 0);
  }

  // Sauvegarder les progrès
  saveProgress(userProgress);
  return userProgress;
};

export const initializeProgress = () => {
  const progress = getProgress();
  if (!progress) {
    const initialProgress = {
      regions: {
        vallee_debuts: {
          highScores: {},
          bestTimes: {},
          completedQuests: [],
        },
      },
      inventory: [
        {
          id: "carte",
          name: "Carte des Multiplicateurs",
          description: "Une carte magique qui révèle tous les chemins.",
          image: "/images/items/carte.svg",
          type: "EQUIPMENT",
          region: "vallee_debuts",
          effect: "Révèle la carte complète",
        },
      ],
      totalXP: 0,
      totalCoins: 0,
      unlockedRegions: ["vallee_debuts"],
    };
    saveProgress(initialProgress);
    return initialProgress;
  }

  // S'assurer que l'inventaire existe toujours
  if (!progress.inventory) {
    progress.inventory = [
      {
        id: "carte",
        name: "Carte des Multiplicateurs",
        description: "Une carte magique qui révèle tous les chemins.",
        image: "/images/items/carte.svg",
        type: "EQUIPMENT",
        region: "vallee_debuts",
        effect: "Révèle la carte complète",
      },
    ];
    saveProgress(progress);
  }

  return progress;
};
