"use client";

import NoiseFilter from "@/app/components/ui/NoiseFilter";
import { BADGES, getBadges } from "@/app/utils/badges";
import {
  clearUserTestResults,
  getGlobalStats,
  getTestResults,
} from "@/app/utils/localStorage";
import { Activity, Clock, Target, Trophy } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BackButton from "../../ui/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/Card";
import DynamicIcon from "../../ui/DynamicIcon";
import Header from "../home/Header";

const ProfilePage = () => {
  const router = useRouter();
  const [stats, setStats] = useState({
    totalTests: 0,
    averageScore: 0,
    bestScore: 0,
    totalTime: 0,
    mostTestedTable: null,
  });

  const [userBadges, setUserBadges] = useState([]);
  const [recentTests, setRecentTests] = useState([]);

  useEffect(() => {
    const badges = getBadges();
    setUserBadges(badges);
    const globalStats = getGlobalStats();
    setStats(globalStats);
    const userTests = getTestResults();
    setRecentTests(userTests.slice(0, 5));
  }, []);

  const formatTime = (seconds) => {
    if (seconds < 60) return `${seconds} sec`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min${minutes > 1 ? "s" : ""}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Hier";
    return `Il y a ${diffDays} jours`;
  };

  const handleResetData = () => {
    if (
      window.confirm(
        "Voulez-vous vraiment supprimer tous vos résultats et badges ? Cette action est irréversible."
      )
    ) {
      // Supprimer les résultats de test
      clearUserTestResults();

      // Supprimer les badges
      localStorage.removeItem("multiplication-badges");

      // Réinitialiser l'état local
      setStats({
        totalTests: 0,
        averageScore: 0,
        bestScore: 0,
        totalTime: 0,
        mostTestedTable: null,
      });
      setUserBadges([]);
      setRecentTests([]);

      // Rediriger vers la page d'accueil
      router.push("/");
    }
  };

  const renderBadges = () => {
    return (
      <Card className="mt-6 bg-gradient-to-r from-yellow-200 to-pink-200">
        <CardHeader>
          <CardTitle className="text-purple-600">Badges obtenus</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.values(BADGES).map((badge) => {
              const isUnlocked = userBadges.some(
                (userBadge) =>
                  userBadge === badge.id ||
                  (typeof userBadge === "object" && userBadge.id === badge.id)
              );

              return (
                <div
                  key={badge.id}
                  className={`p-4 rounded-lg border-2 ${
                    isUnlocked
                      ? "border-yellow-400 bg-yellow-50"
                      : "border-gray-200 opacity-50"
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <DynamicIcon
                      name={badge.icon}
                      size={32}
                      className={
                        isUnlocked ? "text-yellow-500" : "text-gray-400"
                      }
                    />
                    <h3 className="font-semibold mt-2 text-purple-600">
                      {badge.name}
                    </h3>
                    <p className="text-sm text-gray-600">{badge.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-gradient-to-r from-blue-200 to-green-200">
        <CardContent className="pt-6">
          <div className="flex items-center">
            <Activity className="text-blue-500 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-600">Tests complétés</p>
              <p className="text-2xl font-bold text-purple-600">
                {stats.totalTests}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-green-200 to-yellow-200">
        <CardContent className="pt-6">
          <div className="flex items-center">
            <Target className="text-green-500 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-600">Score moyen</p>
              <p className="text-2xl font-bold text-purple-600">
                {stats.averageScore}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-yellow-200 to-pink-200">
        <CardContent className="pt-6">
          <div className="flex items-center">
            <Trophy className="text-yellow-500 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-600">Meilleure table</p>
              <p className="text-2xl font-bold text-purple-600">
                {stats.mostTestedTable
                  ? `Table de ${stats.mostTestedTable}`
                  : "Aucune"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-pink-200 to-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-center">
            <Clock className="text-purple-500 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-600">Temps total</p>
              <p className="text-2xl font-bold text-purple-600">
                {formatTime(stats.totalTime)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRecentTests = () => (
    <Card className="mt-6 bg-gradient-to-r from-blue-200 to-green-200">
      <CardHeader>
        <CardTitle className="text-purple-600">Tests récents</CardTitle>
      </CardHeader>
      <CardContent>
        {recentTests.length === 0 ? (
          <p className="text-center text-gray-600">
            Aucun test effectué pour le moment
          </p>
        ) : (
          <div className="space-y-4">
            {recentTests.map((test) => (
              <div
                key={test.id}
                className="flex items-center justify-between p-4 border border-gray-50 rounded-lg bg-white"
              >
                <div>
                  <p className="font-bold text-purple-600">
                    Tables {test.selectedTables.join(", ")}
                  </p>
                  <p className="text-sm text-gray-600">
                    {test.questionsAnswered} questions,{" "}
                    {formatTime(test.timeLimit - test.timeLeft)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">{test.score}%</p>
                  <p className="text-sm text-gray-600">
                    {formatDate(test.date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );

  const renderTableStats = () => {
    const tableStats = {};
    const results = getTestResults();

    results.forEach((test) => {
      test.selectedTables.forEach((table) => {
        if (!tableStats[table]) {
          tableStats[table] = {
            totalTests: 0,
            totalScore: 0,
          };
        }
        tableStats[table].totalTests++;
        tableStats[table].totalScore += test.score;
      });
    });

    return (
      <Card className="mt-6 bg-gradient-to-r from-purple-200 to-pink-200">
        <CardHeader>
          <CardTitle className="text-purple-600">
            Progression par table
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
            {[...Array(10)].map((_, i) => {
              const tableNumber = i + 1;
              const stats = tableStats[tableNumber] || {
                totalTests: 0,
                totalScore: 0,
              };
              const averageScore =
                stats.totalTests > 0
                  ? Math.round(stats.totalScore / stats.totalTests)
                  : 0;

              return (
                <div
                  key={tableNumber}
                  className="p-4 text-center border rounded-lg bg-white"
                >
                  <p className="text-lg font-bold text-purple-600">
                    Table de {tableNumber}
                  </p>
                  <p className="text-2xl font-bold text-blue-600 mt-2">
                    {averageScore}%
                  </p>
                  <p className="text-sm text-gray-600">
                    {stats.totalTests} tests
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className=" bg-gradient-to-l from-yellow-50 via-pink-100 to-blue-100 min-h-screen">
      <NoiseFilter />
      <Header />
      <div className="max-w-7xl p-6 mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">Mes Résultats</h1>
          <BackButton href="/classic" />
        </div>
        {renderOverview()}
        {renderBadges()}
        {renderRecentTests()}
        {renderTableStats()}

        <div className="mt-8 text-center">
          <button
            onClick={handleResetData}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
          >
            Réinitialiser mes données
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
