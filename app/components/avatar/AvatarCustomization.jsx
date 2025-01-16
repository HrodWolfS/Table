"use client";

import {
  AVATAR_CONFIG,
  FRENCH_LABELS,
  getAvailableOptions,
  loadAvatarConfig,
  loadUnlockedItems,
  saveAvatarConfig,
} from "@/app/utils/avatar";
import { useEffect, useState } from "react";
import AvatarDisplay from "./AvatarDisplay";

export default function AvatarCustomization() {
  const [config, setConfig] = useState(null);
  const [message, setMessage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("face");
  const [selectedOption, setSelectedOption] = useState(null);
  const [unlockedItems, setUnlockedItems] = useState([]);
  const [newItems, setNewItems] = useState([]);

  useEffect(() => {
    const savedConfig = loadAvatarConfig();
    const loadedUnlockedItems = loadUnlockedItems();
    const viewedItems = localStorage.getItem("viewedAvatarItems");
    const viewedItemsList = viewedItems ? JSON.parse(viewedItems) : [];

    // Les nouveaux items sont ceux qui sont débloqués mais pas encore vus
    const newItemsList = loadedUnlockedItems.filter(
      (item) => !viewedItemsList.includes(item)
    );

    setConfig(savedConfig);
    setUnlockedItems(loadedUnlockedItems);
    setNewItems(newItemsList);
    setSelectedOption(AVATAR_CONFIG.categories.face.options[0]);
  }, []);

  const handleOptionChange = (category, value) => {
    // Marquer l'item comme vu
    if (newItems.length > 0) {
      const itemId = Object.entries(AVATAR_CONFIG.items).find(
        ([_, item]) => item.category === category && item.value === value
      )?.[0];

      if (itemId && newItems.includes(itemId)) {
        const updatedNewItems = newItems.filter((id) => id !== itemId);
        setNewItems(updatedNewItems);

        // Sauvegarder dans localStorage
        const viewedItems = localStorage.getItem("viewedAvatarItems");
        const viewedItemsList = viewedItems ? JSON.parse(viewedItems) : [];
        localStorage.setItem(
          "viewedAvatarItems",
          JSON.stringify([...viewedItemsList, itemId])
        );
      }
    }

    setConfig((prev) => {
      let newConfig = { ...prev };

      // Gestion spéciale pour les cheveux et chapeaux
      if (category === "top") {
        newConfig = {
          ...newConfig,
          top: value,
          hats: "blank", // On retire le chapeau quand on change de coiffure
        };
      } else if (category === "hats") {
        newConfig = {
          ...newConfig,
          hats: value,
        };
      } else {
        newConfig[category] = value;
      }

      console.log("Nouvelle configuration:", newConfig);
      saveAvatarConfig(newConfig);
      return newConfig;
    });
  };

  const isNewItem = (category, value) => {
    return newItems.some((itemId) => {
      const item = AVATAR_CONFIG.items[itemId];
      return item && item.category === category && item.value === value;
    });
  };

  const showMessage = (text, isError = false) => {
    setMessage({ text, isError });
    setTimeout(() => setMessage(null), 3000);
  };

  if (!config) return null;

  const currentCategory = AVATAR_CONFIG.categories[selectedCategory];

  return (
    <div className="flex gap-6 p-4">
      <div className="w-1/2 flex flex-col items-center space-y-4">
        <AvatarDisplay config={config} className="w-96 h-96" />
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
          Personnalisation de l'Avatar
        </h2>
      </div>

      <div className="w-1/2 space-y-6">
        {message && (
          <div
            className={`p-4 rounded-lg ${
              message.isError
                ? "bg-red-500/10 text-red-400"
                : "bg-green-500/10 text-green-400"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {Object.entries(AVATAR_CONFIG.categories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedCategory(key);
                setSelectedOption(category.options[0]);
              }}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === key
                  ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/40"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {currentCategory && (
          <div className="flex flex-wrap gap-2">
            {currentCategory.options.map((option) => (
              <button
                key={option}
                onClick={() => setSelectedOption(option)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                  selectedOption === option
                    ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/40"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                {FRENCH_LABELS[option]?.label || option}
              </button>
            ))}
          </div>
        )}

        {selectedOption && (
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border border-cyan-400/20">
            <h3 className="text-lg font-medium text-gray-200 mb-3">
              {FRENCH_LABELS[selectedOption]?.label || selectedOption}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {getAvailableOptions(selectedOption, unlockedItems).map(
                (value) => {
                  const isColor = value.match(/^[0-9a-f]{6}$/i);
                  const isNew = isNewItem(selectedOption, value);
                  return (
                    <button
                      key={value}
                      onClick={() => handleOptionChange(selectedOption, value)}
                      className={`relative px-4 py-2 rounded-lg text-sm transition-colors ${
                        config[selectedOption] === value
                          ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/40"
                          : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {isColor && (
                          <div
                            className="w-4 h-4 rounded-full border border-gray-600"
                            style={{ backgroundColor: `#${value}` }}
                          />
                        )}
                        <span>
                          {FRENCH_LABELS[selectedOption]?.options[value] ||
                            value}
                        </span>
                      </div>
                      {isNew && (
                        <div className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs px-2 py-0.5 rounded-full font-bold">
                          Nouveau
                        </div>
                      )}
                    </button>
                  );
                }
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
