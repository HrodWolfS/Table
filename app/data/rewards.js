export const REWARDS = {
  starter_sword: {
    id: "starter_sword",
    name: "Épée de Débutant",
    description: "Une épée simple pour commencer votre aventure.",
    type: "weapon",
    stats: {
      attack: 5,
    },
  },
  forest_shield: {
    id: "forest_shield",
    name: "Bouclier de la Forêt",
    description:
      "Un bouclier robuste trouvé dans la Forêt des Multiplications.",
    type: "armor",
    stats: {
      defense: 10,
    },
  },
  hill_amulet: {
    id: "hill_amulet",
    name: "Amulette des Collines",
    description: "Une amulette magique des Collines du Multiplicateur.",
    type: "accessory",
    stats: {
      magic: 7,
    },
  },
  swamp_boots: {
    id: "swamp_boots",
    name: "Bottes du Marais",
    description: "Des bottes résistantes pour traverser les Marais de Quatrak.",
    type: "armor",
    stats: {
      defense: 8,
      agility: 3,
    },
  },
  desert_ring: {
    id: "desert_ring",
    name: "Anneau du Désert",
    description: "Un anneau mystérieux trouvé dans le Désert Infini.",
    type: "accessory",
    stats: {
      magic: 10,
    },
  },
  river_staff: {
    id: "river_staff",
    name: "Bâton de la Rivière",
    description: "Un bâton magique de la Rivière Cristalline.",
    type: "weapon",
    stats: {
      attack: 7,
      magic: 5,
    },
  },
  city_crown: {
    id: "city_crown",
    name: "Couronne de la Cité",
    description: "Une couronne précieuse de la Cité Suspendue de Septoria.",
    type: "accessory",
    stats: {
      magic: 15,
    },
  },
  cave_lantern: {
    id: "cave_lantern",
    name: "Lanterne de la Grotte",
    description: "Une lanterne pour éclairer les Grottes de Huitra.",
    type: "accessory",
    stats: {
      magic: 5,
      agility: 2,
    },
  },
  flame_sword: {
    id: "flame_sword",
    name: "Épée de Flamme",
    description: "Une épée enflammée des Pics de Neuflame.",
    type: "weapon",
    stats: {
      attack: 15,
    },
  },
  dividix_staff: {
    id: "dividix_staff",
    name: "Bâton de Dividix",
    description: "Le bâton du sorcier maléfique du Château de Dividix.",
    type: "weapon",
    stats: {
      attack: 20,
      magic: 10,
    },
  },
};

export const getRewardById = (rewardId) => {
  return REWARDS[rewardId];
};
