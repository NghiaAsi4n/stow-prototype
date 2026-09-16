"use client";

import React from "react";
import { CalculationResult, PACKING_ALLOWANCE_M3, PROTOTYPE_SIZE_TIERS } from "@/lib/calculator";
import { Translations } from "@/lib/i18n";

interface ResultsPanelProps {
  result: CalculationResult;
  t: Translations;
}

function fmt(n: number, decimals = 2) {
  return n.toFixed(decimals);
}

export default function ResultsPanel({ result, t }: ResultsPanelProps) {
  const { totalPhysicalVolume, packingAllowance, estimatedRequired, recommendedTier, itemVolumes } =
    result;

  const hasItems = itemVolumes.some((iv) => iv.physicalVolume > 0);

  return (
    <section aria-labelledby="results-heading" className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      <div className="border-b border-slate-100 bg-slate-50 px-6 py-4">
        <h2 id="results-heading" className="text-lg font-bold text-slate-800">
          {t.storageEstimate}
        </h2>
        <p className="mt-0.5 text-sm text-slate-500">
          {t.estimateSubtitle}
        </p>
      </div>

      {/* Item volume breakdown */}
      {itemVolumes.length > 0 && (
        <div className="px-6 pt-4 pb-2">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            {t.volumePerItem}
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
            <p className="text-sm font-semibold text-slate-700">{t.physicalItemVolume}</p>
            <p className="mt-0.5 text-xs text-slate-500">{t.physicalItemVolumeDesc}</p>
          </div>
          <span className="font-mono text-xl font-bold text-slate-800 whitespace-nowrap">
            {hasItems ? `${fmt(totalPhysicalVolume)} m³` : "—"}
          </span>
        </div>

        {/* Packing allowance */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-700">{t.packingAllowance}</p>
            <p className="mt-0.5 text-xs text-slate-500">
              {t.packingAllowanceDesc(PACKING_ALLOWANCE_M3)}
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
            <p className="text-sm font-semibold text-slate-700">{t.estimatedRequired}</p>
            <p className="mt-0.5 text-xs text-slate-500">{t.estimatedRequiredDesc}</p>
          </div>
          <span className="font-mono text-xl font-bold text-blue-700 whitespace-nowrap">
            {hasItems ? `${fmt(estimatedRequired)} m³` : "—"}
          </span>
        </div>

        {/* Recommended tier */}
        <div className="rounded-xl bg-blue-600 px-5 py-4 text-white">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">
            {t.recommendedSize}
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
                ? t.recommendedExplain(fmt(estimatedRequired), recommendedTier)
                : t.recommendedExceedsMax(
                    fmt(estimatedRequired),
                    PROTOTYPE_SIZE_TIERS[PROTOTYPE_SIZE_TIERS.length - 1]
                  )}
            </p>
          )}
        </div>
      </div>

      {/* Prototype disclaimer */}
      <div className="border-t border-slate-100 bg-amber-50 px-6 py-3">
        <p className="text-xs text-amber-800">
          <strong>{t.prototypeNote(PROTOTYPE_SIZE_TIERS.join(", "))}</strong>{" "}
          <a
            href="https://mystorage.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-amber-900"
          >
            mystorage.vn
          </a>{" "}
          {t.prototypeNoteForActual}
        </p>
      </div>
    </section>
  );
}
