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
    <div className="bg-slate-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white border-b border-slate-700 pb-4 mb-6">{title}</h2>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <label htmlFor={`${uniqueId}-includeOverlap`} className="flex-shrink-0 flex items-center gap-3 text-base font-medium text-slate-200 cursor-pointer">
                <input
                    type="checkbox"
                    id={`${uniqueId}-includeOverlap`}
                    checked={includeOverlap}
                    onChange={(e) => onIncludeOverlapChange(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-500 bg-slate-700 text-cyan-500 focus:ring-2 focus:ring-offset-0 focus:ring-offset-slate-800 focus:ring-cyan-500 transition cursor-pointer"
                />
                Add Overlap
            </label>
            <div className={`flex items-center gap-3 transition-opacity duration-300 w-full sm:w-auto justify-end ${includeOverlap ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                <label className="text-sm font-medium text-slate-300 whitespace-nowrap">Amount:</label>
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

        <div className="border-t border-slate-700 pt-4">
            <div className="text-center">
                <div className="text-2xl font-semibold text-cyan-400 mb-1">{linerSizeDisplay}</div>
                <div className="text-sm text-slate-400 mb-4">Required Size</div>
                
                {totalCost !== null && (
                  <div className="text-lg text-slate-300">
                      <span className="text-sm text-slate-400">Estimated Cost: </span>
                      <span className="font-semibold">${totalCost.toFixed(2)}</span>
                  </div>
                )}
            </div>
        </div>
    </div>
  );
}