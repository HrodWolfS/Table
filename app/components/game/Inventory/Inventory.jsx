import { INVENTORY_TYPES } from "@/app/data/inventory";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Inventory = ({ inventory, onClose }) => {
  const [selectedTab, setSelectedTab] = useState("EQUIPMENT");
  const [selectedItem, setSelectedItem] = useState(null);

  const filteredItems = inventory.filter((item) => {
    if (selectedTab === "EQUIPMENT") {
      return item.type === INVENTORY_TYPES.EQUIPMENT;
    } else {
      return item.type === INVENTORY_TYPES.ARTIFACT;
    }
  });

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
            onClick={() => setSelectedTab("EQUIPMENT")}
            className={`flex-1 py-2 px-4 rounded-full font-semibold transition-colors ${
              selectedTab === "EQUIPMENT"
                ? "bg-blue-500 text-white"
                : "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
            }`}
          >
            Équipement
          </button>
          <button
            onClick={() => setSelectedTab("ARTIFACT")}
            className={`flex-1 py-2 px-4 rounded-full font-semibold transition-colors ${
              selectedTab === "ARTIFACT"
                ? "bg-blue-500 text-white"
                : "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
            }`}
          >
            Artefacts
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
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
};

export default Inventory;
