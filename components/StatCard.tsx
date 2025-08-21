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
      yellow: 'text-amber-400',
      red: 'text-red-400'
  };

  const gradientClasses = {
      cyan: 'from-cyan-500/20 to-cyan-600/10',
      yellow: 'from-amber-500/20 to-amber-600/10', 
      red: 'from-red-500/20 to-red-600/10'
  };

  const textClass = isPrimary ? 'text-cyan-400 font-bold' : `${colorClasses[accentColor]} font-bold`;
  const containerClass = isPrimary 
    ? "glass-card bg-gradient-to-br from-cyan-500/10 to-emerald-500/5 ring-1 ring-cyan-500/30 shadow-2xl shadow-cyan-500/10"
    : `glass-card bg-gradient-to-br ${gradientClasses[accentColor]} border border-white/10`;

  let displayValue: string;
  if (typeof value === 'number') {
      displayValue = isCurrency ? currencyFormatter.format(animatedValue) : animatedValue.toFixed(precision);
  } else {
      displayValue = value;
  }

  return (
    <div className={`rounded-2xl p-6 flex flex-col gap-3 ${containerClass} group hover:scale-[1.02] transition-all duration-300`}>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">{title}</h3>
        {tooltip && (
            <InfoPopup>
                {tooltip}
            </InfoPopup>
         )}
      </div>
      <div className="text-left">
        <div className="flex items-baseline gap-2">
          <span className={`text-3xl lg:text-4xl font-bold font-mono ${textClass} group-hover:scale-105 transition-transform duration-300`}>
            {displayValue}
          </span>
          {unit && <span className="text-lg text-slate-400 font-medium">{unit}</span>}
        </div>
      </div>
    </div>
  );
};

export default StatCard;