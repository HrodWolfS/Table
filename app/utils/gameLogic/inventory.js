import { ITEMS } from "@/app/data/inventory";
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
