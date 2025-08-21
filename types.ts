
export interface TankDimensions {
  length: number;
  width: number;
  depth: number;
  cornerRadius: number;
  curveDepth: number; // 0 = flat, 100 = deep curve
}

export interface CalculationResult {
  volumeLiters: number;
  topSurfaceAreaM2: number;
}

export type Unit = 'm' | 'cm' | 'in' | 'ft';

export interface BiofilterDimensions {
  width: number; // in mm
  length: number; // in mm
  shallowDepth: number; // in mm
  freeboard: number; // in mm
  slope: number; // in cm/m
}