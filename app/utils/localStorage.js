import { QUESTS_CONFIG } from "../data/quests";

// Clé pour le localStorage
const STORAGE_KEY = "multiplication-test-results";

const STORAGE_KEYS = {
  USER_PROGRESS: "multitab-user-progress",
};

// Fonction utilitaire pour vérifier si on est côté client
const isClient = () => typeof window !== "undefined";

// Fonction utilitaire pour obtenir la clé de stockage spécifique à l'utilisateur
const getUserStorageKey = (key) => {
  if (!isClient()) return null;
  const playerName = localStorage.getItem("playerName");
  if (!playerName) return null;
  return `${playerName}_${key}`;
};

// Sauvegarder un nouveau résultat de test
export const saveTestResult = (result) => {
  if (!isClient()) return false;
  try {
    const storageKey = getUserStorageKey("test-results");
    if (!storageKey) return false;

    const existingResults = getTestResults();

    // Ajouter le nouveau résultat avec un timestamp
    const newResult = {
      ...result,
      date: new Date().toISOString(),
      id: Date.now(),
    };

    localStorage.setItem(
      storageKey,
      JSON.stringify([newResult, ...existingResults])
    );

    return true;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde du résultat:", error);
    return false;
  }
};

// Récupérer tous les résultats de l'utilisateur
export const getTestResults = () => {
  if (!isClient()) return [];
  try {
    const storageKey = getUserStorageKey("test-results");
    if (!storageKey) return [];

    const results = localStorage.getItem(storageKey);
    return results ? JSON.parse(results) : [];
  } catch (error) {
    console.error("Erreur lors de la récupération des résultats:", error);
    return [];
  }
};

// Supprimer tous les résultats de l'utilisateur
export const clearTestResults = () => {
  try {
    const storageKey = getUserStorageKey("test-results");
    if (!storageKey) return false;

    localStorage.removeItem(storageKey);
    return true;
  } catch (error) {
    console.error("Erreur lors de la suppression des résultats:", error);
    return false;
  }
};

// Calculer les statistiques pour l'utilisateur actuel
export const getGlobalStats = () => {
  const progress = getProgress();
  const defaultStats = {
    totalXP: 0,
    totalCoins: 0,
    averageScore: 0,
    completedQuests: 0,
    totalQuests: 0,
    completionRate: 0,
    totalScore: 0,
    bestScore: 0,
    totalTests: 0,
    mostTestedTable: null,
  };

  if (!progress || !progress.regions) return defaultStats;

  let totalQuests = 0;
  let completedQuests = 0;
  let totalScore = 0;
  let questCount = 0;
  let bestScore = 0;
  const tableCounts = {};

  // Calculer le nombre total de quêtes disponibles
  Object.values(QUESTS_CONFIG).forEach((region) => {
    if (region.quests) {
      totalQuests += region.quests.length;
    }
  });

  // Calculer les statistiques pour chaque région
  Object.entries(progress.regions).forEach(([regionId, region]) => {
    if (region.highScores) {
      Object.values(region.highScores).forEach((score) => {
        totalScore += score;
        bestScore = Math.max(bestScore, score);
        questCount++;
      });
    }

    if (region.completedQuests) {
      completedQuests += region.completedQuests.length;

      // Compter les tables les plus testées
      region.completedQuests.forEach((questId) => {
        const [currentRegionId] = questId.split("Q");
        const quest = QUESTS_CONFIG[currentRegionId]?.quests?.find(
          (q) => q.id === questId
        );
        if (quest?.objectives?.table) {
          tableCounts[quest.objectives.table] =
            (tableCounts[quest.objectives.table] || 0) + 1;
        }
      });
    }
  });

  const mostTestedTable = Object.entries(tableCounts).sort(
    ([, a], [, b]) => b - a
  )[0]?.[0];

  return {
    totalXP: progress.totalXP || 0,
    totalCoins: progress.totalCoins || 0,
    averageScore: questCount > 0 ? Math.round(totalScore / questCount) : 0,
    completedQuests,
    totalQuests,
    completionRate:
      totalQuests > 0 ? Math.round((completedQuests / totalQuests) * 100) : 0,
    totalScore: progress.totalScore || 0,
    bestScore,
    totalTests: questCount,
    mostTestedTable: mostTestedTable ? Number(mostTestedTable) : null,
  };
};

// Nouvelle fonction pour supprimer les résultats d'un utilisateur spécifique
export const clearUserTestResults = () => {
  try {
    const storageKey = getUserStorageKey("test-results");
    if (!storageKey) return false;

    localStorage.removeItem(storageKey);
    return true;
  } catch (error) {
    console.error("Erreur lors de la suppression des résultats:", error);
    return false;
  }
};

export const resetProgress = () => {
  if (typeof window !== "undefined") {
    const storageKey = getUserStorageKey("userProgress");
    if (!storageKey) return;
    localStorage.removeItem(storageKey);
  }
};

export const getProgress = () => {
  if (!isClient()) return null;
  try {
    const storageKey = getUserStorageKey("userProgress");
    if (!storageKey) return null;
    const progress = localStorage.getItem(storageKey);
    return progress ? JSON.parse(progress) : null;
  } catch (error) {
    console.error("Erreur lors de la récupération de la progression:", error);
    return null;
  }
};

export const saveProgress = (progress) => {
  if (!isClient()) return;
  try {
    const storageKey = getUserStorageKey("userProgress");
    if (!storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify(progress));
  } catch (error) {
    console.error("Erreur lors de la sauvegarde de la progression:", error);
  }
};

export const updateProgress = (updates) => {
  const currentProgress = getProgress() || {
    regions: {
      vallee_debuts: {
        completedQuests: [],
        highScores: {},
        bestTimes: {},
      },
    },
    completedQuests: [],
    unlockedRegions: ["vallee_debuts"],
    totalXP: 0,
    totalCoins: 0,
    totalScore: 0,
  };

  const newProgress = { ...currentProgress, ...updates };
  saveProgress(newProgress);
  return newProgress;
};

export const updateQuestProgress = (regionId, questId, score, timeSpent) => {
  const currentProgress = getProgress() || {
    regions: {
      vallee_debuts: {
        completedQuests: [],
        highScores: {},
        bestTimes: {},
      },
    },
    completedQuests: [],
    unlockedRegions: ["vallee_debuts"],
    totalXP: 0,
    totalCoins: 0,
    totalScore: 0,
  };

  // Récupérer la quête et vérifier le score requis
  const quest = QUESTS_CONFIG[regionId]?.quests?.find((q) => q.id === questId);
  if (!quest) {
    console.error(`Quête non trouvée: ${questId}`);
    return currentProgress;
  }

  const requiredScore = quest.difficulty.requiredScore;
  console.log(
    `Score requis pour ${questId}: ${requiredScore}%, Score obtenu: ${score}%`
  );

  // Si le score n'atteint pas le minimum requis, ne pas marquer comme complété
  if (score < requiredScore) {
    console.log(
      `Score insuffisant pour compléter la quête (minimum requis: ${requiredScore}%)`
    );
    return currentProgress;
  }

  // Mettre à jour la progression de la région
  if (!currentProgress.regions[regionId]) {
    currentProgress.regions[regionId] = {
      completedQuests: [],
      highScores: {},
      bestTimes: {},
    };
  }

  const regionProgress = currentProgress.regions[regionId];

  // Mettre à jour les scores et temps
  console.log(`Mise à jour du score pour ${questId}:`, score);

  // Vérifier si c'est la première fois que la quête est complétée
  const isFirstCompletion = !regionProgress.completedQuests.includes(questId);

  // Mettre à jour le meilleur score pour cette quête
  regionProgress.highScores[questId] = Math.max(
    score,
    regionProgress.highScores[questId] || 0
  );

  // Si c'est la première complétion, ajouter le score au total
  if (isFirstCompletion) {
    currentProgress.totalScore = (currentProgress.totalScore || 0) + score;
    console.log("Nouveau score total:", currentProgress.totalScore);
  }

  if (timeSpent) {
    regionProgress.bestTimes[questId] = Math.min(
      timeSpent,
      regionProgress.bestTimes[questId] || Infinity
    );
  }

  // Ajouter la quête aux quêtes complétées si ce n'est pas déjà fait
  if (!regionProgress.completedQuests.includes(questId)) {
    regionProgress.completedQuests.push(questId);
    if (!currentProgress.completedQuests.includes(questId)) {
      currentProgress.completedQuests.push(questId);
    }
  }

  console.log("Progression mise à jour:", currentProgress);
  saveProgress(currentProgress);
  return currentProgress;
};
