export const ITEMS = {
  LAMPE: {
    id: "lampe",
    name: "Lampe Mystique",
    description: "Une lampe ancienne qui éclaire les chemins les plus sombres.",
    image: "/images/items/lampe.svg",
    type: "EQUIPMENT",
    region: "vallee_debuts",
    effect: "Permet d'explorer les régions sombres",
  },
  CORDE: {
    id: "corde",
    name: "Corde Enchantée",
    description: "Une corde magique qui s'allonge à volonté.",
    image: "/images/items/corde.svg",
    type: "EQUIPMENT",
    region: "foret_multiplications",
    effect: "Permet d'accéder aux zones en hauteur",
  },
  BOTTES: {
    id: "bottes",
    name: "Bottes de Passage",
    description:
      "Des bottes qui permettent de traverser les marais sans s'enliser.",
    image: "/images/items/bottes.svg",
    type: "EQUIPMENT",
    region: "collines_multiplicateur",
    effect: "Permet de traverser les marais",
  },
  GOURDE: {
    id: "gourde",
    name: "Gourde Infinie",
    description: "Une gourde magique qui ne se vide jamais.",
    image: "/images/items/gourde.svg",
    type: "EQUIPMENT",
    region: "marais_quatrak",
    effect: "Permet de survivre dans le désert",
  },
  FIOLE: {
    id: "fiole",
    name: "Fiole de Pureté",
    description: "Une fiole contenant une eau purificatrice.",
    image: "/images/items/fiole.svg",
    type: "EQUIPMENT",
    region: "desert_infini",
    effect: "Permet de purifier l'eau contaminée",
  },
  CRISTAL: {
    id: "cristal",
    name: "Cristal de Vision",
    description: "Un cristal qui révèle les passages secrets.",
    image: "/images/items/cristal.svg",
    type: "EQUIPMENT",
    region: "riviere_cristalline",
    effect: "Permet de voir les passages cachés",
  },
  CLE: {
    id: "cle",
    name: "Clé des Anciens",
    description: "Une clé mystérieuse qui ouvre les portes anciennes.",
    image: "/images/items/cle.svg",
    type: "EQUIPMENT",
    region: "cite_septoria",
    effect: "Permet d'ouvrir les portes scellées",
  },
  PIOCHE: {
    id: "pioche",
    name: "Pioche des Profondeurs",
    description: "Une pioche enchantée capable de briser les roches magiques.",
    image: "/images/items/pioche.svg",
    type: "EQUIPMENT",
    region: "grotte_huitra",
    effect: "Permet de creuser dans la roche magique",
  },
  CAPE: {
    id: "cape",
    name: "Cape de Protection",
    description: "Une cape qui protège des effets magiques néfastes.",
    image: "/images/items/cape.svg",
    type: "EQUIPMENT",
    region: "pics_neuflame",
    effect: "Protège des effets magiques",
  },
  CARTE: {
    id: "carte",
    name: "Carte des Multiplicateurs",
    description: "Une carte magique qui révèle tous les chemins.",
    image: "/images/items/carte.svg",
    type: "EQUIPMENT",
    region: "aucune",
    effect: "Révèle la carte complète",
  },
};

export const getItemByRegion = (regionId) => {
  return Object.values(ITEMS).find((item) => item.region === regionId);
};

export const getItemById = (itemId) => {
  return ITEMS[itemId];
};

export const ARTIFACT_PIECES = {
  TABLE_1: {
    id: "artifact_1",
    name: "Fragment de l'Unité",
    description:
      "Le premier fragment de l'artefact, représentant la table de 1. Sa lueur douce rappelle la simplicité des débuts.",
    image: "/images/artifact/artifact_1.svg",
    table: 1,
    region: "vallee_debuts",
    type: "ARTIFACT",
  },
  TABLE_2: {
    id: "artifact_2",
    name: "Fragment du Duo",
    description:
      "Un fragment qui pulse doucement au rythme des paires, gardien de la table de 2.",
    image: "/images/artifact/artifact_2.svg",
    table: 2,
    region: "foret_multiplications",
    type: "ARTIFACT",
  },
  TABLE_3: {
    id: "artifact_3",
    name: "Fragment du Triangle",
    description:
      "Ce fragment triangulaire renferme les secrets de la table de 3, sa surface reflète une harmonie parfaite.",
    image: "/images/artifact/artifact_3.svg",
    table: 3,
    region: "collines_multiplicateur",
    type: "ARTIFACT",
  },
  TABLE_4: {
    id: "artifact_4",
    name: "Fragment du Carré",
    description:
      "Un fragment à quatre côtés égaux, porteur de la sagesse de la table de 4.",
    image: "/images/artifact/artifact_4.svg",
    table: 4,
    region: "marais_quatrak",
    type: "ARTIFACT",
  },
  TABLE_5: {
    id: "artifact_5",
    name: "Fragment du Pentacle",
    description:
      "Ce fragment à cinq pointes brille d'une lumière mystérieuse, gardien de la table de 5.",
    image: "/images/artifact/artifact_5.svg",
    table: 5,
    region: "desert_infini",
    type: "ARTIFACT",
  },
  TABLE_6: {
    id: "artifact_6",
    name: "Fragment de l'Hexagone",
    description:
      "Un fragment aux six faces parfaites, renfermant les secrets de la table de 6.",
    image: "/images/artifact/artifact_6.svg",
    table: 6,
    region: "riviere_cristalline",
    type: "ARTIFACT",
  },
  TABLE_7: {
    id: "artifact_7",
    name: "Fragment Chanceux",
    description:
      "Le septième fragment, porteur de chance et gardien de la table de 7.",
    image: "/images/artifact/artifact_7.svg",
    table: 7,
    region: "cite_septoria",
    type: "ARTIFACT",
  },
  TABLE_8: {
    id: "artifact_8",
    name: "Fragment de l'Infini",
    description:
      "Un fragment qui semble contenir l'infini, maître de la table de 8.",
    image: "/images/artifact/artifact_8.svg",
    table: 8,
    region: "grotte_huitra",
    type: "ARTIFACT",
  },
  TABLE_9: {
    id: "artifact_9",
    name: "Fragment du Nombre d'Or",
    description:
      "Le neuvième fragment, dont la forme rappelle la spirale dorée, gardien de la table de 9.",
    image: "/images/artifact/artifact_9.svg",
    table: 9,
    region: "pics_neuflame",
    type: "ARTIFACT",
  },
  TABLE_10: {
    id: "artifact_10",
    name: "Fragment de la Perfection",
    description:
      "Le fragment final, symbole de perfection et maître de la table de 10.",
    image: "/images/artifact/artifact_10.svg",
    table: 10,
    region: "cite_celeste",
    type: "ARTIFACT",
  },
};

export const INVENTORY_TYPES = {
  ARTIFACT: "artifact",
  EQUIPMENT: "equipment",
  CONSUMABLE: "consumable",
};

export const getArtifactByTable = (table) => {
  return Object.values(ARTIFACT_PIECES).find((piece) => piece.table === table);
};

export const getArtifactsByRegion = (regionId) => {
  return Object.values(ARTIFACT_PIECES).filter(
    (piece) => piece.region === regionId
  );
};

export const isArtifactCollected = (artifactId, inventory) => {
  return inventory.some((item) => item.id === artifactId);
};

export const getCollectedArtifacts = (inventory) => {
  return inventory.filter((item) =>
    Object.values(ARTIFACT_PIECES).some((piece) => piece.id === item.id)
  );
};

export const getMissingArtifacts = (inventory) => {
  const collectedIds = inventory.map((item) => item.id);
  return Object.values(ARTIFACT_PIECES).filter(
    (piece) => !collectedIds.includes(piece.id)
  );
};
