
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
    <main className="max-w-4xl mx-auto flex flex-col gap-8">
      <div className="bg-slate-800 rounded-2xl p-6 shadow-2xl ring-1 ring-white/10">
        <h2 className="text-3xl font-semibold text-white border-b border-slate-600 pb-4 mb-6">Pump Requirements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard
            title="Required Flow Rate"
            value={`${lphMin.toFixed(0)} - ${lphMax.toFixed(0)}`}
            unit="LPH"
            isPrimary
            tooltip="This is the recommended flow rate to circulate 25-30% of your tank's total volume in a 15 minute irrigation cycle, ensuring adequate filtration."
          />
          <StatCard
            title="Configured Head Height"
            value={headHeight}
            unit={unit}
            precision={2}
            tooltip="This is the total vertical distance from the pump's outlet to the highest point water is discharged. Adjust the value below to match your system."
          />
        </div>
      </div>

      <div className="bg-slate-800 rounded-2xl p-6 shadow-2xl ring-1 ring-white/10">
        <h2 className="text-3xl font-semibold text-white border-b border-slate-600 pb-4 mb-6">Head Height Configuration</h2>
        <div className="flex flex-col gap-6">
          <p className="text-slate-300 text-base leading-relaxed">
            "Head height" is the vertical distance a pump must push water. It's one of the most important factors in choosing a pump. A pump's flow rate (LPH) decreases as the head height increases.
            <br /><br />
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
  );
}
