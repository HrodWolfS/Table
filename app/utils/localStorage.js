// Clé pour le localStorage
const STORAGE_KEY = "multiplication-test-results";

// Sauvegarder un nouveau résultat de test
export const saveTestResult = (result) => {
  try {
    // Récupérer les résultats existants
    const existingResults = getTestResults();

    // Ajouter le nouveau résultat avec un timestamp
    const newResult = {
      ...result,
      date: new Date().toISOString(),
      id: Date.now(), // Identifiant unique basé sur le timestamp
    };

    // Sauvegarder le tableau mis à jour
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

// Récupérer tous les résultats
export const getTestResults = () => {
  try {
    const results = localStorage.getItem(STORAGE_KEY);
    return results ? JSON.parse(results) : [];
  } catch (error) {
    console.error("Erreur lors de la récupération des résultats:", error);
    return [];
  }
};

// Calculer les statistiques globales
export const getGlobalStats = () => {
  const results = getTestResults();

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

  // Compteur pour chaque table
  const tableCounts = {};

  // Calcul des statistiques
  const stats = results.reduce(
    (acc, result) => {
      // Compter l'utilisation des tables
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

  // Trouver la table la plus testée
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
