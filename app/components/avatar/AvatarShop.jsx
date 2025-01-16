"use client";

import {
  AVATAR_CONFIG,
  canPurchaseItem,
  isItemUnlocked,
  purchaseItem,
  getAvailableOptions,
  loadUnlockedItems,
} from "@/app/utils/avatar";
import { Coins, Lock } from "lucide-react";
import { useEffect, useState } from "react";

export default function AvatarShop() {
  const [unlockedItems, setUnlockedItems] = useState([]);
  const [coins, setCoins] = useState(0);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Charger les pièces de l'utilisateur depuis userProgress
    const userProgress = localStorage.getItem("userProgress");
    const progress = userProgress ? JSON.parse(userProgress) : {};
    const userCoins = progress.totalCoins || 0;
    setCoins(userCoins);

    // Charger les items débloqués
    const items = loadUnlockedItems();
    setUnlockedItems(items);
  }, []);

  const handlePurchase = (itemId) => {
    const item = AVATAR_CONFIG.items[itemId];
    if (!item) return;

    if (isItemUnlocked(itemId)) {
      showMessage("Vous possédez déjà cet objet !", true);
      return;
    }

    if (!canPurchaseItem(item.price)) {
      showMessage("Vous n'avez pas assez de pièces !", true);
      return;
    }

    if (purchaseItem(itemId, item.price)) {
      setUnlockedItems((prev) => [...prev, itemId]);
      setCoins((prev) => prev - item.price);
      showMessage("Achat effectué avec succès !");
    } else {
      showMessage("Une erreur est survenue lors de l'achat.", true);
    }
  };

  const showMessage = (text, isError = false) => {
    setMessage({ text, isError });
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
          Boutique d'Avatars
        </h2>
        <div className="flex items-center gap-2 bg-gray-900/50 backdrop-blur-sm px-4 py-2 rounded-lg border border-cyan-400/20">
          <Coins className="h-5 w-5 text-yellow-400" />
          <span className="text-yellow-400 font-medium">{coins}</span>
        </div>
      </div>

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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(AVATAR_CONFIG.items).map(([itemId, item]) => {
          const isUnlocked = unlockedItems.includes(itemId);
          return (
            <div
              key={itemId}
              className={`bg-gray-900/50 backdrop-blur-sm rounded-lg p-4 border ${
                isUnlocked ? "border-green-400/20" : "border-cyan-400/20"
              }`}
            >
              <h3 className="text-lg font-medium text-gray-200 mb-2 flex items-center gap-2">
                {item.name}
                {!isUnlocked && <Lock className="h-4 w-4" />}
              </h3>
              <p className="text-sm text-gray-400 mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-yellow-400" />
                  <span className="text-yellow-400">{item.price}</span>
                </div>
                <button
                  onClick={() => handlePurchase(itemId)}
                  disabled={isUnlocked}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    isUnlocked
                      ? "bg-green-500/20 text-green-400 cursor-default"
                      : coins >= item.price
                      ? "bg-cyan-400/20 text-cyan-400 hover:bg-cyan-400/30"
                      : "bg-gray-800 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {isUnlocked
                    ? "Débloqué"
                    : coins >= item.price
                    ? "Acheter"
                    : "Pas assez de pièces"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
