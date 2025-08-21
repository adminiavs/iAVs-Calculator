
import React from 'react';

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
    <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center gap-4">
            <div className="flex items-center gap-2">
                <label className="font-medium text-slate-200 text-lg whitespace-nowrap">{label}</label>
                 {tooltip && (
                    <div className="group relative flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 group-hover:text-slate-200 transition-colors duration-200 cursor-help" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-slate-900 ring-1 ring-slate-600 rounded-lg shadow-lg text-sm text-left text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
                        {tooltip}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-600"></div>
                    </div>
                    </div>
                )}
            </div>
            <div className={`flex items-stretch bg-slate-700/50 rounded-lg ${colorClasses.text[accentColor]}`}>
                <input
                    type="number"
                    value={value}
                    onChange={handleInputChange}
                    min={min}
                    max={max}
                    step={step}
                    className={`w-28 bg-transparent text-right outline-none font-mono text-lg transition-all duration-300 focus:ring-2 ${colorClasses.focusRing[accentColor]} rounded-l-lg pl-3 pr-1 py-2 no-spinner`}
                    aria-label={label}
                />
                <div className="flex flex-col border-l border-slate-600">
                    <button onClick={handleIncrement} className="flex-1 px-2.5 flex items-center justify-center text-slate-400 hover:bg-slate-600 hover:text-white rounded-tr-lg transition-colors" aria-label={`Increase ${label}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
                    </button>
                    <button onClick={handleDecrement} className="flex-1 px-2.5 flex items-center justify-center text-slate-400 hover:bg-slate-600 hover:text-white rounded-br-lg transition-colors" aria-label={`Decrease ${label}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                    </button>
                </div>
                <span className="text-slate-400 font-medium text-base flex items-center px-4">{unit}</span>
            </div>
        </div>
        <input
            type="range"
            value={value}
            onChange={handleInputChange}
            min={min}
            max={max}
            step={sliderStep || step}
            className={`w-full h-2.5 bg-slate-700 rounded-lg appearance-none cursor-pointer ${colorClasses.slider[accentColor]} transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 ${colorClasses.focusRing[accentColor]}`}
            aria-label={`${label} slider`}
        />
    </div>
  );
}
