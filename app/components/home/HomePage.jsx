"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/Card";
import { BADGES, getBadges } from "@/app/utils/badges";
import { BookOpen, Brain, Star, Trophy, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getGlobalStats } from "../../utils/localStorage";
import DynamicIcon from "../ui/DynamicIcon";

const HomePage = () => {
  const [stats, setStats] = useState({
    totalTests: 0,
    averageScore: 0,
    bestScore: 0,
    totalScore: 0,
    totalTime: 0,
    mostTestedTable: null,
  });

  const [recentTests, setRecentTests] = useState([]);

  // Charger les données au montage du composant
  useEffect(() => {
    const globalStats = getGlobalStats();
    setStats(globalStats);
  }, []);

  const [lastBadge, setLastBadge] = useState(null);

  // Ajoutez un useEffect pour charger le dernier badge
  useEffect(() => {
    const badges = getBadges();
    if (badges && badges.length > 0) {
      const lastBadgeId = badges[badges.length - 1];
      // On cherche le badge dans les valeurs de BADGES
      const badge = Object.values(BADGES).find((b) => b.id === lastBadgeId);
      setLastBadge(badge);
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center flex-grow">
      {/* Boutons principaux */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto w-full mb-8">
        <Link href="/learn">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer ">
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center justify-center text-green-700">
                <BookOpen className="mr-2" size={24} />
                Apprentissage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center">
                Découvre et pratique les tables à ton rythme
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/test">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center justify-center text-blue-700">
                <Brain className="mr-2" size={24} />
                Test
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center">
                Vérifie tes connaissances avec des exercices
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/profile">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="bg-purple-50">
              <CardTitle className="flex items-center justify-center text-purple-700">
                <User className="mr-2" size={24} />
                Mon Profil
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center">
                Consulte ta progression et tes statistiques
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Résumé des progrès */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold  mb-4">Tes progrès</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="bg-yellow-50">
              <CardTitle className="flex items-center justify-center text-yellow-500">
                <Trophy className=" mr-2" size={24} />
                Points totaux
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-24">
              <p className="text-2xl text-center font-bold">
                {stats.totalScore}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-rose-50">
              <CardTitle className="flex items-center justify-center text-rose-500">
                <Star className=" mr-2" size={24} />
                La plus travaillé
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center h-24">
              <p className="text-2xl  font-bold">{stats.mostTestedTable}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-lime-50">
              <CardTitle className="flex items-center justify-center text-lime-500">
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
                  <p className="font-bold">{lastBadge.name}</p>
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
};

export default HomePage;
