# Storage Size Calculator — Prototype

> **⚠️ This is a prototype.** It is not an official MyStorage product, is not affiliated with MyStorage, and does not represent MyStorage's actual pricing, inventory, or internal algorithms.

---

## The Problem

During an audit of the STOW AI sales agent ([stow.mystorage.vn](https://stow.mystorage.vn/)), the following items were submitted for a storage-size estimate:

| Item | Dimensions |
|---|---|
| Wardrobe | 2 m × 0.6 m × 2 m |
| Dining table | 1.6 m × 0.8 m × 0.75 m |
| Dining chairs | ×6 |
| Cardboard boxes | 60 cm × 40 cm × 40 cm × 10 |
| Bags of clothes | ×10 |

**STOW's response:**
- Calculated the wardrobe's physical volume as **2.4 m³** before applying the multiplier
- Applied a **1.7× multiplier** ("70% buffer") to the wardrobe and table
- Returned a final recommendation of approximately **9 m³**

When asked *"Why does my wardrobe and table use a 1.7 multiplier? Where is this 70% rule published?"*, STOW responded that it was an **"internal technical guideline"** used by its operations team for bulky/unstackable items — with no public basis for the figure.

**The core issue is transparency**, not whether the 70% rule is correct or incorrect. A customer cannot verify or understand a recommendation produced by an undisclosed multiplier. This prototype demonstrates what a transparent alternative looks like.

---

## What This Prototype Does

A client-side Storage Size Calculator that:

- Lets the customer add items with name, dimensions (L × W × H), and quantity
- Calculates the **physical volume** of each item and the total
- Adds a **clearly labeled packing/access allowance** (+1 m³), shown as a separate line
- Produces an **estimated required capacity** = physical volume + allowance
- Recommends a storage size from example prototype tiers, with a plain-English explanation of why that tier was chosen
- Shows every number and every step — no hidden multipliers
- Validates all inputs and pre-loads the five items from the audit scenario

---

## Calculation Methodology

All logic is isolated in [`lib/calculator.ts`](./lib/calculator.ts) and easy to audit or replace.

```
1. volume_item      = length × width × height × quantity   (metres)
2. total_physical   = Σ volume_item
3. allowance        = +1.0 m³  (flat, displayed to the user)
4. estimated        = total_physical + allowance
5. recommended      = smallest tier ≥ estimated
```

**On the allowance:** MyStorage's public guidance suggests allowing approximately 1 CBM above the estimated volume. This prototype uses a flat +1.0 m³ as a transparent, simplified implementation of that guidance — not a replication of STOW's internal algorithm.

**Tiers used:** `[1, 2, 3, 4, 5, 6, 8, 10, 15, 20, 23] m³` — prototype example values covering the 1–23 m³ range stated on MyStorage's website. **Not** official MyStorage inventory tiers; labeled as such in the UI.

**What this prototype explicitly does not do:**

| Omitted | Why |
|---|---|
| Per-item 1.7× multiplier | No public source; replicating it would reproduce the opacity problem |
| Per-item buffer by item type | Would require undisclosed classification logic — same problem |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | **Next.js 16** (App Router, static export) |
| Language | **TypeScript** (strict mode) |
| Styling | **Tailwind CSS v4** |
| Runtime | No backend, no database, no API calls |

---

## Project Structure

```
stow-prototype/
├── app/
│   ├── layout.tsx          # Root layout — metadata, font
│   ├── page.tsx            # Main page — state, layout, item list
│   └── globals.css
├── components/
│   ├── ItemRow.tsx          # One input row per storage item
│   ├── ResultsPanel.tsx     # Transparent results breakdown
│   └── MethodologyNote.tsx  # Callout explaining the calculation approach
├── lib/
│   └── calculator.ts        # All calculation logic (isolated)
├── types/
│   └── item.ts              # StorageItem type
└── README.md
```

---

## Setup & Running

```bash
npm install
npm run dev       # → http://localhost:3000
npm run build     # production build (static)
npm start         # serve production build
```

---

## Implementation Decisions

| Decision | Rejected approach | Reason |
|---|---|---|
| Flat +1 m³ allowance | Per-item 1.7× multiplier | The 70% rule has no public source; replicating it would reproduce the transparency problem |
| Size tiers labeled as example values | Presenting tiers as official MyStorage inventory | MyStorage confirms a 1–23 m³ range but does not publish a specific tier ladder |
| "Can be disassembled" toggle removed | Advisory toggle with no effect on calculation | A control that changes no number creates a false impression that disassembly is factored in |
| Dimensions stored as strings in `StorageItem` | Storing as `number` | Controlled number inputs require string state during editing; parsing happens at calculation time |

---

## Limitations

| Limitation | Notes |
|---|---|
| Not an official calculator | Does not represent MyStorage's pricing, inventory, or internal algorithms |
| Simplified allowance | +1 m³ is a transparent approximation from public guidance, not a calibrated model |
| Example size tiers | Illustrative only — not official MyStorage inventory |
| No unit conversion | Dimensions must be entered in metres |

---

## Official Sources Referenced

| Source | Used for |
|---|---|
| [mystorage.vn/llms.txt](https://mystorage.vn/llms.txt) | Unit range (1–23 CBM), company facts |
| [mystorage.vn/services/self-storage/](https://mystorage.vn/services/self-storage/) | Self-storage unit description, confirmed range |
| [stow.mystorage.vn](https://stow.mystorage.vn/) | Audited to identify the transparency problem (not scraped or integrated) |
