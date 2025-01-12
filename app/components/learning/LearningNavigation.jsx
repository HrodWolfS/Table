import { ChevronRight } from "lucide-react";
import React from "react";

const LearningNavigation = ({ currentStep, selectedTable, onStepClick }) => {
  // Détermine les étapes à afficher en fonction de l'étape actuelle
  const getVisibleSteps = () => {
    const baseSteps = [{ id: "selection", label: "Sélection" }];

    // Si on a sélectionné une table, on ajoute l'étape "Table"
    if (selectedTable) {
      baseSteps.push({ id: "learning", label: "Table" });
    }

    // Si on est dans le mode exercice, on ajoute l'étape "Exercices"
    if (currentStep === "exercise") {
      baseSteps.push({ id: "exercise", label: "Exercices" });
    }

    return baseSteps;
  };

  const visibleSteps = getVisibleSteps();

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-2 text-sm">
        {visibleSteps.map((step, index) => (
          <React.Fragment key={step.id}>
            <button
              onClick={() => onStepClick(step.id)}
              className={`flex items-center px-3 py-1 rounded-lg transition-all transform hover:scale-105 ${
                currentStep === step.id
                  ? "text-white font-semibold bg-blue-600"
                  : "text-blue-600 hover:text-white hover:bg-blue-400"
              }`}
            >
              {step.label}
              {step.id !== "selection" && selectedTable && (
                <span className="ml-2 text-purple-400">
                  (Table de {selectedTable})
                </span>
              )}
            </button>
            {index < visibleSteps.length - 1 && (
              <ChevronRight size={16} className="text-blue-400" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default LearningNavigation;
