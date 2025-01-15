"use client";

import NoiseFilter from "@/app/components/ui/NoiseFilter";
import { Star } from "lucide-react";
import { useState } from "react";
import BackButton from "../../ui/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/Card";
import { Footer } from "../home/Footer";
import Header from "../home/Header";
import ExerciseMode from "./ExerciseMode";
import LearningNavigation from "./LearningNavigation";
const LearningPage = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [currentStep, setCurrentStep] = useState("selection"); // 'selection', 'learning' ou 'exercise'

  const tables = Array.from({ length: 10 }, (_, i) => i + 1);

  const memorizationTips = {
    1: "Tout nombre multiplié par 1 reste identique. Exemple : 1 × 7 = 7.",
    2: "Multiplier par 2 revient à additionner le nombre à lui-même. Exemple : 2 × 4 = 4 + 4 = 8.",
    3: "Pense à compter en sautant de 3 en 3. Exemple : 3, 6, 9, 12….",
    4: "Multiplier par 4, c’est doubler deux fois. Exemple : 4 × 3 = (3 + 3) + (3 + 3) = 12.",
    5: "Les résultats finissent toujours par 0 ou 5, en alternance. Exemple : 5, 10, 15, 20….",
    6: "Combine les astuces de la table de 5 et ajoute une fois le nombre. Exemple : 6 × 3 = (5 × 3) + 3 = 18.",
    7: "Utilise des phrases mnémotechniques pour mémoriser les résultats difficiles, comme 7 × 7 = 49 (pense à “7 nains, presque 50”).",
    8: "Double trois fois. Exemple : 8 × 2 = (2 + 2) + (2 + 2) + (2 + 2) + (2 + 2) = 16.",
    9: "La somme des chiffres du résultat est toujours 9. Exemple : 9 × 4 = 36 (3 + 6 = 9). Une autre astuce : les dizaines augmentent de 1 et les unités diminuent de 1. Exemple : 09, 18, 27, 36….",
    10: "Il suffit d’ajouter un zéro au bout du nombre. Exemple : 10 × 7 = 70.",
  };

  const renderTableSelection = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {tables.map((number) => (
        <Card
          key={number}
          className="cursor-pointer hover:shadow-lg transition-all transform hover:scale-105 bg-gradient-to-tr from-green-200 to-blue-200 w-52 h-24"
          onClick={() => {
            setSelectedTable(number);
            setCurrentStep("learning");
          }}
        >
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">{number}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderTableLearning = () => {
    const tableContent = Array.from({ length: 10 }, (_, i) => ({
      multiplicand: selectedTable,
      multiplier: i + 1,
      result: selectedTable * (i + 1),
    }));

    return (
      <div className="space-y-6">
        <Card className="bg-gradient-to-r from-blue-200 to-purple-200">
          <CardHeader className="bg-blue-500">
            <CardTitle className="flex items-center justify-between text-white">
              <span>Table de {selectedTable}</span>
              <Star className="text-yellow-400" size={24} />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tableContent.map((item) => (
                <div
                  key={item.multiplier}
                  className="p-4 border border-gray-50 rounded-lg flex items-center justify-between hover:scale-105 transition-all bg-white"
                >
                  <div className="text-xl text-gray-600">
                    {item.multiplicand} × {item.multiplier} =
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    {item.result}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-r from-green-200 to-yellow-200">
            <CardHeader className="bg-green-300">
              <CardTitle className="text-green-800">
                Exercice pratique
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Complète les opérations manquantes pour t'entraîner sur la table
                de {selectedTable}.
              </p>
              <button
                onClick={() => setCurrentStep("exercise")}
                className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                Commencer l'exercice
              </button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-200 to-pink-200">
            <CardHeader className="bg-purple-300">
              <CardTitle className="text-purple-800">
                Astuces de mémorisation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>{memorizationTips[selectedTable]}</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-screen flex flex-col bg-gradient-to-b from-yellow-100 via-pink-100 to-blue-100 flex-grow">
      <NoiseFilter />
      <Header />
      <header className="px-6">
        <div className="flex justify-between items-center mb-8">
          <LearningNavigation
            currentStep={currentStep}
            selectedTable={selectedTable}
            onStepClick={setCurrentStep}
          />
          <BackButton href="/classic" />
        </div>
        <h1 className="text-3xl font-bold text-blue-600 mb-2">
          {currentStep === "selection"
            ? "Choisis ta table"
            : currentStep === "learning"
            ? `Table de ${selectedTable}`
            : `Exercices - Table de ${selectedTable}`}
        </h1>
        <p className="text-gray-600">
          {currentStep === "selection"
            ? "Sélectionne la table que tu souhaites apprendre"
            : "Prends ton temps pour bien mémoriser"}
        </p>
      </header>

      <main className=" flex flex-col flex-grow justify-center items-center ">
        {currentStep === "selection" && renderTableSelection()}
        {currentStep === "learning" && renderTableLearning()}
        {currentStep === "exercise" && (
          <div>
            <ExerciseMode tableNumber={selectedTable} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default LearningPage;
