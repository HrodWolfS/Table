// Fonction utilitaire pour obtenir la clé de stockage spécifique à l'utilisateur
const getUserStorageKey = (key) => {
  const playerName = localStorage.getItem("playerName");
  if (!playerName) return null;
  return `${playerName}_${key}`;
};

// Charger la progression du mode classique
export const loadClassicProgress = () => {
  try {
    const storageKey = getUserStorageKey("classicMode");
    if (!storageKey) return {};
    const savedProgress = localStorage.getItem(storageKey);
    return savedProgress ? JSON.parse(savedProgress) : {};
  } catch (error) {
    console.error(
      "Erreur lors du chargement de la progression classique:",
      error
    );
    return {};
  }
};

// Sauvegarder la progression du mode classique
export const saveClassicProgress = (progress) => {
  try {
    const storageKey = getUserStorageKey("classicMode");
    if (!storageKey) return false;
    localStorage.setItem(storageKey, JSON.stringify(progress));
    return true;
  } catch (error) {
    console.error(
      "Erreur lors de la sauvegarde de la progression classique:",
      error
    );
    return false;
  }
};

// Mettre à jour le score du mode classique
export const updateClassicScore = (level, score) => {
  const progress = loadClassicProgress();
  if (!progress[level] || score > progress[level]) {
    progress[level] = score;
    return saveClassicProgress(progress);
  }
  return false;
};
