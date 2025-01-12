"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const [playerName, setPlayerName] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (playerName.trim()) {
      localStorage.setItem("playerName", playerName.trim());
      router.push("/game");
    }
  };

  return (
    <div className=" w-full flex items-center justify-center bg-gradient-to-b from-amber-100 to-amber-200 p-4">
      <div className="max-w-lg w-full bg-white/90 rounded-lg border-2 border-amber-800/30 p-8 shadow-xl">
        <div className="text-center space-y-6">
          {/* Titre avec décoration */}
          <h1 className="text-3xl font-bold text-amber-800 relative">
            <span className="absolute left-0 right-0 top-1/2 border-b-2 border-amber-800/30 -z-10"></span>
            <span className="bg-white/90 px-4">◆ Bienvenue Aventurier ◆</span>
          </h1>

          {/* Logo ou image décorative */}
          <div className="relative w-48 h-48 mx-auto my-8">
            <Image
              src="/images/items/adventurers.svg"
              alt="Aventuriers"
              layout="fill"
              objectFit="contain"
              className="transition-opacity duration-300"
            />
          </div>

          {/* Message d'accueil */}
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-800/20 shadow-inner">
            <p className="text-lg text-amber-900 leading-relaxed">
              Préparez-vous à embarquer dans une aventure extraordinaire à
              travers les terres des multiplications perdues !
            </p>
          </div>

          {/* Formulaire de saisie du nom */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Entrez votre nom d'aventurier"
                className="w-full px-4 py-3 border-2 border-amber-800/30 rounded-lg bg-white/50 focus:outline-none focus:border-amber-800 transition-colors"
                required
                minLength={2}
                maxLength={20}
              />
            </div>
            <button
              type="submit"
              className="w-full mt-8 px-8 py-4 bg-amber-800 text-white rounded-lg transform transition-all duration-200 hover:scale-105 hover:bg-amber-700 active:scale-95 shadow-lg flex items-center justify-center"
            >
              Commencer l'aventure
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
