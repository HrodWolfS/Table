"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/Card";
import DynamicIcon from "@/app/components/ui/DynamicIcon";
import { BADGES, getBadges } from "@/app/utils/badges";
import { getGlobalStats } from "@/app/utils/localStorage";
import { BookOpen, Brain, Gamepad2, Star, Trophy, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
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

  const [lastBadge, setLastBadge] = useState(null);

  // Charger les données au montage du composant
  useEffect(() => {
    const globalStats = getGlobalStats();
    setStats(globalStats);

    // Charger le dernier badge
    const badges = getBadges();
    if (badges && badges.length > 0) {
      const lastBadgeId = badges[badges.length - 1];
      const badge = Object.values(BADGES).find((b) => b.id === lastBadgeId);
      setLastBadge(badge);
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-full w-full p-4">
      {/* Boutons principaux */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto w-full mb-8">
        <Link href="/learn">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-green-200">
            <CardHeader className="bg-green-300">
              <CardTitle className="flex items-center justify-center text-green-800">
                <BookOpen className="mr-2" size={24} />
                Apprentissage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700">
                Découvre et pratique les tables à ton rythme
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/test">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-blue-200">
            <CardHeader className="bg-blue-300">
              <CardTitle className="flex items-center justify-center text-blue-800">
                <Brain className="mr-2" size={24} />
                Test
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700">
                Vérifie tes connaissances avec des exercices
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/profile">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-purple-200">
            <CardHeader className="bg-purple-300">
              <CardTitle className="flex items-center justify-center text-purple-800">
                <User className="mr-2" size={24} />
                Mes Résultats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-purple-700">
                Consulte ta progression et tes statistiques
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/game">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-pink-200">
            <CardHeader className="bg-pink-300">
              <CardTitle className="flex items-center justify-center text-pink-800">
                <Gamepad2 className="mr-2" size={24} />
                Jeu
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-pink-700">
                Partez à l'aventure et découvrez les tables de multiplication
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Résumé des progrès */}
      <section className="max-w-4xl mx-auto w-full">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-pink-600">
          Tes progrès
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="bg-yellow-200">
            <CardHeader className="bg-yellow-300">
              <CardTitle className="flex items-center justify-center text-yellow-800">
                <Trophy className="mr-2" size={24} />
                XP Totale
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-24">
              <p className="text-2xl font-bold text-yellow-700">
                {stats.totalXP}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-rose-200">
            <CardHeader className="bg-rose-300">
              <CardTitle className="flex items-center justify-center text-rose-800">
                <Star className="mr-2" size={24} />
                Table préférée
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-24">
              <p className="text-2xl font-bold text-rose-700">
                {stats.mostTestedTable || "Aucune"}
              </p>
            </CardContent>
          </Card>

          <Card className="col-span-2 md:col-span-1 bg-lime-200">
            <CardHeader className="bg-lime-300">
              <CardTitle className="flex items-center justify-center text-lime-800">
                <BookOpen className="mr-2" size={24} />
                Dernier badge
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-24">
              {lastBadge ? (
                <>
                  <DynamicIcon
                    name={lastBadge.icon}
                    size={32}
                    className="text-yellow-500 mr-2"
                  />
                  <p className="font-bold text-lime-700">{lastBadge.name}</p>
                </>
              ) : (
                <p className="text-gray-600">Aucun badge gagné</p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
