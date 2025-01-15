import { getItemByRegion } from "@/app/data/inventory";
import { QUESTS_CONFIG } from "@/app/data/quests";
import { REGIONS } from "@/app/data/regions";
import { getProgress } from "@/app/utils/localStorage";

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
