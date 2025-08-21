
import React from 'react';
import { Unit } from '../types';

interface BioFilterDiagramProps {
  length: number;
  shallowDepth: number;
  deepDepth: number;
  freeboard: number;
  unit: Unit;
}

const DimensionLine: React.FC<{ 
  x1: number; y1: number; x2: number; y2: number; 
  label: string; 
  offset?: number; 
}> = ({ x1, y1, x2, y2, label, offset = 10 }) => {
  const isHorizontal = y1 === y2;
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;

  const textProps: React.SVGProps<SVGTextElement> = isHorizontal 
    ? { x: midX, y: y1 - offset, textAnchor: "middle" } 
    : { x: x1 - offset, y: midY, textAnchor: "end", dominantBaseline: "middle" };

  return (
    <g className="stroke-slate-400 stroke-[1.5] text-sm font-medium fill-slate-200">
      <line x1={x1} y1={y1 - 5} x2={x1} y2={y1 + 5} />
      <line x1={x2} y1={y2 - 5} x2={x2} y2={y2 + 5} />
      <line x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-slate-400" />
      <text {...textProps}>{label}</text>
    </g>
  );
};

export default function BioFilterDiagram({ length, shallowDepth, deepDepth, freeboard, unit }: BioFilterDiagramProps): React.ReactNode {
    const PADDING = 30;
    const VIEWBOX_WIDTH = 400;
    
    const totalDepth = Math.max(deepDepth, shallowDepth) + freeboard;
    
    // Determine scaling factor, ensuring we don't divide by zero
    const scaleX = length > 0 ? (VIEWBOX_WIDTH - PADDING * 2) / length : 1;
    const availableHeight = 200; // Define a fixed height for the diagram area
    const scaleY = totalDepth > 0 ? availableHeight / totalDepth : 1;
    
    // Use the smaller scale factor to fit everything without distortion
    const scale = Math.min(scaleX, scaleY);

    const dLength = length * scale;
    const dShallowDepth = shallowDepth * scale;
    const dDeepDepth = deepDepth * scale;
    const dFreeboard = freeboard * scale;

    const containerTopY = PADDING;
    const sandTopYShallow = containerTopY + dFreeboard;
    const sandTopYDeep = containerTopY + dFreeboard;

    const sandBottomYShallow = sandTopYShallow + dShallowDepth;
    const sandBottomYDeep = sandTopYDeep + dDeepDepth;
    
    const startX = PADDING;
    const endX = startX + dLength;

    const viewBoxHeight = Math.max(sandBottomYDeep, sandBottomYShallow) + PADDING;
    const precision = (unit === 'm' || unit === 'ft') ? 2 : 1;

    return (
        <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${viewBoxHeight}`} className="w-full h-full">
            {/* Container */}
            <path 
                d={`
                    M ${startX}, ${containerTopY}
                    L ${startX}, ${sandBottomYShallow}
                    L ${endX}, ${sandBottomYDeep}
                    L ${endX}, ${containerTopY}
                `}
                className="fill-transparent stroke-slate-500 stroke-2"
            />

            {/* Sand Area */}
            <path 
                d={`
                    M ${startX}, ${sandTopYShallow}
                    L ${startX}, ${sandBottomYShallow}
                    L ${endX}, ${sandBottomYDeep}
                    L ${endX}, ${sandTopYDeep}
                    Z
                `}
                className="fill-amber-500/10 stroke-amber-400 stroke-1"
            />
            
            {/* Dimension Lines */}
            <DimensionLine x1={startX} y1={containerTopY - PADDING/2} x2={endX} y2={containerTopY - PADDING/2} label={`${length.toFixed(precision)} ${unit} (Length)`} offset={-5}/>

            {/* Depth and Freeboard on the left */}
            <g className="stroke-slate-400 stroke-[1.5] text-sm font-medium fill-slate-200">
                <line x1={startX - 15} y1={containerTopY} x2={startX - 5} y2={containerTopY} />
                <line x1={startX - 15} y1={sandTopYShallow} x2={startX - 5} y2={sandTopYShallow} />
                <line x1={startX - 10} y1={containerTopY} x2={startX - 10} y2={sandTopYShallow} />
                <text x={startX - 15} y={(containerTopY + sandTopYShallow) / 2} textAnchor="end" dominantBaseline="middle">{`${freeboard.toFixed(precision)} ${unit}`}</text>

                <line x1={startX - 15} y1={sandTopYShallow} x2={startX - 5} y2={sandTopYShallow} />
                <line x1={startX - 15} y1={sandBottomYShallow} x2={startX - 5} y2={sandBottomYShallow} />
                <line x1={startX - 10} y1={sandTopYShallow} x2={startX - 10} y2={sandBottomYShallow} />
                <text x={startX - 15} y={(sandTopYShallow + sandBottomYShallow) / 2} textAnchor="end" dominantBaseline="middle">{`${shallowDepth.toFixed(precision)} ${unit}`}</text>
            </g>

            {/* Deep end depth on the right */}
             <g className="stroke-slate-400 stroke-[1.5] text-sm font-medium fill-slate-200">
                <line x1={endX + 5} y1={sandTopYDeep} x2={endX + 15} y2={sandTopYDeep} />
                <line x1={endX + 5} y1={sandBottomYDeep} x2={endX + 15} y2={sandBottomYDeep} />
                <line x1={endX + 10} y1={sandTopYDeep} x2={endX + 10} y2={sandBottomYDeep} />
                <text x={endX + 15} y={(sandTopYDeep + sandBottomYDeep) / 2} textAnchor="start" dominantBaseline="middle">{`${deepDepth.toFixed(precision)} ${unit}`}</text>
             </g>
        </svg>
    );
}
