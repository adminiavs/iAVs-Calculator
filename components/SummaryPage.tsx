import React from 'react';
import { Unit } from '../types';


interface SummaryPageProps {
  unit: Unit;
  setUnit: (unit: Unit) => void;
  displayDimensions: any;
  displayResult: any;
  unitConfig: any;
  displayBiofilterDimensions: any;
  biofilterCalculations: any;
  displayTotalContainerHeight: number;
  linerDimensions: any;
  biofilterLinerDimensions: any;
  combinedLinerSheet: { length: number; width: number; };
  fishStocking: { minStock: number; maxStock: number; adjustmentMessage: string };
  warnings: string[];
  onSaveAsPdf: () => void;
  isSavingPdf: boolean;

  pumpLphRange: { min: number; max: number; };
  headHeight: number;
}

const SummaryItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="flex justify-between py-2 border-b border-slate-700/50">
    <dt className="text-slate-400">{label}</dt>
    <dd className="font-semibold text-slate-100">{value}</dd>
  </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-slate-800 rounded-2xl p-6 shadow-2xl ring-1 ring-white/10">
        <h2 className="text-3xl font-semibold text-white border-b border-slate-600 pb-3 mb-4">{title}</h2>
        <dl className="space-y-2">
            {children}
        </dl>
    </div>
);

const conversions = {
  m: { name: 'Meters (m)' },
  cm: { name: 'Centimeters (cm)' },
  in: { name: 'Inches (in)' },
  ft: { name: 'Feet (ft)' },
};

export default function SummaryPage({
  unit,
  setUnit,
  displayDimensions,
  displayResult,
  unitConfig,
  displayBiofilterDimensions,
  biofilterCalculations,
  displayTotalContainerHeight,
  linerDimensions,
  biofilterLinerDimensions,
  combinedLinerSheet,
  fishStocking,
  warnings,
  onSaveAsPdf,
  isSavingPdf,
  pumpLphRange,
  headHeight
}: SummaryPageProps): React.ReactNode {

  const precision = (unit === 'm' || unit === 'ft') ? 2 : 1;
  const { minStock, maxStock } = fishStocking;
  const isTankTooSmall = displayResult.volumeLiters < 500 && (unitConfig.vol === "Liters") || displayResult.volumeLiters < 132 && (unitConfig.vol === "Gallons");

  return (
    <div>
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-white">System Summary</h1>
             <div className="flex items-center gap-4">
                <div className="relative">
                    <select 
                      value={unit}
                      onChange={(e) => setUnit(e.target.value as Unit)}
                      className="bg-slate-700 text-white font-medium text-base rounded-lg pl-4 pr-10 py-2.5 appearance-none focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      aria-label="Select unit of measurement"
                    >
                      {Object.entries(conversions).map(([key, value]) => (
                        <option key={key} value={key}>{value.name}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                      <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                    </div>
                </div>
                <button
                    onClick={onSaveAsPdf}
                    disabled={isSavingPdf}
                    className="bg-gradient-to-b from-cyan-600 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 disabled:from-slate-600 disabled:to-slate-700 disabled:cursor-not-allowed text-white font-bold py-2.5 px-5 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-base shadow-lg shadow-cyan-500/20 transform hover:scale-105"
                >
                    {isSavingPdf ? 'Saving...' : 'Save as PDF'}
                </button>
            </div>
        </div>
        <div className="bg-slate-900">
            <main className="max-w-4xl mx-auto flex flex-col gap-8">
                {warnings.length > 0 && (
                     <div className="bg-yellow-900/50 border border-yellow-700 text-yellow-300 px-5 py-4 rounded-2xl" role="alert">
                        <h2 className="text-2xl font-semibold text-yellow-200 mb-3">Alerts & Recommendations</h2>
                        <ul className="list-disc list-inside space-y-2">
                            {warnings.map((warning, index) => (
                                <li key={index}>{warning}</li>
                            ))}
                        </ul>
                     </div>
                )}
              <Section title="Tank Overview">
                <SummaryItem label="Length" value={`${displayDimensions.length.toFixed(precision)} ${unit}`} />
                <SummaryItem label="Width" value={`${displayDimensions.width.toFixed(precision)} ${unit}`} />
                <SummaryItem label="Max Depth" value={`${displayDimensions.depth.toFixed(precision)} ${unit}`} />
                <SummaryItem label="Bottom Profile" value={`${displayDimensions.curveDepth}% Catenary`} />
                <SummaryItem label="Calculated Volume" value={`${displayResult.volumeLiters.toFixed(0)} ${unitConfig.vol}`} />
              </Section>
              <Section title="Biofilter Overview">
                <SummaryItem label="Dimensions (L x W)" value={`${displayBiofilterDimensions.length.toFixed(precision)} ${unit} × ${displayBiofilterDimensions.width.toFixed(precision)} ${unit}`} />
                <SummaryItem label="BioFilter Height" value={`${displayTotalContainerHeight.toFixed(precision)} ${unit}`} />
                <SummaryItem label="Surface Area" value={`${biofilterCalculations.surfaceAreaM2.toFixed(2)} m²`} />
                <SummaryItem label="Estimated Sand Required" value={`${biofilterCalculations.sandWeightTonnes.toFixed(2)} tonnes (${biofilterCalculations.sandWeightKg.toFixed(0)} kg)`} />
              </Section>
               <Section title="Liner Requirements">
                <SummaryItem label="Fish Tank Liner Size" value={`${linerDimensions.length.toFixed(precision)} ${unit} × ${linerDimensions.width.toFixed(precision)} ${unit}`} />
                <SummaryItem label="Biofilter Liner Size" value={`${biofilterLinerDimensions.length.toFixed(precision)} ${unit} × ${biofilterLinerDimensions.width.toFixed(precision)} ${unit}`} />
                <SummaryItem label="Combined Liner (Single Sheet)" value={`${combinedLinerSheet.length.toFixed(precision)} ${unit} × ${combinedLinerSheet.width.toFixed(precision)} ${unit}`} />
              </Section>
               <Section title="Pump Requirements">
                <SummaryItem label="Required Flow Rate" value={`${pumpLphRange.min.toFixed(0)} - ${pumpLphRange.max.toFixed(0)} LPH`} />
                <SummaryItem label="Configured Head Height" value={`${headHeight.toFixed(precision)} ${unit}`} />
              </Section>
              <Section title="Fish Stocking">
                 <SummaryItem label="Recommended Stocking Rate" value={isTankTooSmall ? "0 Fingerlings" : `${minStock} - ${maxStock} Fingerlings`} />
                 <SummaryItem label="Basis" value="Fingerlings (15g each)" />
              </Section>
            </main>

        </div>
    </div>
  );
}