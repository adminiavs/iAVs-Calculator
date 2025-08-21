import React from 'react';
import { useCountUp } from '../hooks/useCountUp';

interface FishPageProps {
  minStock: number;
  maxStock: number;
  adjustmentMessage: string;
  isTankTooSmall: boolean;
}

export default function FishPage({ minStock, maxStock, adjustmentMessage, isTankTooSmall }: FishPageProps): React.ReactNode {
  
  const finalMinStock = isTankTooSmall ? 0 : minStock;
  const finalMaxStock = isTankTooSmall ? 0 : maxStock;

  const animatedMin = useCountUp(finalMinStock, 500);
  const animatedMax = useCountUp(finalMaxStock, 500);

  return (
    <main className="max-w-4xl mx-auto flex flex-col gap-8">
      <div className="bg-slate-800 rounded-2xl p-6 shadow-2xl ring-1 ring-white/10">
        <div className="border-b border-slate-700 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-3xl font-semibold text-white">Initial Stocking Rate</h2>
            <div className="group relative flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400 group-hover:text-slate-200 transition-colors duration-200 cursor-help" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-slate-900 ring-1 ring-slate-600 rounded-lg shadow-lg text-sm text-center text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                This stocking rate is calculated based on the tank volume and biofilter size you have configured.
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-600"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center py-6">
          <span className="text-8xl font-bold text-cyan-400">
            {animatedMin.toFixed(0)} - {animatedMax.toFixed(0)}
          </span>
          <p className="text-4xl text-slate-300 mt-2 font-medium">Fingerlings</p>
        </div>

        <div className="text-base text-slate-400 bg-slate-900/50 p-4 rounded-lg mt-4 space-y-3">
          <p>
            The recommended base stocking rate for fingerlings (15g each) is between <span className="font-semibold text-cyan-300">80 to 100 fingerlings per 1000 Liters</span> of water volume with an ideally sized biofilter.
          </p>
          {adjustmentMessage && (
             <p className="font-semibold text-yellow-300">
                {adjustmentMessage}
             </p>
          )}
          {isTankTooSmall && (
             <p className="font-semibold text-red-400">
                Warning: For good fish welfare, it is not recommended to stock fish in a tank smaller than 500 Liters.
             </p>
          )}
        </div>
      </div>
    </main>
  );
}