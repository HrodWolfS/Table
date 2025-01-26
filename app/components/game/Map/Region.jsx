"use client";

import { ITEMS } from "@/app/data/inventory";
import { NARRATIVE } from "@/app/data/story";
import { getProgress } from "@/app/utils/localStorage";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Region = ({
  region,
  onClick,
  isActive,
  isNew,
  userProgress,
  equippedItem,
}) => {
  const [mounted, setMounted] = useState(false);
  const [equippedItemId, setEquippedItemId] = useState(null);
  const [showLockedMessage, setShowLockedMessage] = useState(false);
  const [lockedMessage, setLockedMessage] = useState("");

  useEffect(() => {
    setMounted(true);
    const progress = getProgress();
    if (equippedItem) {
      setEquippedItemId(equippedItem);
    } else if (progress?.inventory?.equippedItem) {
      setEquippedItemId(progress.inventory.equippedItem);
    }
  }, [equippedItem]);

  const getRequiredItemForRegion = (regionId) => {
    const regionOrder = [
      "vallee_debuts",
      "foret_multiplications",
      "collines_multiplicateur",
      "marais_quatrak",
      "desert_infini",
      "riviere_cristalline",
      "cite_septoria",
      "grottes_huitra",
      "pics_neuflame",
      "chateau_dividix",
    ];

    const currentIndex = regionOrder.indexOf(regionId);
    if (currentIndex <= 0) return null;

    const previousRegion = regionOrder[currentIndex - 1];
    return Object.values(ITEMS).find((item) => item.region === previousRegion)
      ?.id;
  };

  const isUnlocked = () => {
    if (!region.unlockedBy || region.unlockedBy.length === 0) {
      return true;
    }
    return userProgress?.unlockedRegions?.includes(region.id) || false;
  };

  const hasRequiredItems = () => {
    const requiredItem = getRequiredItemForRegion(region.id);
    if (!requiredItem) return true;

    const progress = getProgress();
    const hasItem = progress?.inventory?.items?.includes(requiredItem);
    const isEquipped = progress?.inventory?.equippedItem === requiredItem;

    return hasItem && isEquipped;
  };

  const handleClick = () => {
    const unlocked = isUnlocked();
    const hasItems = hasRequiredItems();

    if (unlocked && hasItems) {
      onClick(region);
    } else if (unlocked && !hasItems) {
      const regionNumber =
        region.id === "vallee_debuts"
          ? "1"
          : region.id === "foret_multiplications"
          ? "2"
          : region.id === "collines_multiplicateur"
          ? "3"
          : region.id === "marais_quatrak"
          ? "4"
          : region.id === "desert_infini"
          ? "5"
          : region.id === "riviere_cristalline"
          ? "6"
          : region.id === "cite_septoria"
          ? "7"
          : region.id === "grottes_huitra"
          ? "8"
          : region.id === "pics_neuflame"
          ? "9"
          : region.id === "chateau_dividix"
          ? "10"
          : null;

      if (regionNumber) {
        const lockedDialogue = NARRATIVE.find(
          (d) => d.id === `region_${regionNumber}_locked`
        );
        if (lockedDialogue) {
          setLockedMessage(lockedDialogue.text);
          setShowLockedMessage(true);
          setTimeout(() => setShowLockedMessage(false), 5000);
        }
      }
    }
  };

  // Rendu initial pour éviter les problèmes d'hydratation
  if (!mounted) {
    return (
      <div className="relative rounded-lg overflow-hidden">
        <img
          src={region.image}
          alt={region.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white text-lg font-bold mb-1">{region.name}</h3>
          <p className="text-gray-200 text-sm">{region.description}</p>
        </div>
      </div>
    );
  }

  const regionUnlocked = isUnlocked();
  const hasItems = hasRequiredItems();
  const requiredItem = getRequiredItemForRegion(region.id);

  return (
    <motion.div
      whileHover={regionUnlocked && hasItems ? { scale: 1.05 } : undefined}
      className={`relative rounded-lg overflow-hidden z-0 cursor-pointer transition-transform ${
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

      {isNew && (
        <div className="absolute top-2 right-2">
          <span className="bg-yellow-500 text-black px-2 py-1 rounded-full text-sm font-semibold animate-pulse">
            Nouveau !
          </span>
        </div>
      )}
      {showLockedMessage && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 2 }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 text-gray-200 px-3 py-4 rounded-lg shadow-xl max-w-lg mx-auto border border-yellow-500/30">
            <div className="text-lg text-center font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
              {lockedMessage}
            </div>
          </div>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-white text-lg font-bold mb-1">{region.name}</h3>
        <p className="text-gray-200 text-sm">{region.description}</p>
      </div>

      {!regionUnlocked && mounted && (
        <div className="absolute inset-0 z-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="text-center p-4">
            <LockClosedIcon className="h-12 w-12 text-white/80 mx-auto mb-2" />
            <p className="text-white font-medium">
              Terminez les régions précédentes pour débloquer cette zone
            </p>
          </div>
        </div>
      )}

      {regionUnlocked && !hasItems && requiredItem && mounted && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="text-center p-4">
            <h4 className="text-white font-bold mb-2">Item requis :</h4>
            <div className="flex flex-col items-center gap-2">
              {(() => {
                const item = ITEMS[requiredItem.toUpperCase()];
                const progress = getProgress();
                const hasItem =
                  progress?.inventory?.items?.includes(requiredItem);
                const isEquipped =
                  progress?.inventory?.equippedItem === requiredItem;

                return (
                  <div
                    className={`flex items-center gap-2 rounded-lg p-2 ${
                      hasItem && isEquipped
                        ? "bg-green-500/20 border border-green-500/50"
                        : hasItem
                        ? "bg-yellow-500/20 border border-yellow-500/50"
                        : "bg-red-500/20 border border-red-500/50"
                    }`}
                  >
                    <img src={item.image} alt={item.name} className="w-6 h-6" />
                    <span className="text-white text-sm">{item.name}</span>
                    {hasItem && !isEquipped && (
                      <span className="text-yellow-300 text-xs">
                        (Non équipé)
                      </span>
                    )}
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Region;
