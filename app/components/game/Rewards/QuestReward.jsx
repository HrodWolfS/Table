"use client";

import { ARTIFACT_PIECES } from "@/app/data/inventory";
import { QUESTS_CONFIG } from "@/app/data/quests";
import { NARRATIVE } from "@/app/data/story";
import { getProgress, saveProgress } from "@/app/utils/localStorage";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";
import StoryNarrator from "../../game/Quests/StoryNarrator";

const QuestReward = ({ quest, rewards, onClose, userProgress }) => {
  const [showArtifact, setShowArtifact] = useState(false);
  const [showNextRegion, setShowNextRegion] = useState(false);
  const [showNarrator, setShowNarrator] = useState(false);
  const [narrativeDialogues, setNarrativeDialogues] = useState([]);
  const [showConfetti, setShowConfetti] = useState(true);
  const [sequence, setSequence] = useState("initial"); // 'initial', 'score', 'narrative', 'item', 'artifact', 'newRegion'
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  useEffect(() => {
    const checkFirstVisit = () => {
      const progress = getProgress();
      const playerName = localStorage.getItem("playerName");
      if (!playerName) return;

      const visitedRegionsKey = `${playerName}_visitedRegions`;
      const visitedRegions = JSON.parse(
        localStorage.getItem(visitedRegionsKey) || "[]"
      );

      if (!visitedRegions.includes(quest.regionId)) {
        let regionNumber;
        if (quest.regionId === "vallee_debuts") regionNumber = "1";
        else if (quest.regionId === "foret_multiplications") regionNumber = "2";
        else if (quest.regionId === "collines_multiplicateur")
          regionNumber = "3";
        else if (quest.regionId === "marais_quatrak") regionNumber = "4";
        else if (quest.regionId === "desert_infini") regionNumber = "5";
        else if (quest.regionId === "riviere_cristalline") regionNumber = "6";
        else if (quest.regionId === "cite_septoria") regionNumber = "7";
        else if (quest.regionId === "grottes_huitra") regionNumber = "8";
        else if (quest.regionId === "pics_neuflame") regionNumber = "9";
        else if (quest.regionId === "chateau_dividix") regionNumber = "10";

        if (regionNumber) {
          const introDialogues = NARRATIVE.filter(
            (d) =>
              d.id === `region_${regionNumber}_intro` ||
              d.id === `region_${regionNumber}_hint`
          );

          if (introDialogues.length > 0) {
            setNarrativeDialogues(introDialogues);
            setShowNarrator(true);

            visitedRegions.push(quest.regionId);
            localStorage.setItem(
              visitedRegionsKey,
              JSON.stringify(visitedRegions)
            );
          }
        }
      }
    };

    // Ne vérifier que si la région est complète
    if (isRegionComplete()) {
      checkFirstVisit();
    }
  }, []); // Exécuter une seule fois au montage

  useEffect(() => {
    console.log("Séquence actuelle:", sequence);

    if (sequence === "initial") {
      setShowConfetti(true);
      // Après 2 secondes, passer à la narration
      const timer = setTimeout(() => {
        if (isRegionComplete() && rewards.isFirstCompletion) {
          const regionNumber = getRegionNumber(quest.regionId);
          if (regionNumber) {
            const transitionDialogue = NARRATIVE.filter(
              (d) => d.id === `region_${regionNumber}_transition`
            );
            if (transitionDialogue.length > 0) {
              setNarrativeDialogues(transitionDialogue);
              setShowNarrator(true);
              setSequence("narrative");
            }
          }
        } else {
          setSequence("score");
        }
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [sequence, quest.regionId, rewards.isFirstCompletion]);

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

  const getRegionNumber = (regionId) => {
    if (regionId === "vallee_debuts") return "1";
    if (regionId === "foret_multiplications") return "2";
    if (regionId === "collines_multiplicateur") return "3";
    if (regionId === "marais_quatrak") return "4";
    if (regionId === "desert_infini") return "5";
    if (regionId === "riviere_cristalline") return "6";
    if (regionId === "cite_septoria") return "7";
    if (regionId === "grottes_huitra") return "8";
    if (regionId === "pics_neuflame") return "9";
    if (regionId === "chateau_dividix") return "10";
    return regionId.match(/\d+/)?.[0];
  };

  const isRegionComplete = () => {
    const regionConfig = QUESTS_CONFIG[quest.regionId];
    if (!regionConfig) return false;

    const completedQuests =
      userProgress?.regions?.[quest.regionId]?.completedQuests || [];
    return regionConfig.quests.every((quest) =>
      completedQuests.includes(quest.id)
    );
  };

  const getEndingDialogues = () => {
    const dialogues = NARRATIVE.filter((d) => d.id === "ending");

    return dialogues.map((dialogue) => ({
      ...dialogue,
      character: dialogue.character || "Narrateur",
    }));
  };

  const getNextEndingDialogues = (currentDialogueId) => {
    const currentNumber =
      currentDialogueId === "ending"
        ? 1
        : currentDialogueId === "ending_2"
        ? 2
        : 3;
    const nextNumber = currentNumber + 1;

    const nextDialogueId = nextNumber === 2 ? "ending_2" : "ending_3";
    const dialogues = NARRATIVE.filter((d) => d.id === nextDialogueId);

    return dialogues.map((dialogue) => ({
      ...dialogue,
      character: dialogue.character || "Narrateur",
    }));
  };

  const unlockNewRegion = () => {
    if (rewards.newRegions?.length > 0) {
      const progress = getProgress();
      const newRegionId = rewards.newRegions[0].id;

      if (!progress.unlockedRegions) {
        progress.unlockedRegions = [];
      }

      if (!progress.unlockedRegions.includes(newRegionId)) {
        progress.unlockedRegions.push(newRegionId);

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

        saveProgress(progress);
        localStorage.setItem(
          "newUnlockedRegions",
          JSON.stringify([newRegionId])
        );

        setShowNextRegion(true);
      }
    }
  };

  const handleContinue = () => {
    // Si on montre le narrateur
    if (showNarrator) {
      setShowNarrator(false);
      // Passer à l'item si disponible
      if (rewards.item) {
        // Ajouter l'item à l'inventaire
        const progress = getProgress();
        if (!progress.inventory) {
          progress.inventory = {
            items: ["carte"],
            equippedItem: null,
            artifacts: [],
          };
        }
        if (!progress.inventory.items.includes(rewards.item.id)) {
          progress.inventory.items.push(rewards.item.id);
          saveProgress(progress);
        }
        setShowArtifact(true);
      } else if (rewards.newRegions?.length > 0) {
        unlockNewRegion();
      } else {
        onClose();
      }
      return;
    }

    // Si on montre l'artefact
    if (showArtifact) {
      setShowArtifact(false);

      // Ajouter l'artefact de table si disponible
      const regionTable = getRegionTable(quest.regionId);
      if (regionTable) {
        const progress = getProgress();
        if (!progress.inventory) {
          progress.inventory = {
            items: ["carte"],
            equippedItem: null,
            artifacts: [],
          };
        }
        if (!Array.isArray(progress.inventory.artifacts)) {
          progress.inventory.artifacts = [];
        }

        const artifactId = `TABLE_${regionTable[0]}`;
        if (!progress.inventory.artifacts.includes(artifactId)) {
          progress.inventory.artifacts.push(artifactId);
          saveProgress(progress);
        }
      }

      if (rewards.newRegions?.length > 0) {
        unlockNewRegion();
      } else {
        onClose();
      }
      return;
    }

    // Si on montre la nouvelle région
    if (showNextRegion) {
      onClose();
      window.location.href = "/game";
      return;
    }

    // Si on arrive ici et que la région est complète, montrer la narration de transition
    if (isRegionComplete() && rewards.isFirstCompletion) {
      const regionNumber = getRegionNumber(quest.regionId);
      if (regionNumber) {
        const transitionDialogue = NARRATIVE.filter(
          (d) => d.id === `region_${regionNumber}_transition`
        );
        if (transitionDialogue.length > 0) {
          setNarrativeDialogues(transitionDialogue);
          setShowNarrator(true);
          return;
        }
      }
    }

    // Si aucun état n'est actif, fermer sans redirection
    onClose();
  };

  const regionTable = getRegionTable(quest.regionId);
  const artifact = regionTable
    ? ARTIFACT_PIECES[`TABLE_${regionTable[0]}`]
    : null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
          colors={["#60A5FA", "#34D399", "#F59E0B", "#EC4899"]}
        />
      )}
      <div className=" max-w-4xl w-full mx-4 text-white relative">
        {/* <button
          onClick={onClose}
          className="absolute top-14 right-2 text-blue-300 hover:text-blue-400 transition-colors"
        >
          <XMarkIcon className="h-6 w-6" />
        </button> */}

        {showNarrator && narrativeDialogues.length > 0 ? (
          <StoryNarrator
            dialogue={narrativeDialogues.map((d) => ({
              ...d,
              character: d.character || "Narrateur",
              text: d.text || "...",
              id: d.id || `dialogue_${Math.random()}`,
            }))}
            onComplete={handleContinue}
            currentRegion={quest.regionId}
            rewards={{
              item: rewards.item,
              artifact: artifact,
            }}
          />
        ) : showNextRegion ? (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-center border border-blue-400/30 p-8 rounded-lg shadow-xl"
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
              onClick={() => {
                onClose();
                // Forcer un rafraîchissement de la page
                window.location.href = "/game";
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-semibold transition-colors"
            >
              Commencer l'aventure
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center border border-yellow-400/30 p-8 rounded-lg shadow-xl"
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
              <div className="flex justify-center">
                <div className="flex flex-col items-center justify-center">
                  <span className="text-yellow-400 text-2xl font-bold">
                    {rewards.correctAnswers}
                  </span>
                  <span className="text-gray-300 text-xs">réponses</span>
                </div>
                <p className="text-gray-300 items-start justify-start text-2xl font-bold">
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
