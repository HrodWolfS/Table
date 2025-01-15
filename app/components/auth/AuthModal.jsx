"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function AuthModal({ isOpen, onClose, onLogin }) {
  const [playerName, setPlayerName] = useState("");
  const [savedProfiles, setSavedProfiles] = useState([]);

  useEffect(() => {
    // Récupérer les profils sauvegardés
    const profiles = JSON.parse(localStorage.getItem("savedProfiles") || "[]");
    setSavedProfiles(profiles);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      // Sauvegarder le profil s'il n'existe pas déjà
      if (!savedProfiles.includes(playerName.trim())) {
        const newProfiles = [...savedProfiles, playerName.trim()];
        localStorage.setItem("savedProfiles", JSON.stringify(newProfiles));
      }
      localStorage.setItem("playerName", playerName.trim());
      onLogin();
    }
  };

  const selectProfile = (profile) => {
    setPlayerName(profile);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="max-w-lg w-full mx-4 bg-gray-900/95 rounded-lg border border-cyan-400/20 p-8 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>

        <div className="text-center space-y-6">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            Connexion requise
          </h1>

          <div className="relative w-32 h-32 mx-auto my-8">
            <Image
              src="/images/items/adventurers.svg"
              alt="Aventuriers"
              layout="fill"
              objectFit="contain"
              className="transition-opacity duration-300"
            />
          </div>

          <div className="bg-gray-800/50 p-6 rounded-lg border border-cyan-400/20">
            <p className="text-lg text-gray-300 leading-relaxed">
              Connectez-vous pour commencer votre aventure !
            </p>
          </div>

          {savedProfiles.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-gray-400 text-sm">Profils sauvegardés :</h3>
              <div className="flex flex-wrap gap-2 justify-center">
                {savedProfiles.map((profile) => (
                  <button
                    key={profile}
                    onClick={() => selectProfile(profile)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      playerName === profile
                        ? "bg-cyan-400/20 text-cyan-400 border border-cyan-400/40"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                    }`}
                  >
                    {profile}
                  </button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Entrez votre nom d'aventurier"
                className="w-full px-4 py-3 border border-cyan-400/20 rounded-lg bg-gray-800/50 focus:outline-none focus:border-cyan-400 transition-colors text-gray-200 placeholder-gray-500"
                required
                minLength={2}
                maxLength={20}
              />
            </div>
            <button
              type="submit"
              className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg transform transition-all duration-200 hover:scale-105 hover:from-cyan-400 hover:to-blue-500 active:scale-95 shadow-lg"
            >
              Commencer l'aventure
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
