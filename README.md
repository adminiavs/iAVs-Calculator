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
<p>Get a complete overview of your iAVs system with all specifications, warnings, and the ability to generate detailed PDF reports.</p>
</details>

### Key Features

#### 🐟 **Fish Tank Design**
- **Catenary Shape**: Calculates optimal tank dimensions with rounded corners and curved bottom
- **Volume Calculation**: Precise volume calculations accounting for the unique tank geometry
- **Surface Area**: Determines the top surface area for proper fish stocking density
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

## Contributing

This calculator is designed to help the iAVs community build better systems. Contributions are welcome! Please ensure any changes maintain the scientific accuracy of the calculations and follow the established coding standards.

## License

This project is available under the **iAVs Attribution License**, which requires:
- Attribution to "iAVs" in any use or distribution
- A clearly visible link to https://iavs.info/
- Credit format: "Powered by iAVs - https://iavs.info/"

This ensures proper recognition of the iAVs system and helps users find official resources.

## Resources

- **Official iAVs Website**: https://iAVs.info/
- **iAVs Handbook**: The complete scientific documentation
- **Community Support**: Join the iAVs community for additional guidance

---

*This calculator is based on the official iAVs handbook and implements scientifically validated design principles. For the most up-to-date information and complete documentation, please refer to the official iAVs resources.*
