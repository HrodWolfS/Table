"use client";

import { initializeProgress } from "@/app/utils/gameLogic/progression";
import { getProgress } from "@/app/utils/localStorage";
import { getPlayerStatistics } from "@/app/utils/statistics";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import Inventory from "./Inventory/Inventory";
import WorldMap from "./Map/WorldMap";
import Statistics from "./Statistics/Statistics";

const GamePage = () => {
  const [userProgress, setUserProgress] = useState(null);
  const [showInventory, setShowInventory] = useState(false);
  const [activeTab, setActiveTab] = useState("map"); // "map", "stats"

  useEffect(() => {
    const progress = initializeProgress();
    setUserProgress(progress);
  }, []);

  if (!userProgress) {
    return <div>Chargement...</div>;
  }

  const handleQuestComplete = () => {
    // Mettre à jour le progrès après la complétion d'une quête
    const updatedProgress = getProgress();
    setUserProgress(updatedProgress);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "map":
        return (
          <WorldMap
            userProgress={userProgress}
            onQuestComplete={handleQuestComplete}
          />
        );
      case "stats":
        return <Statistics stats={getPlayerStatistics(userProgress)} />;
      default:
        return (
          <WorldMap
            userProgress={userProgress}
            onQuestComplete={handleQuestComplete}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab("map")}
              className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                activeTab === "map"
                  ? "bg-blue-500 text-white"
                  : "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
              }`}
            >
              Carte du Monde
            </button>
            <button
              onClick={() => setActiveTab("stats")}
              className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                activeTab === "stats"
                  ? "bg-blue-500 text-white"
                  : "bg-blue-500/20 text-blue-300 hover:bg-blue-500/30"
              }`}
            >
              Statistiques
            </button>
          </div>
          <button
            onClick={() => setShowInventory(true)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full font-semibold transition-colors"
          >
            <ArchiveBoxIcon className="h-5 w-5" />
            Inventaire
          </button>
        </div>

        {renderContent()}

        {showInventory && (
          <Inventory
            inventory={userProgress?.inventory || []}
            onClose={() => setShowInventory(false)}
          />
        )}
      </div>
    </div>
  );
};

export default GamePage;
