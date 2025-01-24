import { NARRATIVE } from "@/app/data/story";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Inventory from "../Inventory/Inventory";
import WorldMap from "../Map/WorldMap";
import StoryNarrator from "../Quests/StoryNarrator";
import Statistics from "../Statistics/Statistics";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const GamePage = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [introDialogues, setIntroDialogues] = useState([]);
  const [activeTab, setActiveTab] = useState("map");
  const [userProgress, setUserProgress] = useState({});
  const [stats, setStats] = useState({});
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!NARRATIVE || !Array.isArray(NARRATIVE)) {
      console.error("NARRATIVE n'est pas correctement importé:", NARRATIVE);
      return;
    }

    const playerName = localStorage.getItem("playerName");

    if (!playerName) {
      console.log("Redirection vers la page d'accueil - Pas de nom de joueur");
      router.push("/");
      return;
    }

    // Charger les données du localStorage
    const progress = JSON.parse(localStorage.getItem("userProgress") || "{}");
    setUserProgress(progress);
    setStats({
      totalScore: progress.totalScore || 0,
      totalXP: progress.totalXP || 0,
      totalCoins: progress.totalCoins || 0,
      timeSpent: progress.timeSpent || 0,
    });

    const shouldShowIntro = searchParams.get("showIntro") === "true";
    if (shouldShowIntro) {
      console.log("Chargement des dialogues d'introduction...");
      const introDialogues = NARRATIVE.filter((d) =>
        ["game_intro", "game_intro_2", "game_intro_3"].includes(d.id)
      );

      if (introDialogues.length > 0) {
        setIntroDialogues(introDialogues);
        setShowIntro(true);
      }
    }
  }, [router, searchParams]);

  // Mettre à jour le temps uniquement quand on affiche les stats
  useEffect(() => {
    let timer;
    if (activeTab === "stats") {
      timer = setInterval(() => {
        const progress = JSON.parse(
          localStorage.getItem("userProgress") || "{}"
        );
        setStats((prevStats) => ({
          ...prevStats,
          timeSpent: progress.timeSpent || 0,
        }));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [activeTab]);

  const handleIntroComplete = () => {
    console.log("Introduction terminée");
    setShowIntro(false);
    // Plus de redirection, le setShowIntro(false) est suffisant
  };

  const handleQuestComplete = (questData) => {
    // Logique de completion de quête
    console.log("Quest completed:", questData);

    // Mettre à jour le userProgress avec le temps de l'exercice
    const updatedQuestData = {
      ...questData,
      timeSpent: questData.timeSpent || 0,
    };
    setUserProgress(updatedQuestData);
    localStorage.setItem("userProgress", JSON.stringify(updatedQuestData));

    // Mise à jour des stats
    const updatedStats = {
      totalScore: updatedQuestData.totalScore || 0,
      totalXP: updatedQuestData.totalXP || 0,
      totalCoins: updatedQuestData.totalCoins || 0,
      timeSpent: updatedQuestData.timeSpent || 0,
    };
    setStats(updatedStats);
  };

  const handleEquipItem = (itemId) => {
    // Logique d'équipement
    console.log("Item equipped:", itemId);
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
        return <Statistics stats={stats} userProgress={userProgress} />;
      case "inventory":
        return (
          <Inventory
            userProgress={userProgress}
            onEquipItem={handleEquipItem}
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
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-br from-indigo-900 to-purple-900">
      {showIntro && introDialogues.length > 0 ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 p-4 sm:p-8 rounded-lg shadow-xl max-w-4xl w-full border border-white/20">
            <StoryNarrator
              dialogue={introDialogues}
              onComplete={handleIntroComplete}
              currentRegion="intro"
            />
          </div>
        </div>
      ) : (
        <>
          <MobileNav activeTab={activeTab} onTabChange={setActiveTab} />
          <DesktopNav activeTab={activeTab} onTabChange={setActiveTab} />
          <div className="relative w-full h-full pt-16 pb-16 sm:pt-20 sm:pb-0">
            {renderContent()}
          </div>
        </>
      )}
    </div>
  );
};

export default GamePage;
