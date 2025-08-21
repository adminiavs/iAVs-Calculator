import React from 'react';

interface StyledNumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step: number;
  unit?: string;
  prefix?: string;
  ariaLabel: string;
}

export default function StyledNumberInput({ value, onChange, min, max, step, unit, prefix, ariaLabel }: StyledNumberInputProps) {
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
    if (max !== undefined) {
      onChange(Math.min(newValue, max));
    } else {
      onChange(newValue);
    }
  };

  const handleDecrement = () => {
    const currentValue = Number(value);
    const newValue = parseFloat((currentValue - step).toFixed(precision));
    if (min !== undefined) {
      onChange(Math.max(newValue, min));
    } else {
      onChange(newValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numValue = e.target.value === '' ? 0 : Number(e.target.value);
    onChange(numValue);
  };

  return (
    <div className="flex items-stretch bg-slate-700/80 rounded-lg">
      {prefix && <span className="text-xl text-slate-400 pl-3 flex items-center">{prefix}</span>}
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
        step={step}
        className={`w-28 bg-transparent text-right outline-none font-mono text-lg transition-all duration-300 focus:ring-2 focus:ring-amber-500 rounded-l-lg ${prefix ? 'pl-1' : 'pl-3'} pr-1 py-1 no-spinner`}
        aria-label={ariaLabel}
      />
      <div className="flex flex-col border-l border-slate-600">
        <button onClick={handleIncrement} className="flex-1 px-2.5 flex items-center justify-center text-slate-400 hover:bg-slate-600 hover:text-white rounded-tr-lg transition-colors" aria-label={`Increase ${ariaLabel}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" /></svg>
        </button>
        <button onClick={handleDecrement} className="flex-1 px-2.5 flex items-center justify-center text-slate-400 hover:bg-slate-600 hover:text-white rounded-br-lg transition-colors" aria-label={`Decrease ${ariaLabel}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
        </button>
      </div>
      {unit && <span className="text-slate-400 font-medium text-base flex items-center px-4">{unit}</span>}
    </div>
  );
}