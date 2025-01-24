"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const StoryNarrator = ({
  dialogue = [],
  onComplete,
  currentRegion,
  rewards = { item: null, artifact: null },
}) => {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showRewards, setShowRewards] = useState(false);
  const [showingItem, setShowingItem] = useState(true);
  const [isEndingSequence, setIsEndingSequence] = useState(false);

  // Vérifier si c'est une séquence de fin au montage
  useEffect(() => {
    if (dialogue.length > 0) {
      const isEnding = dialogue[0].id.startsWith("ending_");
      setIsEndingSequence(isEnding);
    }
  }, [dialogue]);

  // Effet machine à écrire
  useEffect(() => {
    if (!dialogue[currentDialogueIndex]) return;

    let index = 0;
    const text = dialogue[currentDialogueIndex].text;
    setIsTyping(true);
    setDisplayedText("");

    const typingInterval = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, [currentDialogueIndex, dialogue]);

  // Gestion de la progression
  const handleNext = useCallback(() => {
    if (isTyping) {
      // Skip animation
      setDisplayedText(dialogue[currentDialogueIndex].text);
      setIsTyping(false);
      return;
    }

    // Si on est dans une séquence de fin
    if (isEndingSequence) {
      if (currentDialogueIndex < dialogue.length - 1) {
        setCurrentDialogueIndex((prev) => prev + 1);
      } else {
        onComplete?.();
      }
      return;
    }

    // Si on montre les récompenses
    if (showRewards) {
      if (showingItem && rewards.artifact) {
        // Passer de l'item à l'artéfact
        setShowingItem(false);
        return;
      }
      // Si on a fini de montrer les récompenses
      if (dialogue[currentDialogueIndex].id === "region_10_transition") {
        // Si c'est la dernière région, on ne termine pas encore
        const endingDialogues = dialogue.filter((d) =>
          d.id.startsWith("ending_")
        );
        if (endingDialogues.length > 0) {
          setShowRewards(false);
          setCurrentDialogueIndex(dialogue.indexOf(endingDialogues[0]));
          setIsEndingSequence(true);
          return;
        }
      }
      onComplete?.();
      return;
    }

    // Vérifier si c'est un dialogue de transition
    if (dialogue[currentDialogueIndex].id.includes("transition")) {
      setShowRewards(true);
      setShowingItem(true);
      return;
    }

    if (currentDialogueIndex < dialogue.length - 1) {
      setCurrentDialogueIndex((prev) => prev + 1);
    } else {
      onComplete?.();
    }
  }, [
    currentDialogueIndex,
    dialogue,
    isTyping,
    onComplete,
    showRewards,
    showingItem,
    rewards.artifact,
    isEndingSequence,
  ]);

  // Gestion des erreurs d'image
  const handleImageError = (e) => {
    console.error("Erreur de chargement de l'image du personnage");
    e.target.src = "/images/story/fallback.png";
  };

  if (!dialogue.length) return null;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Dialogue principal */}
      {!showRewards && (
        <div
          onClick={handleNext}
          className="flex flex-col md:flex-row md:items-start gap-6 items-center bg-gradient-to-br from-indigo-900/95 to-purple-900/95 rounded-lg p-6 shadow-xl cursor-pointer transition-all hover:from-indigo-800/95 hover:to-purple-800/95 border border-white/20 mt-12"
        >
          {/* Image du personnage */}
          <div className="relative w-32 h-32 md:w-48 md:h-48 flex-shrink-0">
            <Image
              src={`/images/story/multiplicus.png`}
              alt="multiplicus"
              layout="fill"
              objectFit="contain"
              className="rounded-full"
              onError={handleImageError}
            />
          </div>

          {/* Contenu du dialogue */}
          <div className="flex-grow space-y-4">
            <h3 className="text-2xl font-bold text-blue-300 text-center md:text-left">
              {dialogue[currentDialogueIndex].character}
            </h3>
            <div className="bg-white/10 p-4 rounded-lg border border-blue-300/20">
              <p className="text-lg text-gray-100 leading-relaxed">
                {displayedText}
              </p>
            </div>
            {!isTyping && (
              <div className="text-sm text-blue-300 animate-pulse">
                Cliquez pour continuer...
              </div>
            )}
          </div>
        </div>
      )}

      {/* Affichage des récompenses */}
      {showRewards && (
        <div className="flex justify-center">
          {showingItem && rewards.item ? (
            <div className="bg-gradient-to-br from-indigo-900/95 to-purple-900/95 rounded-lg p-6 text-white shadow-xl transform transition-all hover:scale-105 w-full max-w-lg border border-indigo-500/30">
              <h3 className="text-2xl font-bold mb-4 text-center text-blue-300">
                Objet obtenu !
              </h3>
              <div className="bg-white/10 rounded-lg p-6 border border-blue-300/20">
                <div className="flex justify-center mb-4">
                  {rewards.item.image && (
                    <img
                      src={rewards.item.image}
                      alt={rewards.item.name}
                      className="w-32 h-32 object-contain"
                    />
                  )}
                </div>
                <h4 className="text-xl font-semibold mb-3 text-center text-blue-200">
                  {rewards.item.name}
                </h4>
                <p className="text-base mb-3 text-center text-gray-200">
                  {rewards.item.description}
                </p>
                {rewards.item.effect && (
                  <p className="text-sm text-yellow-300 text-center">
                    {rewards.item.effect}
                  </p>
                )}
              </div>
            </div>
          ) : (
            !showingItem &&
            rewards.artifact && (
              <div className="bg-gradient-to-br from-indigo-900/95 to-purple-900/95 rounded-lg p-6 text-white shadow-xl transform transition-all hover:scale-105 w-full max-w-lg border border-indigo-500/30">
                <h3 className="text-2xl font-bold mb-4 text-center text-blue-300">
                  Artéfact obtenu !
                </h3>
                <div className="bg-white/10 rounded-lg p-6 border border-blue-300/20">
                  <div className="flex justify-center mb-4">
                    {rewards.artifact.image && (
                      <img
                        src={rewards.artifact.image}
                        alt={rewards.artifact.name}
                        className="w-32 h-32 object-contain animate-pulse"
                      />
                    )}
                  </div>
                  <h4 className="text-xl font-semibold mb-3 text-center text-blue-200">
                    {rewards.artifact.name}
                  </h4>
                  <p className="text-base text-center text-gray-200">
                    {rewards.artifact.description}
                  </p>
                </div>
              </div>
            )
          )}
        </div>
      )}

      {/* Bouton de progression */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleNext}
          disabled={isTyping}
          className={`px-8 py-3 rounded-full font-semibold transition-all ${
            isTyping
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white transform hover:scale-105"
          }`}
          aria-label="Passer au dialogue suivant"
        >
          {isTyping ? "..." : showRewards ? "Continuer" : "Suivant"}
        </button>
      </div>
    </div>
  );
};

export default StoryNarrator;
