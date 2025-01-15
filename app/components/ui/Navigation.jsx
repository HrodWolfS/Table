import { ChevronRight } from "lucide-react";
import React from "react";

const Navigation = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="">
      <div className="flex items-center space-x-2 text-sm">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <button
              onClick={() => onStepClick(step.id)}
              className={`flex items-center px-3 py-1 rounded-lg transition-all transform hover:scale-105 ${
                currentStep === step.id
                  ? "text-white font-semibold bg-purple-600"
                  : "text-purple-600 hover:text-white hover:bg-purple-400"
              }`}
            >
              {step.label}
              {step.info && (
                <span className="ml-2 text-gray-600">{step.info}</span>
              )}
            </button>
            {index < steps.length - 1 && (
              <ChevronRight size={16} className="text-purple-400" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
