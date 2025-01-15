import { QUESTS_CONFIG } from "../data/quests";
import { getCurrentUser } from "./auth";

// Clé pour le localStorage
const STORAGE_KEY = "multiplication-test-results";

const STORAGE_KEYS = {
  USER_PROGRESS: "multitab-user-progress",
};

// Sauvegarder un nouveau résultat de test
export const saveTestResult = (result) => {
  try {
    const currentUser = getCurrentUser();
    const existingResults = getTestResults();

    // Ajouter le nouveau résultat avec un timestamp et l'ID utilisateur
    const newResult = {
      ...result,
      date: new Date().toISOString(),
      id: Date.now(),
      userId: currentUser.id, // Ajout de l'ID utilisateur
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([newResult, ...existingResults])
    );

    return true;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde du résultat:", error);
    return false;
  }
};

// Récupérer tous les résultats d'un utilisateur spécifique
export const getUserTestResults = () => {
  try {
    const currentUser = getCurrentUser();
    const results = localStorage.getItem(STORAGE_KEY);
    const allResults = results ? JSON.parse(results) : [];
    return allResults.filter((result) => result.userId === currentUser.id);
  } catch (error) {
    console.error("Erreur lors de la récupération des résultats:", error);
    return [];
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

  if (!progress) return defaultStats;

  let totalQuests = 0;
  let completedQuests = 0;
  let totalScore = 0;
  let questCount = 0;
  let bestScore = 0;
  const tableCounts = {};

  Object.values(progress.regions).forEach((region) => {
    Object.values(region.highScores).forEach((score) => {
      totalScore += score;
      bestScore = Math.max(bestScore, score);
      questCount++;
    });
    completedQuests += region.completedQuests.length;
  });

  // Compter les tables les plus testées
  Object.values(progress.regions).forEach((region) => {
    region.completedQuests.forEach((questId) => {
      const [regionId] = questId.split("Q");
      const quest = QUESTS_CONFIG[regionId]?.quests?.find(
        (q) => q.id === questId
      );
      if (quest?.objectives?.table) {
        tableCounts[quest.objectives.table] =
          (tableCounts[quest.objectives.table] || 0) + 1;
      }
    });
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
    completionRate: totalQuests > 0 ? (completedQuests / totalQuests) * 100 : 0,
    totalScore: progress.totalScore || 0,
    bestScore: progress.bestScore || 0,
    totalTests: questCount,
    mostTestedTable: mostTestedTable ? Number(mostTestedTable) : null,
  };
};

// Fonction utilitaire pour récupérer tous les résultats (pour la rétrocompatibilité)
export const getTestResults = () => {
  try {
    const results = localStorage.getItem(STORAGE_KEY);
    return results ? JSON.parse(results) : [];
  } catch (error) {
    console.error("Erreur lors de la récupération des résultats:", error);
    return [];
  }
};

// Supprimer tous les résultats
export const clearTestResults = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error("Erreur lors de la suppression des résultats:", error);
    return false;
  }
};

// Nouvelle fonction pour supprimer les résultats d'un utilisateur spécifique
export const clearUserTestResults = () => {
  try {
    const currentUser = getCurrentUser();
    const allResults = getTestResults();
    const filteredResults = allResults.filter(
      (result) => result.userId !== currentUser.id
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredResults));
    return true;
  } catch (error) {
    console.error("Erreur lors de la suppression des résultats:", error);
    return false;
  }
};

export const resetProgress = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("userProgress");
  }
};

export const saveProgress = (progress) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("userProgress", JSON.stringify(progress));
  }
};

export const getProgress = () => {
  if (typeof window !== "undefined") {
    const progress = localStorage.getItem("userProgress");
    return progress ? JSON.parse(progress) : null;
  }
  return null;
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
