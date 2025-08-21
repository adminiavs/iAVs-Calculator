
import React from 'react';
import LinerCalculator from './LinerCalculator';
import LinerCostSettings from './LinerCostSettings';
import StatCard from './StatCard';
import { Unit } from '../types';

interface LinerPageProps {
  linerLength: number;
  linerWidth: number;
  unit: Unit;
  pricePerUnitArea: number;
  onPriceChange: (price: number) => void;
  totalCost: number | null;
  biofilterLinerLength: number;
  biofilterLinerWidth: number;
  totalBiofilterLinerCost: number | null;
  combinedLinerCost: number | null;
  // Fish Tank Overlap
  includeFishTankLinerOverlap: boolean;
  onIncludeFishTankLinerOverlapChange: (checked: boolean) => void;
  fishTankLinerOverlapAmount: number;
  onFishTankLinerOverlapAmountChange: (amount: number) => void;
  // Biofilter Overlap
  includeBiofilterLinerOverlap: boolean;
  onIncludeBiofilterLinerOverlapChange: (checked: boolean) => void;
  biofilterLinerOverlapAmount: number;
  onBiofilterLinerOverlapAmountChange: (amount: number) => void;
  // Optional Costing
  calculateLinerCost: boolean;
  onCalculateLinerCostChange: (checked: boolean) => void;
  combinedLinerSheet: {
    length: number;
    width: number;
    cost: number | null;
  };
}

export default function LinerPage(props: LinerPageProps): React.ReactNode {
  const precision = (props.unit === 'm' || props.unit === 'ft') ? 2 : 1;
  const combinedSizeDisplay = `${props.combinedLinerSheet.length.toFixed(precision)} ${props.unit} × ${props.combinedLinerSheet.width.toFixed(precision)} ${props.unit}`;

  return (
    <div className="px-4">
      <main className="max-w-4xl mx-auto flex flex-col gap-8">
        <LinerCostSettings
          pricePerUnitArea={props.pricePerUnitArea}
          onPriceChange={props.onPriceChange}
          unit={props.unit}
          calculateLinerCost={props.calculateLinerCost}
          onCalculateLinerCostChange={props.onCalculateLinerCostChange}
        />
        <LinerCalculator
          title="Fish Tank Liner"
          linerLength={props.linerLength}
          linerWidth={props.linerWidth}
          unit={props.unit}
          totalCost={props.totalCost}
          includeOverlap={props.includeFishTankLinerOverlap}
          onIncludeOverlapChange={props.onIncludeFishTankLinerOverlapChange}
          overlapAmount={props.fishTankLinerOverlapAmount}
          onOverlapAmountChange={props.onFishTankLinerOverlapAmountChange}
        />
        <LinerCalculator
          title="BioFilter Liner"
          linerLength={props.biofilterLinerLength}
          linerWidth={props.biofilterLinerWidth}
          unit={props.unit}
          totalCost={props.totalBiofilterLinerCost}
          includeOverlap={props.includeBiofilterLinerOverlap}
          onIncludeOverlapChange={props.onIncludeBiofilterLinerOverlapChange}
          overlapAmount={props.biofilterLinerOverlapAmount}
          onOverlapAmountChange={props.onBiofilterLinerOverlapAmountChange}
        />

        <div className="bg-slate-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white border-b border-slate-700 pb-4 mb-6">Combined Liner (Single Sheet)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <StatCard
                  title="Most Efficient Size"
                  value={combinedSizeDisplay}
                  unit=""
              />
              {props.calculateLinerCost && props.combinedLinerSheet.cost !== null && (
                  <StatCard
                      title="Estimated Cost"
                      value={props.combinedLinerSheet.cost}
                      unit=""
                      isCurrency
                  />
              )}
          </div>
        </div>

        {props.calculateLinerCost && props.combinedLinerCost !== null && (
          <StatCard
              title="Total Cost (Separate Liners)"
              value={props.combinedLinerCost}
              unit=""
              isPrimary
              isCurrency
          />
        )}
      </main>
    </div>
  );
}
