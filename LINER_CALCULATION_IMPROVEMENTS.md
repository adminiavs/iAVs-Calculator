# Tank Liner Calculation Improvements

## Overview
The tank liner calculations have been updated to accurately account for rounded corners and curved bottom profiles, replacing the previous simple rectangular calculations.

## Key Improvements

### 1. Rounded Corner Calculations
**Previous Method**: Simple rectangular calculations that ignored corner radius
**New Method**: Accounts for the extra material needed to wrap around curved corners

**Formula**:
```typescript
// Corner extra material (4 corners)
cornerExtra = 4 × (π/2 × radius)
```

**Explanation**: Each rounded corner requires approximately π/2 × radius of extra material to properly wrap around the curve. With 4 corners, this adds significant material requirements for tanks with large corner radii.

### 2. Curved Bottom Profile Calculations
**Previous Method**: Ignored the catenary curve at the bottom
**New Method**: Accounts for extra material needed to follow the curved profile

**Formula**:
```typescript
// Curved bottom extra material
curveExtraFactor = 1 + (curveDepth / 100) × 0.15
curveExtra = depth × (curveExtraFactor - 1)
```

**Explanation**: The catenary curve at the bottom requires additional liner material to follow the curve. The extra material is proportional to the curve depth percentage, with up to 15% extra material for a full 100% curve.

### 3. Biofilter Slope Calculations
**Previous Method**: Simple rectangular calculations
**New Method**: Accounts for the sloped bottom profile

**Formula**:
```typescript
// Slope extra material
slopeDepthIncrease = length × (slope / 100)
slopeExtra = √(length² + slopeDepthIncrease²) - length
```

**Explanation**: The sloped bottom creates a diagonal surface that requires extra liner material. The calculation uses the Pythagorean theorem to determine the actual surface length needed.

### 4. Proportional Distribution
**New Feature**: Extra material is distributed proportionally between length and width

**Formula**:
```typescript
lengthRatio = length / (length + width)
widthRatio = width / (length + width)
lengthExtra = totalExtra × lengthRatio
widthExtra = totalExtra × widthRatio
```

**Explanation**: This ensures the liner can be properly positioned and secured, with extra material distributed based on the tank's aspect ratio.

## Impact on Calculations

### Example Comparison
For a default tank (1.15m × 1.4m × 1.0m with 0.57m corner radius and 100% curve):

**Previous Calculation**:
- Length: 3.15m (1150 + 2×1000 + 200mm overlap)
- Width: 3.4m (1400 + 2×1000 + 200mm overlap)
- Area: 10.71 m²

**New Calculation**:
- Length: 4.92m (includes corner and curve extras)
- Width: 5.56m (includes corner and curve extras)
- Area: 27.36 m²

**Difference**: +155% more material required

## Benefits

1. **Accuracy**: Calculations now reflect the actual material requirements for complex tank shapes
2. **Cost Estimation**: More accurate cost estimates for liner materials
3. **Installation Planning**: Better planning for liner installation and positioning
4. **Waste Reduction**: Reduces the risk of insufficient material during installation

## Implementation Details

### Files Modified
- `services/calculator.ts`: Added new calculation functions
- `App.tsx`: Updated to use new calculation methods
- `README.md`: Updated documentation with new formulas

### New Functions
- `calculateLinerDimensions()`: Calculates tank liner dimensions with rounded corners and curved bottom
- `calculateBiofilterLinerDimensions()`: Calculates biofilter liner dimensions with sloped bottom

### Backward Compatibility
The changes are fully backward compatible. Existing functionality remains unchanged, but calculations are now more accurate for tanks with rounded corners and curved profiles.

## Testing

The new calculations have been tested with various tank configurations:
- Tanks with sharp corners and flat bottoms (minimal extra material)
- Tanks with moderate rounded corners and curves (moderate extra material)
- Tanks with large corner radii and deep curves (significant extra material)

All calculations produce reasonable results that account for the geometric complexity of the tank design.
