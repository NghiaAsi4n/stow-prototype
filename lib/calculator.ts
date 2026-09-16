import { StorageItem } from "@/types/item";

// ---------------------------------------------------------------------------
// PROTOTYPE METHODOLOGY (easy to swap out — all logic lives here)
// ---------------------------------------------------------------------------
//
// Step 1: Calculate physical volume for each item (L × W × H × quantity).
// Step 2: Sum all item volumes.
// Step 3: Add a flat 1.0 m³ packing/access allowance.
//         This follows MyStorage's public guidance of "approx. 1 CBM above
//         estimated volume" rather than applying a hidden per-item multiplier.
// Step 4: Round up to the next available prototype size tier.
//
// NOTE: The size tiers below are *prototype example values* representing a
// plausible range (1–23 CBM) consistent with MyStorage's publicly stated
// unit range. They are NOT official MyStorage inventory tiers.
// ---------------------------------------------------------------------------

/** Prototype example size tiers (m³). NOT official MyStorage inventory. */
export const PROTOTYPE_SIZE_TIERS = [1, 2, 3, 4, 5, 6, 8, 10, 15, 20, 23];

/** Flat packing/access allowance added to total physical volume (m³). */
export const PACKING_ALLOWANCE_M3 = 1.0;

export interface ItemVolume {
  id: string;
  name: string;
  physicalVolume: number; // m³ for all units combined
}

export interface CalculationResult {
  itemVolumes: ItemVolume[];
  totalPhysicalVolume: number;
  packingAllowance: number;
  estimatedRequired: number;
  recommendedTier: number | null; // null if exceeds all tiers
}

/**
 * Parse a dimension string to a positive number.
 * Returns NaN if the value is invalid or non-positive.
 */
export function parseDimension(value: string): number {
  const n = parseFloat(value);
  return isFinite(n) && n > 0 ? n : NaN;
}

/**
 * Parse a quantity string to a positive integer.
 * Returns NaN if invalid.
 */
export function parseQuantity(value: string): number {
  const n = parseInt(value, 10);
  return Number.isInteger(n) && n > 0 ? n : NaN;
}

/**
 * Calculate the physical volume (m³) for a single item row.
 * Returns 0 if any dimension or quantity is invalid.
 */
export function itemPhysicalVolume(item: StorageItem): number {
  const l = parseDimension(item.length);
  const w = parseDimension(item.width);
  const h = parseDimension(item.height);
  const q = parseQuantity(item.quantity);
  if (isNaN(l) || isNaN(w) || isNaN(h) || isNaN(q)) return 0;
  return l * w * h * q;
}

/**
 * Main calculation function.
 * Takes the list of items and returns a fully transparent breakdown.
 */
export function calculateStorage(items: StorageItem[]): CalculationResult {
  const itemVolumes: ItemVolume[] = items.map((item) => ({
    id: item.id,
    name: item.name || "Unnamed item",
    physicalVolume: itemPhysicalVolume(item),
  }));

  const totalPhysicalVolume = itemVolumes.reduce(
    (sum, iv) => sum + iv.physicalVolume,
    0
  );

  const packingAllowance = PACKING_ALLOWANCE_M3;
  const estimatedRequired = totalPhysicalVolume + packingAllowance;

  // Find the smallest tier that fits the estimated requirement
  const recommendedTier =
    PROTOTYPE_SIZE_TIERS.find((tier) => tier >= estimatedRequired) ?? null;

  return {
    itemVolumes,
    totalPhysicalVolume,
    packingAllowance,
    estimatedRequired,
    recommendedTier,
  };
}

