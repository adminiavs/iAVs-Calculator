# iAVs Calculator

<div align="center">
<img width="1200" height="475" alt="iAVs Calculator Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

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

1. **Start with Tank Design**: Use the Tank tab to set your fish tank dimensions
2. **Configure Biofilter**: Switch to the Biofilter tab to set up your growing beds
3. **Add Liner Details**: Use the Liner tab to calculate material requirements and costs
4. **Select Pump**: Use the Pump tab to determine appropriate pump specifications
5. **Review Summary**: Check the Summary tab for a complete overview of your system
6. **Generate PDF**: Export your design specifications as a PDF report

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

This project is open source and available under the MIT License.

## Resources

- **Official iAVs Website**: https://iAVs.info/
- **iAVs Handbook**: The complete scientific documentation
- **Community Support**: Join the iAVs community for additional guidance

---

*This calculator is based on the official iAVs handbook and implements scientifically validated design principles. For the most up-to-date information and complete documentation, please refer to the official iAVs resources.*
