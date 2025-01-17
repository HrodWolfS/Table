import { getTestResults } from "./localStorage";

export const BADGES = {
  FIRST_TEST: {
    id: "first_test",
    name: "Premier Test",
    description: "Terminer votre premier test",
    icon: "Star",
  },
  PERFECT_SCORE: {
    id: "perfect_score",
    name: "Sans Faute",
    description: "Obtenir 100% à un test",
    icon: "Trophy",
  },
  SPEED_MASTER: {
    id: "speed_master",
    name: "Rapide comme l'éclair",
    description: "Terminer en moins de 30 secondes",
    icon: "Zap",
  },
  PRACTICE_MASTER: {
    id: "practice_master",
    name: "Maître de la pratique",
    description: "Compléter 10 tests",
    icon: "Medal",
  },
  ALL_TABLES: {
    id: "all_tables",
    name: "Explorateur complet",
    description: "Tester toutes les tables",
    icon: "CheckCircle",
  },
  THREE_PERFECT: {
    id: "three_perfect",
    name: "Triple perfection",
    description: "Obtenir 3 scores parfaits d'affilée",
    icon: "Crown",
  },
  SPEED_PERFECT: {
    id: "speed_perfect",
    name: "Perfection éclair",
    description: "100% en moins de 30 secondes",
    icon: "Bolt",
  },
  MARATHON: {
    id: "marathon",
    name: "Marathonien",
    description: "Compléter un test de 30 questions",
    icon: "Target",
  },
  MULTI_TABLE: {
    id: "multi_table",
    name: "Multi-tables",
    description: "Réussir un test avec 5 tables différentes",
    icon: "Grid",
  },
  PERSISTENT: {
    id: "persistent",
    name: "Persévérant",
    description: "S'entraîner 5 jours de suite",
    icon: "Calendar",
  },
  ALL_IN: {
    id: "all_in",
    name: "All-in",
    description: "Réussir un test avec toutes les tables",
    icon: "Infinity",
  },
  TABLE_MASTER: {
    id: "table_master",
    name: "Maître des tables",
    description: "Obtenir 80% de moyenne générale",
    icon: "Award",
  },
};

// Fonction utilitaire pour obtenir la clé de stockage spécifique à l'utilisateur
const getUserStorageKey = (key) => {
  const playerName = localStorage.getItem("playerName");
  if (!playerName) return null;
  return `${playerName}_${key}`;
};

// Sauvegarder les badges
export const saveBadges = (badges) => {
  try {
    const storageKey = getUserStorageKey("badges");
    if (!storageKey) return false;
    localStorage.setItem(storageKey, JSON.stringify(badges));
    return true;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des badges:", error);
    return false;
  }
};

// Récupérer les badges
export const getBadges = () => {
  try {
    const storageKey = getUserStorageKey("badges");
    if (!storageKey) return [];
    const badges = localStorage.getItem(storageKey);
    return badges ? JSON.parse(badges) : [];
  } catch (error) {
    console.error("Erreur lors de la récupération des badges:", error);
    return [];
  }
};

export function checkBadgeUnlock(result, existingBadges = []) {
  const newBadges = [];
  const allResults = getTestResults();

  // Premier test
  if (!existingBadges.includes("first_test")) {
    newBadges.push(BADGES.FIRST_TEST);
  }

  // Score parfait
  if (result.score === 100) {
    newBadges.push(BADGES.PERFECT_SCORE);
  }

  // Test rapide
  if (result.timeLimit - result.timeLeft < 30 && result.score >= 80) {
    newBadges.push(BADGES.SPEED_MASTER);
  }

  // Score parfait rapide
  if (result.score === 100 && result.timeLimit - result.timeLeft < 30) {
    newBadges.push(BADGES.SPEED_PERFECT);
  }

  // Test avec beaucoup de questions
  if (result.numberOfQuestions >= 30) {
    newBadges.push(BADGES.MARATHON);
  }

  // Multi-tables (5 tables avec succès)
  if (result.selectedTables.length === 5 && result.score >= 80) {
    newBadges.push(BADGES.MULTI_TABLE);
  }

  // Maître de la pratique (10 tests)
  if (allResults.length >= 10 && !existingBadges.includes("practice_master")) {
    newBadges.push(BADGES.PRACTICE_MASTER);
  }

  // Trois scores parfaits d'affilée
  const lastThreeTests = allResults.slice(-3);
  if (
    lastThreeTests.length === 3 &&
    lastThreeTests.every((test) => test.score === 100) &&
    !existingBadges.includes("three_perfect")
  ) {
    newBadges.push(BADGES.THREE_PERFECT);
  }

  // Toutes les tables testées
  const allTablesTestedSet = new Set(
    allResults.flatMap((test) => test.selectedTables)
  );
  if (
    allTablesTestedSet.size === 10 &&
    !existingBadges.includes("all_tables")
  ) {
    newBadges.push(BADGES.ALL_TABLES);
  }

  // Persistance (5 jours consécutifs)
  const uniqueDates = new Set(
    allResults.map((test) => new Date(test.date).toDateString())
  );
  if (uniqueDates.size >= 5 && !existingBadges.includes("persistent")) {
    newBadges.push(BADGES.PERSISTENT);
  }

  // Maître des tables (toutes les tables testées et moyenne générale ≥ 80%)
  if (allResults.length > 0) {
    const allTablesTestedSet = new Set(
      allResults.flatMap((test) => test.selectedTables)
    );

    // Vérifier que toutes les 10 tables ont été testées
    if (allTablesTestedSet.size === 10) {
      const totalScore = allResults.reduce((sum, test) => sum + test.score, 0);
      const averageScore = totalScore / allResults.length;

      if (averageScore >= 80 && !existingBadges.includes("table_master")) {
        newBadges.push(BADGES.TABLE_MASTER);
      }
    }
  }

  // All-in (test avec toutes les tables et réussi)
  if (result.selectedTables.length === 10 && result.score >= 80) {
    newBadges.push(BADGES.ALL_IN);
  }

  return newBadges;
}
