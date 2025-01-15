import { ARTIFACT_PIECES, INVENTORY_TYPES, ITEMS } from "@/app/data/inventory";
import { REGIONS } from "@/app/data/regions";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function Inventory({ isOpen = false, onClose, userProgress }) {
  const [selectedTab, setSelectedTab] = useState(INVENTORY_TYPES.EQUIPMENT);
  const [selectedItem, setSelectedItem] = useState(null);

  // Vérifier si une région est complétée
  const isRegionComplete = (regionId) => {
    const region = REGIONS[regionId];
    const regionProgress = userProgress?.regions?.[regionId];
    if (!region || !regionProgress?.completedQuests) return false;

    return region.quests.every((questId) =>
      regionProgress.completedQuests.includes(questId)
    );
  };

  // Obtenir les items en fonction des régions complétées
  const getInventoryItems = () => {
    const items = [];

    // Ajouter la carte de départ
    items.push(ITEMS.CARTE);

    // Ajouter les items des régions complétées
    Object.keys(REGIONS).forEach((regionId) => {
      if (isRegionComplete(regionId)) {
        const regionItem = Object.values(ITEMS).find(
          (item) => item.region === regionId
        );
        if (regionItem) {
          items.push(regionItem);
        }
      }
    });

    return items;
  };

  // Obtenir les artefacts en fonction des régions complétées
  const getInventoryArtifacts = () => {
    const artifacts = [];

    // Ajouter les artefacts des régions complétées
    Object.keys(REGIONS).forEach((regionId) => {
      if (isRegionComplete(regionId)) {
        // Ne récupérer que les artefacts de cette région spécifique
        const regionArtifacts = Object.values(ARTIFACT_PIECES).filter(
          (artifact) => artifact.region === regionId
        );
        if (regionArtifacts.length > 0) {
          console.log(`Artefacts de la région ${regionId}:`, regionArtifacts);
          artifacts.push(...regionArtifacts);
        }
      }
    });

    console.log("Total des artefacts:", artifacts);
    return artifacts;
  };

  // Filtrer les items en fonction du type sélectionné
  const filteredItems = () => {
    if (selectedTab === INVENTORY_TYPES.ARTIFACT) {
      return getInventoryArtifacts();
    }
    return getInventoryItems();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 p-6 rounded-lg shadow-xl max-w-2xl w-full mx-4 text-white relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-300 hover:text-white"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Inventaire</h2>

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

        {filteredItems().length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredItems().map((item) => (
              <motion.div
                key={item.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative cursor-pointer group"
                onClick={() => setSelectedItem(item)}
              >
                <div className="bg-white/10 rounded-lg p-4 transition-colors group-hover:bg-white/20">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 mx-auto mb-2"
                  />
                  <p className="text-sm font-medium text-center truncate">
                    {item.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-300">
            Aucun{" "}
            {selectedTab === INVENTORY_TYPES.EQUIPMENT
              ? "équipement"
              : "artefact"}{" "}
            dans l'inventaire.
          </p>
        )}

        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute inset-0 bg-gradient-to-br from-indigo-900 to-purple-900 p-6 rounded-lg"
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
                <h3 className="text-xl font-bold mb-2">{selectedItem.name}</h3>
                <p className="text-gray-300 text-center mb-4">
                  {selectedItem.description}
                </p>
                {selectedItem.effect && (
                  <p className="text-blue-300 font-medium text-center">
                    {selectedItem.effect}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
