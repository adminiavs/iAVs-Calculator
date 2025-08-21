
import React from 'react';
import { TankDimensions, Unit } from '../types';

interface TankDiagramProps {
  dimensions: TankDimensions;
  displayDimensions: {
    length: number;
    width: number;
    depth: number;
    cornerRadius: number;
  };
  unit: Unit;
}

const VIEWBOX_WIDTH = 400;
const PADDING = 45;

const DimensionLine: React.FC<{ 
  x1: number; y1: number; x2: number; y2: number; 
  label: string; 
  offset?: number; 
  isInternal?: boolean 
  textAnchor?: 'start' | 'middle' | 'end';
}> = ({ x1, y1, x2, y2, label, offset = 10, isInternal = false, textAnchor }) => {
  const isHorizontal = y1 === y2;
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  const textProps: React.SVGProps<SVGTextElement> = isHorizontal 
    ? { x: midX, y: y1 + offset, textAnchor: "middle", dominantBaseline: offset > 0 ? "hanging" : "auto" } 
    : { x: x1 + offset, y: midY, textAnchor: textAnchor || (offset > 0 ? "start" : "end"), dominantBaseline: "middle" };
    
  const showTicks = !isInternal;

  return (
    <g className="stroke-slate-400 stroke-[1.5] text-sm font-medium fill-slate-200">
       {showTicks && (
         <>
          {isHorizontal ? (
            <>
              <line x1={x1} y1={y1 - 5} x2={x1} y2={y1 + 5} />
              <line x1={x2} y1={y2 - 5} x2={x2} y2={y2 + 5} />
            </>
          ) : (
            <>
              <line x1={x1 - 5} y1={y1} x2={x1 + 5} y2={y1} />
              <line x1={x2 - 5} y1={y2} x2={x2 + 5} y2={y2} />
            </>
          )}
        </>
       )}
      <line 
        x1={x1} y1={y1} x2={x2} y2={y2} 
        className="stroke-slate-400"
      />
      <text {...textProps}>{label}</text>
    </g>
  );
};


export default function TankDiagram({ dimensions, displayDimensions, unit }: TankDiagramProps): React.ReactNode {
  const { length, width, depth, cornerRadius, curveDepth } = dimensions; // Raw mm dimensions for scaling

  const maxDim = Math.max(length, width); // Base scaling on L/W for consistent view
  const scale = (maxDim > 0 ? (VIEWBOX_WIDTH - PADDING * 2) / maxDim : 0);
  const dLength = length * scale;
  const dWidth = width * scale;
  // Scale depth more conservatively to show more realistic proportions
  const dDepth = depth * scale * 0.7; // Reduce depth scaling by 30% for better visual proportions
  const dRadius = Math.min(cornerRadius * scale, dLength/2, dWidth/2);

  // Top View
  const topX = PADDING;
  const topY = PADDING;
  const pathData = `
    M ${topX + dRadius},${topY}
    L ${topX + dLength - dRadius},${topY}
    A ${dRadius},${dRadius} 0 0 1 ${topX + dLength},${topY + dRadius}
    L ${topX + dLength},${topY + dWidth - dRadius}
    A ${dRadius},${dRadius} 0 0 1 ${topX + dLength - dRadius},${topY + dWidth}
    L ${topX + dRadius},${topY + dWidth}
    A ${dRadius},${dRadius} 0 0 1 ${topX},${topY + dWidth - dRadius}
    L ${topX},${topY + dRadius}
    A ${dRadius},${dRadius} 0 0 1 ${topX + dRadius},${topY}
    Z
  `;

  // Side View (Profile)
  const sideViewY = topY + dWidth + PADDING;
  const curveAmount = curveDepth / 100;
  
  const straightWallHeight = dDepth * (1 - curveAmount);
  const curveHeight = dDepth * curveAmount;

  const curveStartPointY = sideViewY + straightWallHeight;
  const curveDeepestY = sideViewY + dDepth;
  
  const widthViewPath = `
    M ${topX},${sideViewY}
    L ${topX},${curveStartPointY}
    A ${dWidth / 2},${curveHeight} 0 0 0 ${topX + dWidth},${curveStartPointY}
    L ${topX + dWidth},${sideViewY}
  `;
  
  const effectiveViewboxHeight = curveDeepestY + PADDING;
  const effectiveViewboxWidth = Math.max(topX + dLength + PADDING, topX + dWidth + PADDING);
  const precision = (unit === 'm' || unit === 'ft') ? 2 : 1;

  const displayCurveDepthVal = displayDimensions.depth * curveAmount;
  const displayStraightDepthVal = displayDimensions.depth * (1 - curveAmount);
  
  return (
    <svg viewBox={`0 0 ${effectiveViewboxWidth} ${effectiveViewboxHeight}`} className="w-full h-full">
      {/* Top View */}
      <g>
        <text x={topX} y={PADDING / 2.5} className="fill-slate-300 font-semibold text-base">Top View</text>
        <path d={pathData} className="fill-cyan-500/10 stroke-cyan-400 stroke-2" />
        <DimensionLine x1={topX} y1={topY - PADDING / 2} x2={topX + dLength} y2={topY - PADDING / 2} label={`${displayDimensions.length.toFixed(precision)} ${unit}`} offset={-8} />
        <DimensionLine x1={topX - PADDING/2} y1={topY} x2={topX-PADDING/2} y2={topY + dWidth} label={`${displayDimensions.width.toFixed(precision)} ${unit}`} offset={-8} />
        {dRadius > 10 && <DimensionLine x1={topX} y1={topY + dRadius} x2={topX + dRadius} y2={topY + dRadius} label={`R${displayDimensions.cornerRadius.toFixed(precision)} ${unit}`} offset={8} isInternal={true}/>}
      </g>
      
      {/* Side View */}
      <g>
         <text x={topX} y={sideViewY - 12} className="fill-slate-300 font-semibold text-base">Vertical Section across Width</text>
         <path d={widthViewPath} className="fill-cyan-500/10 stroke-cyan-400 stroke-2" />
         
         {/* Vertical Centerline */}
         <line x1={topX + dWidth/2} y1={sideViewY} x2={topX + dWidth/2} y2={curveDeepestY} className="stroke-slate-600 stroke-1" />

         {/* Overall dimension lines */}
         <DimensionLine x1={topX - PADDING/2} y1={sideViewY} x2={topX - PADDING/2} y2={curveDeepestY} label={`${displayDimensions.depth.toFixed(precision)} ${unit}`} offset={-8} />
         <DimensionLine x1={topX} y1={curveDeepestY + 8} x2={topX + dWidth} y2={curveDeepestY + 8} label={`${displayDimensions.width.toFixed(precision)} ${unit}`} offset={12} />

         {/* Internal depth breakdown */}
         {straightWallHeight > 5 && 
            <DimensionLine 
              x1={topX + dWidth / 2} y1={sideViewY} 
              x2={topX + dWidth / 2} y2={curveStartPointY} 
              label={`Straight: ${displayStraightDepthVal.toFixed(precision)} ${unit}`} 
              offset={-8}
              isInternal={true}
              textAnchor="end"
            />
         }
         {curveHeight > 5 && 
            <DimensionLine 
              x1={topX + dWidth / 2} y1={curveStartPointY} 
              x2={topX + dWidth / 2} y2={curveDeepestY} 
              label={`Maximum depth: ${displayCurveDepthVal.toFixed(precision)} ${unit}`} 
              offset={8}
              isInternal={true}
              textAnchor="start"
            />
         }
      </g>
    </svg>
  );
}
