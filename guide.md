You are helping me build a prototype for the MyStorage Product Engineering Intern (AI-Native) assignment.

CONTEXT

I audited the AI sales agent at:
https://stow.mystorage.vn/

One important finding is related to storage-size estimation.

I asked STOW to estimate the required storage size for:

- 1 wardrobe: 2m × 0.6m × 2m
- 1 dining table: 1.6m × 0.8m × 0.75m
- 6 dining chairs
- 10 cardboard boxes: 60cm × 40cm × 40cm each
- 10 bags of clothes

STOW calculated:

- Wardrobe physical volume = 2.4 m³
- It then multiplied the wardrobe by 1.7, calling this a 70% buffer.
- Dining table physical volume = approximately 0.96 m³
- It also multiplied the table by 1.7.
- It ultimately recommended approximately 9 m³ if the furniture was not disassembled.

I then explicitly asked STOW:

"Why does my wardrobe and table use a 1.7 multiplier? Where is this 70% rule published?"

STOW responded that the 70% buffer was an "internal technical guideline" used by its operations team for bulky/unstackable items.

This is the finding I want to address.

IMPORTANT:
Do NOT claim that the 70% rule is definitely false unless there is evidence proving that. The prototype should instead address the problem of TRANSPARENCY and explainability: the customer should be able to see how the recommended storage size was calculated instead of receiving an unexplained fixed multiplier.

MyStorage's public guidance should be treated as the source of truth. Relevant official sources include:

https://mystorage.vn/llms.txt
https://www.mystorage.vn/services/self-storage/

The public guidance I found suggests allowing approximately 1 CBM above the estimated volume rather than presenting an unexplained universal 70% multiplier.

PROTOTYPE GOAL

Build a polished but small "Storage Size Calculator" prototype that demonstrates a better customer experience.

The prototype should:

1. Let the customer add storage items.
2. Allow dimensions and quantity to be entered.
3. Calculate physical volume transparently.
4. Clearly separate:
   - physical item volume
   - packing/space allowance
   - final recommended storage capacity
5. Explain WHY the recommended capacity was chosen.
6. Avoid hiding calculations behind unexplained multipliers.
7. Make the recommendation easy for a customer to understand.

This is NOT intended to be a production replacement for MyStorage's real calculator. It is a prototype demonstrating how the problematic UX/AI recommendation could be improved.

TECH STACK

Use:
- Next.js
- TypeScript
- Tailwind CSS

No backend.
No database.
Keep the implementation simple and easy to understand.

UI REQUIREMENTS

Create a clean, modern, professional storage-calculator interface.

Suggested structure:

Header:
"Storage Size Calculator"
Short subtitle explaining that the calculator estimates required storage capacity.

Item list:
Each item should have:
- Item name
- Length
- Width
- Height
- Quantity

Allow adding/removing items.

Include a few example items so the page is immediately usable.

Results section should show:

Physical item volume
X.XX m³

Packing / organization allowance
X.XX m³

Estimated required capacity
X.XX m³

Recommended storage size
X m³

Also show a concise explanation such as:

"We calculate the physical volume of your items first, then add a transparent allowance for packing and access space. The allowance is shown separately so you can understand how the recommendation was produced."

IMPORTANT CALCULATION DESIGN

Do NOT use a hidden universal 70% multiplier.

Use a transparent methodology.

For the prototype, use a clearly documented allowance approach rather than pretending to reproduce MyStorage's internal algorithm.

For example:
- Calculate total physical volume.
- Add approximately 1 m³ as a simple packing/access allowance.
- Round the result up to the next available capacity.

However, structure the code so that this methodology is isolated in one function and easy to change.

Do NOT invent official MyStorage storage-size tiers unless verified from an official source.

If you need to use example capacity options for the prototype, clearly label them as prototype/example values rather than official MyStorage inventory.

UX REQUIREMENTS

The customer should immediately understand:

1. What they entered.
2. How much physical volume the items occupy.
3. How much allowance was added.
4. Why the final recommendation was made.

Avoid unnecessary complexity.

Include validation:
- dimensions must be positive
- quantity must be a positive integer
- show useful validation messages
- prevent NaN/infinite calculations

Make the UI responsive for mobile.

ACCESSIBILITY:
- proper labels for form fields
- keyboard accessible controls
- sufficient semantic HTML
- buttons must have clear accessible names
- do not rely only on color to communicate information

CODE QUALITY

Keep the code clean and understandable.

Use reusable components where appropriate, but do not over-engineer.

Add comments only where they explain non-obvious decisions.

Create a README containing:
- what the prototype is
- the problem/finding it addresses
- methodology used by the prototype
- how to install
- how to run locally
- how to build
- limitations
- note that this is a prototype, not an official MyStorage calculator

IMPORTANT CLAUDE CODE REQUIREMENT

This prototype is part of an application assignment that explicitly requires Claude Code.

Therefore:

1. Actually implement the project.
2. Do not just give me instructions.
3. Inspect the existing directory before changing anything.
4. Create the necessary files.
5. Install dependencies if necessary.
6. Run the application/build and verify it works.
7. Fix any errors you encounter.
8. Before finishing, review every line of code you created or modified.
9. Tell me exactly what you generated and what decisions you made.
10. If you initially implement something that you later decide is poor, misleading, unnecessarily complex, or incorrect, explicitly identify it and explain why it should be changed.

DO NOT:
- invent MyStorage policies
- claim the prototype is official
- use a hidden 70% multiplier
- create fake booking/payment functionality
- scrape or automate STOW
- add unnecessary backend infrastructure
- over-engineer the application

SUCCESS CRITERIA

When finished, I should have:

1. A working local prototype.
2. A polished responsive UI.
3. Transparent storage-volume calculations.
4. A clear explanation of the recommendation.
5. README documentation.
6. A working production build.
7. A clear record of any implementation decisions that I rejected or rewrote.

Start by inspecting the current project directory and then implement the prototype.