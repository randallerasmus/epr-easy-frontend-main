
import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepProps {
  title: string;
  description?: string;
  isCompleted?: boolean;
  isActive?: boolean;
}

export const Step: React.FC<StepProps> = ({
  title,
  description,
  isCompleted,
  isActive,
}) => {
  return (
    <div className={cn(
      'flex flex-col items-center',
      isActive && 'text-blue-600',
      isCompleted && 'text-green-600'
    )}>
      <div
        className={cn(
          'flex items-center justify-center w-8 h-8 rounded-full border-2',
          isActive && 'border-blue-600 bg-blue-50 text-blue-600',
          isCompleted && 'border-green-600 bg-green-50 text-green-600',
          !isActive && !isCompleted && 'border-gray-300 text-gray-500'
        )}
      >
        {isCompleted ? <Check className="w-4 h-4" /> : null}
        {!isCompleted && <span>{title.charAt(0)}</span>}
      </div>
      <div className="mt-2 text-center">
        <p className={cn(
          'font-medium',
          isActive && 'text-blue-600',
          isCompleted && 'text-green-600',
          !isActive && !isCompleted && 'text-gray-500'
        )}>
          {title}
        </p>
        {description && (
          <p className={cn(
            'text-xs',
            isActive && 'text-blue-500',
            isCompleted && 'text-green-500',
            !isActive && !isCompleted && 'text-gray-400'
          )}>
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

interface StepsProps {
  children: React.ReactElement<StepProps>[];
  currentStep: number;
}

export const Steps: React.FC<StepsProps> = ({ children, currentStep }) => {
  const totalSteps = React.Children.count(children);
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {React.Children.map(children, (child, index) => {
          const isCompleted = index + 1 < currentStep;
          const isActive = index + 1 === currentStep;
          
          return (
            <div className="relative flex flex-col items-center flex-1">
              {React.cloneElement(child, { isCompleted, isActive })}
              
              {index < totalSteps - 1 && (
                <div className={cn(
                  'absolute top-4 w-full h-0.5 -right-1/2',
                  index + 1 < currentStep ? 'bg-green-500' : 'bg-gray-200'
                )} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
