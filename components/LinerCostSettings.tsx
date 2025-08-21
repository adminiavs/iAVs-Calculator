import React from 'react';
import { Unit } from '../types';
import StyledNumberInput from './StyledNumberInput';

interface LinerCostSettingsProps {
  pricePerUnitArea: number;
  onPriceChange: (price: number) => void;
  unit: Unit;
  calculateLinerCost: boolean;
  onCalculateLinerCostChange: (checked: boolean) => void;
}

const unitAreaNames: Record<Unit, string> = {
  m: 'm²',
  cm: 'cm²',
  in: 'in²',
  ft: 'ft²',
};

const LinerCostSettings: React.FC<LinerCostSettingsProps> = ({
  pricePerUnitArea,
  onPriceChange,
  unit,
  calculateLinerCost,
  onCalculateLinerCostChange
}) => {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 flex flex-col gap-5 ring-1 ring-white/10">
      <div className="flex items-center justify-between border-b border-slate-600 pb-4">
        <div className="flex items-center gap-3">
          <label htmlFor="cost-toggle" className="text-3xl font-semibold text-white cursor-pointer">Liner Cost Calculation</label>
          <div className="group relative flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400 group-hover:text-slate-200 transition-colors duration-200 cursor-help" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-slate-900 ring-1 ring-slate-600 rounded-lg shadow-lg text-sm text-center text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
              Check this box to add a price per square meter/foot and get a cost estimate for your liners.
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-600"></div>
            </div>
          </div>
        </div>
        <input
            type="checkbox"
            checked={calculateLinerCost}
            onChange={(e) => onCalculateLinerCostChange(e.target.checked)}
            className="form-checkbox h-6 w-6 rounded border-slate-500 bg-slate-700 text-cyan-500 focus:ring-2 focus:ring-offset-0 focus:ring-offset-slate-800 focus:ring-cyan-500 transition cursor-pointer flex-shrink-0"
            id="cost-toggle"
        />
      </div>
      <div className={`transition-all duration-300 ease-in-out ${calculateLinerCost ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="flex items-center justify-between pt-2">
          <label className="font-medium text-slate-200 text-lg">
            Price per {unitAreaNames[unit]}:
          </label>
          <StyledNumberInput
            value={pricePerUnitArea}
            onChange={onPriceChange}
            min={0}
            step={0.01}
            prefix="$"
            ariaLabel={`Price per ${unitAreaNames[unit]}`}
          />
        </div>
      </div>
    </div>
  );
};

export default LinerCostSettings;