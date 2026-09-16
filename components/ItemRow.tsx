"use client";

import React from "react";
import { StorageItem, ValidationErrors } from "@/types/item";
import { itemPhysicalVolume, parseDimension, parseQuantity } from "@/lib/calculator";
import { Translations } from "@/lib/i18n";

interface ItemRowProps {
  item: StorageItem;
  t: Translations;
  onChange: (updated: StorageItem) => void;
  onRemove: (id: string) => void;
}

function validate(item: StorageItem, t: Translations): ValidationErrors {
  const errors: ValidationErrors = {};
  if (!item.name.trim()) errors.name = t.errNameRequired;
  if (isNaN(parseDimension(item.length))) errors.length = t.errDimensionPositive;
  if (isNaN(parseDimension(item.width))) errors.width = t.errDimensionPositive;
  if (isNaN(parseDimension(item.height))) errors.height = t.errDimensionPositive;
  if (isNaN(parseQuantity(item.quantity))) errors.quantity = t.errQuantityPositive;
  return errors;
}

export default function ItemRow({ item, t, onChange, onRemove }: ItemRowProps) {
  const errors = validate(item, t);
  const hasErrors = Object.keys(errors).length > 0;
  const volume = itemPhysicalVolume(item);

  function handleField(field: keyof StorageItem, value: string | boolean) {
    onChange({ ...item, [field]: value });
  }

  const displayName = item.name || t.unnamed;

  return (
    <div
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
      role="group"
      aria-label={t.storageItemGroup(displayName)}
    >
      {/* Row header: name + volume badge + remove button */}
      <div className="mb-3 flex items-start gap-3">
        <div className="flex-1">
          <label
            htmlFor={`name-${item.id}`}
            className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500"
          >
            {t.itemName}
          </label>
          <input
            id={`name-${item.id}`}
            type="text"
            value={item.name}
            onChange={(e) => handleField("name", e.target.value)}
            placeholder={t.itemNamePlaceholder}
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
            aria-label={t.volumeAriaLabel(volume.toFixed(3))}
          >
            {hasErrors || volume === 0 ? "—" : `${volume.toFixed(3)} m³`}
          </span>
        </div>

        {/* Remove button */}
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="mt-5 shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          aria-label={t.removeAriaLabel(displayName)}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Dimensions + quantity */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(
          [
            { field: "length", labelKey: "labelLength", errKey: "length" },
            { field: "width",  labelKey: "labelWidth",  errKey: "width"  },
            { field: "height", labelKey: "labelHeight", errKey: "height" },
            { field: "quantity", labelKey: "labelQuantity", errKey: "quantity" },
          ] as const
        ).map(({ field, labelKey, errKey }) => (
          <div key={field}>
            <label
              htmlFor={`${field}-${item.id}`}
              className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              {t[labelKey]}
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
