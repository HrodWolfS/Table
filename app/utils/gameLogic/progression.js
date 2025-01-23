import { getProgress, saveProgress } from "@/app/utils/localStorage";
import { QUESTS_CONFIG } from "../../data/quests";
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
  let userProgress = getProgress();

  // Si userProgress n'existe pas, l'initialiser
  if (!userProgress) {
    userProgress = {
      regions: {
        vallee_debuts: {
          completedQuests: [],
          highScores: {},
          bestTimes: {},
        },
      },
      inventory: {
        items: ["carte"],
        equippedItem: null,
        artifacts: [],
      },
      totalXP: 0,
      totalCoins: 0,
      totalScore: 0,
      timeSpent: 0,
      unlockedRegions: ["vallee_debuts"],
      completedQuests: [],
    };
  }

  // S'assurer que l'inventaire a la bonne structure
  if (!userProgress.inventory || typeof userProgress.inventory !== "object") {
    userProgress.inventory = {
      items: ["carte"],
      equippedItem: null,
      artifacts: [],
    };
  }

  // Assurez-vous que les arrays d'inventaire existent
  if (!Array.isArray(userProgress.inventory.items)) {
    userProgress.inventory.items = ["carte"];
  }
  if (!Array.isArray(userProgress.inventory.artifacts)) {
    userProgress.inventory.artifacts = [];
  }

  // Ajouter l'ID de la quête aux quêtes complétées de la région
  if (
    !userProgress.regions[quest.regionId].completedQuests.includes(quest.id)
  ) {
    userProgress.regions[quest.regionId].completedQuests.push(quest.id);

    // Vérifier si toutes les quêtes de la région sont terminées
    const regionConfig = QUESTS_CONFIG[quest.regionId];
    if (regionConfig) {
      const allQuestsCompleted = regionConfig.quests.every((q) =>
        userProgress.regions[quest.regionId].completedQuests.includes(q.id)
      );

      if (allQuestsCompleted) {
        // Ajouter l'artifact correspondant à la région
        const regionNumber =
          quest.regionId.match(/\d+/)?.[0] ||
          (quest.regionId === "vallee_debuts"
            ? "1"
            : quest.regionId === "foret_multiplications"
            ? "2"
            : quest.regionId === "collines_multiplicateur"
            ? "3"
            : quest.regionId === "marais_quatrak"
            ? "4"
            : quest.regionId === "desert_infini"
            ? "5"
            : quest.regionId === "riviere_cristalline"
            ? "6"
            : quest.regionId === "cite_septoria"
            ? "7"
            : quest.regionId === "grottes_huitra"
            ? "8"
            : quest.regionId === "pics_neuflame"
            ? "9"
            : quest.regionId === "chateau_dividix"
            ? "10"
            : null);

        if (regionNumber) {
          const artifactId = `artifact_${regionNumber}`;
          if (!userProgress.inventory.artifacts.includes(artifactId)) {
            console.log("Ajout automatique de l'artifact:", artifactId);
            userProgress.inventory.artifacts.push(artifactId);
          }
        }
      }
    }
  }

  // Mise à jour des récompenses
  if (rewards) {
    userProgress.totalXP = (userProgress.totalXP || 0) + (rewards.xp || 0);
    userProgress.totalCoins =
      (userProgress.totalCoins || 0) + (rewards.coins || 0);
    userProgress.totalScore =
      (userProgress.totalScore || 0) + (rewards.score || 0);

    // Mise à jour du temps total
    if (rewards.timeSpent) {
      userProgress.timeSpent =
        (userProgress.timeSpent || 0) + rewards.timeSpent;
      console.log(
        "Temps ajouté:",
        rewards.timeSpent,
        "Temps total:",
        userProgress.timeSpent
      );
    }

    // Ajouter l'item de la région si disponible
    if (
      rewards.item &&
      !userProgress.inventory.items.includes(rewards.item.id)
    ) {
      console.log("Ajout de l'item à l'inventaire:", rewards.item.id);
      userProgress.inventory.items.push(rewards.item.id);
    }

    // Ajouter les artefacts à l'inventaire
    if (
      rewards.artifact &&
      !userProgress.inventory.artifacts.includes(rewards.artifact.id)
    ) {
      console.log("Ajout de l'artefact à l'inventaire:", rewards.artifact.id);
      userProgress.inventory.artifacts.push(rewards.artifact.id);
    }
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
      totalScore: 0,
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
