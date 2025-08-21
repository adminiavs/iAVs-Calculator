import React from 'react';
import { useCountUp } from '../hooks/useCountUp';

interface StatCardProps {
  title: string;
  value: number | string;
  unit: string;
  isPrimary?: boolean;
  isCurrency?: boolean;
  tooltip?: React.ReactNode;
  accentColor?: 'red' | 'yellow' | 'cyan';
  precision?: number;
}

const currencyFormatter = new Intl.NumberFormat(undefined, {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  isPrimary = false,
  isCurrency = false,
  tooltip,
  accentColor = 'cyan',
  precision = 0,
}) => {
  const isNumeric = typeof value === 'number';
  // Always call hooks at the top level.
  // The animated value is only used when the value is numeric.
  const animatedValue = useCountUp(isNumeric ? value : 0, 500);

  const colorClasses = {
      cyan: 'text-cyan-400',
      yellow: 'text-yellow-400',
      red: 'text-red-500'
  };

  const textClass = isPrimary ? colorClasses['cyan'] : colorClasses[accentColor];
  const containerClass = isPrimary 
    ? "bg-gradient-to-br from-slate-800 to-slate-700/50 ring-2 ring-cyan-500/50 shadow-2xl shadow-cyan-500/10"
    : "bg-slate-900/50";

  let displayValue: string;
  if (typeof value === 'number') {
      displayValue = isCurrency ? currencyFormatter.format(animatedValue) : animatedValue.toFixed(precision);
  } else {
      displayValue = value;
  }

  return (
    <div className={`rounded-xl p-5 flex flex-col gap-2 ${containerClass}`}>
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-slate-200">{title}</h3>
        {tooltip && (
            <div className="group relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 group-hover:text-slate-200 transition-colors duration-200 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                {tooltip}
            </div>
         )}
      </div>
      <div className="text-left">
        <span className={`text-4xl font-bold font-mono ${textClass}`}>{displayValue}</span>
        {unit && <span className="text-2xl text-slate-400 ml-2 font-medium">{unit}</span>}
      </div>
    </div>
  );
};

export default StatCard;