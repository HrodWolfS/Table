import { avataaars } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

export const generateAvatar = (config) => {
  try {
    console.log("Configuration reçue:", config);

    // Logique de sélection pour top
    // Si hats est sélectionné (différent de blank), on utilise hats
    // Sinon on utilise la coiffure (top)
    const topValue =
      config.hats && config.hats !== "blank"
        ? config.hats
        : config.top || "shortFlat";

    // S'assurer que toutes les valeurs sont définies
    const safeConfig = {
      // Configuration de base
      seed: ["custom-seed"],
      radius: 50,

      // Style de cheveux et accessoires
      top: [topValue],
      accessories: [config.accessories || "blank"],
      facialHair: [config.facialHair || "blank"],
      clothing: [config.clothing || "blazerAndShirt"],

      // Couleurs - utilisation directe des valeurs hexadécimales
      hairColor: [config.hairColor || "262e33"],
      clothesColor: [config.clothesColor || "65c9ff"],
      accessoriesColor: [config.accessoriesColor || "3c4f5c"],
      facialHairColor: [config.facialHairColor || "2c1b18"],
      backgroundColor: [config.backgroundColor || "b6e3f4"],

      // Options du visage
      mouth: [config.mouth || "default"],
      eyes: [config.eyes || "default"],
      eyebrows: [config.eyebrows || "default"],
      nose: ["default"],
      skinColor: [config.skinColor || "f8d25c"],

      // Probabilités d'apparition
      accessoriesProbability: 100,
      facialHairProbability: 100,
    };

    console.log("Configuration utilisée:", safeConfig);

    const avatar = createAvatar(avataaars, safeConfig);
    const svg = avatar.toString();

    // Vérifier que le SVG est bien généré
    if (!svg.startsWith("<svg")) {
      throw new Error("SVG invalide généré");
    }

    console.log("SVG généré avec succès", svg.slice(0, 100));
    return svg;
  } catch (error) {
    console.error("Erreur lors de la génération de l'avatar:", error);
    return null;
  }
};
