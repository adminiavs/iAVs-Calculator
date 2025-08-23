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
  
  // Volume comparison calculations
  const volumeComparison = useMemo(() => {
    const targetVolume = tankVolumeLiters * 2; // Target is 2x tank volume
    const actualVolume = calculations.totalBiofilterVolumeLiters;
    
    if (targetVolume === 0) {
      return { targetVolume, actualVolume, color: 'cyan' as const };
    }
    
    const ratio = actualVolume / targetVolume;
    const percentageDiff = Math.abs(ratio - 1) * 100;
    
    let color: 'red' | 'yellow' | 'cyan' = 'cyan';
    
    if (ratio < 1) {
      // Biofilter is smaller than target - more strict
      if (percentageDiff >= 30) {
        color = 'red';
      } else if (percentageDiff >= 10) {
        color = 'yellow';
      }
    } else {
      // Biofilter is larger than target - more lenient
      if (percentageDiff >= 50) {
        color = 'red';
      } else if (percentageDiff >= 20) {
        color = 'yellow';
      }
    }
    
    return { 
      targetVolume, 
      actualVolume, 
      color, 
      actualVolumeColor: color, // Alias for StatCard compatibility
      percentageDiff: parseFloat(percentageDiff.toFixed(1))
    };
  }, [tankVolumeLiters, calculations.totalBiofilterVolumeLiters]);

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
  
  const sandWeightTooltip = (
    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-80 p-3 bg-slate-900 ring-1 ring-slate-600 rounded-lg shadow-lg text-sm text-left text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none">
        <p>This is an estimate based on an average dry sand density (1600 kg/m³). The actual weight can vary based on moisture and sand type. Please confirm with your supplier and consider purchasing 5-10% extra.</p>
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-600"></div>
    </div>
  );

  return (
    <div className="px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Content Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Configuration & Diagram */}
        <div className="flex flex-col gap-8">
          <div className="bg-slate-800 rounded-lg p-6">
            <p className="text-slate-400 text-sm mb-4 italic">Enter your dimensional values to suit the desired scale.</p>
            <h2 className="text-xl font-semibold text-white border-b border-slate-700 pb-4 mb-6">BioFilter Configuration</h2>
            <div className="space-y-6">
              <InputSlider label="Width" value={displayDimensions.width} onChange={(v) => onChange('width', v)} min={sliderConfig.width.min} max={sliderConfig.width.max} step={sliderConfig.width.step} sliderStep={sliderConfig.width.sliderStep} unit={unit} tooltip="Standard biofilter widths typically range from 900 mm to 1200 mm. This manageable size allows an operator to easily reach at least halfway across the bed for maintenance, planting, or harvesting." />
              <InputSlider label="Length" value={displayDimensions.length} onChange={(v) => onChange('length', v)} min={sliderConfig.length.min} max={sliderConfig.length.max} step={sliderConfig.length.step} sliderStep={sliderConfig.length.sliderStep} unit={unit} tooltip="For home systems, biofilters are typically shorter, ranging from 3 to 6 meters (approximately 10 to 20 feet) in length. This shorter length facilitates easier maintenance and grading for drainage. Biofilters 4-6 meters (13.1-19.7 feet) long: Will likely benefit from additional drainage assistance. Biofilters 6 meters (19.7 feet) or longer: WILL require additional drainage assistance. Refer to the iAVs Handbook." />
              <InputSlider label="Sand Depth (Shallow End)" value={displayDimensions.shallowDepth} onChange={(v) => onChange('shallowDepth', v)} min={sliderConfig.depth.min} max={sliderConfig.depth.max} step={sliderConfig.depth.step} sliderStep={sliderConfig.depth.sliderStep} unit={unit} tooltip="The biofilter bed should be at least 30 cm deep at its shallowest side, with an optimal range for most horticultural purposes between 300 mm and 400 mm." />
              <InputSlider label="Slope" value={displayDimensions.slope} onChange={(v) => onChange('slope', v)} min={2} max={10} step={1} unit="cm/m" tooltip="The ideal slope is 1:50, which translates to a vertical drop of 20 mm (2 cm) per meter of bed length. The sloped bottom is a critical design feature because it ensures complete and rapid water drainage after an irrigation cycle. This prevents water from pooling in the biofilters, which could lead to waterlogging and the formation of anaerobic zones. It is crucial that the surface of the sand remains nearly level, as the slope applies only to the bottom of the Biofilter." />
              <InputSlider label="Freeboard" value={displayDimensions.freeboard} onChange={(v) => onChange('freeboard', v)} min={sliderConfig.freeboard.min} max={sliderConfig.freeboard.max} step={sliderConfig.freeboard.step} sliderStep={sliderConfig.freeboard.sliderStep} unit={unit} tooltip="Freeboard is the distance from the top of the sand to the top of the biofilter container." />
            </div>
          </div>
          <div className="bg-slate-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white border-b border-slate-700 pb-4 mb-6">Technical Diagram</h2>
              <div className="min-h-[250px] bg-slate-900 rounded-lg p-4">
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
        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white border-b border-slate-700 pb-4 mb-6">Calculated Results</h2>
          <div className="space-y-6">
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
            <div className="bg-yellow-900/50 border border-yellow-700 text-yellow-300 px-4 py-3 rounded-lg text-sm mt-4" role="alert">
              <p className="font-semibold">Caution: Long Biofilter</p>
              <p>For biofilters longer than 6 meters (approx. 20ft), additional drainage may be required. Please refer to the iAVs handbook for advanced designs.</p>
            </div>
          )}
          </div>
        </div>
      </main>
      </div>
    </div>
  );
}