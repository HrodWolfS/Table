export const REGIONS = {
  vallee_debuts: {
    id: "vallee_debuts",
    name: "La Vallée des Débuts",
    description:
      "Une vallée paisible où commence ton aventure avec les tables de 1.",
    image: "/images/regions/vallee_debuts.png",
    quests: ["vallee_debutsQ1", "vallee_debutsQ2", "vallee_debutsQ3"],
    requiredItems: [],
    unlockedBy: [],
  },
  foret_multiplications: {
    id: "foret_multiplications",
    name: "La Forêt des Multiplications",
    description: "Une forêt mystérieuse où se cachent les tables de 2.",
    image: "/images/regions/foret_multiplications.png",
    quests: [
      "foret_multiplicationsQ1",
      "foret_multiplicationsQ2",
      "foret_multiplicationsQ3",
      "foret_multiplicationsQ4",
    ],
    requiredItems: ["carte"],
    unlockedBy: ["vallee_debuts"],
  },
  collines_multiplicateur: {
    id: "collines_multiplicateur",
    name: "Les Collines du Multiplicateur",
    description: "Des collines escarpées où résident les tables de 3.",
    image: "/images/regions/collines_multiplicateur.png",
    quests: [
      "collines_multiplicateurQ1",
      "collines_multiplicateurQ2",
      "collines_multiplicateurQ3",
    ],
    requiredItems: ["lampe"],
    unlockedBy: ["foret_multiplications"],
  },
  marais_quatrak: {
    id: "marais_quatrak",
    name: "Le Marais de Quatrak",
    description: "Un marais brumeux où se dissimulent les tables de 4.",
    image: "/images/regions/marais_quatrak.png",
    quests: ["marais_quatrakQ1", "marais_quatrakQ2", "marais_quatrakQ3"],
    requiredItems: ["corde"],
    unlockedBy: ["collines_multiplicateur"],
  },
  desert_infini: {
    id: "desert_infini",
    name: "Le Désert Infini",
    description: "Un désert sans fin où se trouvent les tables de 5.",
    image: "/images/regions/desert_infini.png",
    quests: ["desert_infiniQ1", "desert_infiniQ2", "desert_infiniQ3"],
    requiredItems: ["bottes"],
    unlockedBy: ["marais_quatrak"],
  },
  riviere_cristalline: {
    id: "riviere_cristalline",
    name: "La Rivière Cristalline",
    description: "Une rivière magique qui abrite les tables de 6.",
    image: "/images/regions/riviere_cristalline.png",
    quests: [
      "riviere_cristallineQ1",
      "riviere_cristallineQ2",
      "riviere_cristallineQ3",
    ],
    requiredItems: ["gourde"],
    unlockedBy: ["desert_infini"],
  },
  cite_septoria: {
    id: "cite_septoria",
    name: "La Cité de Septoria",
    description: "Une cité antique où résident les tables de 7.",
    image: "/images/regions/cite_septoria.png",
    quests: ["cite_septoriaQ1", "cite_septoriaQ2", "cite_septoriaQ3"],
    requiredItems: ["fiole"],
    unlockedBy: ["riviere_cristalline"],
  },
  grottes_huitra: {
    id: "grottes_huitra",
    name: "Les Grottes d'Huitra",
    description: "Des grottes profondes où se cachent les tables de 8.",
    image: "/images/regions/grottes_huitra.png",
    quests: ["grottes_huitraQ1", "grottes_huitraQ2", "grottes_huitraQ3"],
    requiredItems: ["cristal"],
    unlockedBy: ["cite_septoria"],
  },
  pics_neuflame: {
    id: "pics_neuflame",
    name: "Les Pics de Neuflame",
    description: "Des montagnes enneigées où se cachent les tables de 9.",
    image: "/images/regions/pics_neuflame.png",
    quests: ["pics_neuflameQ1", "pics_neuflameQ2", "pics_neuflameQ3"],
    requiredItems: ["cle"],
    unlockedBy: ["grottes_huitra"],
  },
  chateau_dividix: {
    id: "chateau_dividix",
    name: "Le Château de Dividix",
    description:
      "Le chateau de Dividix qui sera notre dernier défi, il sera nécessaire de résoudre notre plus grand défi.",
    image: "/images/regions/chateau_dividix.png",
    quests: ["chateau_dividixQ1", "chateau_dividixQ2", "chateau_dividixQ3"],
    requiredItems: ["cape"],
    unlockedBy: ["pics_neuflame"],
  },
};

export const REGION_IDS = Object.keys(REGIONS);

export const getNextRegion = (currentRegionId) => {
  const currentIndex = REGION_IDS.indexOf(currentRegionId);
  return REGION_IDS[currentIndex + 1];
};

export const checkRegionUnlock = (regionId, userProgress) => {
  const region = REGIONS[regionId];
  if (!region.unlockConditions) return true;
  // Logique de vérification des conditions à implémenter selon userProgress
};
