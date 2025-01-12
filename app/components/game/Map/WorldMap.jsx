"use client";
import { REGIONS } from "@/app/data/regions";
import { getProgress, saveProgress } from "@/app/utils/localStorage";
import { useEffect, useState } from "react";
import QuestMode from "../Quests/QuestMode";
import Region from "./Region";

const WorldMap = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [newRegions, setNewRegions] = useState([]);
  const [currentProgress, setCurrentProgress] = useState(() => getProgress());

  useEffect(() => {
    // Récupérer les nouvelles régions du localStorage
    const storedNewRegions = localStorage.getItem("newUnlockedRegions");
    if (storedNewRegions) {
      setNewRegions(JSON.parse(storedNewRegions));
      localStorage.removeItem("newUnlockedRegions");
    }
  }, []);

  const handleRegionClick = (region) => {
    setSelectedRegion(region);
  };

  const handleQuestComplete = (updatedProgress) => {
    // Mettre à jour l'état local avec la nouvelle progression
    setCurrentProgress(updatedProgress);

    // Sauvegarder dans le localStorage
    saveProgress(updatedProgress);
  };

  if (selectedRegion) {
    return (
      <QuestMode
        region={selectedRegion}
        onBack={() => setSelectedRegion(null)}
        onComplete={handleQuestComplete}
        userProgress={currentProgress}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Carte du Monde</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.values(REGIONS).map((region) => (
            <Region
              key={region.id}
              region={region}
              onClick={handleRegionClick}
              isActive={selectedRegion?.id === region.id}
              isNew={newRegions.includes(region.id)}
              userProgress={currentProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
