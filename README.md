# Storage Size Calculator — Prototype

> **⚠️ This is a prototype.**
> It is not an official MyStorage product, is not affiliated with MyStorage, and does not represent MyStorage's actual pricing, inventory, or internal algorithms.

---

## Table of Contents

1. [Background & Motivation](#1-background--motivation)
2. [The Problem: Opaque Multiplier in STOW](#2-the-problem-opaque-multiplier-in-stow)
3. [What This Prototype Does](#3-what-this-prototype-does)
4. [Calculation Methodology](#4-calculation-methodology)
5. [Tech Stack](#5-tech-stack)
6. [Project Structure](#6-project-structure)
7. [File-by-File Breakdown](#7-file-by-file-breakdown)
8. [Install](#8-install)
9. [Run Locally](#9-run-locally)
10. [Build for Production](#10-build-for-production)
11. [Implementation Decisions & Rejections](#11-implementation-decisions--rejections)
12. [Limitations](#12-limitations)
13. [Official Sources Referenced](#13-official-sources-referenced)

---

## 1. Background & Motivation

This prototype was built as part of a **MyStorage Product Engineering Intern (AI-Native)** assignment.

The assignment asked for a working prototype that demonstrates a better customer experience for storage-size estimation, motivated by a specific finding from an audit of the STOW AI sales agent at [stow.mystorage.vn](https://stow.mystorage.vn/).

---

## 2. The Problem: Opaque Multiplier in STOW

During the audit, the following items were submitted to STOW for a storage-size estimate:

| Item | Dimensions |
|---|---|
| Wardrobe | 2 m × 0.6 m × 2 m |
| Dining table | 1.6 m × 0.8 m × 0.75 m |
| Dining chairs | ×6 |
| Cardboard boxes | 60 cm × 40 cm × 40 cm × 10 |
| Bags of clothes | ×10 |

**STOW's response:**
- Calculated physical volume for the wardrobe: **2.4 m³**
- Applied a **1.7× multiplier** ("70% buffer") to the wardrobe and table
- Returned a final recommendation of approximately **9 m³**

When asked *"Why does my wardrobe and table use a 1.7 multiplier? Where is this 70% rule published?"*, STOW responded that it was an **"internal technical guideline"** used by its operations team for bulky/unstackable items — providing no public basis for the figure.

**The core issue is transparency**, not whether the 70% rule is correct or incorrect.
A customer cannot verify, challenge, or understand a recommendation that is produced by an undisclosed multiplier. This prototype demonstrates what a transparent alternative looks like.

---

## 3. What This Prototype Does

A client-side **Storage Size Calculator** that:

- Lets the customer add items with name, dimensions (L × W × H), and quantity
- Calculates the **physical volume** of each item and the total
- Adds a **clearly labeled packing/access allowance** (+1 m³), shown as a separate line
- Produces an **estimated required capacity** = physical volume + allowance
- Recommends a **storage size** from a set of example prototype tiers, with a plain-English explanation of why that tier was chosen
- Shows every number and every step — no hidden multipliers
- Validates all inputs (positive dimensions, positive integer quantity)
- Works on mobile (responsive layout)
- Is accessible (semantic HTML, labeled inputs, ARIA attributes, keyboard-navigable)
- Pre-loads the exact items from the audit scenario so the page is immediately useful

---

## 4. Calculation Methodology

All logic lives in a single isolated file: [`lib/calculator.ts`](./lib/calculator.ts). This makes the methodology easy to audit and easy to replace.

### Step 1 — Physical volume per item

```
volume_item = length × width × height × quantity   (all in metres)
```

### Step 2 — Total physical volume

```
total_physical = Σ volume_item   (for all valid items)
```

### Step 3 — Packing / access allowance

```
allowance = +1.0 m³   (flat, constant, displayed to the user)
```

This follows MyStorage's public guidance, which suggests allowing approximately **1 CBM above the estimated volume** rather than applying an unexplained per-item percentage multiplier.

### Step 4 — Estimated required capacity

```
estimated_required = total_physical + allowance
```

### Step 5 — Recommended size tier

```
recommended = smallest tier ≥ estimated_required
```

Tiers used: `[1, 2, 3, 4, 5, 6, 8, 10, 15, 20, 23] m³`

These tiers are **prototype example values** that cover the 1–23 m³ range publicly stated on MyStorage's self-storage page. They are **not** official MyStorage inventory tiers and are labeled as such in the UI and in this README.

### What is explicitly NOT done

| Omitted pattern | Why |
|---|---|
| Per-item 1.7× multiplier | No public source; applying it would reproduce the opacity problem |
| Per-item buffer that varies by item type | Would require undisclosed classification logic — same problem |

---

## 5. Tech Stack

| Layer | Technology |
|---|---|
| Framework | **Next.js 16** (App Router, static export) |
| Language | **TypeScript** (strict mode) |
| Styling | **Tailwind CSS v4** |
| Runtime | No backend, no database, no API calls |
| Build | Turbopack (Next.js default) |

The entire app is a single static page. All calculations happen client-side in the browser.

---

## 6. Project Structure

```
stow-prototype/
├── app/
│   ├── layout.tsx          # Root layout — metadata, font (Geist)
│   ├── page.tsx            # Main page — state, layout, item list
│   └── globals.css         # Tailwind v4 import
├── components/
│   ├── ItemRow.tsx          # One input row per storage item
│   ├── ResultsPanel.tsx     # Transparent results breakdown
│   └── MethodologyNote.tsx  # Callout explaining the calculation approach
├── lib/
│   └── calculator.ts        # All calculation logic (isolated)
├── types/
│   └── item.ts              # StorageItem and ValidationErrors types
├── guide.md                 # Original assignment brief
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
└── README.md
```

---

## 7. File-by-File Breakdown

### `types/item.ts`

Defines two TypeScript interfaces:

- **`StorageItem`** — the data model for a single item row: `id`, `name`, `length`, `width`, `height`, `quantity` (all strings, to allow partial/in-progress input).  
  Dimensions are kept as strings (not numbers) so that empty and partially-typed inputs don't immediately show NaN errors.

- **`ValidationErrors`** — a partial record of error messages keyed by field name, used to drive inline validation UI without coupling validation logic to the component.

---

### `lib/calculator.ts`

The **single source of truth for all calculations**. Nothing else in the codebase does arithmetic.

Exports:
- `PROTOTYPE_SIZE_TIERS` — the example tier array. Change here → UI updates automatically.
- `PACKING_ALLOWANCE_M3` — the flat allowance constant (currently `1.0`). Change here → UI updates automatically.
- `parseDimension(value)` — parses a string to a positive float; returns `NaN` if invalid or ≤ 0.
- `parseQuantity(value)` — parses a string to a positive integer; returns `NaN` if invalid.
- `itemPhysicalVolume(item)` — returns `L × W × H × qty`; returns `0` if any field is invalid (prevents NaN propagation).
- `calculateStorage(items)` — main function; returns a `CalculationResult` with `itemVolumes`, `totalPhysicalVolume`, `packingAllowance`, `estimatedRequired`, and `recommendedTier`.

The function signature is deliberately simple: `StorageItem[] → CalculationResult`. Replacing the methodology means replacing the body of `calculateStorage` — nothing else needs to change.

---

### `components/ItemRow.tsx`

Renders one item row. Responsibilities:

- **Controlled inputs** for name, length, width, height, quantity — each with a `<label>` and `aria-describedby` pointing to its error message.
- **Inline validation** via a local `validate()` function that runs synchronously on every render. Errors appear immediately without a submit step.
- **Per-item volume badge** — shows the calculated volume in real time, or `—` if the row has validation errors.
- **Remove button** with `aria-label` including the item name.
- Dimension grid: 2 columns on mobile, 4 columns on `sm:` and above.

---

### `components/ResultsPanel.tsx`

Renders the full transparent breakdown. Layout (top to bottom):

1. **Volume per item** — a `<ul>` listing each item's name and calculated volume; items with invalid inputs show `—`.
2. **Physical item volume** — the sum, with subtitle "Sum of L × W × H × qty for each item".
3. **Packing / access allowance** — shown in amber with a `+` prefix and an explanation of what it covers.
4. **Visual separator** (`=` sign between two horizontal rules) — makes the arithmetic visually obvious.
5. **Estimated required capacity** — the sum of the two above.
6. **Recommended storage size** — blue card with the tier in large type, plus a plain-English sentence explaining exactly why that tier was chosen.
7. **Prototype disclaimer** — amber footer noting that the tiers are example values, not official inventory.

If no items have valid dimensions, all numeric values show `—` rather than `0` to avoid misleading the user.

---

### `components/MethodologyNote.tsx`

A static informational callout (rendered below the item list) that explains the three-step methodology in numbered list form, and explicitly notes that this approach uses the +1 m³ allowance from MyStorage's public guidance rather than a hidden multiplier.

---

### `app/page.tsx`

The main page component. Responsibilities:

- Owns all state: `items: StorageItem[]`.
- Pre-populates with `EXAMPLE_ITEMS` — the five items from the original audit scenario — so the page is immediately usable.
- Provides `handleChange`, `handleRemove`, `handleAdd` with `useCallback` to prevent unnecessary re-renders.
- Computes `result` with `useMemo(() => calculateStorage(items), [items])` — recalculates only when items change.
- Renders a two-column layout (`lg:grid-cols-[1fr_380px]`): item list on the left, results panel sticky on the right.
- On mobile, the columns stack: items first, results below.
- ID generation uses a module-level counter (`nextId`) — simple and sufficient for a client-side prototype with no persistence.

---

### `app/layout.tsx`

Standard Next.js root layout. Sets page `<title>` and `<meta description>` to clearly describe the prototype (not a real calculator). Uses the `Geist` font from `next/font/google`.

---

## 8. Install

```bash
npm install
```

> **Note:** This project uses npm v12+ with the `allowScripts` field in `package.json` to satisfy a project-scoped script policy. If you see an `EALLOWSCRIPTS` error on a different machine, add the relevant packages to the `allowScripts` field or configure your local `.npmrc`.

---

## 9. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The page loads with five pre-filled items (the audit scenario). The results panel on the right updates in real time as you edit.

---

## 10. Build for Production

```bash
npm run build
```

Expected output:
```
✓ Compiled successfully
✓ TypeScript — 0 errors
Route (app)
  ○ /              (static)
  ○ /_not-found    (static)
```

Serve the production build:
```bash
npm start
```

---

## 11. Implementation Decisions & Rejections

### Decision: flat +1 m³ allowance, not a per-item multiplier

**Rejected:** applying a 1.7× multiplier per item, replicating what STOW does.

**Reason:** The 70% rule has no public source. Replicating it would reproduce exactly the transparency problem this prototype is meant to address. The prototype instead uses +1 m³ — a flat, visible, explicitly labeled allowance that follows MyStorage's public guidance.

---

### Decision: "Can be disassembled" toggle removed

**Removed in a later iteration** (originally planned as an advisory toggle that showed contextual text but did not affect the calculation).

**Reason:** The toggle added UI surface area without changing any number. Since it carried no calculation weight, it created a false impression that disassembly was factored in. Removing it keeps the interface honest — every visible control either changes a calculation input or explains the output.

---

### Decision: example size tiers, clearly labeled

**Rejected:** presenting `[1, 2, 3, 4, 5, 6, 8, 10, 15, 20, 23] m³` as official MyStorage inventory.

**Reason:** MyStorage's public pages confirm a 1–23 CBM range but do not publish a specific tier ladder. Using an unlabeled ladder would be inventing MyStorage policy. The UI and this README clearly state these are prototype example values.

---

### Decision: merge `ItemForm` into `page.tsx`

**Rejected:** creating a separate `ItemForm.tsx` component for the "add item" form (which was originally planned).

**Reason:** The "form" for adding items is just an "Add item" button that appends an empty row. There is no complex form state to encapsulate — a separate component would add structure without adding clarity. The logic lives in `page.tsx` where it naturally belongs.

---

### Decision: dimensions stored as strings

**Rejected:** storing dimensions as `number` in `StorageItem`.

**Reason:** Controlled number inputs in React require the value to be a string during editing (e.g., when the user types `0.` before finishing `0.6`). Parsing to `number` immediately would cause the input to snap or lose cursor position. Keeping dimensions as strings and parsing at calculation time gives a smooth editing experience while still catching all invalid values.

---

## 12. Limitations

| Limitation | Notes |
|---|---|
| Not an official calculator | Does not represent MyStorage's actual pricing, inventory, or internal operational logic |
| Simplified allowance | +1 m³ is a transparent approximation from public guidance, not a calibrated engineering model |
| Example size tiers | `[1, 2, 3, 4, 5, 6, 8, 10, 15, 20, 23] m³` — illustrative, not official inventory |
| No unit conversion UI | Dimensions must be entered in metres; there is no cm/inch toggle |
| No persistence | State is in-memory; refreshing the page resets to the example items |
| No booking | No pricing, payment, or inquiry functionality |
| No STOW integration | This prototype does not connect to or scrape STOW |

---

## 13. Official Sources Referenced

| Source | Used for |
|---|---|
| [mystorage.vn/llms.txt](https://mystorage.vn/llms.txt) | Unit range (1–23 CBM), company facts, AI calculator URL |
| [mystorage.vn/services/self-storage/](https://mystorage.vn/services/self-storage/) | Self-storage unit description, confirmed range |
| [stow.mystorage.vn](https://stow.mystorage.vn/) | Audited to identify the transparency problem (not scraped or integrated) |
