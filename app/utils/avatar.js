// Options de couleurs communes
const COLOR_OPTIONS = {
  "262e33": "Gris anthracite",
  "65c9ff": "Bleu ciel",
  "5199e4": "Bleu moyen",
  "25557c": "Bleu marine",
  e6e6e6: "Gris clair",
  929598: "Gris moyen",
  "3c4f5c": "Gris foncé",
  b1e2ff: "Bleu pastel",
  a7ffc4: "Vert menthe",
  ffdeb5: "Pêche clair",
  ffafb9: "Rose pâle",
  ffffb1: "Jaune pastel",
  ff488e: "Rose vif",
  ff5c5c: "Rouge vif",
  ffffff: "Blanc",
};

// Mapping des noms en français
export const FRENCH_LABELS = {
  facialHair: {
    label: "Pilosité faciale",
    options: {
      // Chapeaux (options de base)
      hats: ["blank", "hat", "hijab", "turban"],
      blank: "Aucune",
      beardLight: "Barbe légère",
      beardMajestic: "Barbe majestueuse",
      beardMedium: "Barbe moyenne",
      moustacheFancy: "Moustache sophistiquée",
      moustacheMagnum: "Moustache Magnum",
    },
  },
  facialHairColor: {
    label: "Couleur de la pilosité",
    options: {
      a55728: "Brun chaud",
      "2c1b18": "Brun foncé",
      b58143: "Blond",
      d6b370: "Blond doré",
      724133: "Châtain",
      "4a312c": "Brun chocolat",
      f59797: "Rose pâle",
      ecdcbf: "Blond clair",
      c93305: "Roux",
      e8e1e1: "Gris argenté",
    },
  },
  skinColor: {
    label: "Couleur de peau",
    options: {
      614335: "Très foncée",
      d08b5b: "Mate",
      ae5d29: "Foncée",
      edb98a: "Légèrement mate",
      ffdbb4: "Claire",
      fd9841: "Dorée",
      f8d25c: "Pêche",
    },
  },
  eyes: {
    label: "Yeux",
    options: {
      default: "Normal",
      closed: "Fermés",
      cry: "Pleurs",
      eyeRoll: "Yeux levés",
      happy: "Joyeux",
      hearts: "Amoureux",
      side: "Regard sur le côté",
      squint: "Plissés",
      surprised: "Surpris",
      winkWacky: "Clin d'œil fou",
      wink: "Clin d'œil",
      xDizzy: "Étourdi",
    },
  },
  eyebrows: {
    label: "Sourcils",
    options: {
      angryNatural: "En colère naturel",
      defaultNatural: "Normal naturel",
      flatNatural: "Plat naturel",
      frownNatural: "Froncement naturel",
      raisedExcitedNatural: "Surpris naturel",
      sadConcernedNatural: "Triste naturel",
      unibrowNatural: "Monosourcil naturel",
      upDownNatural: "Haut-bas naturel",
      angry: "En colère",
      default: "Normal",
      raisedExcited: "Surpris",
      sadConcerned: "Triste",
      upDown: "Haut-bas",
    },
  },
  mouth: {
    label: "Bouche",
    options: {
      concerned: "Inquiète",
      default: "Normale",
      disbelief: "Incrédule",
      eating: "Mangeant",
      grimace: "Grimace",
      sad: "Triste",
      screamOpen: "Cri",
      serious: "Sérieuse",
      smile: "Sourire",
      tongue: "Langue tirée",
      twinkle: "Malicieuse",
      vomit: "Dégoûtée",
    },
  },
  top: {
    label: "Coiffure",
    options: {
      bob: "Carré",
      bun: "Chignon",
      curly: "Bouclé",
      curvy: "Ondulé",
      dreads: "Dreadlocks",
      fro: "Afro",
      froBand: "Afro avec bandeau",
      longButNotTooLong: "Mi-long",
      miaWallace: "Style Mia Wallace",
      shavedSides: "Côtés rasés",
      straight02: "Raide long",
      straight01: "Raide court",
      straightAndStrand: "Raide avec mèche",
      dreads02: "Dreadlocks 2",
      frizzle: "Frisé",
      shaggy: "Décoiffé",
      shaggyMullet: "Mulet décoiffé",
      shortCurly: "Court bouclé",
      shortFlat: "Court plat",
      shortRound: "Court arrondi",
      shortWaved: "Court ondulé",
      sides: "Côtés",
      theCaesar: "Coupe César",
      theCaesarAndSidePart: "César avec raie",
      bigHair: "Volumineux",
      // Items débloquables
      winterHat1: "Bonnet de Ski",
      winterHat02: "Bonnet à Pompon",
      winterHat03: "Bonnet Festif",
      winterHat04: "Bonnet Décontracté",
      frida: "Coiffure Frida",
      dreads01: "Dreadlocks Style",
    },
  },
  accessories: {
    label: "Accessoires",
    options: {
      blank: "Aucun",
      kurt: "Lunettes Kurt",
      prescription01: "Lunettes classiques 1",
      prescription02: "Lunettes classiques 2",
      wayfarers: "Lunettes Wayfarers",
      // Items débloquables
      round: "Lunettes Rondes",
      sunglasses: "Lunettes de Soleil",
      eyepatch: "Cache-œil",
    },
  },
  clothing: {
    label: "Vêtements",
    options: {
      blazerAndShirt: "Blazer et chemise",
      blazerAndSweater: "Blazer et pull",
      collarAndSweater: "Col roulé",
      overall: "Salopette",
      shirtCrewNeck: "T-shirt col rond",
      shirtScoopNeck: "T-shirt col large",
      shirtVNeck: "T-shirt col V",
      // Items débloquables
      graphicShirt: "T-shirt Graphique",
      hoodie: "Sweat à Capuche",
    },
  },
  hairColor: {
    label: "Couleur de cheveux",
    options: {
      a55728: "Brun chaud",
      "2c1b18": "Brun foncé",
      b58143: "Blond",
      d6b370: "Blond doré",
      724133: "Châtain",
      "4a312c": "Brun chocolat",
      f59797: "Rose pâle",
      ecdcbf: "Blond clair",
      c93305: "Roux",
      e8e1e1: "Gris argenté",
    },
  },
  clothesColor: {
    label: "Couleur des vêtements",
    options: {
      "262e33": "Gris anthracite",
      "65c9ff": "Bleu ciel",
      "5199e4": "Bleu moyen",
      "25557c": "Bleu marine",
      e6e6e6: "Gris clair",
      929598: "Gris moyen",
      "3c4f5c": "Gris foncé",
      b1e2ff: "Bleu pastel",
      a7ffc4: "Vert menthe",
      ffdeb5: "Pêche clair",
      ffafb9: "Rose pâle",
      ffffb1: "Jaune pastel",
      ff488e: "Rose vif",
      ff5c5c: "Rouge vif",
      ffffff: "Blanc",
    },
  },
  accessoriesColor: {
    label: "Couleur des accessoires",
    options: {
      "262e33": "Gris anthracite",
      "65c9ff": "Bleu ciel",
      "5199e4": "Bleu moyen",
      "25557c": "Bleu marine",
      e6e6e6: "Gris clair",
      929598: "Gris moyen",
      "3c4f5c": "Gris foncé",
      b1e2ff: "Bleu pastel",
      a7ffc4: "Vert menthe",
      ffdeb5: "Pêche clair",
      ffafb9: "Rose pâle",
      ffffb1: "Jaune pastel",
      ff488e: "Rose vif",
      ff5c5c: "Rouge vif",
      ffffff: "Blanc",
    },
  },
  backgroundColor: {
    label: "Couleur d'arrière-plan",
    options: {
      "262e33": "Gris anthracite",
      "65c9ff": "Bleu ciel",
      "5199e4": "Bleu moyen",
      "25557c": "Bleu marine",
      e6e6e6: "Gris clair",
      929598: "Gris moyen",
      "3c4f5c": "Gris foncé",
      b1e2ff: "Bleu pastel",
      a7ffc4: "Vert menthe",
      ffdeb5: "Pêche clair",
      ffafb9: "Rose pâle",
      ffffb1: "Jaune pastel",
      ff488e: "Rose vif",
      ff5c5c: "Rouge vif",
      ffffff: "Blanc",
    },
  },
  top: {
    label: "Coiffure",
    options: {
      bob: "Carré",
      bun: "Chignon",
      curly: "Bouclé",
      curvy: "Ondulé",
      dreads: "Dreadlocks",
      fro: "Afro",
      froBand: "Afro avec bandeau",
      longButNotTooLong: "Mi-long",
      miaWallace: "Style Mia Wallace",
      shavedSides: "Côtés rasés",
      straight02: "Raide long",
      straight01: "Raide court",
      straightAndStrand: "Raide avec mèche",
      dreads02: "Dreadlocks 2",
      frizzle: "Frisé",
      shaggy: "Décoiffé",
      shaggyMullet: "Mulet décoiffé",
      shortCurly: "Court bouclé",
      shortFlat: "Court plat",
      shortRound: "Court arrondi",
      shortWaved: "Court ondulé",
      sides: "Côtés",
      theCaesar: "Coupe César",
      theCaesarAndSidePart: "César avec raie",
      bigHair: "Volumineux",
      // Items débloquables
      winterHat1: "Bonnet de Ski",
      winterHat02: "Bonnet à Pompon",
      winterHat03: "Bonnet Festif",
      winterHat04: "Bonnet Décontracté",
      frida: "Coiffure Frida",
      dreads01: "Dreadlocks Style",
    },
  },
  accessories: {
    label: "Accessoires",
    options: {
      blank: "Aucun",
      kurt: "Lunettes Kurt",
      prescription01: "Lunettes classiques 1",
      prescription02: "Lunettes classiques 2",
      wayfarers: "Lunettes Wayfarers",
      // Items débloquables
      round: "Lunettes Rondes",
      sunglasses: "Lunettes de Soleil",
      eyepatch: "Cache-œil",
    },
  },
  clothing: {
    label: "Vêtements",
    options: {
      blazerAndShirt: "Blazer et chemise",
      blazerAndSweater: "Blazer et pull",
      collarAndSweater: "Col roulé",
      shirtCrewNeck: "T-shirt col rond",
      shirtScoopNeck: "T-shirt col large",
      shirtVNeck: "T-shirt col V",
      overall: "Salopette",
      // Items débloquables
      graphicShirt: "T-shirt Graphique",
      hoodie: "Sweat à Capuche",
    },
  },
  clothesColor: {
    label: "Couleur des vêtements",
    options: COLOR_OPTIONS,
  },
  accessoriesColor: {
    label: "Couleur des accessoires",
    options: COLOR_OPTIONS,
  },
  backgroundColor: {
    label: "Couleur d'arrière-plan",
    options: COLOR_OPTIONS,
  },
  hats: {
    label: "Chapeaux",
    options: {
      blank: "Aucun",
      hat: "Chapeau",
      hijab: "Hijab",
      turban: "Turban",
      // Items débloquables
      winterHat1: "Bonnet d'hiver 1",
      winterHat02: "Bonnet d'hiver 2",
      winterHat03: "Bonnet d'hiver 3",
      winterHat04: "Bonnet d'hiver 4",
    },
  },
};

// Configuration des options d'avatar
export const AVATAR_CONFIG = {
  style: "avataaars",
  options: {
    // Apparence du visage
    skinColor: [
      "614335",
      "d08b5b",
      "ae5d29",
      "edb98a",
      "ffdbb4",
      "fd9841",
      "f8d25c",
    ],
    eyes: [
      "default",
      "closed",
      "cry",
      "eyeRoll",
      "happy",
      "hearts",
      "side",
      "squint",
      "surprised",
      "winkWacky",
      "wink",
      "xDizzy",
    ],
    eyebrows: [
      "angryNatural",
      "defaultNatural",
      "flatNatural",
      "frownNatural",
      "raisedExcitedNatural",
      "sadConcernedNatural",
      "unibrowNatural",
      "upDownNatural",
      "angry",
      "default",
      "raisedExcited",
      "sadConcerned",
      "upDown",
    ],
    mouth: [
      "concerned",
      "default",
      "disbelief",
      "eating",
      "grimace",
      "sad",
      "screamOpen",
      "serious",
      "smile",
      "tongue",
      "twinkle",
      "vomit",
    ],

    // Cheveux et accessoires
    top: [
      "bob",
      "bun",
      "curly",
      "curvy",
      "dreads",
      "fro",
      "froBand",
      "longButNotTooLong",
      "miaWallace",
      "shavedSides",
      "straight02",
      "straight01",
      "straightAndStrand",
      "dreads02",
      "frizzle",
      "shaggy",
      "shaggyMullet",
      "shortCurly",
      "shortFlat",
      "shortRound",
      "shortWaved",
      "sides",
      "theCaesar",
      "theCaesarAndSidePart",
      "bigHair",
    ],
    hats: ["blank", "hat", "hijab", "turban"],
    accessories: [
      "blank",
      "kurt",
      "prescription01",
      "prescription02",
      "wayfarers",
    ],
    facialHair: [
      "blank",
      "beardLight",
      "beardMajestic",
      "beardMedium",
      "moustacheFancy",
      "moustacheMagnum",
    ],
    clothing: [
      "blazerAndShirt",
      "blazerAndSweater",
      "collarAndSweater",
      "overall",
      "shirtCrewNeck",
      "shirtScoopNeck",
      "shirtVNeck",
    ],

    // Couleurs
    hairColor: [
      "a55728",
      "2c1b18",
      "b58143",
      "d6b370",
      "724133",
      "4a312c",
      "f59797",
      "ecdcbf",
      "c93305",
      "e8e1e1",
    ],
    clothesColor: [
      "262e33",
      "65c9ff",
      "5199e4",
      "25557c",
      "e6e6e6",
      "929598",
      "3c4f5c",
      "b1e2ff",
      "a7ffc4",
      "ffdeb5",
      "ffafb9",
      "ffffb1",
      "ff488e",
      "ff5c5c",
      "ffffff",
    ],
    accessoriesColor: [
      "262e33",
      "65c9ff",
      "5199e4",
      "25557c",
      "e6e6e6",
      "929598",
      "3c4f5c",
      "b1e2ff",
      "a7ffc4",
      "ffdeb5",
      "ffafb9",
      "ffffb1",
      "ff488e",
      "ff5c5c",
      "ffffff",
    ],
    facialHairColor: [
      "a55728",
      "2c1b18",
      "b58143",
      "d6b370",
      "724133",
      "4a312c",
      "f59797",
      "ecdcbf",
      "c93305",
      "e8e1e1",
    ],
    backgroundColor: [
      "262e33",
      "65c9ff",
      "5199e4",
      "25557c",
      "e6e6e6",
      "929598",
      "3c4f5c",
      "b1e2ff",
      "a7ffc4",
      "ffdeb5",
      "ffafb9",
      "ffffb1",
      "ff488e",
      "ff5c5c",
      "ffffff",
    ],
  },
  categories: {
    face: {
      label: "Visage",
      options: ["skinColor", "eyes", "eyebrows", "mouth"],
    },
    hair: {
      label: "Cheveux",
      options: ["top", "hairColor", "facialHair", "facialHairColor"],
    },
    hats: {
      label: "Chapeaux",
      options: ["hats"],
    },
    accessories: {
      label: "Accessoires",
      options: ["accessories", "accessoriesColor"],
    },
    clothing: {
      label: "Vêtements",
      options: ["clothing", "clothesColor"],
    },
    background: {
      label: "Arrière-plan",
      options: ["backgroundColor"],
    },
  },
  // Items à débloquer
  items: {
    winter_hat1: {
      price: 1000,
      category: "hats",
      value: "winterHat1",
      name: "Bonnet de Ski",
      description: "Un bonnet chaud pour les défis mathématiques hivernaux",
    },
    winter_hat2: {
      price: 1200,
      category: "hats",
      value: "winterHat02",
      name: "Bonnet à Pompon",
      description: "Un bonnet stylé pour calculer avec élégance",
    },
    winter_hat3: {
      price: 1500,
      category: "hats",
      value: "winterHat03",
      name: "Bonnet Festif",
      description: "Pour célébrer vos progrès en mathématiques",
    },
    winter_hat4: {
      price: 1800,
      category: "hats",
      value: "winterHat04",
      name: "Bonnet Décontracté",
      description: "Pour rester cool pendant les révisions",
    },
    glasses: {
      price: 500,
      category: "accessories",
      value: "round",
      name: "Lunettes d'Étudiant",
      description: "Pour voir les multiplications plus clairement",
    },
    sunglasses: {
      price: 1000,
      category: "accessories",
      value: "sunglasses",
      name: "Lunettes de Soleil",
      description: "Pour avoir l'air cool même pendant les divisions",
    },
    eyepatch: {
      price: 1200,
      category: "accessories",
      value: "eyepatch",
      name: "Cache-œil",
      description: "Pour partir à l'aventure des mathématiques",
    },
    hoodie: {
      price: 1500,
      category: "clothing",
      value: "hoodie",
      name: "Sweat à Capuche",
      description: "Confort maximal pour les sessions d'étude",
    },

    hair_frida: {
      price: 1000,
      category: "top",
      value: "frida",
      name: "Coiffure Frida",
      description: "Une coiffure artistique pour des calculs créatifs",
    },
    hair_dreads: {
      price: 1200,
      category: "top",
      value: "dreads01",
      name: "Dreadlocks Style",
      description: "Pour un look décontracté pendant les exercices",
    },

    shirt_graphic: {
      price: 1000,
      category: "clothing",
      value: "graphicShirt",
      name: "T-shirt Graphique",
      description: "Un t-shirt sympa pour les maths décontractées",
    },
  },
};

// Fonctions d'utilitaires pour la gestion des items et de la configuration
// Récupérer les options disponibles pour une catégorie donnée
export const getAvailableOptions = (category, unlockedItems = []) => {
  const baseOptions = AVATAR_CONFIG.options[category] || [];
  const unlockedOptions = unlockedItems
    .filter((itemId) => AVATAR_CONFIG.items[itemId]?.category === category)
    .map((itemId) => AVATAR_CONFIG.items[itemId].value);

  return [...baseOptions, ...unlockedOptions];
};

// Fonction utilitaire pour obtenir la clé de stockage spécifique à l'utilisateur
const getUserStorageKey = (key) => {
  const playerName = localStorage.getItem("playerName");
  if (!playerName) return null;
  return `${playerName}_${key}`;
};

export const loadUnlockedItems = () => {
  try {
    const storageKey = getUserStorageKey("unlockedAvatarItems");
    if (!storageKey) return [];
    const items = localStorage.getItem(storageKey);
    return items ? JSON.parse(items) : [];
  } catch {
    return [];
  }
};

export const saveUnlockedItems = (items) => {
  try {
    const storageKey = getUserStorageKey("unlockedAvatarItems");
    if (!storageKey) return false;
    localStorage.setItem(storageKey, JSON.stringify(items));
    return true;
  } catch {
    return false;
  }
};

export const loadAvatarConfig = () => {
  const defaultConfig = {
    top: "shortFlat",
    accessories: "blank",
    clothing: "blazerAndShirt",
    hairColor: "262e33",
    clothesColor: "65c9ff",
    accessoriesColor: "3c4f5c",
    backgroundColor: "b6e3f4",
    skinColor: "f8d25c",
    eyes: "default",
    eyebrows: "defaultNatural",
    mouth: "default",
  };

  try {
    const storageKey = getUserStorageKey("avatarConfig");
    if (!storageKey) return defaultConfig;
    const savedConfig = localStorage.getItem(storageKey);
    return savedConfig ? JSON.parse(savedConfig) : defaultConfig;
  } catch {
    return defaultConfig;
  }
};

export const saveAvatarConfig = (config) => {
  try {
    const storageKey = getUserStorageKey("avatarConfig");
    if (!storageKey) return false;
    localStorage.setItem(storageKey, JSON.stringify(config));
    return true;
  } catch {
    return false;
  }
};

// Vérifier si l'utilisateur a assez de pièces
export const canPurchaseItem = (itemPrice) => {
  try {
    const storageKey = getUserStorageKey("userProgress");
    if (!storageKey) return false;
    const userProgress = localStorage.getItem(storageKey);
    const progress = userProgress ? JSON.parse(userProgress) : {};
    const coins = progress.totalCoins || 0;
    return coins >= itemPrice;
  } catch {
    return false;
  }
};

// Effectuer un achat
export const purchaseItem = (itemId, price) => {
  try {
    const storageKey = getUserStorageKey("userProgress");
    if (!storageKey) return false;

    // Récupérer la progression actuelle
    const userProgress = localStorage.getItem(storageKey);
    const progress = userProgress ? JSON.parse(userProgress) : {};
    const currentCoins = progress.totalCoins || 0;

    // Vérifier si l'utilisateur a assez de pièces
    if (currentCoins < price) return false;

    // Mettre à jour le nombre de pièces
    progress.totalCoins = currentCoins - price;
    localStorage.setItem(storageKey, JSON.stringify(progress));

    // Ajouter l'item à la liste des items débloqués
    const unlockedItems = loadUnlockedItems();
    if (!unlockedItems.includes(itemId)) {
      unlockedItems.push(itemId);
      saveUnlockedItems(unlockedItems);
    }

    return true;
  } catch (error) {
    console.error("Erreur lors de l'achat:", error);
    return false;
  }
};

// Vérifier si un item est débloqué
export const isItemUnlocked = (itemId) => {
  const unlockedItems = loadUnlockedItems();
  return unlockedItems.includes(itemId);
};
