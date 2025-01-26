import { ChevronRight } from "lucide-react";
import React from "react";

const LearningNavigation = ({ currentStep, selectedTable, onStepClick }) => {
  // Détermine les étapes à afficher en fonction de l'étape actuelle
  const getVisibleSteps = () => {
    const baseSteps = [
      { id: "selection", label: "Sélection", mobileLabel: "Tables" },
    ];

    // Si on a sélectionné une table, on ajoute l'étape "Table"
    if (selectedTable) {
      baseSteps.push({
        id: "learning",
        label: "Table",
        mobileLabel: `T${selectedTable}`,
      });
    }

    // Si on est dans le mode exercice, on ajoute l'étape "Exercices"
    if (currentStep === "exercise") {
      baseSteps.push({
        id: "exercise",
        label: "Exercices",
        mobileLabel: "Ex.",
      });
    }

    return baseSteps;
  };

  const visibleSteps = getVisibleSteps();

  return (
    <div className="mb-4 sm:mb-8">
      <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm">
        {visibleSteps.map((step, index) => (
          <React.Fragment key={step.id}>
            <button
              onClick={() => onStepClick(step.id)}
              className={`flex items-center px-2 sm:px-3 py-1 rounded-lg transition-all transform hover:scale-105 ${
                currentStep === step.id
                  ? "text-white font-semibold bg-blue-600"
                  : "text-blue-600 hover:text-white hover:bg-blue-400"
              }`}
            >
              <span className="hidden sm:inline">{step.label}</span>
              <span className="sm:hidden">{step.mobileLabel}</span>
              {step.id !== "selection" && selectedTable && (
                <span className="ml-1 sm:ml-2 text-purple-400 text-xs">
                  <span className="hidden sm:inline">
                    (Table de {selectedTable})
                  </span>
                  <span className="sm:hidden">({selectedTable})</span>
                </span>
              )}
            </button>
            {index < visibleSteps.length - 1 && (
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default LearningNavigation;
