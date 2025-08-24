# iAVs Calculator

<div align="center">
<img width="1200" height="475" alt="iAVs Calculator Banner" src="images/iavs calc header.png" />
</div>

> **Enter your dimensional values to suit the desired scale.**

## What is iAVs?

**iAVs** (Integrated Aqua-Vegeculture System) is a scientifically validated, closed-loop food production system that combines aquaculture (fish farming) with soil-based horticulture. It was designed to use water very efficiently while being simple and easy to manage from both practical and technical standpoints.

### How iAVs Works

The iAVs system operates through a natural cycle powered by a simple water pump and timer:

1. **Fish Tank**: Holds fish and acts as the primary water reservoir
2. **Sand Biofilter**: Filled with carefully selected sand, serves as both the growing area for plants and the system's natural filter
3. **Water Pump**: Moves water from the fish tank to the sand biofilter(s)
4. **Timer**: Controls when and for how long the water pump runs

The system creates a symbiotic relationship where:
- Fish produce waste that becomes nutrients for plants
- Plants filter the water, keeping it clean for fish
- The sand biofilter provides both mechanical and biological filtration
- Water is continuously recycled, making the system highly water-efficient

## About This Calculator

The **iAVs Calculator** is a comprehensive design and planning tool that helps you calculate the optimal dimensions and specifications for your iAVs. It implements the scientifically validated ratios and design principles from the official iAVs handbook.

### 🚀 **[Try the Live Demo](https://adminiavs.github.io/iAVs-Calculator/)**

## Application Overview

<div align="center">
<img src="images/iavs calc tank page.png" alt="Tank Design Page" width="800" />
<p><em>Tank Design Page - Configure your fish tank dimensions with real-time 3D visualization</em></p>
</div>

The calculator features six comprehensive modules, each designed to help you build the perfect iAVs system:

## ✨ **Key Features**

- 🎯 **Scientific Accuracy**: Based on official iAVs handbook and validated ratios
- 📏 **Multi-Unit Support**: Works with meters, centimeters, feet, and inches  
- 🎨 **Real-time Visualization**: Interactive 3D diagrams update as you design
- ⚡ **Instant Calculations**: All results update immediately as you adjust parameters
- 🎨 **Color-coded Feedback**: Visual indicators show optimal vs. warning zones
- 📊 **Professional Reports**: Generate detailed PDF specifications
- 💰 **Cost Estimation**: Calculate material costs based on local pricing
- 🌐 **Web-based**: No installation required - runs in any modern browser

### 📸 **Application Screenshots**

<details>
<summary><strong>🐟 Tank Design Page</strong></summary>
<br>
<img src="images/iavs calc tank page.png" alt="Tank Design Page" width="800" />
<p>Design your fish tank with optimal catenary shape, rounded corners, and precise volume calculations. The interactive 3D diagram updates in real-time as you adjust dimensions.</p>
</details>

<details>
<summary><strong>🌱 Biofilter Configuration</strong></summary>
<br>
<img src="images/iavs calc biofilter page.png" alt="Biofilter Page" width="800" />
<p>Configure your sand biofilter with scientifically validated ratios. The calculator ensures optimal 1:2 volume ratio and 1:6 area ratio for maximum efficiency.</p>
</details>

<details>
<summary><strong>💰 Liner Calculations</strong></summary>
<br>
<img src="images/iavs calc liner page.png" alt="Liner Page" width="800" />
<p>Calculate exact liner requirements for both fish tank and biofilter, including overlap allowances and cost estimation based on your local pricing.</p>
</details>

<details>
<summary><strong>🐠 Fish Stocking Guide</strong></summary>
<br>
<img src="images/iavs calc fish page.png" alt="Fish Page" width="800" />
<p>Determine optimal fish stocking rates based on your system's capacity. The calculator automatically adjusts recommendations based on biofilter efficiency.</p>
</details>

<details>
<summary><strong>⚡ Pump Specifications</strong></summary>
<br>
<img src="images/iavs calc pump page.png" alt="Pump Page" width="800" />
<p>Calculate pump requirements including flow rates and head height. Ensure your pump can efficiently circulate water throughout your system.</p>
</details>

<details>
<summary><strong>📊 System Summary</strong></summary>
<br>
<img src="images/iavs calc summary page.png" alt="Summary Page" width="800" />
<p>Get a complete overview of your iAVs with all specifications, warnings, and the ability to generate detailed PDF reports.</p>
</details>

### Key Features

#### 🐟 **Fish Tank Design**
- **Catenary Shape**: Calculates optimal tank dimensions with rounded corners and curved bottom
- **Volume Calculation**: Precise volume calculations accounting for the unique tank geometry
- **Surface Area**: Determines the top surface area for proper planting density
- **Visual Diagrams**: Interactive diagrams showing tank shape and dimensions

#### 🌱 **Biofilter Calculations**
- **Core Ratios**: Implements the scientifically validated 1:2 volume ratio (fish tank:biofilter) and 1:6 area ratio
- **Sand Volume**: Calculates the exact amount of sand needed for optimal filtration
- **Slope Design**: Ensures proper 2cm per meter slope for efficient water flow
- **Surface Area**: Determines the growing area available for plants

#### 💰 **Cost Estimation**
- **Liner Calculations**: Determines the exact amount of liner material needed
- **Overlap Allowances**: Includes proper overlap for secure installation
- **Cost Estimation**: Calculates material costs based on your local pricing

#### 🔧 **System Components**
- **Pump Selection**: Helps determine appropriate pump specifications
- **Head Height**: Calculates the required pump head for your system layout
- **Flow Rates**: Determines optimal water circulation parameters

#### 📊 **Real-time Feedback**
- **Color-coded Results**: Visual indicators show if your design meets optimal ratios
- **Unit Conversion**: Supports meters, centimeters, inches, and feet
- **Instant Updates**: All calculations update in real-time as you adjust dimensions

### Scientific Foundation

This calculator is based on the official iAVs handbook and implements:

- **Volume Ratio (V:V)**: 1:2 - For every liter of fish tank volume, two liters of biofilter volume
- **Area Ratio (V:A)**: 1:6 - For every cubic meter of fish tank volume, six square meters of biofilter area
- **Optimal Tank Shape**: Catenary curve bottom for efficient waste collection
- **Sand Depth**: 30cm at shallow end with 2cm per meter slope
- **Proven Design Principles**: Based on decades of research and field testing

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)

### Installation

1. **Clone or download the repository**
   ```bash
   git clone <repository-url>
   cd iavs-calculator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` and replace `your_actual_gemini_api_key_here` with your actual Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

4. **Run the application**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to access the calculator

### Usage Guide

The iAVs Calculator provides an intuitive, step-by-step workflow to design your complete system:

1. **🐟 Tank Design**: Start by configuring your fish tank dimensions with real-time 3D visualization
2. **🌱 Biofilter Setup**: Design your sand biofilter with automatic ratio validation  
3. **💰 Liner Planning**: Calculate exact material requirements and costs
4. **🐠 Fish Stocking**: Determine optimal fish capacity for your system
5. **⚡ Pump Selection**: Find the right pump specifications for efficient water circulation
6. **📊 System Review**: Get a complete overview with warnings and recommendations
7. **📄 Export PDF**: Generate professional reports for construction and reference

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality
- `npm run lint:fix` - Automatically fix linting issues
- `npm run type-check` - Run TypeScript type checking

### Project Structure

```
iavs-calculator/
├── components/          # React components
│   ├── TankDiagram.tsx  # Fish tank visualization
│   ├── BioFilterDiagram.tsx # Biofilter visualization
│   ├── InputSlider.tsx  # Reusable slider component
│   └── ...              # Other UI components
├── services/            # Business logic
│   ├── calculator.ts    # Core calculation engine
│   ├── geminiService.ts # AI advice generation
│   └── pdfService.ts    # PDF report generation
├── hooks/               # Custom React hooks
├── types.ts             # TypeScript type definitions
└── App.tsx              # Main application component
```

## Technical Details

### Calculation Engine

The calculator uses precise mathematical models to determine:

- **Tank Volume**: Accounts for rounded corners and catenary curve bottom
- **Biofilter Ratios**: Ensures optimal 1:2 volume and 1:6 area ratios
- **Sand Requirements**: Calculates exact sand volume and weight
- **Liner Material**: Determines liner area with proper overlap allowances
- **Pump Specifications**: Calculates head height and flow requirements

### Units and Conversions

The calculator supports multiple unit systems:
- **Metric**: Meters (m) and Centimeters (cm)
- **Imperial**: Feet (ft) and Inches (in)

All internal calculations use millimeters for precision, with real-time conversion to display units.

### Data Validation

The calculator includes comprehensive validation to ensure:
- Dimensions are within practical limits
- Ratios meet scientific requirements
- Calculations are mathematically sound
- Results are physically achievable

## Technical Specifications & Formulas

### Warning System Overview

The calculator implements a comprehensive warning system with three levels:
- **🟢 Cyan (Optimal)**: Design parameters within ideal ranges
- **🟡 Yellow (Caution)**: Parameters approaching limits or requiring attention
- **🔴 Red (Warning)**: Parameters outside safe/functional ranges

### Tank Design Warnings

#### 1. Aspect Ratio Warnings
**Formula**: `Aspect Ratio = max(Length, Width) / min(Length, Width)`

- **🟢 Cyan (Optimal)**: 1.2 ≤ AR ≤ 3.0
  - Sweet spot for rectangular tanks with good circulation
- **🟡 Yellow (Caution)**: AR < 1.2 (too square) OR AR > 3.0 (elongated)
  - Square tanks may be less space-efficient
  - Elongated tanks (AR > 3.0) can be efficient for commercial operations with proper design
  - Long, narrow "canal" designs are actually optimal for large-scale aquaculture

#### 2. Depth Warnings
**Formula**: Based on Shortest Horizontal Dimension (SHD) = min(Length, Width)

- **🟢 Cyan (Optimal)**: Depth ≤ SHD
  - Depth less than or equal to shortest horizontal dimension
- **🟡 Yellow (Caution)**: Depth > SHD
  - Depth exceeds shortest horizontal dimension, indicating increasing structural demands
- **🔴 Red (Warning)**: Depth > 1.5 × SHD
  - Critical point where depth is 50% greater than shortest horizontal dimension

#### 3. Corner Radius Warnings
**Formula**: Based on Shortest Horizontal Dimension (SHD) = min(Length, Width)

- **🔴 Red (Danger / Warning)**: Two critical failure conditions
  - **Condition 1**: Radius < 0.05 × SHD (Critically sharp corners)
    - Creates major stress concentrators and structural weak points
  - **Condition 2**: Radius > 0.5 × SHD (Geometrically impossible)
    - Overlapping circles create impossible geometry
- **🟡 Yellow (Caution)**: 0.05 × SHD ≤ Radius < 0.25 × SHD
  - Functional but sub-optimal design with tight corners
  - Better than sharp corners but lacks structural benefits of generous curves
- **🟢 Cyan (Optimal)**: 0.25 × SHD ≤ Radius ≤ 0.5 × SHD
  - Generous, strong curves that distribute stress excellently
  - Includes semicircular ends (Radius = 0.5 × SHD) as perfectly optimal design

#### 4. Bottom Profile Warnings
**Formula**: Curve Depth Percentage (0-100%)

- **🟢 Cyan (Optimal)**: 75% ≤ Curve ≤ 100%
  - Deep catenary provides best stability and waste collection
- **🟡 Yellow (Caution)**: 25% < Curve < 75%
  - Moderate curve may impede waste collection
- **🔴 Red (Warning)**: Curve ≤ 25%
  - Flat bottom may impede waste collection and reduce stability

### Biofilter Design Warnings

#### 1. Volume Ratio Warnings
**Formula**: `Biofilter Volume / Tank Volume`

- **🟢 Cyan (Optimal)**: Ratio = 2.0 (1:2 ratio)
  - Scientifically validated optimal ratio
- **🟡 Yellow (Caution)**: 0.9 ≤ Ratio < 2.0
  - Biofilter undersized, may not support fish load
- **🔴 Red (Warning)**: Ratio < 0.3
  - Critically undersized biofilter

#### 2. Surface Area Warnings
**Formula**: `Biofilter Surface Area / Tank Volume (m³)`

- **🟢 Cyan (Optimal)**: Ratio = 6.0 (1:6 ratio)
  - Scientifically validated optimal ratio
- **🟡 Yellow (Caution)**: 4.8 ≤ Ratio < 6.0 OR Ratio > 9.0
  - Surface area outside optimal range
- **🔴 Red (Warning)**: Ratio < 4.8
  - Critically undersized surface area

### Core Calculation Formulas

#### Tank Volume Calculation (Standard Parabolic Volume Method)
```typescript
// Top surface area (rounded rectangle)
// Formula: Area = (Length × Width) - (4 - π) × Radius²
topSurfaceArea = (length × width) - (4 - π) × radius²

// Standard Parabolic Volume Calculation
// 1. Calculate cross-sectional area components:
//    - Rectangular area = Width × Straight Wall Height
//    - Parabolic area = (2/3) × Width × Curved Bottom Depth
// 2. Calculate average depth from cross-section
// 3. Total Volume = Top Surface Area × Average Depth

curvedBottomDepthRatio = curveDepth / 100  // Convert percentage to decimal
curvedBottomDepth = depth × curvedBottomDepthRatio
straightWallHeight = depth - curvedBottomDepth

rectangularArea = width × straightWallHeight
parabolicArea = (2/3) × width × curvedBottomDepth
totalCrossSectionalArea = rectangularArea + parabolicArea

averageDepth = totalCrossSectionalArea / width
volume = topSurfaceArea × averageDepth
```

#### Biofilter Calculations
```typescript
// Surface area
surfaceArea = width × length

// Depth calculations with slope
slopeDepthIncrease = length × (slope / 100)  // slope in cm/m
deepDepth = shallowDepth + slopeDepthIncrease

// Sand volume (average depth)
averageSandDepth = (shallowDepth + deepDepth) / 2
sandVolume = surfaceArea × averageSandDepth

// Sand weight (1600 kg/m³ density)
sandWeight = sandVolume × 1.6

// Total container height (for liner calculations)
totalContainerHeight = deepDepth + freeboard
```

#### Fish Stocking Calculations
```typescript
// Base stocking rate
baseStockingRate = 80-100 fingerlings per 1000 liters

// Biofilter adjustment factor (with 2% tolerance)
if (biofilterRatio < 0.98) {
  biofilterAdjustmentFactor = Math.pow(biofilterRatio, 1.5)
} else if (biofilterRatio > 1.0) {
  const bonusRatio = biofilterRatio - 1.0
  const diminishingBonus = Math.sqrt(bonusRatio) / 2
  biofilterAdjustmentFactor = 1.0 + diminishingBonus
  // Safety cap at 1.25 (25% bonus)
  if (biofilterAdjustmentFactor > 1.25) biofilterAdjustmentFactor = 1.25
} else {
  biofilterAdjustmentFactor = 1.0
}

// Design Efficiency Factor
// Bottom Profile Efficiency
if (curvePercent >= 60) {
  bottomProfileEfficiency = 1.0  // Optimal catenary
} else if (curvePercent <= 25) {
  bottomProfileEfficiency = 0.8  // 20% penalty for flat bottom
} else {
  // Linear interpolation between 25% and 60%
  bottomProfileEfficiency = 0.8 + ((curvePercent - 25) * (0.2 / 35))
}

// Corner Radius Efficiency
if (radius >= 0.25 * SHD) {
  cornerRadiusEfficiency = 1.0  // Optimal rounded corners
} else if (radius < 0.05 * SHD) {
  cornerRadiusEfficiency = 0.7  // 30% penalty for sharp corners
} else {
  // Linear interpolation between 5% and 25% of SHD
  cornerRadiusEfficiency = 0.7 + ((radius - (0.05 * SHD)) * (0.3 / (0.2 * SHD)))
}

// Total Design Efficiency
totalDesignEfficiency = bottomProfileEfficiency × cornerRadiusEfficiency

// Final stocking rate
finalStockingRate = baseStockingRate × biofilterAdjustmentFactor × totalDesignEfficiency
```

**Design Efficiency Factor Explanation:**
The calculator includes a Design Efficiency Factor that penalizes tank designs with poor hydraulic characteristics:

- **Bottom Profile**: Flat bottoms (≤25% catenary) receive a 20% penalty due to poor solids removal
- **Corner Radius**: Sharp corners (<5% of smallest dimension) receive a 30% penalty due to dead zones
- **Combined Effect**: Both factors multiply together, ensuring realistic stocking recommendations

This prevents users from gaining higher fish recommendations by designing inefficient tanks that simply increase raw volume.

#### Liner Calculations (Accurate for Rounded Corners and Curved Profiles)
```typescript
// Tank liner with rounded corners and curved bottom
baseLength = length + (2 × totalDepth)  // totalDepth = depth + freeboard
baseWidth = width + (2 × totalDepth)

// Corner extra material (4 corners)
cornerExtra = 4 × (π/2 × radius)

// Curved bottom extra material
curveExtraFactor = 1 + (curveDepth / 100) × 0.15  // Up to 15% extra for full curve
curveExtra = depth × (curveExtraFactor - 1)

// Total extra material
totalExtra = cornerExtra + curveExtra + overlap

// Distribute proportionally
lengthRatio = length / (length + width)
widthRatio = width / (length + width)
lengthExtra = totalExtra × lengthRatio
widthExtra = totalExtra × widthRatio

finalLength = baseLength + lengthExtra
finalWidth = baseWidth + widthExtra

// Biofilter liner with sloped bottom
baseLength = length + (2 × totalContainerHeight)
baseWidth = width + (2 × totalContainerHeight)

// Slope extra material (hypotenuse calculation)
slopeDepthIncrease = length × (slope / 100)
slopeExtra = √(length² + slopeDepthIncrease²) - length

// Distribute proportionally
lengthExtra = slopeExtra × (length / (length + width))
widthExtra = slopeExtra × (width / (length + width))

finalLength = baseLength + lengthExtra
finalWidth = baseWidth + widthExtra
```

#### Pump Specifications
```typescript
// Flow rate range (25-30% volume turnover in 15 minutes)
// Converted to hourly rates
minFlowRate = tankVolume × 1.0  // 100% turnover per hour
maxFlowRate = tankVolume × 1.2  // 120% turnover per hour

// Head height
headHeight = biofilterHeight + elevationDifference
```

### Unit Conversion System

All internal calculations use millimeters for precision:
```typescript
// Conversion factors
const conversions = {
  m: { toMM: (v) => v * 1000, fromMM: (v) => v / 1000 },
  cm: { toMM: (v) => v * 10, fromMM: (v) => v / 10 },
  in: { toMM: (v) => v * 25.4, fromMM: (v) => v / 25.4 },
  ft: { toMM: (v) => v * 304.8, fromMM: (v) => v / 304.8 }
}

// Volume conversions for display
const LITERS_PER_GALLON = 3.78541;
```

### Validation Rules

1. **Minimum Tank Volume**: 500 liters for fish welfare
2. **Minimum Depth**: 60cm for fish welfare
3. **Maximum Biofilter Length**: 6m (requires additional drainage)
4. **Corner Radius Limit**: Cannot exceed half of shortest side
5. **Aspect Ratio Limits**: 1.2:1 to 3.0:1 for optimal design
6. **Depth-to-Side Ratio**: 0.75:1 to 1.5:1 for structural stability
7. **Curve Depth Range**: 0-100% (0 = flat bottom, 100 = deep catenary)
8. **Slope Range**: 0-10 cm/m for biofilter design
9. **Freeboard Range**: 0-300mm for tank and biofilter
10. **Overlap Allowance**: 0-500mm for liner installations

### Mathematical Foundations

#### Parabolic Volume Calculation
The tank volume calculation uses the **Standard Parabolic Volume Method**, which accurately accounts for the catenary curve bottom:

1. **Cross-Sectional Analysis**: The tank is analyzed as a series of cross-sections
2. **Rectangular Component**: Straight wall sections contribute rectangular area
3. **Parabolic Component**: Curved bottom sections contribute parabolic area using the (2/3) rule
4. **Average Depth**: The effective depth is calculated from the total cross-sectional area
5. **Volume Integration**: Total volume = Surface area × Average depth

This method provides more accurate results than simple geometric approximations and accounts for the complex geometry of rounded corners and curved bottoms.

#### Biofilter Slope Calculations
The biofilter uses a linear slope calculation:
- **Slope Definition**: Rise over run in cm/m
- **Depth Increase**: `slopeDepthIncrease = length × (slope / 100)`
- **Deep End Depth**: `deepDepth = shallowDepth + slopeDepthIncrease`
- **Average Depth**: `(shallowDepth + deepDepth) / 2`

#### Design Efficiency Factors
The calculator implements sophisticated efficiency factors that penalize poor hydraulic designs:

1. **Bottom Profile Efficiency**: Based on catenary curve depth
   - Optimal (60-100%): No penalty
   - Sub-optimal (25-60%): Linear interpolation
   - Poor (0-25%): 20% penalty

2. **Corner Radius Efficiency**: Based on corner radius relative to smallest dimension
   - Optimal (≥25% of SHD): No penalty
   - Sub-optimal (5-25% of SHD): Linear interpolation
   - Poor (<5% of SHD): 30% penalty

### Performance Considerations

- **Real-time Updates**: All calculations update immediately on parameter changes
- **Precision**: Internal calculations use millimeters, display uses user-selected units
- **Validation**: Comprehensive checks prevent physically impossible configurations
- **Visual Feedback**: Color-coded indicators provide immediate design guidance
- **Memory Efficiency**: Calculations use memoization to prevent redundant computations

## Contributing

This calculator is designed to help the iAVs community build better systems. Contributions are welcome! Please ensure any changes maintain the scientific accuracy of the calculations and follow the established coding standards.

## License

This project is available under the **iAVs Attribution License**, which requires:
- Attribution to "Integrated Aqua Vegeculture System (iAVs)" in any use or distribution
- A clearly visible link to https://iavs.info/
- Credit format: "Integrated Aqua Vegeculture System (iAVs) - https://iavs.info/"

This ensures proper recognition of the iAVs system and helps users find official resources.

## Resources

- **Official iAVs Website**: https://iAVs.info/
- **iAVs Handbook**: The complete scientific documentation
- **Community Support**: Join the iAVs community for additional guidance

---

*This calculator is based on the official iAVs handbook and implements scientifically validated design principles. For the most up-to-date information and complete documentation, please refer to the official iAVs resources.*
