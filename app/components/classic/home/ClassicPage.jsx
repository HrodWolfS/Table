"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/Card";
import DynamicIcon from "@/app/components/ui/DynamicIcon";
import NoiseFilter from "@/app/components/ui/NoiseFilter";
import { BADGES, getBadges } from "@/app/utils/badges";
import { getGlobalStats } from "@/app/utils/localStorage";
import { BookOpen, Brain, Star, Trophy, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Footer } from "./Footer";
import Header from "./Header";

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

  useEffect(() => {
    try {
      const globalStats = getGlobalStats() || {
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
      };
      setStats(globalStats);

      const badges = getBadges() || [];

      if (badges?.length > 0) {
        const lastBadgeId = badges[badges.length - 1];

        const badge = Object.values(BADGES).find((b) => b.id === lastBadgeId);

        setLastBadge(badge);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);

      // Initialiser avec des valeurs par défaut en cas d'erreur

      setStats({
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
    }
  }, []);
  return (
    <div className="flex flex-col min-h-screen h-full w-full bg-gradient-to-r from-pink-300 via-purple-300 to-blue-300">
      <NoiseFilter />
      <Header />
      <main className="flex-1 px-4 py-6 md:py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main navigation cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link href="/classic/learn" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer bg-green-200">
                <CardHeader className="bg-green-300">
                  <CardTitle className="flex items-center justify-center text-green-800 text-lg md:text-xl">
                    <BookOpen className="mr-2" size={20} />
                    Apprentissage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-700 text-sm md:text-base">
                    Découvre et pratique les tables à ton rythme
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/classic/test" className="block">
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer bg-blue-200">
                <CardHeader className="bg-blue-300">
                  <CardTitle className="flex items-center justify-center text-blue-800 text-lg md:text-xl">
                    <Brain className="mr-2" size={20} />
                    Test
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-blue-700 text-sm md:text-base">
                    Vérifie tes connaissances avec des exercices
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link
              href="/classic/statistics"
              className="block sm:col-span-2 lg:col-span-1"
            >
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer bg-purple-200">
                <CardHeader className="bg-purple-300">
                  <CardTitle className="flex items-center justify-center text-purple-800 text-lg md:text-xl">
                    <User className="mr-2" size={20} />
                    Mes Résultats
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-purple-700 text-sm md:text-base">
                    Consulte ta progression et tes statistiques
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Progress section */}

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-pink-600 px-2">
              Tes progrès
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="bg-yellow-200">
                <CardHeader className="bg-yellow-300">
                  <CardTitle className="flex items-center justify-center text-yellow-800 text-base md:text-lg">
                    <Trophy className="mr-2" size={18} />
                    XP Totale
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex items-center justify-center h-16 md:h-20">
                  <p className="text-xl md:text-2xl font-bold text-yellow-700">
                    {stats.totalXP}
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-rose-200">
                <CardHeader className="bg-rose-300">
                  <CardTitle className="flex items-center justify-center text-rose-800 text-base md:text-lg">
                    <Star className="mr-2" size={18} />
                    Table préférée
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex items-center justify-center h-16 md:h-20">
                  <p className="text-xl md:text-2xl font-bold text-rose-700">
                    {stats.mostTestedTable || "Aucune"}
                  </p>
                </CardContent>
              </Card>

              <Card className="sm:col-span-2 lg:col-span-1 bg-lime-200">
                <CardHeader className="bg-lime-300">
                  <CardTitle className="flex items-center justify-center text-lime-800 text-base md:text-lg">
                    <BookOpen className="mr-2" size={18} />
                    Dernier badge
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex items-center justify-center h-16 md:h-20">
                  {lastBadge ? (
                    <>
                      <DynamicIcon
                        name={lastBadge.icon}
                        size={24}
                        className="text-yellow-500 mr-2"
                      />

                      <p className="font-bold text-lime-700 text-base md:text-lg">
                        {lastBadge.name}
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-600 text-base md:text-lg">
                      Aucun badge gagné
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
