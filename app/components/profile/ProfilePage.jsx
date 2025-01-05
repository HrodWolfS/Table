import { getGlobalStats, getTestResults } from "@/app/utils/localStorage";
import { Activity, Clock, Target, Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import BackButton from "../ui/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";

const ProfilePage = () => {
  const [stats, setStats] = useState({
    totalTests: 0,
    averageScore: 0,
    bestScore: 0,
    totalTime: 0,
    mostTestedTable: null,
  });

  const [recentTests, setRecentTests] = useState([]);

  // Charger les données au montage du composant
  useEffect(() => {
    const globalStats = getGlobalStats();
    setStats(globalStats);

    // Récupérer les 5 derniers tests
    const allTests = getTestResults();
    setRecentTests(allTests.slice(0, 5));
  }, []);

  // Convertir les secondes en format lisible
  const formatTime = (seconds) => {
    if (seconds < 60) return `${seconds} sec`;
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min${minutes > 1 ? "s" : ""}`;
  };

  // Formater la date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Hier";
    return `Il y a ${diffDays} jours`;
  };

  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <Activity className="text-blue-500 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-600">Tests complétés</p>
              <p className="text-2xl font-bold">{stats.totalTests}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <Target className="text-green-500 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-600">Score moyen</p>
              <p className="text-2xl font-bold">{stats.averageScore}%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <Trophy className="text-yellow-500 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-600">Meilleure table</p>
              <p className="text-2xl font-bold">
                {stats.mostTestedTable
                  ? `Table de ${stats.mostTestedTable}`
                  : "Aucune"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center">
            <Clock className="text-purple-500 mr-3" size={24} />
            <div>
              <p className="text-sm text-gray-600">Temps total</p>
              <p className="text-2xl font-bold">
                {formatTime(stats.totalTime)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRecentTests = () => (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Tests récents</CardTitle>
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
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">
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
    // Calculer les statistiques par table
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
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Progression par table</CardTitle>
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
                  className="p-4 text-center border rounded-lg"
                >
                  <p className="text-lg font-bold">Table de {tableNumber}</p>
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <BackButton href="/" label="Retour à l'accueil" />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-6">Mon Profil</h1>

        {renderOverview()}
        {renderRecentTests()}
        {renderTableStats()}
      </div>
    </div>
  );
};

export default ProfilePage;
