import React from "react";

/**
 * MethodologyNote – explains the transparent calculation approach
 * and why we chose it over the opaque 70% multiplier pattern.
 */
export default function MethodologyNote() {
  return (
    <aside
      aria-label="How this calculator works"
      className="rounded-xl border border-blue-100 bg-blue-50 p-5 text-sm text-blue-900"
    >
      <div className="flex gap-3">
        {/* Info icon */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mt-0.5 shrink-0 text-blue-500"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4M12 8h.01" />
        </svg>
        <div>
          <p className="font-semibold text-blue-800">How this estimate is calculated</p>
          <ol className="mt-2 list-decimal pl-4 space-y-1 text-blue-800 leading-relaxed">
            <li>
              <strong>Physical volume</strong> — we multiply Length × Width × Height × Quantity
              for each item, then sum them all.
            </li>
            <li>
              <strong>Packing allowance</strong> — we add a flat&nbsp;
              <strong>+1 m³</strong> for packing gaps, aisle access, and loading room. This
              allowance is displayed separately so you can see exactly what was added.
            </li>
            <li>
              <strong>Recommended size</strong> — we round up to the next prototype example size
              that fits your total.
            </li>
          </ol>
          <p className="mt-3 text-xs text-blue-700">
            This approach follows MyStorage&apos;s public guidance of allowing approximately 1 CBM
            above estimated volume, rather than applying an unexplained fixed percentage
            multiplier per item.
          </p>
        </div>
      </div>
    </aside>
  );
}

