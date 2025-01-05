"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import BackButton from "../ui/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import ExerciseMode from "./ExerciseMode";
import LearningNavigation from "./LearningNavigation";

const LearningPage = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [currentStep, setCurrentStep] = useState("selection"); // 'selection', 'learning' ou 'exercise'

  const tables = Array.from({ length: 10 }, (_, i) => i + 1);

  const renderTableSelection = () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {tables.map((number) => (
        <Card
          key={number}
          className="cursor-pointer hover:shadow-lg transition-all transform hover:scale-105"
          onClick={() => {
            setSelectedTable(number);
            setCurrentStep("learning");
          }}
        >
          <CardContent className="p-6 text-center">
            <div className="text-3xl font-bold text-blue-600">
              Table de {number}
            </div>
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
        <Card>
          <CardHeader className="bg-blue-500">
            <CardTitle className="flex items-center justify-between">
              <span>Table de {selectedTable}</span>
              <Star className="text-yellow-500" size={24} />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tableContent.map((item) => (
                <div
                  key={item.multiplier}
                  className="p-4 border border-gray-50 rounded-lg flex items-center justify-between hover:scale-105 transition-all"
                >
                  <div className="text-xl">
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
          <Card>
            <CardHeader>
              <CardTitle>Exercice pratique</CardTitle>
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

          <Card>
            <CardHeader>
              <CardTitle>Astuces de mémorisation</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Repère les résultats qui se répètent</li>
                <li>Utilise les nombres pairs et impairs</li>
                <li>Fais le lien avec les tables que tu connais déjà</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-6">
      <header className="mb-8">
        <div className="mb-4">
          <BackButton href="/" label="Retour à l'accueil" />
        </div>
        <LearningNavigation
          currentStep={currentStep}
          selectedTable={selectedTable}
          onStepClick={setCurrentStep}
        />
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

      <main className="max-w-6xl mx-auto">
        {currentStep === "selection" && renderTableSelection()}
        {currentStep === "learning" && renderTableLearning()}
        {currentStep === "exercise" && (
          <div>
            <ExerciseMode tableNumber={selectedTable} />
          </div>
        )}
      </main>
    </div>
  );
};

export default LearningPage;
