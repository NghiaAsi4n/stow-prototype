"use client";

import React from "react";
import { CalculationResult, PACKING_ALLOWANCE_M3, PROTOTYPE_SIZE_TIERS } from "@/lib/calculator";

interface ResultsPanelProps {
  result: CalculationResult;
}

function fmt(n: number, decimals = 2) {
  return n.toFixed(decimals);
}

export default function ResultsPanel({ result }: ResultsPanelProps) {
  const { totalPhysicalVolume, packingAllowance, estimatedRequired, recommendedTier, itemVolumes } =
    result;

  const hasItems = itemVolumes.some((iv) => iv.physicalVolume > 0);

  return (
    <section aria-labelledby="results-heading" className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="border-b border-slate-100 bg-slate-50 px-6 py-4">
        <h2 id="results-heading" className="text-lg font-bold text-slate-800">
          Storage Estimate
        </h2>
        <p className="mt-0.5 text-sm text-slate-500">
          Calculated transparently — every number explained below.
        </p>
      </div>

      {/* Item volume breakdown */}
      {itemVolumes.length > 0 && (
        <div className="px-6 pt-4 pb-2">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Volume per item
          </p>
          <ul className="space-y-1">
            {itemVolumes.map((iv) => (
              <li key={iv.id} className="flex justify-between text-sm">
                <span className="text-slate-600 truncate max-w-[60%]">{iv.name}</span>
                <span className={`font-mono font-semibold ${iv.physicalVolume > 0 ? "text-slate-700" : "text-slate-300"}`}>
                  {iv.physicalVolume > 0 ? `${fmt(iv.physicalVolume, 3)} m³` : "—"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Divider */}
      {hasItems && <div className="mx-6 my-2 border-t border-dashed border-slate-200" />}

      {/* Main numbers */}
      <div className="px-6 py-4 space-y-4">
        {/* Physical volume */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-700">Physical item volume</p>
            <p className="mt-0.5 text-xs text-slate-500">
              Sum of L × W × H × qty for each item
            </p>
          </div>
          <span className="font-mono text-xl font-bold text-slate-800 whitespace-nowrap">
            {hasItems ? `${fmt(totalPhysicalVolume)} m³` : "—"}
          </span>
        </div>

        {/* Packing allowance */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-700">Packing / access allowance</p>
            <p className="mt-0.5 text-xs text-slate-500">
              A flat +{PACKING_ALLOWANCE_M3} m³ added for packing gaps and aisle access — shown
              separately so you see exactly what was added and why.
            </p>
          </div>
          <span className="font-mono text-xl font-bold text-amber-600 whitespace-nowrap">
            +{fmt(packingAllowance)} m³
          </span>
        </div>

        {/* Divider with = */}
        <div className="flex items-center gap-2">
          <div className="flex-1 border-t border-slate-200" />
          <span className="text-sm font-bold text-slate-400">=</span>
          <div className="flex-1 border-t border-slate-200" />
        </div>

        {/* Estimated required */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-700">Estimated required capacity</p>
            <p className="mt-0.5 text-xs text-slate-500">
              Physical volume + allowance
            </p>
          </div>
          <span className="font-mono text-xl font-bold text-blue-700 whitespace-nowrap">
            {hasItems ? `${fmt(estimatedRequired)} m³` : "—"}
          </span>
        </div>

        {/* Recommended tier */}
        <div className="rounded-xl bg-blue-600 px-5 py-4 text-white">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">
            Recommended storage size
          </p>
          <p className="mt-1 font-mono text-4xl font-extrabold">
            {!hasItems
              ? "—"
              : recommendedTier !== null
              ? `${recommendedTier} m³`
              : `>${PROTOTYPE_SIZE_TIERS[PROTOTYPE_SIZE_TIERS.length - 1]} m³`}
          </p>
          {hasItems && (
            <p className="mt-2 text-sm text-blue-100 leading-relaxed">
              {recommendedTier !== null
                ? `Your estimated need is ${fmt(estimatedRequired)} m³. The next available prototype size is ${recommendedTier} m³, so that is what we recommend.`
                : `Your estimated need (${fmt(estimatedRequired)} m³) exceeds the largest prototype example size. Contact MyStorage directly for a custom quote.`}
            </p>
          )}
        </div>
      </div>

      {/* Prototype disclaimer */}
      <div className="border-t border-slate-100 bg-amber-50 px-6 py-3">
        <p className="text-xs text-amber-800">
          <strong>Prototype note:</strong> The size tiers above (
          {PROTOTYPE_SIZE_TIERS.join(", ")} m³) are example values covering the 1–23 m³ range
          stated on MyStorage's website. They are <strong>not</strong> official MyStorage
          inventory tiers. Contact{" "}
          <a
            href="https://mystorage.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-amber-900"
          >
            mystorage.vn
          </a>{" "}
          for actual availability.
        </p>
      </div>
    </section>
  );
}

