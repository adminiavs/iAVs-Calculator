import { TankDimensions, CalculationResult } from '../types';

// This function now returns a static, generic set of digging advice
// instead of calling an AI API.
export async function getDiggingAdvice(dimensions: TankDimensions, _result: CalculationResult): Promise<string> {
  const length_m = (dimensions.length / 1000).toFixed(2);
  const width_m = (dimensions.width / 1000).toFixed(2);
  const depth_m = (dimensions.depth / 1000).toFixed(2);

  const staticAdvice = `
You are building a tank with the following approximate dimensions:
- **Length:** ${length_m}m
- **Width:** ${width_m}m
- **Maximum Depth:** ${depth_m}m

Here is a general guide for excavating your tank.

### 1. Marking the Outline
*   **Establish a Baseline:** Start by running a straight string line to mark one of the long edges of your tank.
*   **Mark the Corners:** Use a builder's square or the 3-4-5 method to create perfect 90-degree corners. Place stakes at all four corner points of a rectangle measuring ${length_m}m x ${width_m}m.
*   **Mark the Curves:** To mark the rounded corners, measure the specified radius from the corner along both straight edges. Place a stake at the center of the corner square. Use a string tied to this stake like a compass to draw a smooth arc on the ground with marking paint or flour.
*   **Final Outline:** Connect the straight lines and the arcs to create the final shape of your tank's top edge.

### 2. Initial Digging
*   **Remove Sod:** First, remove the top layer of grass or sod from the entire marked area.
*   **Start from the Center:** Begin digging from the middle and work your way outwards. This helps manage the excavated soil and prevents the edges from collapsing early on.
*   **Establish Depth:** Dig down uniformly across the area. Use a long, straight board with a spirit level on top to periodically check that you are maintaining a consistent depth as you go.

### 3. Shaping the Bottom Profile
The shape of the bottom is crucial for waste collection. The "Bottom Profile" slider in the app determines this shape.
*   **For a Flatter Bottom (0-25% Profile):** Your goal is to create a level base at the target depth of ${depth_m}m. Use the board and level frequently to ensure the entire bottom is flat and firm.
*   **For a Catenary 'U' Shape (75-100% Profile):** This shape is ideal for waste collection.
    *   Dig to the full ${depth_m}m depth only along the center line of the tank.
    *   Gradually slope the sides from the top edge down towards the center. Imagine you are carving a gentle, wide bowl.
    *   The walls should be smooth and flow into the bottom curve without sharp angles. A shovel or spade is great for "shaving" the walls to get a smooth finish.

### 4. Final Checks
*   **Smoothness:** Run your hand over the walls and floor. Remove any sharp rocks, roots, or debris that could damage the liner.
*   **Measurements:** Double-check your final length, width, and depth measurements. It's better to make adjustments now than after the liner is in.
*   **Tamp Down:** Tamp down the entire excavated surface to create a firm and stable base for your liner. A thin layer of soft sand (underlayment) can be added to further protect the liner.

Good luck with your build!
  `;

  // Simulate a short network delay for a better user experience
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(staticAdvice);
    }, 500); // 0.5 second delay
  });
}
