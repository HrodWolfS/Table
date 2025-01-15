import { ITEMS, ARTIFACT_PIECES, INVENTORY_TYPES } from "@/app/data/inventory";
import { getProgress, saveProgress } from "../localStorage";

export const initializeInventory = () => {
  const progress = getProgress();
  if (!progress.inventory || progress.inventory.length === 0) {
    progress.inventory = ["carte"];
    saveProgress(progress);
    return true;
  }
  return false;
};

// Nouvelle fonction pour ajouter un artefact
export const addArtifactToInventory = (regionId, table) => {
  const progress = getProgress();

  // Vérifier que l'inventaire existe
  if (!progress.inventory) {
    progress.inventory = [];
  }

  const artifact = Object.values(ARTIFACT_PIECES).find(
    (piece) => piece.region === regionId && piece.table === table
  );

  if (artifact && !progress.inventory.some((item) => item.id === artifact.id)) {
    progress.inventory.push({
      ...artifact,
      type: INVENTORY_TYPES.ARTIFACT,
    });
    saveProgress(progress);
    console.log("Artefact ajouté:", artifact.name);
    return true;
  }
  return false;
};

export const getInventoryArtifacts = () => {
  const progress = getProgress();
  return (
    progress.inventory?.filter(
      (item) => item.type === INVENTORY_TYPES.ARTIFACT
    ) || []
  );
};

export const addItemToInventory = (itemId) => {
  const progress = getProgress();
  if (!progress.inventory) {
    progress.inventory = [];
  }

  if (!progress.inventory.includes(itemId)) {
    progress.inventory.push(itemId);
    saveProgress(progress);
    return true;
  }
  return false;
};

export const removeItemFromInventory = (itemId) => {
  const progress = getProgress();
  if (!progress.inventory) return false;

  const index = progress.inventory.indexOf(itemId);
  if (index > -1) {
    progress.inventory.splice(index, 1);
    saveProgress(progress);
    return true;
  }
  return false;
};

export const hasItem = (itemId) => {
  const progress = getProgress();
  return progress.inventory?.includes(itemId) || false;
};

export const getInventoryItems = () => {
  const progress = getProgress();
  return progress.inventory?.map((itemId) => ITEMS[itemId]) || [];
};

export const getRegionItem = (regionId) => {
  return Object.values(ITEMS).find((item) => item.region === regionId);
};

export const addRegionItemToInventory = (regionId) => {
  const item = getRegionItem(regionId);
  if (item) {
    return addItemToInventory(item.id);
  }
  return false;
};
