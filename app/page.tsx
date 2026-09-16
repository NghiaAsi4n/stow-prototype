"use client";

import React, { useCallback, useMemo, useState } from "react";
import { StorageItem } from "@/types/item";
import { calculateStorage } from "@/lib/calculator";
import ItemRow from "@/components/ItemRow";
import ResultsPanel from "@/components/ResultsPanel";
import MethodologyNote from "@/components/MethodologyNote";

// ---------------------------------------------------------------------------
// Pre-loaded example items matching the guide.md scenario so the page is
// immediately usable without any user input.
// ---------------------------------------------------------------------------
const EXAMPLE_ITEMS: StorageItem[] = [
  { id: "1", name: "Wardrobe", length: "2", width: "0.6", height: "2", quantity: "1" },
  { id: "2", name: "Dining table", length: "1.6", width: "0.8", height: "0.75", quantity: "1" },
  { id: "3", name: "Dining chair", length: "0.5", width: "0.5", height: "0.9", quantity: "6" },
  { id: "4", name: "Cardboard box (60×40×40 cm)", length: "0.6", width: "0.4", height: "0.4", quantity: "10" },
  { id: "5", name: "Bag of clothes", length: "0.5", width: "0.4", height: "0.3", quantity: "10" },
];

let nextId = EXAMPLE_ITEMS.length + 1;
function generateId() {
  return String(nextId++);
}

export default function HomePage() {
  const [items, setItems] = useState<StorageItem[]>(EXAMPLE_ITEMS);

  const handleChange = useCallback((updated: StorageItem) => {
    setItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
  }, []);

  const handleRemove = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleAdd = useCallback(() => {
    const newItem: StorageItem = {
      id: generateId(),
      name: "",
      length: "",
      width: "",
      height: "",
      quantity: "1",
    };
    setItems((prev) => [...prev, newItem]);
  }, []);

  const result = useMemo(() => calculateStorage(items), [items]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ---- Header ---- */}
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
          <div className="flex items-center gap-3">
            {/* Storage icon */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Storage Size Calculator
              </h1>
              <p className="mt-0.5 text-sm text-slate-500">
                Add your items below — we&apos;ll estimate the storage capacity you need,
                showing every calculation step transparently.
              </p>
            </div>
          </div>
          {/* Prototype badge */}
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
            <span className="h-2 w-2 rounded-full bg-amber-400" aria-hidden="true" />
            Prototype — not an official MyStorage calculator
          </div>
        </div>
      </header>

      {/* ---- Main layout ---- */}
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Left column: item list + controls */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-700">
                Your items{" "}
                <span className="ml-1 rounded-full bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-600">
                  {items.length}
                </span>
              </h2>
              <button
                type="button"
                onClick={handleAdd}
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
                  <path d="M12 5v14M5 12h14" />
                </svg>
                Add item
              </button>
            </div>

            {/* Item rows */}
            {items.length === 0 ? (
              <div className="rounded-xl border-2 border-dashed border-slate-300 py-14 text-center">
                <p className="text-slate-400 text-sm">No items yet. Click &ldquo;Add item&rdquo; to get started.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <ItemRow
                    key={item.id}
                    item={item}
                    onChange={handleChange}
                    onRemove={handleRemove}
                  />
                ))}
              </div>
            )}

            {/* Add button (bottom) */}
            {items.length > 0 && (
              <button
                type="button"
                onClick={handleAdd}
                className="w-full rounded-xl border-2 border-dashed border-slate-300 py-3 text-sm font-semibold text-slate-500 transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                + Add another item
              </button>
            )}

            {/* Methodology note */}
            <MethodologyNote />
          </div>

          {/* Right column: results (sticky on desktop) */}
          <div className="lg:sticky lg:top-8 lg:self-start space-y-4">
            <ResultsPanel result={result} />
          </div>
        </div>
      </main>

      {/* ---- Footer ---- */}
      <footer className="mt-12 border-t border-slate-200 bg-white px-4 py-6 text-center text-xs text-slate-400">
        <p>
          This is a <strong>prototype</strong> built as part of a MyStorage Product Engineering
          Intern (AI-Native) assignment. It is not affiliated with or endorsed by MyStorage.
        </p>
        <p className="mt-1">
          Official site:{" "}
          <a
            href="https://mystorage.vn"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-slate-600"
          >
            mystorage.vn
          </a>
        </p>
      </footer>
    </div>
  );
}

