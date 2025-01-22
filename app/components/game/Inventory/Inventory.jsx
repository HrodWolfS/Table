"use client";

import { ARTIFACT_PIECES, INVENTORY_TYPES, ITEMS } from "@/app/data/inventory";
import { getProgress, saveProgress } from "@/app/utils/localStorage";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const Inventory = ({ onEquipItem }) => {
  const [selectedTab, setSelectedTab] = useState(INVENTORY_TYPES.EQUIPMENT);
  const [selectedItem, setSelectedItem] = useState(null);
  const [equippedItemId, setEquippedItemId] = useState(null);

  useEffect(() => {
    const progress = getProgress();
    if (progress?.inventory?.equippedItem) {
      setEquippedItemId(progress.inventory.equippedItem);
    }
  }, []);

  const getInventoryItems = () => {
    const progress = getProgress();
    const defaultItems = [ITEMS.CARTE];

    if (!progress?.inventory?.items?.length) {
      return defaultItems;
    }

    return progress.inventory.items.map(
      (itemId) =>
        Object.values(ITEMS).find((item) => item.id === itemId) || ITEMS.CARTE
    );
  };

  const getInventoryArtifacts = () => {
    const progress = getProgress();

    if (!progress?.inventory?.artifacts?.length) {
      return [];
    }

    return progress.inventory.artifacts
      .map((artifactId) =>
        Object.values(ARTIFACT_PIECES).find((a) => a.id === artifactId)
      )
      .filter(Boolean);
  };

  const handleEquipItem = (itemId) => {
    let progress = getProgress();

    // Initialiser l'inventaire si nécessaire
    if (!progress.inventory) {
      progress.inventory = {
        items: ["carte"],
        equippedItem: null,
        artifacts: [],
      };
    }

    // Mettre à jour l'équipement
    const newEquippedItemId = equippedItemId === itemId ? null : itemId;
    progress.inventory.equippedItem = newEquippedItemId;

    // Sauvegarder les changements
    saveProgress(progress);
    setEquippedItemId(newEquippedItemId);

    if (onEquipItem) {
      onEquipItem(newEquippedItemId);
    }
  };

  const renderInventoryGrid = () => {
    const items =
      selectedTab === INVENTORY_TYPES.EQUIPMENT
        ? getInventoryItems()
        : getInventoryArtifacts();

    if (!items.length) {
      return (
        <p className="text-center text-gray-300">
          Aucun{" "}
          {selectedTab === INVENTORY_TYPES.EQUIPMENT
            ? "équipement"
            : "artefact"}{" "}
          dans l'inventaire.
        </p>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative cursor-pointer group"
            onClick={() => setSelectedItem(item)}
          >
            <div
              className={`bg-white/10 rounded-lg p-4 transition-colors group-hover:bg-white/20 ${
                equippedItemId === item.id ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 mx-auto mb-2"
              />
              <p className="text-sm font-medium text-center text-white truncate">
                {item.name}
              </p>
              {equippedItemId === item.id && (
                <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  Équipé
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderItemDetails = () => {
    if (!selectedItem) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="fixed inset-4 sm:inset-8 mt-48  bg-gradient-to-br from-indigo-900 to-purple-900 p-6 rounded-lg z-50 border border-white/20 shadow-xl max-h-96"
      >
        <button
          onClick={() => setSelectedItem(null)}
          className="absolute top-2 right-2 text-gray-300 hover:text-white"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <div className="flex flex-col items-center">
          <motion.img
            src={selectedItem.image}
            alt={selectedItem.name}
            className="w-32 h-32 mb-4"
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
          />
          <h3 className="text-xl font-bold mb-2 text-white">
            {selectedItem.name}
          </h3>
          <p className="text-gray-300 text-center mb-4">
            {selectedItem.description}
          </p>
          {selectedItem.effect && (
            <p className="text-blue-300 font-medium text-center mb-4">
              {selectedItem.effect}
            </p>
          )}
          {selectedTab === INVENTORY_TYPES.EQUIPMENT && (
            <button
              onClick={() => handleEquipItem(selectedItem.id)}
              className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                equippedItemId === selectedItem.id
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              {equippedItemId === selectedItem.id ? "Déséquiper" : "Équiper"}
            </button>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-bold mb-6 text-white">Inventaire</h2>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setSelectedTab(INVENTORY_TYPES.EQUIPMENT)}
          className={`flex-1 py-2 px-4 rounded-full font-semibold transition-colors ${
            selectedTab === INVENTORY_TYPES.EQUIPMENT
              ? "bg-blue-500 text-white"
              : "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
          }`}
        >
          Équipement
        </button>
        <button
          onClick={() => setSelectedTab(INVENTORY_TYPES.ARTIFACT)}
          className={`flex-1 py-2 px-4 rounded-full font-semibold transition-colors ${
            selectedTab === INVENTORY_TYPES.ARTIFACT
              ? "bg-blue-500 text-white"
              : "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
          }`}
        >
          Artefacts
        </button>
      </div>

      {renderInventoryGrid()}

      <AnimatePresence>{selectedItem && renderItemDetails()}</AnimatePresence>
    </div>
  );
};

export default Inventory;
