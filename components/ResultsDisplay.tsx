
import React from 'react';
import { CalculationResult } from '../types';
import StatCard from './StatCard';

interface ResultsDisplayProps {
  result: Pick<CalculationResult, 'volumeLiters'>;
  units: { vol: string };
}

const InfoTooltip: React.FC = () => (
  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-slate-900 ring-1 ring-slate-600 rounded-lg shadow-lg text-sm text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
    <h4 className="font-bold text-white mb-1">How Volume is Calculated</h4>
    <p>The volume is based on the top surface area multiplied by the depth.</p>
    <p className="mt-2">A correction factor is applied based on the <span className="font-semibold text-cyan-400">Bottom Profile</span>:</p>
    <ul className="list-disc list-inside text-sm mt-1 space-y-1">
      <li><span className="font-bold">0%</span> gives a flat bottom (no volume reduction).</li>
      <li><span className="font-bold">100%</span> gives a deep "U" shape, which reduces the volume compared to a rectangular tank.</li>
    </ul>
    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-slate-600"></div>
  </div>
);

export default function ResultsDisplay({ result, units }: ResultsDisplayProps): React.ReactNode {
  return (
    <StatCard
        title="Tank Volume"
        value={result.volumeLiters}
        unit={units.vol}
        isPrimary={true}
        tooltip={<InfoTooltip />}
    />
  );
}
