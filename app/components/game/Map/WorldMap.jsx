import { REGIONS } from "@/app/data/regions";
import { NARRATIVE } from "@/app/data/story";
import { getProgress, saveProgress } from "@/app/utils/localStorage";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import QuestMode from "../Quests/QuestMode";
import StoryNarrator from "../Quests/StoryNarrator";
import Region from "./Region";

const WorldMap = ({ userProgress, onQuestComplete }) => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [newRegions, setNewRegions] = useState([]);
  const [currentProgress, setCurrentProgress] = useState(() => getProgress());
  const [equippedItem, setEquippedItem] = useState(null);
  const [showNarrative, setShowNarrative] = useState(false);
  const [narrativeDialogues, setNarrativeDialogues] = useState([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const storedNewRegions = localStorage.getItem("newUnlockedRegions");
    if (storedNewRegions) {
      const newUnlockedRegions = JSON.parse(storedNewRegions);
      setNewRegions(newUnlockedRegions);
      localStorage.removeItem("newUnlockedRegions");
      const latestProgress = getProgress();
      setCurrentProgress(latestProgress);
    }
  }, []);

  useEffect(() => {
    const checkEquippedItem = () => {
      const playerName = localStorage.getItem("playerName");
      if (playerName) {
        const equippedItem = localStorage.getItem(`${playerName}_equippedItem`);
        setEquippedItem(equippedItem);
      }
    };

    checkEquippedItem();
    window.addEventListener("storage", checkEquippedItem);
    const interval = setInterval(checkEquippedItem, 1000);

    return () => {
      window.removeEventListener("storage", checkEquippedItem);
      clearInterval(interval);
    };
  }, []);

  const handleRegionClick = (region) => {
    // Vérifier s'il y a une narration pour cette région
    const dialogues = NARRATIVE.filter(
      (dialog) =>
        dialog.regionId === region.id && !dialog.id.startsWith("intro_")
    );

    if (dialogues.length > 0) {
      setNarrativeDialogues(dialogues);
      setShowNarrative(true);
      setSelectedRegion(region);
    } else {
      setSelectedRegion(region);
    }
  };

  const handleNarrativeComplete = () => {
    setShowNarrative(false);
  };

  const handleQuestComplete = (updatedProgress) => {
    setCurrentProgress({ ...updatedProgress });
    saveProgress(updatedProgress);
    if (onQuestComplete) {
      onQuestComplete(updatedProgress);
    }
  };

  // Afficher la narration si elle est active
  if (showNarrative) {
    return (
      <StoryNarrator
        dialogue={narrativeDialogues}
        onComplete={handleNarrativeComplete}
        currentRegion={selectedRegion?.id}
      />
    );
  }

  // Si une région est sélectionnée, afficher les quêtes de cette région
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
              equippedItem={equippedItem}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
