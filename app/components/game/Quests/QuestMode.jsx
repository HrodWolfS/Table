"use client";

import { QUESTS_CONFIG } from "@/app/data/quests";
import { NARRATIVE } from "@/app/data/story";
import { updateProgress } from "@/app/utils/gameLogic/progression";
import { calculateQuestRewards } from "@/app/utils/gameLogic/quests";
import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import ExerciseMode from "../Exercise/ExerciseMode";
import QuestReward from "../Rewards/QuestReward";
import StoryNarrator from "./StoryNarrator";

const QuestMode = ({ region, onBack, onComplete, userProgress }) => {
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [showReward, setShowReward] = useState(false);
  const [questRewards, setQuestRewards] = useState(null);
  const [showNarrator, setShowNarrator] = useState(false);
  const [narrativeDialogues, setNarrativeDialogues] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    const checkFirstVisit = () => {
      const playerName = localStorage.getItem("playerName");
      if (!playerName) return;

      // Utiliser une clé spécifique à l'utilisateur pour les régions visitées
      const visitedRegionsKey = `${playerName}_visitedRegions`;
      const visitedRegions = JSON.parse(
        localStorage.getItem(visitedRegionsKey) || "[]"
      );

      if (!visitedRegions.includes(region.id)) {
        // Extraire le numéro de la région
        let regionNumber;
        if (region.id === "vallee_debuts") regionNumber = "1";
        else if (region.id === "foret_multiplications") regionNumber = "2";
        else if (region.id === "collines_multiplicateur") regionNumber = "3";
        else if (region.id === "marais_quatrak") regionNumber = "4";
        else if (region.id === "desert_infini") regionNumber = "5";
        else if (region.id === "riviere_cristalline") regionNumber = "6";
        else if (region.id === "cite_septoria") regionNumber = "7";
        else if (region.id === "grottes_huitra") regionNumber = "8";
        else if (region.id === "pics_neuflame") regionNumber = "9";
        else if (region.id === "chateau_dividix") regionNumber = "10";

        if (regionNumber) {
          // Charger les dialogues d'introduction
          const introDialogues = NARRATIVE.filter(
            (d) =>
              d.id === `region_${regionNumber}_intro` ||
              d.id === `region_${regionNumber}_hint`
          );

          if (introDialogues.length > 0) {
            setNarrativeDialogues(introDialogues);
            setShowNarrator(true);

            // Marquer la région comme visitée pour cet utilisateur
            visitedRegions.push(region.id);
            localStorage.setItem(
              visitedRegionsKey,
              JSON.stringify(visitedRegions)
            );
          }
        }
      }
    };

    checkFirstVisit();
  }, [region.id]);

  const handleNarratorComplete = () => {
    // Vérifier si c'était la dernière narration de la région 10
    const isLastRegion10Narrative = narrativeDialogues.some(
      (d) => d.id === "region_10_transition"
    );

    if (isLastRegion10Narrative) {
      // Calculer le score total
      const totalScore = Object.values(userProgress.regions).reduce(
        (total, region) => {
          const regionScore = region.completedQuests.reduce(
            (questTotal, questId) => {
              const quest = QUESTS_CONFIG[region.id]?.quests.find(
                (q) => q.id === questId
              );
              return questTotal + (quest?.rewards?.xp || 0);
            },
            0
          );
          return total + regionScore;
        },
        0
      );

      // Déterminer quelle fin montrer en fonction du score
      let endingDialogues;
      if (totalScore >= 9000) {
        endingDialogues = NARRATIVE.filter((d) => d.id === "ending_perfect");
      } else if (totalScore >= 7000) {
        endingDialogues = NARRATIVE.filter((d) => d.id === "ending_good");
      } else {
        endingDialogues = NARRATIVE.filter((d) => d.id === "ending_normal");
      }

      setNarrativeDialogues(endingDialogues);
      setShowConfetti(true);
      return;
    }

    setShowNarrator(false);
    setShowConfetti(false);
  };

  const quests = QUESTS_CONFIG[region.id]?.quests || [];

  const handleQuestClick = (quest) => {
    setSelectedQuest({ ...quest, regionId: region.id });
  };

  const handleExerciseComplete = (score, timeSpent, correctAnswers) => {
    const rewards = calculateQuestRewards(
      selectedQuest,
      score,
      timeSpent,
      correctAnswers
    );

    console.log("Récompenses de la quête:", rewards);
    setQuestRewards(rewards);

    const updatedProgress = updateProgress(selectedQuest, rewards);

    setShowReward(true);

    if (onComplete) {
      onComplete(updatedProgress);
    }
  };

  const handleRewardClose = () => {
    setShowReward(false);
    setSelectedQuest(null);
  };

  if (showNarrator) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 p-4">
        {showConfetti && (
          <ReactConfetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={true}
            numberOfPieces={200}
            gravity={0.3}
          />
        )}
        <div className="max-w-7xl mx-auto">
          <StoryNarrator
            dialogue={narrativeDialogues}
            onComplete={handleNarratorComplete}
            currentRegion={region.id}
            rewards={{}}
          />
        </div>
      </div>
    );
  }

  if (showReward) {
    return (
      <QuestReward
        quest={selectedQuest}
        rewards={questRewards}
        onClose={handleRewardClose}
        userProgress={userProgress}
      />
    );
  }

  if (selectedQuest) {
    return (
      <ExerciseMode
        quest={selectedQuest}
        onComplete={handleExerciseComplete}
        onBack={() => setSelectedQuest(null)}
      />
    );
  }

  const isQuestCompleted = (quest) => {
    return userProgress?.regions?.[region.id]?.completedQuests?.includes(
      quest.id
    );
  };

  const isQuestUnlocked = (quest) => {
    const previousQuests = quests.slice(0, quests.indexOf(quest));
    return previousQuests.every((prevQuest) => isQuestCompleted(prevQuest));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-4 py-2 rounded-full font-semibold transition-colors"
          >
            Retour à la carte
          </button>
          <h1 className="text-3xl font-bold text-white">{region.name}</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {quests.map((quest) => {
            const completed = isQuestCompleted(quest);
            const unlocked = isQuestUnlocked(quest);

            return (
              <div
                key={quest.id}
                onClick={() => unlocked && handleQuestClick(quest)}
                className={`
                  relative bg-white/10 p-6 rounded-lg transition-all duration-300
                  ${
                    completed
                      ? "bg-green-100/20 hover:bg-green-100/30 border-2 border-green-500/50"
                      : unlocked
                      ? "hover:bg-white/20 cursor-pointer"
                      : "opacity-75 cursor-not-allowed"
                  }
                `}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white">
                    {quest.title}
                  </h3>
                </div>

                <p className="text-gray-300 mb-4">{quest.description}</p>

                <div className="flex justify-between text-sm">
                  <span className="text-blue-300">+{quest.rewards.xp} XP</span>
                  <span className="text-yellow-300">
                    +{quest.rewards.coins} pièces
                  </span>
                </div>

                <div className="mt-4 text-sm font-bold">
                  {completed ? (
                    <span className="text-green-400">Mission complétée !</span>
                  ) : unlocked ? (
                    <span className="text-blue-400">Disponible</span>
                  ) : (
                    <span className="text-red-400">Verrouillée</span>
                  )}
                </div>

                {completed && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    Complétée
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuestMode;
