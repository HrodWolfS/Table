// Types de défis disponibles
export const QUEST_TYPES = {
  PRACTICE: "practice", // Entraînement simple
  SPEED: "speed", // Défi de vitesse
  MIXED: "mixed", // Mélange avec d'autres tables
  REVERSE: "reverse", // Trouver le multiplicateur
};

// Niveaux de difficulté
export const DIFFICULTY = {
  BEGINNER: {
    requiredScore: 50,
    timeLimit: null,
  },
  INTERMEDIATE: {
    requiredScore: 80,
    timeLimit: 120,
  },
  ADVANCED: {
    requiredScore: 90,
    timeLimit: 90,
  },
  EXPERT: {
    requiredScore: 100,
    timeLimit: 60,
  },
};

// Configuration des quêtes par région
export const QUESTS_CONFIG = {
  vallee_debuts: {
    quests: [
      {
        id: "vallee_debutsQ1",
        title: "Premier pas",
        description: "Familiarisez-vous avec la table de 1",
        type: QUEST_TYPES.PRACTICE,
        difficulty: DIFFICULTY.BEGINNER, // requiredScore: 50, timeLimit: null
        objectives: {
          table: 1,
          questionsCount: 10,
        },
        rewards: {
          score: 10,
          xp: 100,
          coins: 50,
        },
      },
      {
        id: "vallee_debutsQ2",
        title: "Course contre la montre",
        description: "Testez votre rapidité avec la table de 1",
        type: QUEST_TYPES.SPEED,
        difficulty: DIFFICULTY.INTERMEDIATE, // requiredScore: 80, timeLimit: 120
        objectives: {
          table: 1,
          questionsCount: 4,
          timeLimit: 60,
        },
        rewards: {
          score: 10,
          xp: 200,
          coins: 100,
        },
      },
      {
        id: "vallee_debutsQ3",
        title: "Le défi du multiplicateur",
        description: "Trouvez le bon multiplicateur pour chaque résultat",
        type: QUEST_TYPES.REVERSE,
        difficulty: DIFFICULTY.EXPERT, // requiredScore: 100, timeLimit: 60
        objectives: {
          table: 1,
          questionsCount: 10,
          timeLimit: 60,
        },
        rewards: {
          score: 10,
          xp: 400,
          coins: 200,
        },
      },
    ],
  },
  foret_multiplications: {
    quests: [
      {
        id: "foret_multiplicationsQ1",
        title: "Découverte de la forêt",
        description: "Explorez la table de 2",
        type: QUEST_TYPES.PRACTICE,
        difficulty: DIFFICULTY.BEGINNER,
        objectives: {
          table: 2,
          questionsCount: 2,
        },
        rewards: {
          score: 10,
          xp: 150,
          coins: 75000,
        },
      },
      {
        id: "foret_multiplicationsQ2",
        title: "Course contre la montre",
        description: "Testez votre rapidité avec la table de 2",
        type: QUEST_TYPES.SPEED,
        difficulty: DIFFICULTY.INTERMEDIATE,
        objectives: {
          table: 2,
          questionsCount: 2,
          timeLimit: 120,
        },
        rewards: {
          score: 10,
          xp: 300,
          coins: 150,
        },
      },
      {
        id: "foret_multiplicationsQ3",
        title: "Le défi du multiplicateur",
        description: "Trouvez le bon multiplicateur pour chaque résultat",
        type: QUEST_TYPES.REVERSE,
        difficulty: DIFFICULTY.EXPERT,
        objectives: {
          table: 2,
          questionsCount: 2,
          timeLimit: 60,
        },
        rewards: {
          score: 10,
          xp: 400,
          coins: 200,
        },
      },
      {
        id: "foret_multiplicationsQ4",
        title: "Mélange de tables",
        description: "Mélangez les tables de 1 et 2",
        type: QUEST_TYPES.MIXED,
        difficulty: DIFFICULTY.EXPERT,
        objectives: {
          tables: [1, 2],
          questionsCount: 2,
          timeLimit: 120,
        },
        rewards: {
          score: 10,
          xp: 500,
          coins: 250,
        },
      },
    ],
  },
  collines_multiplicateur: {
    quests: [
      {
        id: "collines_multiplicateurQ1",
        title: "Ascension des collines",
        description: "Commencez votre voyage avec la table de 3",
        type: QUEST_TYPES.PRACTICE,
        difficulty: DIFFICULTY.BEGINNER,
        objectives: {
          table: 3,
          questionsCount: 1,
        },
        rewards: {
          score: 10,
          xp: 200,
          coins: 100,
        },
      },
      {
        id: "collines_multiplicateurQ2",
        title: "Course contre la montre",
        description: "Testez votre rapidité avec la table de 3",
        type: QUEST_TYPES.SPEED,
        difficulty: DIFFICULTY.INTERMEDIATE,
        objectives: {
          table: 3,
          questionsCount: 1,
          timeLimit: 120,
        },
        rewards: {
          score: 10,
          xp: 300,
          coins: 150,
        },
      },
      {
        id: "collines_multiplicateurQ3",
        title: "Le défi du multiplicateur",
        description: "Trouvez le bon multiplicateur pour chaque résultat",
        type: QUEST_TYPES.REVERSE,
        difficulty: DIFFICULTY.EXPERT,
        objectives: {
          table: 3,
          questionsCount: 1,
          timeLimit: 60,
        },
        rewards: {
          score: 10,
          xp: 400,
          coins: 200,
        },
      },
      {
        id: "collines_multiplicateurQ4",
        title: "Mélange de tables",
        description: "Mélangez les tables de 1, 2 et 3",
        type: QUEST_TYPES.MIXED,
        difficulty: DIFFICULTY.EXPERT,
        objectives: {
          tables: [1, 2, 3],
          questionsCount: 2,
          timeLimit: 120,
        },
        rewards: {
          score: 10,
          xp: 500,
          coins: 250,
        },
      },
    ],
  },
  marais_quatrak: {
    quests: [
      {
        id: "marais_quatrakQ1",
        title: "Dans les brumes",
        description: "Découvrez la table de 4",
        type: QUEST_TYPES.PRACTICE,
        difficulty: DIFFICULTY.BEGINNER,
        objectives: {
          table: 4,
          questionsCount: 5,
        },
        rewards: {
          score: 10,
          xp: 250,
          coins: 125,
        },
      },
      {
        id: "marais_quatrakQ2",
        title: "Course dans les marais",
        description: "Testez votre rapidité avec la table de 4",
        type: QUEST_TYPES.SPEED,
        difficulty: DIFFICULTY.INTERMEDIATE,
        objectives: {
          table: 4,
          questionsCount: 10,
          timeLimit: 120,
        },
        rewards: {
          score: 10,
          xp: 350,
          coins: 175,
        },
      },
      {
        id: "marais_quatrakQ3",
        title: "Le défi du multiplicateur",
        description: "Trouvez le bon multiplicateur pour chaque résultat",
        type: QUEST_TYPES.REVERSE,
        difficulty: DIFFICULTY.EXPERT,
        objectives: {
          table: 4,
          questionsCount: 10,
          timeLimit: 60,
        },
        rewards: {
          score: 10,
          xp: 450,
          coins: 225,
        },
      },
      {
        id: "marais_quatrakQ4",
        title: "Mélange de tables",
        description: "Mélangez les tables de 1, 2, 3 et 4",
        type: QUEST_TYPES.MIXED,
        difficulty: DIFFICULTY.EXPERT,
        objectives: {
          tables: [1, 2, 3, 4],
          questionsCount: 20,
          timeLimit: 120,
        },
        rewards: {
          score: 10,
          xp: 600,
          coins: 300,
        },
      },
    ],
  },
  desert_infini: {
    quests: [
      {
        id: "desert_infiniQ1",
        title: "Chaleur du désert",
        description: "Affrontez la table de 5",
        type: QUEST_TYPES.PRACTICE,
        difficulty: DIFFICULTY.BEGINNER,
        objectives: {
          table: 5,
          questionsCount: 5,
        },
        rewards: {
          score: 10,
          xp: 300,
          coins: 150,
        },
      },
      {
        id: "desert_infiniQ2",
        title: "Course dans le sable",
        description: "Testez votre rapidité avec la table de 5",
        type: QUEST_TYPES.SPEED,
        difficulty: DIFFICULTY.INTERMEDIATE,
        objectives: {
          table: 5,
          questionsCount: 10,
          timeLimit: 120,
        },
        rewards: {
          score: 10,
          xp: 400,
          coins: 200,
        },
      },
      {
        id: "desert_infiniQ3",
        title: "Le défi du multiplicateur",
        description: "Trouvez le bon multiplicateur pour chaque résultat",
        type: QUEST_TYPES.REVERSE,
        difficulty: DIFFICULTY.EXPERT,
        objectives: {
          table: 5,
          questionsCount: 10,
          timeLimit: 60,
        },
        rewards: {
          score: 10,
          xp: 500,
          coins: 250,
        },
      },
      {
        id: "desert_infiniQ4",
        title: "Mélange de tables",
        description: "Mélangez les tables de 1, 2, 3, 4 et 5",
        type: QUEST_TYPES.MIXED,
        difficulty: DIFFICULTY.EXPERT,
        objectives: {
          tables: [1, 2, 3, 4, 5],
          questionsCount: 20,
          timeLimit: 120,
        },
        rewards: {
          score: 10,
          xp: 700,
          coins: 350,
        },
      },
    ],
  },
  riviere_cristalline: {
    quests: [
      {
        id: "riviere_cristallineQ1",
        title: "Au fil de l'eau",
        description: "Découvrez la table de 6",
        type: QUEST_TYPES.PRACTICE,
        difficulty: DIFFICULTY.BEGINNER,
        objectives: {
          table: 6,
          questionsCount: 5,
        },
        rewards: {
          score: 10,
          xp: 350,
          coins: 175,
        },
      },
      {
        id: "riviere_cristallineQ2",
        title: "Course sur l'eau",
        description: "Testez votre rapidité avec la table de 6",
        type: QUEST_TYPES.SPEED,
        difficulty: DIFFICULTY.INTERMEDIATE,
        objectives: {
          table: 6,
          questionsCount: 10,
          timeLimit: 120,
        },
        rewards: {
          score: 10,
          xp: 450,
          coins: 225,
        },
      },
      {
        id: "riviere_cristallineQ3",
        title: "Le défi du multiplicateur",
        description: "Trouvez le bon multiplicateur pour chaque résultat",
        type: QUEST_TYPES.REVERSE,
        difficulty: DIFFICULTY.EXPERT,
        objectives: {
          table: 6,
          questionsCount: 10,
          timeLimit: 60,
        },
        rewards: {
          score: 10,
          xp: 550,
          coins: 275,
        },
      },
      {
        id: "riviere_cristallineQ4",
        title: "Mélange de tables",
        description: "Mélangez les tables de 1 à 6",
        type: QUEST_TYPES.MIXED,
        difficulty: DIFFICULTY.EXPERT,
        objectives: {
          tables: [1, 2, 3, 4, 5, 6],
          questionsCount: 20,
          timeLimit: 120,
        },
        rewards: {
          score: 10,
          xp: 800,
          coins: 400,
        },
      },
    ],
  },
  cite_septoria: {
    quests: [
      {
        id: "cite_septoriaQ1",
        title: "Les rues de Septoria",
        description: "Découvrez la table de 7",
        type: QUEST_TYPES.PRACTICE,
        difficulty: DIFFICULTY.BEGINNER,
        objectives: {
          table: 7,
          questionsCount: 5,
        },
        rewards: {
          score: 10,
          xp: 400,
          coins: 200,
        },
      },
      {
        id: "cite_septoriaQ2",
        title: "Course dans la cité",
        description: "Testez votre rapidité avec la table de 7",
        type: QUEST_TYPES.SPEED,
        difficulty: DIFFICULTY.INTERMEDIATE,
        objectives: {
          table: 7,
          questionsCount: 10,
          timeLimit: 120,
        },
        rewards: {
          score: 10,
          xp: 500,
          coins: 250,
        },
      },
      {
        id: "cite_septoriaQ3",
        title: "Le défi du multiplicateur",
        description: "Trouvez le bon multiplicateur pour chaque résultat",
        type: QUEST_TYPES.REVERSE,
        difficulty: DIFFICULTY.EXPERT,
        objectives: {
          table: 7,
          questionsCount: 10,
          timeLimit: 60,
        },
        rewards: {
          score: 10,
          xp: 600,
          coins: 300,
        },
      },
      {
        id: "cite_septoriaQ4",
        title: "Mélange de tables",
        description: "Mélangez les tables de 1 à 7",
        type: QUEST_TYPES.MIXED,
        difficulty: DIFFICULTY.EXPERT,
        objectives: {
          tables: [1, 2, 3, 4, 5, 6, 7],
          questionsCount: 20,
          timeLimit: 120,
        },
        rewards: {
          score: 10,
          xp: 900,
          coins: 450,
        },
      },
    ],
  },
  grottes_huitra: {
    quests: [
      {
        id: "grottes_huitraQ1",
        title: "Dans l'obscurité",
        description: "Découvrez la table de 8",
        type: QUEST_TYPES.PRACTICE,
        difficulty: DIFFICULTY.BEGINNER,
        objectives: {
          table: 8,
          questionsCount: 5,
        },
        rewards: {
          score: 10,
          xp: 450,
          coins: 225,
        },
      },
      {
        id: "grottes_huitraQ2",
        title: "Course dans les grottes",
        description: "Testez votre rapidité avec la table de 8",
        type: QUEST_TYPES.SPEED,
        difficulty: DIFFICULTY.INTERMEDIATE,
        objectives: {
          table: 8,
          questionsCount: 10,
          timeLimit: 120,
        },
        rewards: {
          score: 10,
          xp: 550,
          coins: 275,
        },
      },
      {
        id: "grottes_huitraQ3",
        title: "Le défi du multiplicateur",
        description: "Trouvez le bon multiplicateur pour chaque résultat",
        type: QUEST_TYPES.REVERSE,
        difficulty: DIFFICULTY.EXPERT,
        objectives: {
          table: 8,
          questionsCount: 10,
          timeLimit: 60,
        },
        rewards: {
          score: 10,
          xp: 650,
          coins: 325,
        },
      },
      {
        id: "grottes_huitraQ4",
        title: "Mélange de tables",
        description: "Mélangez les tables de 1 à 8",
        type: QUEST_TYPES.MIXED,
        difficulty: DIFFICULTY.EXPERT,
        objectives: {
          tables: [1, 2, 3, 4, 5, 6, 7, 8],
          questionsCount: 20,
          timeLimit: 120,
        },
        rewards: {
          score: 10,
          xp: 1000,
          coins: 500,
        },
      },
    ],
  },
  pics_neuflame: {
    quests: [
      {
        id: "pics_neuflameQ1",
        title: "Ascension des pics",
        description: "Découvrez la table de 9",
        type: QUEST_TYPES.PRACTICE,
        difficulty: DIFFICULTY.BEGINNER,
        objectives: {
          table: 9,
          questionsCount: 5,
        },
        rewards: {
          score: 10,
          xp: 500,
          coins: 250,
        },
      },
      {
        id: "pics_neuflameQ2",
        title: "Course en altitude",
        description: "Testez votre rapidité avec la table de 9",
        type: QUEST_TYPES.SPEED,
        difficulty: DIFFICULTY.INTERMEDIATE,
        objectives: {
          table: 9,
          questionsCount: 10,
          timeLimit: 120,
        },
        rewards: {
          score: 10,
          xp: 600,
          coins: 300,
        },
      },
      {
        id: "pics_neuflameQ3",
        title: "Le défi du multiplicateur",
        description: "Trouvez le bon multiplicateur pour chaque résultat",
        type: QUEST_TYPES.REVERSE,
        difficulty: DIFFICULTY.EXPERT,
        objectives: {
          table: 9,
          questionsCount: 10,
          timeLimit: 60,
        },
        rewards: {
          score: 10,
          xp: 700,
          coins: 350,
        },
      },
      {
        id: "pics_neuflameQ4",
        title: "Mélange de tables",
        description: "Mélangez les tables de 1 à 9",
        type: QUEST_TYPES.MIXED,
        difficulty: DIFFICULTY.EXPERT,
        objectives: {
          tables: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          questionsCount: 20,
          timeLimit: 120,
        },
        rewards: {
          score: 10,
          xp: 1100,
          coins: 550,
        },
      },
    ],
  },
  chateau_dividix: {
    quests: [
      {
        id: "chateau_dividixQ1",
        title: "Les salles du château",
        description: "Prouvez votre maîtrise des tables de 1 à 9",
        type: QUEST_TYPES.MIXED,
        difficulty: DIFFICULTY.INTERMEDIATE,
        objectives: {
          tables: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          questionsCount: 20,
          timeLimit: 180,
        },
        rewards: {
          score: 10,
          xp: 1000,
          coins: 500,
        },
      },
      {
        id: "chateau_dividixQ2",
        title: "Course dans le château",
        description:
          "Résolvez rapidement des multiplications de toutes les tables",
        type: QUEST_TYPES.SPEED,
        difficulty: DIFFICULTY.ADVANCED,
        objectives: {
          tables: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          questionsCount: 30,
          timeLimit: 90,
        },
        rewards: {
          score: 10,
          xp: 1500,
          coins: 750,
        },
      },
      {
        id: "chateau_dividixQ3",
        title: "Le défi du multiplicateur ultime",
        description:
          "Trouvez les multiplicateurs manquants pour toutes les tables",
        type: QUEST_TYPES.REVERSE,
        difficulty: DIFFICULTY.EXPERT,
        objectives: {
          tables: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          questionsCount: 20,
          timeLimit: 120,
        },
        rewards: {
          score: 10,
          xp: 2000,
          coins: 1000,
        },
      },
      {
        id: "chateau_dividixQ4",
        title: "Le défi final de Dividix",
        description:
          "Affrontez le boss final en mélangeant toutes les tables avec un score parfait",
        type: QUEST_TYPES.MIXED,
        difficulty: DIFFICULTY.EXPERT,
        objectives: {
          tables: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          questionsCount: 50,
        },
        rewards: {
          score: 10,
          xp: 5000,
          coins: 2500,
        },
      },
    ],
  },
};

// Fonction pour obtenir les quêtes d'une région
export const getRegionQuests = (regionId) => {
  return QUESTS_CONFIG[regionId]?.quests || [];
};

// Fonction pour obtenir une quête spécifique
export const getQuest = (regionId, questId) => {
  const quests = getRegionQuests(regionId);
  return quests.find((quest) => quest.id === questId);
};

// Fonction pour vérifier si une quête est débloquée
export const isQuestUnlocked = (regionId, questId, userProgress) => {
  const quest = getQuest(regionId, questId);
  if (!quest) return false;

  // Logique de déblocage basée sur le progrès de l'utilisateur
  // À personnaliser selon vos besoins
  const regionProgress = userProgress?.regions?.[regionId] || {};
  const previousQuests = getRegionQuests(regionId).filter(
    (q) => q.id < questId
  );

  // Vérifie si toutes les quêtes précédentes sont complétées
  return previousQuests.every((q) => regionProgress[q.id]?.completed);
};

// Fonction pour calculer la récompense d'une quête
export const calculateQuestRewards = (quest, score, timeSpent) => {
  const rewards = {
    xp: 0,
    coins: 0,
    score: score,
    timeSpent: timeSpent,
    isFirstCompletion: false,
    isRegionComplete: false,
    newRegions: [],
    item: null,
    artifacts: [],
  };

  // Vérifier si le score atteint le minimum requis
  const requiredScore = quest.difficulty.requiredScore;
  console.log(
    `Score requis pour ${quest.id}: ${requiredScore}%, Score obtenu: ${score}%`
  );

  if (score < requiredScore) {
    console.log(
      `Score insuffisant pour valider la quête (minimum requis: ${requiredScore}%)`
    );
    return rewards;
  }

  // Si le score est suffisant, ajouter les récompenses
  rewards.xp = quest.rewards.xp;
  rewards.coins = quest.rewards.coins;

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

    if (willBeCompleted.length === regionQuests.length) {
      rewards.isRegionComplete = true;
      console.log(`La région ${quest.regionId} est complétée !`);

      // Ajouter l'item de la région comme récompense
      const regionItem = getItemByRegion(quest.regionId);
      if (regionItem) {
        rewards.item = regionItem;
        console.log(`Ajout de l'item ${regionItem.name} à l'inventaire`);
      }

      // Ajouter les artefacts de la région comme récompense
      const regionArtifacts = Object.values(ARTIFACT_PIECES)
        .filter((artifact) => artifact.region === quest.regionId)
        .map((artifact) => ({
          ...artifact,
          type: INVENTORY_TYPES.ARTIFACT.toLowerCase(),
        }));

      if (regionArtifacts.length > 0) {
        console.log(
          `Ajout des artefacts pour la région ${quest.regionId}:`,
          regionArtifacts
        );
        rewards.artifacts = regionArtifacts;
      }

      // Débloquer les nouvelles régions
      const unlockedRegions = userProgress?.unlockedRegions || [];
      const newRegions = Object.entries(REGIONS)
        .filter(([regionId, region]) => {
          if (unlockedRegions.includes(regionId)) return false;
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
