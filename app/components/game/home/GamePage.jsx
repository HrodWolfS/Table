"use client";

import { initializeProgress } from "@/app/utils/gameLogic/progression";
import { getProgress } from "@/app/utils/localStorage";
import { getPlayerStatistics } from "@/app/utils/statistics";
import { ArchiveBoxIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import UserAuthButton from "../../auth/UserAuthButton";
import Logo from "../../ui/Logo";
import Inventory from "../Inventory/Inventory";
import WorldMap from "../Map/WorldMap";
import Statistics from "../Statistics/Statistics";
import { Footer } from "./Footer";
const GamePage = () => {
  const [userProgress, setUserProgress] = useState(null);
  const [showInventory, setShowInventory] = useState(false);
  const [activeTab, setActiveTab] = useState("map"); // "map", "stats"
  const [stats, setStats] = useState({});

  useEffect(() => {
    const progress = initializeProgress();
    setUserProgress(progress);
  }, []);

  useEffect(() => {
    if (userProgress) {
      const newStats = getPlayerStatistics(userProgress);
      setStats(newStats);
      console.log("newStats", newStats);
    }
  }, [userProgress]);

  if (!userProgress) {
    return <div>Chargement...</div>;
  }

  const handleQuestComplete = () => {
    // Mettre à jour le progrès après la complétion d'une quête
    const updatedProgress = getProgress();
    console.log("Progress mis à jour:", updatedProgress);
    setUserProgress(updatedProgress);

    // Mettre à jour les statistiques immédiatement
    const newStats = getPlayerStatistics(updatedProgress);
    setStats(newStats);
  };

  // S'assurer que l'inventaire existe
  const inventory = userProgress?.inventory || [];

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
        return (
          <Statistics
            key={JSON.stringify(stats)}
            stats={stats}
            userProgress={userProgress}
          />
        );
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
      <div className=" mx-auto pt-4">
        <UserAuthButton />
        <div className="flex justify-between items-center mx-6 mb-8">
          <Link href="/">
            <div className="flex-1 flex items-center justify-start gap-1 cursor-pointer">
              <Logo size={48} className="text-yellow-500" />
              <div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white font-display">
                  MultiTab
                  <span className="text-yellow-400">!</span>
                </h1>
                <p className="text-xs md:text-sm font-medium text-white tracking-wide">
                  Apprendre en s'amusant !
                </p>
              </div>
            </div>
          </Link>
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
            <button
              onClick={() => setShowInventory(true)}
              className="flex items-center gap-2 bg-transparenthover:bg-blue-600 text-blue-500 px-4 py-2 rounded-full font-semibold transition-colors"
            >
              <ArchiveBoxIcon className="h-5 w-5" />
              Inventaire
            </button>
          </div>
          <div className="w-40"></div>
        </div>
        <div className="min-h-[calc(100vh-175px)]">{renderContent()}</div>

        <Inventory
          isOpen={showInventory}
          onClose={() => setShowInventory(false)}
          userProgress={userProgress}
        />
      </div>
      <Footer />
    </div>
  );
};

export default GamePage;
