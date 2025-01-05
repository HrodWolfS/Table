"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/Card";
import { BookOpen, Brain, Star, Trophy, User } from "lucide-react";
import { useEffect, useState } from "react";
import { getGlobalStats, getTestResults } from "../../utils/localStorage";

import Link from "next/link";

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
    console.log(globalStats);
    console.log(getTestResults());
  }, []);

  return (
    <div className="min-h-screen p-6">
      {/* En-tête */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-2">
          Tables de Multiplication
        </h1>
        <p>Apprendre en s'amusant !</p>
      </header>

      {/* Boutons principaux */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
        <Link href="/learn">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer ">
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center text-green-700">
                <BookOpen className="mr-2" size={24} />
                Mode Apprentissage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Découvre et pratique les tables à ton rythme</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/test">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center text-blue-700">
                <Brain className="mr-2" size={24} />
                Mode Test
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Vérifie tes connaissances avec des exercices</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/profile">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="bg-purple-50">
              <CardTitle className="flex items-center text-purple-700">
                <User className="mr-2" size={24} />
                Mon Profil
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Consulte ta progression et tes statistiques</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Résumé des progrès */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Tes progrès
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent>
              <div className="flex items-center">
                <Trophy className="text-yellow-500 mr-2" size={24} />
                <div>
                  <p className="text-sm">Points totaux</p>
                  <p className="text-2xl font-bold">{stats.totalScore}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center">
                <Star className="text-purple-500 mr-2" size={24} />
                <div>
                  <p className="text-sm">Dernière table</p>
                  <p className="text-2xl font-bold text-center ">
                    {stats.mostTestedTable}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-center">
                <BookOpen className="text-green-500 mr-2" size={24} />
                <div>
                  <p className="text-sm">Badges gagnés</p>
                  <p className="text-2xl font-bold text-gray-700">
                    {stats.badges}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
