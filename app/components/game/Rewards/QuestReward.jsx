"use client";

import { ARTIFACT_PIECES } from "@/app/data/inventory";
import { QUESTS_CONFIG } from "@/app/data/quests";
import { getProgress, saveProgress } from "@/app/utils/localStorage";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

const QuestReward = ({ quest, rewards, onClose, userProgress }) => {
  const [showArtifact, setShowArtifact] = useState(false);
  const [showNextRegion, setShowNextRegion] = useState(false);
  const router = useRouter();

  // Fonction pour obtenir la table correspondant à la région
  const getRegionTable = (regionId) => {
    switch (regionId) {
      case "vallee_debuts":
        return [1];
      case "foret_multiplications":
        return [2];
      case "collines_multiplicateur":
        return [3];
      case "marais_quatrak":
        return [4];
      case "desert_infini":
        return [5];
      case "riviere_cristalline":
        return [6];
      case "cite_septoria":
        return [7];
      case "grottes_huitra":
        return [8];
      case "pics_neuflame":
        return [9];
      case "chateau_dividix":
        return [10];
      default:
        return null;
    }
  };

  const isRegionComplete = () => {
    const regionConfig = QUESTS_CONFIG[quest.regionId];
    if (!regionConfig) return false;

    const completedQuests =
      userProgress?.regions?.[quest.regionId]?.completedQuests || [];

    // Vérifier que toutes les quêtes de la région sont complétées
    const allQuestsCompleted = regionConfig.quests.every((quest) =>
      completedQuests.includes(quest.id)
    );

    return allQuestsCompleted;
  };

  const unlockNewRegion = () => {
    if (rewards.newRegions?.length > 0) {
      const progress = getProgress();
      const newRegionId = rewards.newRegions[0].id;

      // Vérifier si la région n'est pas déjà débloquée
      if (!progress.unlockedRegions) {
        progress.unlockedRegions = [];
      }

      // Si la région est déjà débloquée, ne rien faire
      if (progress.unlockedRegions.includes(newRegionId)) {
        console.log("La région est déjà débloquée:", newRegionId);
        return;
      }

      // Ajouter la nouvelle région aux régions débloquées
      progress.unlockedRegions.push(newRegionId);
      console.log("Ajout de la nouvelle région:", newRegionId);

      // Initialiser la progression pour la nouvelle région
      if (!progress.regions) {
        progress.regions = {};
      }

      if (!progress.regions[newRegionId]) {
        progress.regions[newRegionId] = {
          completedQuests: [],
          highScores: {},
          bestTimes: {},
        };
      }

      // Sauvegarder les changements
      saveProgress(progress);

      // Stocker l'ID de la nouvelle région pour l'animation
      localStorage.setItem("newUnlockedRegions", JSON.stringify([newRegionId]));
    }
  };

  const handleContinue = () => {
    const regionComplete = isRegionComplete();
    console.log("Rewards:", rewards);

    if (showArtifact) {
      if (rewards.newRegions?.length > 0) {
        setShowArtifact(false);
        setShowNextRegion(true);
        unlockNewRegion();
      } else {
        router.push("/game");
        onClose();
      }
    } else if (showNextRegion) {
      router.push("/game");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      if (regionComplete && rewards.isFirstCompletion) {
        setShowArtifact(true);
      } else if (rewards.newRegions?.length > 0) {
        setShowNextRegion(true);
        unlockNewRegion();
      } else {
        onClose();
      }
    }
  };

  // Sélectionner l'artefact en fonction de la région
  const regionTable = getRegionTable(quest.regionId);
  const artifact = regionTable
    ? ARTIFACT_PIECES[`TABLE_${regionTable[0]}`]
    : null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 p-8 rounded-lg shadow-xl max-w-md w-full mx-4 text-white relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-blue-300 hover:text-blue-400 transition-colors"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        {showArtifact ? (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Région Complétée !</h2>
            <div className="relative mb-6">
              <motion.img
                src={artifact?.image}
                alt={artifact?.name}
                className="w-32 h-32 mx-auto"
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 bg-blue-500 opacity-20 animate-pulse rounded-full"></div>
            </div>
            <h3 className="text-xl font-semibold mb-2">{artifact?.name}</h3>
            <p className="text-gray-300 mb-6">{artifact?.description}</p>

            {rewards.item && (
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Item Obtenu !</h3>
                <div className="relative mb-4">
                  <motion.img
                    src={rewards.item.image}
                    alt={rewards.item.name}
                    className="w-24 h-24 mx-auto"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                  />
                </div>
                <h4 className="text-lg font-medium mb-1">
                  {rewards.item.name}
                </h4>
                <p className="text-sm text-gray-300 mb-2">
                  {rewards.item.description}
                </p>
                <p className="text-sm font-medium text-blue-300">
                  {rewards.item.effect}
                </p>
              </div>
            )}

            <button
              onClick={handleContinue}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-semibold transition-colors"
            >
              {rewards.newRegions.length > 0
                ? "Découvrir la suite"
                : "Continuer"}
            </button>
          </motion.div>
        ) : showNextRegion ? (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold mb-4">
              Nouvelle Région Débloquée !
            </h2>
            <div className="relative mb-6">
              <img
                src={rewards.newRegions[0].image}
                alt={rewards.newRegions[0].name}
                className="w-48 h-48 mx-auto rounded-lg"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {rewards.newRegions[0].name}
            </h3>
            <p className="text-gray-300 mb-6">
              {rewards.newRegions[0].description}
            </p>
            <button
              onClick={handleContinue}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-semibold transition-colors"
            >
              Commencer l'aventure
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold mb-4">
              {rewards.isFirstCompletion ? "Félicitations !" : "Bien joué !"}
            </h2>
            <div className="space-y-4 mb-6">
              <div>
                <p className="text-xl font-semibold">Score</p>
                <p className="text-3xl font-bold text-yellow-400">
                  {rewards.score}
                </p>
              </div>
              <div className="flex justify-center ">
                <div className="flex flex-col items-center justify-center">
                  <span className="text-yellow-400 text-2xl font-bold">
                    {rewards.correctAnswers}
                  </span>
                  <span className="text-gray-300 text-xs">réponses</span>
                </div>
                <p className="text-gray-300 items-start justify-start text-2xl font-bold ">
                  {" / "}
                </p>
                <div className="flex flex-col items-center justify-center">
                  <span className="text-blue-300 text-2xl font-bold">
                    {quest.objectives.questionsCount}
                  </span>{" "}
                  <span className="text-gray-300 text-xs">questions</span>
                </div>
              </div>
              {rewards.isFirstCompletion && (
                <>
                  <div>
                    <p className="text-lg">
                      <span className="text-yellow-400">+{rewards.xp}</span> XP
                    </p>
                  </div>
                  <div>
                    <p className="text-lg">
                      <span className="text-yellow-400">+{rewards.coins}</span>{" "}
                      pièces
                    </p>
                  </div>
                </>
              )}
            </div>
            <button
              onClick={handleContinue}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-semibold transition-colors"
            >
              Continuer
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuestReward;
