"use client";

import React from "react";
import { StorageItem, ValidationErrors } from "@/types/item";
import { itemPhysicalVolume, parseDimension, parseQuantity } from "@/lib/calculator";

interface ItemRowProps {
  item: StorageItem;
  onChange: (updated: StorageItem) => void;
  onRemove: (id: string) => void;
}

function validate(item: StorageItem): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!item.name.trim()) errors.name = "Item name is required.";
  if (isNaN(parseDimension(item.length))) errors.length = "Must be a positive number (m).";
  if (isNaN(parseDimension(item.width))) errors.width = "Must be a positive number (m).";
  if (isNaN(parseDimension(item.height))) errors.height = "Must be a positive number (m).";
  if (isNaN(parseQuantity(item.quantity))) errors.quantity = "Must be a positive whole number.";
  return errors;
}

export default function ItemRow({ item, onChange, onRemove }: ItemRowProps) {
  const errors = validate(item);
  const hasErrors = Object.keys(errors).length > 0;
  const volume = itemPhysicalVolume(item);

  function handleField(field: keyof StorageItem, value: string | boolean) {
    onChange({ ...item, [field]: value });
  }

  return (
    <div
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
      role="group"
      aria-label={`Storage item: ${item.name || "Unnamed"}`}
    >
      {/* Row header: name + volume badge + remove button */}
      <div className="mb-3 flex items-start gap-3">
        <div className="flex-1">
          <label
            htmlFor={`name-${item.id}`}
            className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500"
          >
            Item name
          </label>
          <input
            id={`name-${item.id}`}
            type="text"
            value={item.name}
            onChange={(e) => handleField("name", e.target.value)}
            placeholder="e.g. Wardrobe"
            className={`w-full rounded-lg border px-3 py-2 text-sm text-slate-800 outline-none transition focus:ring-2 focus:ring-blue-500 ${
              errors.name ? "border-red-400 bg-red-50" : "border-slate-300 bg-white"
            }`}
            aria-describedby={errors.name ? `name-err-${item.id}` : undefined}
          />
          {errors.name && (
            <p id={`name-err-${item.id}`} className="mt-1 text-xs text-red-600" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Volume badge */}
        <div className="mt-5 shrink-0 text-right">
          <span
            className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ${
              hasErrors || volume === 0
                ? "bg-slate-100 text-slate-400"
                : "bg-blue-50 text-blue-700"
            }`}
            aria-label={`Volume for this item: ${volume.toFixed(3)} m³`}
          >
            {hasErrors || volume === 0 ? "—" : `${volume.toFixed(3)} m³`}
          </span>
        </div>

        {/* Remove button */}
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="mt-5 shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          aria-label={`Remove item: ${item.name || "Unnamed"}`}
        >
          {/* × icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Dimensions + quantity */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(
          [
            { field: "length", label: "Length (m)", errKey: "length" },
            { field: "width", label: "Width (m)", errKey: "width" },
            { field: "height", label: "Height (m)", errKey: "height" },
            { field: "quantity", label: "Quantity", errKey: "quantity" },
          ] as const
        ).map(({ field, label, errKey }) => (
          <div key={field}>
            <label
              htmlFor={`${field}-${item.id}`}
              className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              {label}
            </label>
            <input
              id={`${field}-${item.id}`}
              type="number"
              min={field === "quantity" ? "1" : "0.01"}
              step={field === "quantity" ? "1" : "0.01"}
              value={item[field]}
              onChange={(e) => handleField(field, e.target.value)}
              placeholder={field === "quantity" ? "1" : "0.00"}
              className={`w-full rounded-lg border px-3 py-2 text-sm text-slate-800 outline-none transition focus:ring-2 focus:ring-blue-500 ${
                errors[errKey] ? "border-red-400 bg-red-50" : "border-slate-300 bg-white"
              }`}
              aria-describedby={errors[errKey] ? `${field}-err-${item.id}` : undefined}
            />
            {errors[errKey] && (
              <p id={`${field}-err-${item.id}`} className="mt-1 text-xs text-red-600" role="alert">
                {errors[errKey]}
              </p>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}

