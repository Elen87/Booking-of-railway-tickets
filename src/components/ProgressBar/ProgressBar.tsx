// src/components/ProgressBar/ProgressBar.tsx
import React from 'react';
import './ProgressBar.scss';

interface ProgressBarProps {
  currentStep: number; // 1 - Билеты, 2 - Пассажиры, и т.д.
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep }) => {
  const steps = ['Билеты', 'Пассажиры', 'Оплата', 'Проверка'];

  return (
    <div className="progress-bar">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isPassed = stepNumber < currentStep;

        return (
          <div 
            key={step} 
            className={`progress-bar__step ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
          >
            <span className="progress-bar__number">{stepNumber}</span>
            <span className="progress-bar__text">{step}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar; 