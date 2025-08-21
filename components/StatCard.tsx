import React from 'react';
import { useCountUp } from '../hooks/useCountUp';
import InfoPopup from './InfoPopup';

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
            <InfoPopup>
                {tooltip}
            </InfoPopup>
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