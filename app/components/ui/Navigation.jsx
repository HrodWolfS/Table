import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

const Navigation = ({ steps, currentStep, onStepClick }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center space-x-2 text-sm">
        {steps.map((step, index) => (
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
              {step.info && (
                <span className="ml-2 text-gray-600">{step.info}</span>
              )}
            </button>
            {index < steps.length - 1 && (
              <ChevronRight size={16} className="text-gray-400" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Navigation;
