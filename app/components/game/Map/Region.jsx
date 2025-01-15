"use client";

import { ITEMS } from "@/app/data/inventory";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

const Region = ({ region, onClick, isActive, isNew, userProgress }) => {
  const isUnlocked = () => {
    // Si pas de conditions de déverrouillage, la région est déverrouillée
    if (!region.unlockedBy || region.unlockedBy.length === 0) {
      return true;
    }

    // Vérifier si la région est dans la liste des régions déverrouillées
    if (!userProgress?.unlockedRegions) {
      return false;
    }

    return userProgress.unlockedRegions.includes(region.id);
  };

  const hasRequiredItems = () => {
    if (!region.requiredItems || region.requiredItems.length === 0) {
      return true;
    }

    return region.requiredItems.every((itemId) =>
      userProgress?.inventory?.some((item) => item.id === itemId)
    );
  };

  const handleClick = () => {
    const unlocked = isUnlocked();
    const hasItems = hasRequiredItems();

    if (unlocked && hasItems) {
      onClick(region);
    }
  };

  const regionUnlocked = isUnlocked();
  const hasItems = hasRequiredItems();

  return (
    <motion.div
      whileHover={regionUnlocked && hasItems ? { scale: 1.05 } : {}}
      className={`relative rounded-lg overflow-hidden cursor-pointer transition-transform ${
        regionUnlocked && hasItems
          ? "hover:shadow-lg"
          : "cursor-not-allowed opacity-75"
      } ${isActive ? "ring-4 ring-blue-500" : ""}`}
      onClick={handleClick}
    >
      <img
        src={region.image}
        alt={region.name}
        className="w-full h-48 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

      {isNew && (
        <div className="absolute top-2 right-2">
          <span className="bg-yellow-500 text-black px-2 py-1 rounded-full text-sm font-semibold animate-pulse">
            Nouveau !
          </span>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white text-lg font-bold mb-1">{region.name}</h3>
        <p className="text-gray-200 text-sm">{region.description}</p>
      </div>

      {!regionUnlocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="text-center p-4">
            <LockClosedIcon className="h-12 w-12 text-white/80 mx-auto mb-2" />
            <p className="text-white font-medium">
              Terminez les régions précédentes pour débloquer cette zone
            </p>
          </div>
        </div>
      )}

      {regionUnlocked && !hasItems && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="text-center p-4">
            <h4 className="text-white font-bold mb-2">Items requis :</h4>
            <div className="flex flex-col items-center gap-2">
              {region.requiredItems.map((itemId) => {
                const item = ITEMS[itemId.toUpperCase()];
                const hasItem = userProgress?.inventory?.some(
                  (i) => i.id === itemId
                );

                return (
                  <div
                    key={itemId}
                    className={`flex items-center gap-2 rounded-lg p-2 ${
                      hasItem
                        ? "bg-green-500/20 border border-green-500/50"
                        : "bg-red-500/20 border border-red-500/50"
                    }`}
                  >
                    <img src={item.image} alt={item.name} className="w-6 h-6" />
                    <span className="text-white text-sm">{item.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Region;
