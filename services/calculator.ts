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