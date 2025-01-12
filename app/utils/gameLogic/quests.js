import { getItemByRegion } from "@/app/data/inventory";
import { REGIONS } from "@/app/data/regions";
import { getProgress } from "@/app/utils/localStorage";
import { checkRegionUnlock } from "./progression";

export const calculateQuestRewards = (quest, score, timeSpent) => {
  const rewards = {
    xp: quest.rewards.xp,
    coins: quest.rewards.coins,
    score: score,
    timeSpent: timeSpent,
    isFirstCompletion: false,
    isRegionComplete: false,
    newRegions: [],
    item: null,
  };

  // Vérifier si c'est la première complétion
  const userProgress = getProgress();
  const regionProgress = userProgress?.regions?.[quest.regionId] || {};
  const questProgress = regionProgress[quest.id];
  rewards.isFirstCompletion = !questProgress?.completed;

  // Vérifier si la région est complétée
  if (rewards.isFirstCompletion) {
    const region = REGIONS[quest.regionId];
    const regionQuests = region.quests;
    const completedQuests = regionProgress.completedQuests || [];
    const willBeCompleted = [...completedQuests, quest.id];

    // Vérifier si toutes les quêtes de la région sont complétées
    rewards.isRegionComplete = regionQuests.every((questId) =>
      willBeCompleted.includes(questId)
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
          // Vérifier si la région n'est pas déjà débloquée
          if (unlockedRegions.includes(regionId)) return false;

          // Vérifier les prérequis
          return checkRegionUnlock(regionId, {
            ...userProgress,
            unlockedRegions: [...unlockedRegions, quest.regionId],
          });
        })
        .map(([regionId, region]) => ({
          id: regionId,
          ...region,
        }));

      rewards.newRegions = newRegions;
    }
  }

  return rewards;
};
