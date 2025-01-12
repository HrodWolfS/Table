import { QUESTS_CONFIG } from "../data/quests";

// Constantes pour les totaux
const TOTAL_REGIONS = Object.keys(QUESTS_CONFIG).length;
const TOTAL_QUESTS = Object.values(QUESTS_CONFIG).reduce(
  (total, region) => total + region.quests.length,
  0
);

// Fonction pour calculer le score total
export const calculateTotalScore = (userProgress) => {
  let totalScore = 0;
  if (!userProgress?.regions) return 0;

  Object.values(userProgress.regions).forEach((region) => {
    if (region.highScores) {
      Object.values(region.highScores).forEach((score) => {
        totalScore += score;
      });
    }
  });

  return totalScore;
};

// Fonction pour calculer le temps total de jeu
export const calculateTotalPlayTime = (userProgress) => {
  let totalTime = 0;
  if (!userProgress?.regions) return 0;

  Object.values(userProgress.regions).forEach((region) => {
    Object.values(region).forEach((quest) => {
      if (quest.bestTime) {
        totalTime += quest.bestTime;
      }
    });
  });

  return totalTime;
};

// Fonction pour calculer le nombre total de quêtes complétées
export const calculateCompletedQuests = (userProgress) => {
  let completedQuests = 0;
  if (!userProgress?.regions) return { completed: 0, total: TOTAL_QUESTS };

  Object.values(userProgress.regions).forEach((region) => {
    if (region.completedQuests) {
      completedQuests += region.completedQuests.length;
    }
  });

  return { completed: completedQuests, total: TOTAL_QUESTS };
};

// Fonction pour calculer le nombre de régions débloquées
export const calculateUnlockedRegions = (userProgress) => {
  return {
    unlocked: userProgress?.unlockedRegions?.length || 0,
    total: TOTAL_REGIONS,
  };
};

// Fonction pour obtenir toutes les statistiques
export const getPlayerStatistics = (userProgress) => {
  if (!userProgress)
    return {
      score: 0,
      xp: 0,
      coins: 0,
      timeSpent: 0,
      questsCompleted: { completed: 0, total: TOTAL_QUESTS },
      regionsUnlocked: { unlocked: 0, total: TOTAL_REGIONS },
    };

  return {
    score: calculateTotalScore(userProgress),
    xp: userProgress.totalXP || 0,
    coins: userProgress.totalCoins || 0,
    timeSpent: calculateTotalPlayTime(userProgress),
    questsCompleted: calculateCompletedQuests(userProgress),
    regionsUnlocked: calculateUnlockedRegions(userProgress),
  };
};
