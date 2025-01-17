import { getItemByRegion } from "@/app/data/inventory";
import { QUESTS_CONFIG } from "@/app/data/quests";
import { REGIONS } from "@/app/data/regions";
import { getProgress } from "@/app/utils/localStorage";

// Fonction utilitaire pour obtenir la clé de stockage spécifique à l'utilisateur
const getUserStorageKey = (key) => {
  const playerName = localStorage.getItem("playerName");
  if (!playerName) return null;
  return `${playerName}_${key}`;
};

export const loadUserProgress = () => {
  try {
    const storageKey = getUserStorageKey("userProgress");
    if (!storageKey) return {};
    const savedProgress = localStorage.getItem(storageKey);
    return savedProgress ? JSON.parse(savedProgress) : {};
  } catch (error) {
    console.error("Erreur lors du chargement de la progression:", error);
    return {};
  }
};

export const saveUserProgress = (progress) => {
  try {
    const storageKey = getUserStorageKey("userProgress");
    if (!storageKey) return false;
    localStorage.setItem(storageKey, JSON.stringify(progress));
    return true;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de la progression:", error);
    return false;
  }
};

export const calculateQuestRewards = (
  quest,
  score,
  timeSpent,
  correctAnswers
) => {
  const rewards = {
    xp: quest.rewards.xp,
    coins: quest.rewards.coins,
    score: score,
    correctAnswers: correctAnswers,
    timeSpent: timeSpent,
    isFirstCompletion: false,
    isRegionComplete: false,
    newRegions: [],
    item: null,
  };

  // Vérifier si c'est la première complétion
  const userProgress = getProgress();
  const regionProgress = userProgress?.regions?.[quest.regionId] || {};
  rewards.isFirstCompletion = !regionProgress.completedQuests?.includes(
    quest.id
  );

  // Vérifier si la région est complétée
  if (rewards.isFirstCompletion) {
    const regionConfig = QUESTS_CONFIG[quest.regionId];
    if (regionConfig) {
      const completedQuests = [
        ...(regionProgress.completedQuests || []),
        quest.id,
      ];
      rewards.isRegionComplete = regionConfig.quests.every((q) =>
        completedQuests.includes(q.id)
      );

      if (rewards.isRegionComplete) {
        // Ajouter l'item de la région comme récompense
        const regionItem = getItemByRegion(quest.regionId);
        if (regionItem) {
          rewards.item = regionItem;
        }

        // Débloquer les nouvelles régions
        const unlockedRegions = userProgress?.unlockedRegions || [];
        const newRegions = Object.entries(REGIONS)
          .filter(([regionId, region]) => {
            if (unlockedRegions.includes(regionId)) return false;
            return region.unlockedBy.includes(quest.regionId);
          })
          .map(([regionId, region]) => ({
            id: regionId,
            ...region,
          }));

        rewards.newRegions = newRegions;
      }
    }
  }

  return rewards;
};
