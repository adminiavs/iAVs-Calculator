import React from 'react';
import { Unit } from '../types';
import StatCard from './StatCard';
import StyledNumberInput from './StyledNumberInput';

interface LinerCalculatorProps {
  title: string;
  linerLength: number;
  linerWidth: number;
  unit: Unit;
  totalCost: number | null;
  includeOverlap: boolean;
  onIncludeOverlapChange: (checked: boolean) => void;
  overlapAmount: number;
  onOverlapAmountChange: (amount: number) => void;
}

export default function LinerCalculator({
  title,
  linerLength,
  linerWidth,
  unit,
  totalCost,
  includeOverlap,
  onIncludeOverlapChange,
  overlapAmount,
  onOverlapAmountChange,
}: LinerCalculatorProps): React.ReactNode {
  
  const precision = (unit === 'm' || unit === 'ft') ? 2 : 1;

  const getStepForUnit = (unit: Unit): number => {
    switch (unit) {
        case 'm': return 0.01;
        case 'ft': return 0.1;
        case 'in': return 0.5;
        case 'cm': return 1;
        default: return 0.1;
    }
  }

  const uniqueId = title.replace(/\s+/g, '-');

  const linerSizeDisplay = `${linerLength.toFixed(precision)} ${unit} × ${linerWidth.toFixed(precision)} ${unit}`;

  return (
    <div className="bg-slate-800 rounded-2xl p-6 flex flex-col gap-5 ring-1 ring-white/10">
        <h2 className="text-3xl font-semibold text-white border-b border-slate-600 pb-4">{title}</h2>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <label htmlFor={`${uniqueId}-includeOverlap`} className="flex-shrink-0 flex items-center gap-3 text-lg font-medium text-slate-200 cursor-pointer">
                <input
                    type="checkbox"
                    id={`${uniqueId}-includeOverlap`}
                    checked={includeOverlap}
                    onChange={(e) => onIncludeOverlapChange(e.target.checked)}
                    className="h-5 w-5 rounded border-slate-500 bg-slate-700 text-cyan-500 focus:ring-2 focus:ring-offset-0 focus:ring-offset-slate-800 focus:ring-cyan-500 transition cursor-pointer"
                />
                Add Overlap
            </label>
            <div className={`flex items-center gap-3 transition-opacity duration-300 w-full sm:w-auto justify-end ${includeOverlap ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                <label className="text-base font-medium text-slate-300 whitespace-nowrap">Amount:</label>
                <StyledNumberInput
                  value={overlapAmount}
                  onChange={onOverlapAmountChange}
                  min={0}
                  step={getStepForUnit(unit)}
                  unit={unit}
                  ariaLabel="Overlap Amount"
                />
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-700/50">
            <StatCard
                title="Required Size"
                value={linerSizeDisplay}
                unit=""
            />
            
            {totalCost !== null && (
              <StatCard
                  title="Estimated Cost"
                  value={totalCost}
                  unit=""
                  isCurrency={true}
              />
            )}
        </div>
    </div>
  );
}