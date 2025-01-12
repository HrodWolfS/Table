"use client";

import { QUESTS_CONFIG } from "@/app/data/quests";
import { updateProgress } from "@/app/utils/gameLogic/progression";
import { calculateQuestRewards } from "@/app/utils/gameLogic/quests";
import { useState } from "react";
import ExerciseMode from "../Exercise/ExerciseMode";
import QuestReward from "../Rewards/QuestReward";

const QuestMode = ({ region, onBack, onComplete, userProgress }) => {
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [showReward, setShowReward] = useState(false);
  const [questRewards, setQuestRewards] = useState(null);

  const quests = QUESTS_CONFIG[region.id]?.quests || [];

  const handleQuestClick = (quest) => {
    setSelectedQuest({ ...quest, regionId: region.id });
  };

  const handleExerciseComplete = (score, timeSpent) => {
    const rewards = calculateQuestRewards(selectedQuest, score, timeSpent);
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
