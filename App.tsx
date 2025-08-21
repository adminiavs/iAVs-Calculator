
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { TankDimensions, CalculationResult, Unit, BiofilterDimensions } from './types';
import { calculateTankVolume } from './services/calculator';

import { generateSummaryPdf } from './services/pdfService';
import InputSlider from './components/InputSlider';
import TankDiagram from './components/TankDiagram';

import ResultsDisplay from './components/ResultsDisplay';
import FishPage from './components/FishPage';
import LinerPage from './components/LinerPage';
import BioFilterPage from './components/BioFilterPage';
import IAVSLogo from './components/IAVSLogo';
import SummaryPage from './components/SummaryPage';
import PumpPage from './components/PumpPage';

// Conversion constants
const LITERS_PER_GALLON = 3.78541;

const conversions = {
  m: { toMM: (v: number) => v * 1000, fromMM: (v: number) => v / 1000, name: 'Meters (m)', defaultOverlap: 0.2 },
  cm: { toMM: (v: number) => v * 10, fromMM: (v: number) => v / 10, name: 'Centimeters (cm)', defaultOverlap: 20 },
  in: { toMM: (v: number) => v * 25.4, fromMM: (v: number) => v / 25.4, name: 'Inches (in)', defaultOverlap: 8 },
  ft: { toMM: (v: number) => v * 304.8, fromMM: (v: number) => v / 304.8, name: 'Feet (ft)', defaultOverlap: 0.7 },
};

const unitConversions = {
  m: { fromMM: (v: number) => v / 1000 },
  cm: { fromMM: (v: number) => v / 10 },
  in: { fromMM: (v: number) => v / 25.4 },
  ft: { fromMM: (v: number) => v / 304.8 },
};

const DEFAULT_TANK_DIMENSIONS: TankDimensions = {
  length: 1000,
  width: 1200,
  depth: 1200,
  cornerRadius: 320,
  curveDepth: 100,
};

const DEFAULT_BIOFILTER_DIMENSIONS: BiofilterDimensions = {
  width: 1200,
  length: 5000,
  shallowDepth: 300,
  freeboard: 0,
  slope: 2,
};

type ActiveTab = 'summary' | 'tank' | 'fish' | 'liner' | 'biofilter' | 'pump';

export default function App(): React.ReactNode {
  const [dimensions, setDimensions] = useState<TankDimensions>(DEFAULT_TANK_DIMENSIONS);
  const [biofilterDimensions, setBiofilterDimensions] = useState<BiofilterDimensions>(DEFAULT_BIOFILTER_DIMENSIONS);

  const [unit, setUnit] = useState<Unit>('m');
  const [error, setError] = useState<string | null>(null);

  const [includeFishTankLinerOverlap, setIncludeFishTankLinerOverlap] = useState<boolean>(true);
  const [fishTankLinerOverlapAmount, setFishTankLinerOverlapAmount] = useState<number>(conversions[unit].defaultOverlap);
  const [includeBiofilterLinerOverlap, setIncludeBiofilterLinerOverlap] = useState<boolean>(true);
  const [biofilterLinerOverlapAmount, setBiofilterLinerOverlapAmount] = useState<number>(conversions[unit].defaultOverlap);
  
  const [linerPricePerUnitArea, setLinerPricePerUnitArea] = useState<number>(0);
  const [calculateLinerCost, setCalculateLinerCost] = useState<boolean>(false);
  
  const [isSavingPdf, setIsSavingPdf] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>('tank');
  
  const displayTotalContainerHeight = useMemo(() => {
    const { shallowDepth, length, freeboard, slope } = biofilterDimensions;
    const length_m = length / 1000;
    const shallowDepth_m = shallowDepth / 1000;
    const freeboard_m = freeboard / 1000;
    const slope_m_per_m = slope / 100;
    const slopeDepthIncrease_m = length_m * slope_m_per_m;
    const deepDepth_m = shallowDepth_m + slopeDepthIncrease_m;
    const totalContainerHeight_m = deepDepth_m + freeboard_m;
    const totalContainerHeight_mm = totalContainerHeight_m * 1000;
    return conversions[unit].fromMM(totalContainerHeight_mm);
  }, [unit, biofilterDimensions]);

  const [headHeight, setHeadHeight] = useState(displayTotalContainerHeight);
  const [hasUserModifiedHeadHeight, setHasUserModifiedHeadHeight] = useState(false);

  useEffect(() => {
    // This effect now only updates the head height if the user hasn't manually changed it.
    if (!hasUserModifiedHeadHeight) {
      setHeadHeight(displayTotalContainerHeight);
    }
  }, [displayTotalContainerHeight, hasUserModifiedHeadHeight]);

  const handleHeadHeightChange = (value: number) => {
    setHasUserModifiedHeadHeight(true);
    setHeadHeight(value);
  };

  useEffect(() => {
    setFishTankLinerOverlapAmount(conversions[unit].defaultOverlap);
    setBiofilterLinerOverlapAmount(conversions[unit].defaultOverlap);
  }, [unit]);

  const handleResetToDefaults = useCallback(() => {
    setDimensions(DEFAULT_TANK_DIMENSIONS);
    setBiofilterDimensions(DEFAULT_BIOFILTER_DIMENSIONS);
    setUnit('m');
    setError(null);
    setIncludeFishTankLinerOverlap(true);
    setIncludeBiofilterLinerOverlap(true);
    setCalculateLinerCost(false);
    setLinerPricePerUnitArea(0);
    setHasUserModifiedHeadHeight(false); // Reset the flag
    setActiveTab('tank');
  }, []);

  const result: CalculationResult = useMemo(() => calculateTankVolume(dimensions), [dimensions]);

  const handleDimensionChange = useCallback((field: keyof TankDimensions, value: number) => {
    if (field === 'curveDepth') {
      setDimensions(prev => ({ ...prev, [field]: value }));
      return;
    }
    const valueInMm = conversions[unit].toMM(value);
    setDimensions(prev => ({ ...prev, [field]: valueInMm }));
  }, [unit]);

  const handleBiofilterChange = useCallback((field: keyof BiofilterDimensions, value: number) => {
    if (field === 'slope') {
      setBiofilterDimensions(prev => ({ ...prev, [field]: value }));
      return;
    }
    const valueInMm = conversions[unit].toMM(value);
    setBiofilterDimensions(prev => ({ ...prev, [field]: valueInMm }));
  }, [unit]);




  const displayDimensions = useMemo(() => {
    const converter = conversions[unit].fromMM;
    return {
        length: converter(dimensions.length),
        width: converter(dimensions.width),
        depth: converter(dimensions.depth),
        cornerRadius: converter(dimensions.cornerRadius),
        curveDepth: dimensions.curveDepth,
    };
  }, [dimensions, unit]);
  
  const displayBiofilterDimensions = useMemo(() => {
    const converter = conversions[unit].fromMM;
    return {
        width: converter(biofilterDimensions.width),
        length: converter(biofilterDimensions.length),
        shallowDepth: converter(biofilterDimensions.shallowDepth),
        freeboard: converter(biofilterDimensions.freeboard),
        slope: biofilterDimensions.slope,
    };
  }, [biofilterDimensions, unit]);
  
  const isMetric = unit === 'm' || unit === 'cm';

  const displayResult = useMemo(() => {
    if (isMetric) return result;
    return {
      ...result,
      volumeLiters: result.volumeLiters / LITERS_PER_GALLON,
    };
  }, [result, isMetric]);

  const biofilterCalculations = useMemo(() => {
    const { width, length, shallowDepth, freeboard, slope } = biofilterDimensions;
    // Internal calculations are always in meters for consistency
    const width_m = width / 1000;
    const length_m = length / 1000;
    const shallowDepth_m = shallowDepth / 1000;
    const freeboard_m = freeboard / 1000;
    const slope_m_per_m = slope / 100;

    const surfaceArea_m2 = width_m * length_m;

    const slopeDepthIncrease_m = length_m * slope_m_per_m;
    const deepDepth_m = shallowDepth_m + slopeDepthIncrease_m;
    
    // Correct Total Height Calculation: based on the deepest point, not average.
    const sandDepthAtDeepEnd_m = deepDepth_m;
    const totalContainerHeight_m = sandDepthAtDeepEnd_m + freeboard_m;
    const totalContainerHeight_mm = totalContainerHeight_m * 1000;

    // Total volume of the entire biofilter container
    const totalBiofilterVolume_m3 = surfaceArea_m2 * totalContainerHeight_m;
    const totalBiofilterVolumeLiters = totalBiofilterVolume_m3 * 1000;

    const averageSandDepth_m = (shallowDepth_m + deepDepth_m) / 2;
    const sandVolume_m3 = surfaceArea_m2 * averageSandDepth_m;
    const sandVolumeLiters = sandVolume_m3 * 1000;
    
    // Sand weight calculation
    const sandWeightTonnes = sandVolume_m3 * 1.6;
    const sandWeightKg = sandWeightTonnes * 1000;

    // Sand Volume Color Logic
    const targetSandVolumeLiters = result.volumeLiters * 2;
    let sandVolumeColor: 'red' | 'yellow' | 'cyan' = 'cyan';
    if (targetSandVolumeLiters > 1) {
      if (sandVolumeLiters < targetSandVolumeLiters * 0.3) sandVolumeColor = 'red';
      else if (sandVolumeLiters < targetSandVolumeLiters) sandVolumeColor = 'yellow';
    }

    // Surface Area Color Logic
    const tankVolume_m3 = result.volumeLiters / 1000;
    const targetSurfaceArea_m2 = tankVolume_m3 * 6;
    let surfaceAreaColor: 'red' | 'yellow' | 'cyan' = 'cyan';
    if (targetSurfaceArea_m2 > 0.1) {
      if (surfaceArea_m2 < targetSurfaceArea_m2 * 0.8) surfaceAreaColor = 'red';
      else if (surfaceArea_m2 < targetSurfaceArea_m2 * 0.9 || surfaceArea_m2 > targetSurfaceArea_m2 * 1.5) surfaceAreaColor = 'yellow';
    }
    
    return {
        surfaceAreaM2: surfaceArea_m2,
        sandVolumeLiters,
        totalContainerHeightMm: totalContainerHeight_mm,
        sandVolumeColor,
        surfaceAreaColor,
        sandWeightTonnes,
        sandWeightKg,
        totalBiofilterVolumeLiters,
    };
  }, [biofilterDimensions, result.volumeLiters]);
  
  const linerDimensions = useMemo(() => {
    const { length, width, depth } = dimensions; // All in mm
    let overlapMm = 0;
    if (includeFishTankLinerOverlap) {
        overlapMm = conversions[unit].toMM(fishTankLinerOverlapAmount);
    }
    const requiredLengthMm = length + (2 * depth) + overlapMm;
    const requiredWidthMm = width + (2 * depth) + overlapMm;

    const converter = conversions[unit].fromMM;
    return {
        length: converter(requiredLengthMm),
        width: converter(requiredWidthMm),
    };
  }, [dimensions, unit, includeFishTankLinerOverlap, fishTankLinerOverlapAmount]);

  const biofilterLinerDimensions = useMemo(() => {
    const { width, length } = biofilterDimensions;
    const totalContainerDepth_mm = biofilterCalculations.totalContainerHeightMm;

    let overlapMm = 0;
    if (includeBiofilterLinerOverlap) {
        overlapMm = conversions[unit].toMM(biofilterLinerOverlapAmount);
    }

    const requiredLengthMm = length + (2 * totalContainerDepth_mm) + overlapMm;
    const requiredWidthMm = width + (2 * totalContainerDepth_mm) + overlapMm;

    const converter = conversions[unit].fromMM;
    return {
        length: converter(requiredLengthMm),
        width: converter(requiredWidthMm),
    };
  }, [biofilterDimensions, biofilterCalculations.totalContainerHeightMm, unit, includeBiofilterLinerOverlap, biofilterLinerOverlapAmount]);

  const totalLinerCost = useMemo(() => {
    if (!calculateLinerCost) return null;
    const linerArea = linerDimensions.length * linerDimensions.width;
    return linerArea * linerPricePerUnitArea;
  }, [calculateLinerCost, linerDimensions, linerPricePerUnitArea]);

  const totalBiofilterLinerCost = useMemo(() => {
    if (!calculateLinerCost) return null;
    const biofilterLinerArea = biofilterLinerDimensions.length * biofilterLinerDimensions.width;
    return biofilterLinerArea * linerPricePerUnitArea;
  }, [calculateLinerCost, biofilterLinerDimensions, linerPricePerUnitArea]);
  
  const combinedLinerCost = useMemo(() => {
      if (totalLinerCost === null || totalBiofilterLinerCost === null) return null;
      return totalLinerCost + totalBiofilterLinerCost;
  }, [totalLinerCost, totalBiofilterLinerCost]);

  const combinedLinerSheet = useMemo(() => {
    const l1 = linerDimensions.length;
    const w1 = linerDimensions.width;
    const l2 = biofilterLinerDimensions.length;
    const w2 = biofilterLinerDimensions.width;

    const lengthA = Math.max(l1, l2);
    const widthA = w1 + w2;
    const areaA = lengthA * widthA;

    const lengthB = l1 + l2;
    const widthB = Math.max(w1, w2);
    const areaB = lengthB * widthB;

    let finalLength, finalWidth, finalArea;
    if (areaA < areaB) {
        finalLength = lengthA;
        finalWidth = widthA;
        finalArea = areaA;
    } else {
        finalLength = lengthB;
        finalWidth = widthB;
        finalArea = areaB;
    }
    
    const cost = calculateLinerCost ? finalArea * linerPricePerUnitArea : null;

    return {
        length: finalLength,
        width: finalWidth,
        cost: cost,
    };
  }, [linerDimensions, biofilterLinerDimensions, linerPricePerUnitArea, calculateLinerCost]);

  const fishStockingCalculation = useMemo(() => {
    const { volumeLiters } = result;
    const { surfaceAreaM2 } = biofilterCalculations;

    const BASE_STOCKING_MIN = 80;
    const BASE_STOCKING_MAX = 100;
    const IDEAL_VA_RATIO = 6;
    
    const tankVolume_m3 = volumeLiters / 1000;
    const idealBiofilterArea = tankVolume_m3 * IDEAL_VA_RATIO;
    const sufficiencyRatio = idealBiofilterArea > 0 ? surfaceAreaM2 / idealBiofilterArea : 1;

    let stockingMultiplier = 1.0;
    let message = "";

    // Introduce a 2% tolerance. A ratio of 0.98 (98%) or higher is considered sufficient to avoid a penalty.
    if (sufficiencyRatio < 0.98) {
      stockingMultiplier = Math.pow(sufficiencyRatio, 1.5);
      message = "Note: The rate has been adjusted downwards for safety because the biofilter is undersized.";
    } else if (sufficiencyRatio > 1.0) { // If the ratio is above 100%, calculate the bonus.
      const bonusRatio = sufficiencyRatio - 1.0;
      const diminishingBonus = Math.sqrt(bonusRatio) / 2;
      stockingMultiplier = 1.0 + diminishingBonus;
      // Safety Cap
      if (stockingMultiplier > 1.25) {
        stockingMultiplier = 1.25;
        message = "Note: The rate has been increased due to an oversized biofilter, providing a stability bonus (capped at +25%).";
      } else if (stockingMultiplier > 1.0) {
         message = "Note: The rate has been increased due to an oversized biofilter, providing a stability bonus.";
      }
    }
    // If the ratio is between 0.98 and 1.0 (inclusive), the multiplier remains 1.0, and no message is shown. This is the tolerance band.

    const adjustedMin = BASE_STOCKING_MIN * stockingMultiplier;
    const adjustedMax = BASE_STOCKING_MAX * stockingMultiplier;

    const minStock = Math.round(adjustedMin * tankVolume_m3);
    const maxStock = Math.round(adjustedMax * tankVolume_m3);
    
    return { minStock, maxStock, adjustmentMessage: message };
  }, [result.volumeLiters, biofilterCalculations.surfaceAreaM2]);
  
  const pumpLphRange = useMemo(() => {
    // New logic: Pump 25-30% of the volume in 15 minutes.
    // To get the hourly rate (LPH), we multiply by 4 (since there are four 15-min periods in an hour).
    // min: (volume * 0.25) * 4 = volume * 1.0
    // max: (volume * 0.30) * 4 = volume * 1.2
    return {
      min: result.volumeLiters * 1.0,
      max: result.volumeLiters * 1.2,
    }
  }, [result.volumeLiters]);

  const unitConfig = useMemo(() => ({
    vol: isMetric ? 'Liters' : 'Gallons'
  }), [isMetric]);

  const sliderConfig = useMemo(() => {
    const configs: Record<Unit, { dim: { min: number, max: number, step: number, sliderStep: number }, depth: { min: number, max: number, step: number, sliderStep: number }, radius: {step: number, sliderStep: number} }> = {
      m:    { dim: { min: 0.5, max: 10, step: 0.01, sliderStep: 0.1 }, depth: { min: 0.3, max: 5, step: 0.01, sliderStep: 0.1 }, radius: { step: 0.01, sliderStep: 0.05 } },
      cm:   { dim: { min: 50,  max: 1000, step: 1, sliderStep: 10 }, depth: { min: 30, max: 500, step: 1, sliderStep: 10 }, radius: { step: 0.5, sliderStep: 5 } },
      in:   { dim: { min: 20,  max: 394, step: 0.5, sliderStep: 5 }, depth: { min: 12, max: 197, step: 0.5, sliderStep: 5 }, radius: { step: 0.25, sliderStep: 2 } },
      ft:   { dim: { min: 2,   max: 33, step: 0.1, sliderStep: 1 }, depth: { min: 1, max: 16, step: 0.1, sliderStep: 0.5 }, radius: { step: 0.1, sliderStep: 0.5 } },
    };
    return configs[unit];
  }, [unit]);
  
  const biofilterSliderConfig = useMemo(() => {
    const configs: Record<Unit, { width: any, length: any, depth: any, freeboard: any }> = {
        m:  { width: { min: 0.5, max: 5, step: 0.01, sliderStep: 0.05 }, length: { min: 1, max: 20, step: 0.01, sliderStep: 0.1 }, depth: { min: 0.3, max: 0.5, step: 0.01, sliderStep: 0.01 }, freeboard: { min: 0, max: 0.3, step: 0.01, sliderStep: 0.01 } },
        cm: { width: { min: 50, max: 500, step: 1, sliderStep: 5 }, length: { min: 100, max: 2000, step: 1, sliderStep: 10 }, depth: { min: 30, max: 50, step: 1, sliderStep: 1 }, freeboard: { min: 0, max: 30, step: 1, sliderStep: 1 } },
        ft: { width: { min: 2, max: 16, step: 0.1, sliderStep: 0.5 }, length: { min: 3, max: 65, step: 0.1, sliderStep: 1 }, depth: { min: 1, max: 2, step: 0.1, sliderStep: 0.1 }, freeboard: { min: 0, max: 1, step: 0.1, sliderStep: 0.1 } },
        in: { width: { min: 20, max: 200, step: 0.5, sliderStep: 2 }, length: { min: 40, max: 800, step: 1, sliderStep: 10 }, depth: { min: 12, max: 20, step: 0.5, sliderStep: 1 }, freeboard: { min: 0, max: 12, step: 0.5, sliderStep: 1 } },
    };
    return configs[unit];
  }, [unit]);

  const maxCornerRadius = useMemo(() => {
    const minSideMm = Math.min(dimensions.width, dimensions.length);
    const maxRadiusMm = minSideMm / 2;
    return conversions[unit].fromMM(maxRadiusMm);
  }, [dimensions.width, dimensions.length, unit]);
  
  const curveDepthColor = useMemo(() => {
    if (dimensions.curveDepth <= 25) return 'red';
    if (dimensions.curveDepth <= 75) return 'yellow';
    return 'cyan';
  }, [dimensions.curveDepth]);

  const cornerRadiusColor = useMemo(() => {
    const r = dimensions.cornerRadius;
    const b = Math.min(dimensions.length, dimensions.width);
    if (b === 0) return 'cyan';
    const ratio = r / b;
    if (ratio < 0.1 || ratio > 0.5) return 'red';
    if (ratio < 0.2 || ratio > 0.4) return 'yellow';
    return 'cyan';
  }, [dimensions.cornerRadius, dimensions.length, dimensions.width]);
  
  const maxDepthColor = useMemo(() => {
    const { length, width, depth } = dimensions;
    if (depth < 600) return 'red';

    const shortestSide = Math.min(length, width);
    if (depth === 0 || shortestSide === 0) return 'cyan';

    const ratio = shortestSide / depth;

    // New Ideal Range: 0.75 to 1.5
    if (ratio >= 0.75 && ratio <= 1.5) return 'cyan';
    
    // Add a yellow buffer zone around the ideal range
    const buffer = (1.5 - 0.75) * 0.25; // 0.1875
    const yellowLowerBound = 0.75 - buffer; // 0.5625
    const yellowUpperBound = 1.5 + buffer; // 1.6875

    if (ratio >= yellowLowerBound && ratio <= yellowUpperBound) return 'yellow';

    return 'red';
  }, [dimensions.length, dimensions.width, dimensions.depth]);

  const optimalRadiusTooltip = useMemo(() => {
    const b = Math.min(dimensions.length, dimensions.width);
    const minRadiusMm = b * 0.2;
    const maxRadiusMm = b * 0.4;
    const converter = unitConversions[unit].fromMM;
    const minRadiusDisplay = converter(minRadiusMm);
    const maxRadiusDisplay = converter(maxRadiusMm);
    const precision = (unit === 'm' || unit === 'ft') ? 2 : 1;

    return (
      <div className="text-left">
        <p className="font-bold text-white mb-1">Optimal Radius Tip</p>
        <p>
          For best results, aim for a radius between{' '}
          <span className="font-bold text-cyan-300">{minRadiusDisplay.toFixed(precision)} {unit}</span> and{' '}
          <span className="font-bold text-cyan-300">{maxRadiusDisplay.toFixed(precision)} {unit}</span>.
        </p>
      </div>
    );
  }, [dimensions.length, dimensions.width, unit]);
  
  const warnings = useMemo(() => {
    const allWarnings: string[] = [];
    if (curveDepthColor !== 'cyan') {
      allWarnings.push('The Bottom Profile is sub-optimal. A flat bottom may impede waste collection, while a deep curve provides the best stability and cleaning.');
    }
    if (maxDepthColor !== 'cyan') {
      allWarnings.push('The shortest-side-to-depth ratio is outside the ideal range (0.75:1 to 1.5:1), which may indicate a high-risk or unstable design.');
    }
     if (dimensions.depth < 600) {
      allWarnings.push('A depth of less than 60cm is not recommended for fish welfare.');
    }
    if (cornerRadiusColor !== 'cyan') {
      allWarnings.push('The Corner Radius is sub-optimal. The ideal radius is 20-40% of the shortest side for good water circulation.');
    }
    if (biofilterCalculations.sandVolumeColor === 'red') {
      allWarnings.push('The biofilter sand volume is critically low (less than 30% of target). This will not support the fish load.');
    } else if (biofilterCalculations.sandVolumeColor === 'yellow') {
      allWarnings.push('The biofilter sand volume is below the recommended target of 2x the tank volume.');
    }
    if (biofilterCalculations.surfaceAreaColor === 'red') {
      allWarnings.push('The biofilter surface area is critically undersized (more than 20% below target). This poses a high risk to fish health.');
    } else if (biofilterCalculations.surfaceAreaColor === 'yellow') {
      allWarnings.push('The biofilter surface area is outside the optimal range. It should be approximately 6 times the tank volume (m³).');
    }
    if (biofilterDimensions.length > 6000) {
      allWarnings.push('The biofilter is longer than 6m. Additional drainage may be required; consult the iAVs handbook.');
    }
    if (result.volumeLiters < 500) {
      allWarnings.push('A tank volume under 500 Liters is not recommended for stocking fish.');
    }
    if (fishStockingCalculation.adjustmentMessage.includes('downwards')) {
      allWarnings.push('The recommended stocking rate has been reduced due to an undersized biofilter.');
    }
    return allWarnings;
  }, [curveDepthColor, maxDepthColor, cornerRadiusColor, biofilterCalculations, biofilterDimensions.length, result.volumeLiters, fishStockingCalculation.adjustmentMessage, dimensions.depth]);

  const handleSaveSummaryPdf = async () => {
    setIsSavingPdf(true);
    try {
        generateSummaryPdf({
            unit,
            displayDimensions,
            displayResult,
            unitConfig,
            displayBiofilterDimensions,
            biofilterCalculations,
            linerDimensions,
            biofilterLinerDimensions,
            fishStocking: fishStockingCalculation,
            warnings,
            pumpLphRange,
            headHeight
        });
    } catch (err) {
        console.error("Failed to generate PDF:", err);
        setError("Could not generate PDF. Please try again.");
    } finally {
        setIsSavingPdf(false);
    }
  };
  
  const handlePriceChange = useCallback((price: number) => {
    setLinerPricePerUnitArea(price);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <div className="max-w-7xl mx-auto">
        <header className="text-center py-8 px-4">
            <div className="flex items-center justify-center gap-6 relative">
                <IAVSLogo />
                <button 
                    onClick={handleResetToDefaults}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-slate-700 hover:bg-slate-600 text-slate-200 hover:text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors"
                    aria-label="Reset to default settings"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 110 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm1 14a1 1 0 011-1h5.001a5.002 5.002 0 004.087-7.926 1 1 0 111.885-.666A7.002 7.002 0 015.899 15.899V18a1 1 0 11-2 0v-5a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Reset
                </button>
            </div>
            <p className="text-lg text-slate-400 mt-4">Interactively design your Integrated Aqua-Vegeculture System.</p>
        </header>

        <nav className="flex justify-center mb-8">
          <div className="flex space-x-8 border-b border-slate-700">
            <button
              onClick={() => setActiveTab('tank')}
              className={`px-4 py-2 text-lg font-medium transition-colors border-b-2 ${
                activeTab === 'tank' 
                  ? 'text-white border-cyan-400' 
                  : 'text-slate-400 border-transparent hover:text-slate-200'
              }`}
            >
              Tank
            </button>
            <button
              onClick={() => setActiveTab('biofilter')}
              className={`px-4 py-2 text-lg font-medium transition-colors border-b-2 ${
                activeTab === 'biofilter' 
                  ? 'text-white border-cyan-400' 
                  : 'text-slate-400 border-transparent hover:text-slate-200'
              }`}
            >
              BioFilter
            </button>
            <button
              onClick={() => setActiveTab('liner')}
              className={`px-4 py-2 text-lg font-medium transition-colors border-b-2 ${
                activeTab === 'liner' 
                  ? 'text-white border-cyan-400' 
                  : 'text-slate-400 border-transparent hover:text-slate-200'
              }`}
            >
              Liner
            </button>
            <button
              onClick={() => setActiveTab('fish')}
              className={`px-4 py-2 text-lg font-medium transition-colors border-b-2 ${
                activeTab === 'fish' 
                  ? 'text-white border-cyan-400' 
                  : 'text-slate-400 border-transparent hover:text-slate-200'
              }`}
            >
              Fish
            </button>
            <button
              onClick={() => setActiveTab('pump')}
              className={`px-4 py-2 text-lg font-medium transition-colors border-b-2 ${
                activeTab === 'pump' 
                  ? 'text-white border-cyan-400' 
                  : 'text-slate-400 border-transparent hover:text-slate-200'
              }`}
            >
              Pump
            </button>
            <button
              onClick={() => setActiveTab('summary')}
              className={`px-4 py-2 text-lg font-medium transition-colors border-b-2 ${
                activeTab === 'summary' 
                  ? 'text-white border-cyan-400' 
                  : 'text-slate-400 border-transparent hover:text-slate-200'
              }`}
            >
              Summary
            </button>
          </div>
        </nav>

        {activeTab === 'summary' && (
          <SummaryPage
            unit={unit}
            setUnit={setUnit}
            displayDimensions={displayDimensions}
            displayResult={displayResult}
            unitConfig={unitConfig}
            displayBiofilterDimensions={displayBiofilterDimensions}
            biofilterCalculations={biofilterCalculations}
            displayTotalContainerHeight={displayTotalContainerHeight}
            linerDimensions={linerDimensions}
            biofilterLinerDimensions={biofilterLinerDimensions}
            combinedLinerSheet={combinedLinerSheet}
            fishStocking={fishStockingCalculation}
            warnings={warnings}
            onSaveAsPdf={handleSaveSummaryPdf}
            isSavingPdf={isSavingPdf}
            pumpLphRange={pumpLphRange}
            headHeight={headHeight}
          />
        )}

        {activeTab === 'tank' && (
          <div className="px-4">
            <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column: Controls & Results */}
              <div className="flex flex-col gap-8">
                {/* INPUTS */}
                <div className="bg-slate-800 rounded-lg p-6">
                  <p className="text-slate-400 text-sm mb-4 italic">Enter your dimensional values to suit the desired scale.</p>
                  <div className="flex justify-between items-center border-b border-slate-700 pb-4 mb-6">
                    <h2 className="text-xl font-semibold text-white">Tank Configuration</h2>
                    <div className="relative">
                      <select 
                        value={unit}
                        onChange={(e) => setUnit(e.target.value as Unit)}
                        className="bg-slate-700 text-white text-sm rounded-lg pl-3 pr-8 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
                        aria-label="Select unit of measurement"
                      >
                        {Object.entries(conversions).map(([key, value]) => (
                          <option key={key} value={key} className="bg-slate-800">{value.name}</option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <InputSlider label="Length" value={displayDimensions.length} onChange={(v) => handleDimensionChange('length', v)} min={sliderConfig.dim.min} max={sliderConfig.dim.max} step={sliderConfig.dim.step} sliderStep={sliderConfig.dim.sliderStep} unit={unit} />
                    <InputSlider label="Width" value={displayDimensions.width} onChange={(v) => handleDimensionChange('width', v)} min={sliderConfig.dim.min} max={sliderConfig.dim.max} step={sliderConfig.dim.step} sliderStep={sliderConfig.dim.sliderStep} unit={unit} />
                    <InputSlider 
                      label="Max Depth" 
                      value={displayDimensions.depth} 
                      onChange={(v) => handleDimensionChange('depth', v)} 
                      min={sliderConfig.depth.min} 
                      max={sliderConfig.depth.max} 
                      step={sliderConfig.depth.step} 
                      sliderStep={sliderConfig.depth.sliderStep}
                      unit={unit} 
                      accentColor={maxDepthColor}
                      tooltip="A depth of less than 60cm is not recommended for fish welfare. The color also indicates structural soundness: Cyan is an ideal shortest-side-to-depth ratio (0.75:1 to 1.5:1), Yellow is a warning, and Red indicates a high-risk design."
                    />
                    <InputSlider 
                      label="Corner Radius" 
                      value={displayDimensions.cornerRadius} 
                      onChange={(v) => handleDimensionChange('cornerRadius', v)} 
                      min={0} max={maxCornerRadius} 
                      step={sliderConfig.radius.step} 
                      sliderStep={sliderConfig.radius.sliderStep}
                      unit={unit}
                      accentColor={cornerRadiusColor}
                      tooltip={optimalRadiusTooltip}
                    />
                     <InputSlider
                      label="Bottom Profile"
                      value={dimensions.curveDepth}
                      onChange={(v) => handleDimensionChange('curveDepth', v)}
                      min={0} max={100}
                      step={1}
                      sliderStep={5}
                      unit="%"
                      accentColor={curveDepthColor}
                      tooltip="A catenary shape increases side wall stability and naturally directs solid waste to a central point for easy removal, improving water quality."
                    />
                  </div>
                </div>

                {/* OUTPUTS */}
                <ResultsDisplay 
                  result={displayResult}
                  units={unitConfig}
                />
              </div>

              {/* Right Column: Diagram */}
              <div className="bg-slate-800 rounded-lg p-6">
                 <div className="border-b border-slate-700 pb-4 mb-6">
                    <h2 className="text-xl font-semibold text-white">Technical Diagram</h2>
                </div>
                <div className="bg-slate-900 rounded-lg p-4 min-h-[400px]">
                  <TankDiagram dimensions={dimensions} displayDimensions={displayDimensions} unit={unit} />
                </div>
              </div>
            </main>
          </div>
        )}
        
        {activeTab === 'fish' && (
          <FishPage
            minStock={fishStockingCalculation.minStock}
            maxStock={fishStockingCalculation.maxStock}
            adjustmentMessage={fishStockingCalculation.adjustmentMessage}
            isTankTooSmall={result.volumeLiters < 500}
            tankVolumeLiters={result.volumeLiters}
            biofilterVolumeLiters={biofilterCalculations.totalBiofilterVolumeLiters}
          />
        )}

        {activeTab === 'liner' && (
          <LinerPage
            linerLength={linerDimensions.length}
            linerWidth={linerDimensions.width}
            unit={unit}
            pricePerUnitArea={linerPricePerUnitArea}
            onPriceChange={handlePriceChange}
            totalCost={totalLinerCost}
            biofilterLinerLength={biofilterLinerDimensions.length}
            biofilterLinerWidth={biofilterLinerDimensions.width}
            totalBiofilterLinerCost={totalBiofilterLinerCost}
            combinedLinerCost={combinedLinerCost}
            includeFishTankLinerOverlap={includeFishTankLinerOverlap}
            onIncludeFishTankLinerOverlapChange={setIncludeFishTankLinerOverlap}
            fishTankLinerOverlapAmount={fishTankLinerOverlapAmount}
            onFishTankLinerOverlapAmountChange={setFishTankLinerOverlapAmount}
            includeBiofilterLinerOverlap={includeBiofilterLinerOverlap}
            onIncludeBiofilterLinerOverlapChange={setIncludeBiofilterLinerOverlap}
            biofilterLinerOverlapAmount={biofilterLinerOverlapAmount}
            onBiofilterLinerOverlapAmountChange={setBiofilterLinerOverlapAmount}
            calculateLinerCost={calculateLinerCost}
            onCalculateLinerCostChange={setCalculateLinerCost}
            combinedLinerSheet={combinedLinerSheet}
          />
        )}

        {activeTab === 'biofilter' && (
          <BioFilterPage
            dimensions={biofilterDimensions}
            displayDimensions={displayBiofilterDimensions}
            onChange={handleBiofilterChange}
            unit={unit}
            sliderConfig={biofilterSliderConfig}
            calculations={biofilterCalculations}
            tankVolumeLiters={result.volumeLiters}
          />
        )}

        {activeTab === 'pump' && (
          <PumpPage
            lphMin={pumpLphRange.min}
            lphMax={pumpLphRange.max}
            biofilterHeight={displayTotalContainerHeight}
            unit={unit}
            headHeight={headHeight}
            onHeadHeightChange={handleHeadHeightChange}
          />
        )}
      </div>
    </div>
  );
}
