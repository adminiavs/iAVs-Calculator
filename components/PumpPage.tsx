
import React, { useMemo } from 'react';
import { Unit } from '../types';
import StatCard from './StatCard';
import InputSlider from './InputSlider';

interface PumpPageProps {
  lphMin: number;
  lphMax: number;
  biofilterHeight: number; // This is in the current display unit
  unit: Unit;
  headHeight: number;
  onHeadHeightChange: (value: number) => void;
}

export default function PumpPage({ lphMin, lphMax, biofilterHeight, unit, headHeight, onHeadHeightChange }: PumpPageProps): React.ReactNode {
  
  const sliderConfig = useMemo(() => {
    const configs: Record<Unit, { min: number, max: number, step: number, sliderStep: number }> = {
      m:  { min: 0, max: 5, step: 0.01, sliderStep: 0.1 },
      cm: { min: 0, max: 500, step: 1, sliderStep: 10 },
      ft: { min: 0, max: 16, step: 0.1, sliderStep: 0.5 },
      in: { min: 0, max: 200, step: 0.5, sliderStep: 2 },
    };
    return configs[unit];
  }, [unit]);

  return (
    <div className="px-4">
      <main className="max-w-4xl mx-auto flex flex-col gap-8">
        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white border-b border-slate-700 pb-4 mb-6">Pump Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 rounded-lg p-6 border-l-4 border-cyan-400">
              <div className="flex items-center gap-3 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-400">Required Flow Rate</span>
              </div>
              <div className="text-3xl font-bold text-cyan-400 mb-2">
                {lphMin.toFixed(0)} - {lphMax.toFixed(0)}
              </div>
              <div className="text-lg text-slate-300">LPH</div>
              <p className="text-sm text-slate-400 mt-3">
                This is the recommended flow rate to circulate 25-30% of your tank's total volume in a 15 minute irrigation cycle, ensuring adequate filtration.
              </p>
            </div>
            <div className="bg-slate-900 rounded-lg p-6 border-l-4 border-cyan-400">
              <div className="flex items-center gap-3 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-slate-400">Configured Head Height</span>
              </div>
              <div className="text-3xl font-bold text-cyan-400 mb-2">
                {headHeight.toFixed(2)}
              </div>
              <div className="text-lg text-slate-300">{unit}</div>
              <p className="text-sm text-slate-400 mt-3">
                This is the total vertical distance from the pump's outlet to the highest point water is discharged. Adjust the value below to match your system.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white border-b border-slate-700 pb-4 mb-6">Head Height Configuration</h2>
          <div className="space-y-6">
            <p className="text-slate-300 text-sm leading-relaxed">
              "Head height" is the vertical distance a pump must push water. It's one of the most important factors in choosing a pump. A pump's flow rate (LPH) decreases as the head height increases.
            </p>
            <p className="text-slate-300 text-sm">
              We've used your <strong className="text-cyan-300">BioFilter Height ({biofilterHeight.toFixed(2)} {unit})</strong> as the starting point. Adjust the value below to include any additional height, if needed.
            </p>
            <InputSlider
              label="Total Head Height"
              value={headHeight}
              onChange={onHeadHeightChange}
              min={sliderConfig.min}
              max={sliderConfig.max}
              step={sliderConfig.step}
              sliderStep={sliderConfig.sliderStep}
              unit={unit}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
