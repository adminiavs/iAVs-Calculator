import { TankDimensions, CalculationResult } from '../types';

/**
 * Calculates the volume and surface area of a custom-shaped fish tank.
 * The tank is a rectangle with rounded corners and a variable-depth curved bottom.
 *
 * @param dimensions - The length, width, depth, corner radius, and curve depth of the tank.
 * @returns An object containing the volume in liters and top surface area in square meters.
 */
export function calculateTankVolume(dimensions: TankDimensions): CalculationResult {
  const { length, width, depth, cornerRadius, curveDepth } = dimensions;

  // Ensure corner radius is not more than half the smallest dimension
  const maxRadius = Math.min(length, width) / 2;
  const r = Math.min(cornerRadius, maxRadius);

  // Convert all dimensions from mm to meters for calculation
  const l_m = length / 1000;
  const w_m = width / 1000;
  const d_m = depth / 1000;
  const r_m = r / 1000;

  // Calculate the area of the top surface (rectangle with rounded corners)
  // Area = (Total Rectangle) - (4 * Corner Square) + (1 * Circle from 4 quarter-circles)
  const topSurfaceAreaM2 = (l_m * w_m) - (4 * r_m * r_m) + (Math.PI * r_m * r_m);

  // The 'U' shape of the bottom is controlled by curveDepth.
  // 0% curveDepth = flat bottom (factor = 1).
  // 100% curveDepth = deep catenary bottom (approximated with a factor of 0.75).
  // We linearly interpolate between these two factors. A catenary is fuller than a parabola (2/3).
  const curveCorrectionFactor = 1 - (curveDepth / 100) * (1 - 0.75);
  
  const volumeM3 = topSurfaceAreaM2 * d_m * curveCorrectionFactor;

  // Convert volume from cubic meters to liters (1 m^3 = 1000 L)
  const volumeLiters = volumeM3 * 1000;

  return {
    volumeLiters,
    topSurfaceAreaM2,
  };
}

/**
 * Calculates accurate liner dimensions for a tank with rounded corners and curved bottom profile.
 * This accounts for the extra material needed to wrap around curved surfaces.
 *
 * @param dimensions - The tank dimensions including corner radius and curve depth
 * @param overlapAmount - Additional overlap amount in mm
 * @returns Object containing the required liner length and width in mm
 */
export function calculateLinerDimensions(dimensions: TankDimensions, overlapAmount: number = 0): { length: number; width: number } {
  const { length, width, depth, cornerRadius, curveDepth } = dimensions;

  // Ensure corner radius is not more than half the smallest dimension
  const maxRadius = Math.min(length, width) / 2;
  const r = Math.min(cornerRadius, maxRadius);

  // Base rectangular liner size (simple box)
  const baseLength = length + (2 * depth);
  const baseWidth = width + (2 * depth);

  // Additional material needed for rounded corners
  // The liner needs to wrap around the curved corners, which requires extra material
  // For each corner, we need approximately π/2 * radius extra material
  const cornerExtra = (Math.PI / 2) * r;
  const totalCornerExtra = 4 * cornerExtra; // 4 corners

  // Additional material needed for curved bottom profile
  // The catenary curve requires extra liner material to follow the curve
  // We approximate this as a percentage of the depth based on curve depth
  const curveExtraFactor = 1 + (curveDepth / 100) * 0.15; // Up to 15% extra for full curve
  const curveExtra = depth * (curveExtraFactor - 1);

  // Calculate total extra material needed
  const totalExtra = totalCornerExtra + curveExtra + overlapAmount;

  // Distribute the extra material proportionally between length and width
  // This ensures the liner can be properly positioned and secured
  const lengthRatio = length / (length + width);
  const widthRatio = width / (length + width);

  const lengthExtra = totalExtra * lengthRatio;
  const widthExtra = totalExtra * widthRatio;

  return {
    length: baseLength + lengthExtra,
    width: baseWidth + widthExtra,
  };
}

/**
 * Calculates accurate liner dimensions for a biofilter with sloped bottom profile.
 * This accounts for the extra material needed to follow the slope.
 *
 * @param biofilterDimensions - The biofilter dimensions including slope
 * @param totalContainerHeightMm - Total container height in mm
 * @param overlapAmount - Additional overlap amount in mm
 * @returns Object containing the required liner length and width in mm
 */
export function calculateBiofilterLinerDimensions(
  biofilterDimensions: { width: number; length: number; shallowDepth: number; slope: number },
  totalContainerHeightMm: number,
  overlapAmount: number = 0
): { length: number; width: number } {
  const { width, length, shallowDepth, slope } = biofilterDimensions;

  // Base rectangular liner size
  const baseLength = length + (2 * totalContainerHeightMm);
  const baseWidth = width + (2 * totalContainerHeightMm);

  // Additional material needed for sloped bottom
  // The slope creates a diagonal surface that requires extra liner material
  // We calculate the extra material needed for the slope
  const slope_m_per_m = slope / 100; // Convert cm/m to m/m
  const length_m = length / 1000;
  const slopeDepthIncrease_m = length_m * slope_m_per_m;
  const slopeDepthIncrease_mm = slopeDepthIncrease_m * 1000;

  // The slope creates a triangular profile that requires extra material
  // We approximate this as the hypotenuse of the slope triangle
  const slopeExtra = Math.sqrt(length_m * length_m + slopeDepthIncrease_m * slopeDepthIncrease_m) * 1000 - length_m * 1000;

  // Calculate total extra material needed
  const totalExtra = slopeExtra + overlapAmount;

  // Distribute the extra material proportionally between length and width
  const lengthRatio = length / (length + width);
  const widthRatio = width / (length + width);

  const lengthExtra = totalExtra * lengthRatio;
  const widthExtra = totalExtra * widthRatio;

  return {
    length: baseLength + lengthExtra,
    width: baseWidth + widthExtra,
  };
}