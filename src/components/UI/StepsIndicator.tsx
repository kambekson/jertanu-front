import React from 'react';

interface StepsIndicatorProps {
  activeStep: number;
  steps: Array<{
    number: number;
    label: string;
  }>;
}

const StepsIndicator: React.FC<StepsIndicatorProps> = ({ activeStep, steps }) => {
  return (
    <div className="flex justify-between items-center mb-10 px-4 sm:px-8">
      {steps.map((step, index) => (
        <React.Fragment key={step.number}>
          <div className="flex flex-col items-center">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center ${activeStep >= step.number ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            >
              {step.number}
            </div>
            <span className="text-xs mt-1">{step.label}</span>
          </div>
          {index < steps.length - 1 && (
            <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepsIndicator;