"use client";

import { BookOpen, Coins, Star, Trophy } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import AvatarDisplay from "../../avatar/AvatarDisplay";

export default function ProfilePage() {
  const [stats, setStats] = useState({
    totalXP: 0,
    totalCoins: 0,
    averageScore: 0,
    completedQuests: 0,
    totalQuests: 0,
    completionRate: 0,
    totalScore: 0,
    bestScore: 0,
    totalTests: 0,
    mostTestedTable: null,
  });

  useEffect(() => {
    // Charger les statistiques depuis le localStorage
    const savedStats = JSON.parse(localStorage.getItem("stats") || "{}");
    setStats(savedStats);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* En-tête du profil */}
        <div className="flex flex-col items-center mb-12">
          <AvatarDisplay
            size={160}
            className="mb-6 border-4 border-cyan-400/20"
          />
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
            Mon Profil
          </h1>
          <Link
            href="/profile"
            className="mt-4 px-6 py-2 bg-cyan-400/20 text-cyan-400 rounded-lg hover:bg-cyan-400/30 transition-colors"
          >
            Personnaliser mon avatar
          </Link>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-400/20">
            <div className="flex items-center gap-3 mb-4">
              <Trophy className="h-6 w-6 text-yellow-400" />
              <h3 className="text-lg font-medium text-gray-200">XP Totale</h3>
            </div>
            <p className="text-3xl font-bold text-yellow-400">
              {stats.totalXP || 0}
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-400/20">
            <div className="flex items-center gap-3 mb-4">
              <Coins className="h-6 w-6 text-yellow-400" />
              <h3 className="text-lg font-medium text-gray-200">Pièces</h3>
            </div>
            <p className="text-3xl font-bold text-yellow-400">
              {stats.totalCoins || 0}
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-400/20">
            <div className="flex items-center gap-3 mb-4">
              <Star className="h-6 w-6 text-yellow-400" />
              <h3 className="text-lg font-medium text-gray-200">
                Meilleur Score
              </h3>
            </div>
            <p className="text-3xl font-bold text-yellow-400">
              {stats.bestScore || 0}
            </p>
          </div>

          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-400/20">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="h-6 w-6 text-yellow-400" />
              <h3 className="text-lg font-medium text-gray-200">
                Table Préférée
              </h3>
            </div>
            <p className="text-3xl font-bold text-yellow-400">
              {stats.mostTestedTable || "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
