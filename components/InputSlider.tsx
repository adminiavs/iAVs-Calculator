
import React from 'react';
import InfoPopup from './InfoPopup';

interface InputSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  sliderStep?: number; // Optional coarser step for the range slider
  unit: string;
  tooltip?: React.ReactNode;
  accentColor?: 'red' | 'yellow' | 'cyan';
}

export default function InputSlider({ label, value, onChange, min, max, step, sliderStep, unit, tooltip, accentColor = 'cyan' }: InputSliderProps): React.ReactNode {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = e.target.value === '' ? 0 : Number(e.target.value);
    onChange(numValue);
  };

  const getPrecision = (stepValue: number) => {
    if (Math.floor(stepValue) === stepValue) return 0;
    const stepString = stepValue.toString();
    const decimalPart = stepString.split('.')[1];
    return decimalPart ? decimalPart.length : 0;
  };

  const precision = getPrecision(step);

  const handleIncrement = () => {
    const currentValue = Number(value);
    const newValue = parseFloat((currentValue + step).toFixed(precision));
    onChange(Math.min(newValue, max));
  };

  const handleDecrement = () => {
    const currentValue = Number(value);
    const newValue = parseFloat((currentValue - step).toFixed(precision));
    onChange(Math.max(newValue, min));
  };
  
  const colorClasses = {
    slider: {
      cyan: 'accent-cyan-500',
      yellow: 'accent-yellow-500',
      red: 'accent-red-500',
    },
    text: {
      cyan: 'text-cyan-300',
      yellow: 'text-yellow-300',
      red: 'text-red-400',
    },
    focusRing: {
      cyan: 'focus:ring-cyan-500',
      yellow: 'focus:ring-yellow-500',
      red: 'focus:ring-red-500',
    }
  };

  return (
    <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-3">
                <label className="font-semibold text-white text-base whitespace-nowrap">{label}</label>
                 {tooltip && (
                    <InfoPopup>
                        {tooltip}
                    </InfoPopup>
                )}
            </div>
            <div className={`flex items-stretch glass-button rounded-xl ${colorClasses.text[accentColor]} border border-white/10`}>
                <input
                    type="number"
                    value={value}
                    onChange={handleInputChange}
                    min={min}
                    max={max}
                    step={step}
                    className={`w-32 bg-transparent text-right outline-none font-mono text-lg transition-all duration-300 focus:ring-2 ${colorClasses.focusRing[accentColor]} rounded-l-xl px-4 py-3 no-spinner`}
                    aria-label={label}
                />
                <div className="flex flex-col border-l border-white/20">
                    <button onClick={handleIncrement} className="flex-1 px-3 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white rounded-tr-xl transition-all duration-200 group" aria-label={`Increase ${label}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
                    </button>
                    <button onClick={handleDecrement} className="flex-1 px-3 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white rounded-br-xl transition-all duration-200 group" aria-label={`Decrease ${label}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                </div>
                <span className="text-slate-300 font-medium text-sm flex items-center px-4 bg-white/5 rounded-r-xl border-l border-white/10">{unit}</span>
            </div>
        </div>
        <input
            type="range"
            value={value}
            onChange={handleInputChange}
            min={min}
            max={max}
            step={sliderStep || step}
            className={`modern-slider w-full h-3 bg-white/10 rounded-lg cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent ${colorClasses.focusRing[accentColor]}`}
            aria-label={`${label} slider`}
        />
    </div>
  );
}
