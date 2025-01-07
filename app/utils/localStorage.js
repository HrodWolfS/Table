import { getCurrentUser } from "./auth";
// Clé pour le localStorage
const STORAGE_KEY = "multiplication-test-results";


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
      userId: currentUser.id // Ajout de l'ID utilisateur
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
    return allResults.filter(result => result.userId === currentUser.id);
  } catch (error) {
    console.error("Erreur lors de la récupération des résultats:", error);
    return [];
  }
};

// Calculer les statistiques pour l'utilisateur actuel
export const getGlobalStats = () => {
  const results = getUserTestResults();

  if (results.length === 0) {
    return {
      totalTests: 0,
      averageScore: 0,
      bestScore: 0,
      totalScore: 0,
      totalTime: 0,
      mostTestedTable: null,
    };
  }

  const tableCounts = {};

  const stats = results.reduce(
    (acc, result) => {
      result.selectedTables.forEach((table) => {
        tableCounts[table] = (tableCounts[table] || 0) + 1;
      });

      return {
        totalTests: acc.totalTests + 1,
        totalScore: acc.totalScore + result.score,
        bestScore: Math.max(acc.bestScore, result.score),
        totalTime: acc.totalTime + (result.timeLimit - result.timeLeft),
      };
    },
    { totalTests: 0, totalScore: 0, bestScore: 0, totalTime: 0 }
  );

  const mostTestedTable = Object.entries(tableCounts).sort(
    ([, a], [, b]) => b - a
  )[0]?.[0];

  return {
    totalTests: stats.totalTests,
    averageScore: Math.round(stats.totalScore / stats.totalTests),
    bestScore: stats.bestScore,
    totalScore: stats.totalScore,
    totalTime: stats.totalTime,
    mostTestedTable: Number(mostTestedTable),
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
    const filteredResults = allResults.filter(result => result.userId !== currentUser.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredResults));
    return true;
  } catch (error) {
    console.error("Erreur lors de la suppression des résultats:", error);
    return false;
  }
};