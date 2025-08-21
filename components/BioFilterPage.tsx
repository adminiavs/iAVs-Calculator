import React, { useMemo } from 'react';
import { BiofilterDimensions, Unit } from '../types';
import InputSlider from './InputSlider';
import StatCard from './StatCard';
import BioFilterDiagram from './BioFilterDiagram';

interface BioFilterPageProps {
  dimensions: BiofilterDimensions; // Raw mm values
  displayDimensions: { // Values in the current display unit
    width: number;
    length: number;
    shallowDepth: number;
    freeboard: number;
    slope: number;
  };
  onChange: (field: keyof BiofilterDimensions, value: number) => void;
  unit: Unit;
  sliderConfig: {
      width: any;
      length: any;
      depth: any;
      freeboard: any;
  };
  calculations: {
    surfaceAreaM2: number;
    sandVolumeLiters: number;
    totalContainerHeightMm: number;
    sandVolumeColor: 'red' | 'yellow' | 'cyan';
    surfaceAreaColor: 'red' | 'yellow' | 'cyan';
    sandWeightTonnes: number;
    sandWeightKg: number;
    totalBiofilterVolumeLiters: number;
  };
  tankVolumeLiters: number;
}

const unitConversions = {
  m: { fromMM: (v: number) => v / 1000 },
  cm: { fromMM: (v: number) => v / 10 },
  in: { fromMM: (v: number) => v / 25.4 },
  ft: { fromMM: (v: number) => v / 304.8 },
};

export default function BioFilterPage({ dimensions, displayDimensions, onChange, unit, sliderConfig, calculations, tankVolumeLiters }: BioFilterPageProps): React.ReactNode {
  
  const derivedDisplayValues = useMemo(() => {
    const { shallowDepth, length, slope } = dimensions;
    const length_m = length / 1000;
    const shallowDepth_m = shallowDepth / 1000;
    const slope_m_per_m = slope / 100;
    const slopeDepthIncrease_m = length_m * slope_m_per_m;
    const deepDepth_m = shallowDepth_m + slopeDepthIncrease_m;
    
    const converter = unitConversions[unit].fromMM;
    const displayDeepDepth = converter(deepDepth_m * 1000);
    const displayTotalContainerHeight = converter(calculations.totalContainerHeightMm);
    
    return { displayDeepDepth, displayTotalContainerHeight };
  }, [dimensions, calculations.totalContainerHeightMm, unit]);

  const showLengthWarning = (dimensions.length / 1000) > 6; // Check in meters
  
  // Volume comparison calculations
  const volumeComparison = useMemo(() => {
    const targetBiofilterVolume = tankVolumeLiters * 2; // Target is 2x tank volume
    const actualBiofilterVolume = calculations.totalBiofilterVolumeLiters;
    
    const percentageDiff = Math.abs((actualBiofilterVolume - targetBiofilterVolume) / targetBiofilterVolume) * 100;
    
    let actualVolumeColor: 'red' | 'yellow' | 'cyan' = 'cyan';
    if (percentageDiff >= 30) {
      actualVolumeColor = 'red';
    } else if (percentageDiff >= 10) {
      actualVolumeColor = 'yellow';
    }
    
    return {
      targetVolume: targetBiofilterVolume,
      actualVolume: actualBiofilterVolume,
      actualVolumeColor,
      percentageDiff
    };
  }, [tankVolumeLiters, calculations.totalBiofilterVolumeLiters]);
  
  const sandWeightTooltip = (
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-80 p-3 bg-slate-900 ring-1 ring-slate-600 rounded-lg shadow-lg text-sm text-left text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
        <p>This is an estimate based on an average dry sand density (1600 kg/m³). The actual weight can vary based on moisture and sand type. Please confirm with your supplier and consider purchasing 5-10% extra.</p>
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-600"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto flex flex-col gap-8">
      {/* Volume Comparison Box */}
      <div className="bg-slate-800 rounded-2xl p-6 shadow-2xl ring-1 ring-white/10">
        <h2 className="text-2xl font-semibold text-white mb-6 border-b border-slate-700 pb-4">BioFilter Volume Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <StatCard
            title="Target BioFilter Volume"
            value={volumeComparison.targetVolume}
            unit="Liters"
            precision={0}
            tooltip="Target biofilter volume is 2x the tank volume for optimal performance"
          />
          <StatCard
            title="Actual BioFilter Volume"
            value={volumeComparison.actualVolume}
            unit="Liters"
            precision={0}
            accentColor={volumeComparison.actualVolumeColor}
            tooltip={`Current biofilter volume differs by ${volumeComparison.percentageDiff.toFixed(1)}% from target. Cyan is optimal (±10%), yellow is acceptable (10-30% difference), red indicates significant deviation (>30%)`}
          />
        </div>
      </div>

      {/* Main Content Grid */}
      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column: Configuration & Diagram */}
      <div className="flex flex-col gap-8">
        <div className="bg-slate-800 rounded-2xl p-6 shadow-2xl ring-1 ring-white/10 flex flex-col gap-8">
          <h2 className="text-3xl font-semibold text-white border-b border-slate-700 pb-4">BioFilter Configuration</h2>
          <InputSlider label="Width" value={displayDimensions.width} onChange={(v) => onChange('width', v)} min={sliderConfig.width.min} max={sliderConfig.width.max} step={sliderConfig.width.step} sliderStep={sliderConfig.width.sliderStep} unit={unit} />
          <InputSlider label="Length" value={displayDimensions.length} onChange={(v) => onChange('length', v)} min={sliderConfig.length.min} max={sliderConfig.length.max} step={sliderConfig.length.step} sliderStep={sliderConfig.length.sliderStep} unit={unit} />
          <InputSlider label="Sand Depth (Shallow End)" value={displayDimensions.shallowDepth} onChange={(v) => onChange('shallowDepth', v)} min={sliderConfig.depth.min} max={sliderConfig.depth.max} step={sliderConfig.depth.step} sliderStep={sliderConfig.depth.sliderStep} unit={unit} tooltip="30cm is recommended for most uses." />
          <InputSlider label="Slope" value={displayDimensions.slope} onChange={(v) => onChange('slope', v)} min={2} max={10} step={1} unit="cm/m" tooltip="The recommended slope is 2cm per meter." />
          <InputSlider label="Freeboard" value={displayDimensions.freeboard} onChange={(v) => onChange('freeboard', v)} min={sliderConfig.freeboard.min} max={sliderConfig.freeboard.max} step={sliderConfig.freeboard.step} sliderStep={sliderConfig.freeboard.sliderStep} unit={unit} tooltip="Freeboard is the distance from the top of the sand to the top of the biofilter container." />
        </div>
        <div className="bg-slate-800 rounded-2xl p-6 shadow-2xl ring-1 ring-white/10">
            <h2 className="text-3xl font-semibold text-white border-b border-slate-700 pb-4 mb-4">Technical Diagram</h2>
            <div className="min-h-[250px] bg-slate-900 rounded-lg p-2">
                <BioFilterDiagram 
                    length={displayDimensions.length}
                    shallowDepth={displayDimensions.shallowDepth}
                    deepDepth={derivedDisplayValues.displayDeepDepth}
                    freeboard={displayDimensions.freeboard}
                    unit={unit}
                />
            </div>
        </div>
      </div>

      {/* Right Column: Results */}
      <div className="bg-slate-800 rounded-2xl p-6 shadow-2xl ring-1 ring-white/10 flex flex-col gap-6">
        <h2 className="text-3xl font-semibold text-white border-b border-slate-700 pb-4">Calculated Results</h2>
         <StatCard
          title="BioFilter Height"
          value={derivedDisplayValues.displayTotalContainerHeight}
          unit={unit}
          precision={1}
        />
        <StatCard
          title="Sand Depth (Deep End)"
          value={derivedDisplayValues.displayDeepDepth}
          unit={unit}
          precision={1}
        />
        <StatCard 
          title="Surface Area" 
          value={calculations.surfaceAreaM2} 
          unit="m²"
          accentColor={calculations.surfaceAreaColor}
          precision={2}
        />
        <StatCard
          title="Volume of Sand"
          value={calculations.sandVolumeLiters}
          unit="Liters"
          accentColor={calculations.sandVolumeColor}
          tooltip="This is the volume of sand required for the biofilter. The color indicates how well it matches the recommended target (2x the tank volume). Cyan is ideal, yellow is a warning, and red is critically low."
        />
        <StatCard
          title="Estimated Sand Required"
          value={`${calculations.sandWeightTonnes.toFixed(2)} tonnes (${calculations.sandWeightKg.toFixed(0)} kg)`}
          unit=""
          tooltip={sandWeightTooltip}
        />
        {showLengthWarning && (
          <div className="bg-yellow-900/50 border border-yellow-700 text-yellow-300 px-4 py-3 rounded-lg text-base mt-2" role="alert">
            <p className="font-bold">Caution: Long Biofilter</p>
            <p>For biofilters longer than 6 meters (approx. 20ft), additional drainage may be required. Please refer to the iAVs handbook for advanced designs.</p>
          </div>
        )}
      </div>
    </main>
    </div>
  );
}