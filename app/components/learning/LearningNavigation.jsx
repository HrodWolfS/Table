import React from "react";
import { ChevronRight } from "lucide-react";

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
              className={`flex items-center px-3 py-1 rounded-lg transition-all ${
                currentStep === step.id
                  ? "text-blue-600 font-semibold bg-blue-50"
                  : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              {step.label}
              {step.id !== "selection" && (
                <span className="ml-2 text-gray-600">
                  (Table de {selectedTable})
                </span>
              )}
            </button>
            {index < visibleSteps.length - 1 && (
              <ChevronRight size={16} className="text-gray-400" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default LearningNavigation;
