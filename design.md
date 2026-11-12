# Visual Identity

> Source: Figma file "Mental health app" (`f7vHHEqyWhchlkYSIlpGau`), node `75:86` ("-> UI" page). Typography re-verified 2026-11-11 after the designer restructured the file's font-size variables into explicit per-breakpoint names (`Mobile/*`, `Tablet/*`, `Desktop/*`). Spacing/padding/margin/gap re-verified again on 2026-11-11 after a second pass where the designer gave the same per-breakpoint treatment to layout variables (`--layout-mobile-margin`, `--spacing-mobile-header-padding-top`, etc.) — most values matched what was already implemented, but a few real changes and one real bug were found and fixed (see "Spacing Scale" below). A new screen, "Onboarding — Nombre" (node `142:131`/`142:149`/`142:167`), was added 2026-11-13 between Splash and Home; implementing it surfaced two more corrections (a new `Body/Small` role, and a wrong assumption about `Script/Hero` at tablet) — see "Typography" below.
>
> Values are the actual bound variables found in the file. Where a step was never found bound to any sampled frame, it is marked **unconfirmed** rather than invented.

## Color palette

Real token names in Figma are `Primitives/Sky/*`, `Primitives/Peach/*`, `Primitives/Neutral/*` (not "blue"/"greyscale" as previously assumed here).

### Primary palette — Sky (blue)

| Token | Value |
|-------|-------|
| sky/100 | #E4EEFE |
| sky/200 | #CDE1FE |
| sky/300 | #ADCDFD (most-used — appears on every sampled screen) |
| sky/400 | #81B1F8 |
| sky/700 | #2359A9 |
| sky/50, 500, 600, 800, 900 | **unconfirmed** — not bound in any sampled node |

### Secondary palette — Peach

| Token | Value |
|-------|-------|
| peach/50 | #FFF6F2 |
| peach/100 | #FFEBE3 |
| peach/300 | #FFC2A9 |
| peach/200, 400, 500 | **unconfirmed** — not bound in any sampled node |

### Neutral (greyscale)

| Token | Value |
|-------|-------|
| neutral/0 | #FFFFFF (white) |
| neutral/50 | #FAFAFA |
| neutral/100 | #F5F5F5 |
| neutral/200 | #E5E5E5 |
| neutral/300 | #CCCCCC |
| neutral/400 | #9E9E9E |
| neutral/600 | #595959 |
| neutral/700 | #404040 |
| neutral/800 | #262626 (primary button background, and — see below — also the corrected `color-text-primary`) |
| neutral/500, 900 | **unconfirmed** — not bound in any sampled node |

### Semantic / alias tokens (confirmed, updated 2026-11-11)

| Token | Value | Usage observed |
|-------|-------|-----------------|
| color-text-primary | **#262626** (was documented as #000000 on 2026-11-08 — corrected; the Figma variable itself changed to alias `neutral/800` instead of pure black) | Default body/heading text color |
| color-text-secondary | #595959 (= neutral/600) | Secondary copy (subtitles, tip body) |
| color-text-on-dark | #FFFFFF (= neutral/0) | Text on the dark header (e.g. weekly-tip waveform label) |
| color-bg-page | #262626 (= neutral/800) | Page/screen background alias, seen on the Exercise detail frame |

No `color-action-primary`, `color-surface`, `color-border`, or other alias layer was found — components bind directly to the Sky/Peach/Neutral primitives. No error/success/warning/status colors, shadow, elevation, or z-index variables exist anywhere in the file.

`Gradient/Gradient` (a typo'd name in the file itself) is the brand gradient, confirmed on the Breathing content panel: `linear-gradient(109deg, peach/300 13.2%, peach/100 12.8%, sky/100 80%, sky/300 106.2%)` on mobile/tablet, recomputed to `137deg` on the wider desktop frame (same color stops — Figma just recalculates the angle from the gradient handles' absolute position when the frame width changes, so the angle itself isn't a fixed token).

## Typography

### Font families (confirmed)

| Role | Value |
|------|-------|
| Heading | Manrope |
| Body | Manrope |
| Script / accent | Homemade Apple |

### Naming scheme change (2026-11-11)

The designer restructured every type-style variable into an explicit per-breakpoint namespace: `Mobile/Display/Title`, `Tablet/Heading/H1`, `Desktop/Script/Hero`, etc. (CSS variable names follow the same pattern, e.g. `--typography-mobile-font-size-heading-h2`). This replaces the flat `Display/Title` / `Heading/H1` naming from the 2026-11-08 pass. Mobile and Tablet share nearly the same scale; Desktop both grows a few roles and gains new roles that don't exist at smaller sizes.

### Type Scale — Mobile & Tablet (confirmed identical except Script/Label)

| Role | Mobile | Tablet | Weight |
|------|--------|--------|--------|
| Display/Title | 40px | 40px | 700 |
| Heading/H1 | 32px | 32px | 700 |
| Heading/H2 | 24px | 24px | 700 |
| Heading/H3 | 20px | 20px | 700 |
| Body/Large | 18px | 18px | 400 |
| Body/Medium | 16px | 16px | 400 |
| **Body/Small** (added 2026-11-13 — Onboarding helper text) | **14px** | 14px | 400 |
| Label | 20px | 20px | 500 |
| Button | 18px | 18px | 600 |
| **Script/Hero** (Splash tagline, Onboarding name-field placeholder) | 24px | **32px** (corrected 2026-11-13 — was wrongly assumed 24px like mobile; confirmed via the Onboarding screen, same as desktop) | 400, Homemade Apple |
| Script/Tagline (exercise subtitle, e.g. "Vuelve al presente") | 18px | 18px* | 400, Homemade Apple |
| **Script/Label** (weekly-tip label, Tips header subtitle) | **16px** | **18px** | 400, Homemade Apple |

\* Script/Hero and Script/Tagline were only re-sampled on Mobile frames this pass; Tablet is assumed unchanged from Mobile (consistent with every other role) but not independently re-confirmed on 2026-11-11.

### Type Scale — Desktop

Most roles reuse the Mobile/Tablet values unchanged (H1–H3, Body/Large, Body/Medium, Label, Button). Several roles grow, and three **new desktop-only roles** appear that have no mobile/tablet equivalent:

| Role | Desktop size | Weight | Notes |
|------|-------|--------|-------|
| Display/Hero | 72px | 700 | Splash headline only |
| Display/Title | 56px | 700 | Screen headers, Exercise-detail title |
| **Heading/Feature** *(new)* | **40px** | 700 | Featured-card titles (Home "Pausa 3 minutos", Exercises "Pies en la tierra") — previously these incorrectly stayed at H1 (32px) on desktop in the code; fixed this pass |
| Heading/H1 | 32px | 700 | Unchanged from mobile (e.g. Tips detail title, Splash footer wordmark) |
| **Subtitle** *(new)* | **24px** | 500 | Exercises row labels ("Siente el suelo", etc.) |
| **Body/Lead** *(new)* | **20px** | 400 | Tip/exercise body copy that grows on desktop (Tips description, "Usa tus sentidos…") |
| Label | 20px | 500 | **Does NOT grow on desktop** — confirmed still 20px, not 24px as previously (wrongly) documented |
| Script/Hero | 32px | 400, Homemade Apple | |
| Script/Tagline | 20px | 400, Homemade Apple | |
| Script/Label | 24px | 400, Homemade Apple | |

**Known Figma-side inconsistency:** Home's quick-link "Card/Tip" label uses `Desktop/Label` (20px, unchanged from mobile), while Exercises' near-identical row label uses `Desktop/Subtitle` (24px) — these read as the same component pattern in two places bound to two different desktop styles. Implemented faithfully as observed (Home stays 20px, Exercises goes to 24px) rather than forced to match; flagging for the designer to reconcile if that divergence wasn't intentional.

### Font weights (confirmed)

| Role | Weight |
|------|--------|
| Headings (Display, H1–H3, Heading/Feature) | 700 |
| Label, Subtitle | 500 |
| Button | 600 |
| Body, Script | 400 |

## Layout Guidelines

### Breakpoints — artboard widths (confirmed via frame sizes)

| Breakpoint | Artboard width in Figma | Falls in declared range |
|------------|--------------------------|--------------------------|
| Mobile | 393px | sm (0–639px) ✓ |
| Tablet | 768px | md (640–1024px) ✓ |
| Desktop | 1440px | lg/xl ✓ (matches `layout-container-desktop`) |
| Desktop 2XL | 1920px, with an inner "Container (max 1440)" centered | 2xl ✓ |

### Layout spacing tokens (confirmed)

| Token | Value | Breakpoint |
|-------|-------|------------|
| layout-margin-mobile | 20px | Mobile |
| layout-margin-tablet | 32px | Tablet |
| layout-gutter-tablet | 16px | Tablet |
| layout-margin-desktop | 64px | Desktop / 2XL |
| layout-gutter-desktop | 32px | Desktop / 2XL |
| layout-container-desktop | 1440px | Desktop / 2XL (page content stays capped at 1440px and centered even at the 1920px 2XL artboard) |

No `layout-container-tablet` variable exists. The 1024px tablet container max-width in the table below is **not Figma-confirmed** — carried over from the original spec; the tablet artboard itself is only 768px wide.

### Container Widths

| Breakpoint | Max Width |
|------------|-----------|
| Mobile (sm) | 100% (with 20px margin) |
| Tablet (md) | 1024px — **unconfirmed**, no bound variable found |
| Desktop (lg+) | 1440px (confirmed: `layout-container-desktop`) |

### Column Count

No grid/column-count variables exist in the file; reflects layout intent, not a bound Figma token.

| Breakpoint | Columns |
|------------|---------|
| Mobile (sm) | 2 |
| Tablet (md) | 4–6 |
| Desktop (lg+) | 12 |

## Spacing Scale

**Base unit:** 8px (every spacing token below is a multiple of 8px except `2xs`).

| Token | Value |
|-------|-------|
| spacing-2xs | 4px |
| spacing-xs | 8px |
| spacing-sm | 16px |
| spacing-md | 24px |
| spacing-lg | 32px |
| spacing-xl | 40px |
| spacing-2xl | 48px |
| spacing-section-compact | 56px |
| spacing-3xl | 64px |
| spacing-section-mobile | 80px |
| spacing-section-desktop | 160px |

### Semantic layout/spacing tokens (added 2026-11-11)

The designer named specific usages explicitly instead of leaving every screen to reuse the raw scale above. Values below are confirmed via `Mobile/Tablet/Desktop` variable sampling across Splash, Home, Breathing, Exercises, Exercise detail, and Tips:

| Token | Mobile | Tablet | Desktop | Usage |
|-------|--------|--------|---------|-------|
| layout-margin | 20px | 32px | 64px | Outer page margin (unchanged from before, just renamed `--layout-{bp}-margin`) |
| layout-gutter | — | 16px | 32px | Column gutter (tablet/desktop only) |
| header-padding-top | 40px | 40px | 40px | Same at every breakpoint |
| header-padding-bottom (corrected 2026-11-15) | 40px | **24px** | **24px** | Explicit instruction: top:40/bottom:24 on every breakpoint except mobile (was 64px tablet/desktop before — not re-verified against Figma this pass, taken as a direct product request) |
| **header-padding-bottom-compact** | **16px** | 16px | 16px | Back-button-only headers (Breathing on mobile only; Exercise detail at every breakpoint) — unaffected by the header-padding-bottom change above, still the tighter compact value |
| hero-card-padding (Featured card) | **24px** | 40px | 40px | The mobile value was wrong in code (was hard-coded to 40px like tablet/desktop) — fixed this pass |
| header-gap (corrected 2026-11-15) | **16px** | **16px** | **16px** | Explicit instruction: 16px at every breakpoint including mobile (was 32/40/48px before) |
| section-gap | 56px | 80px | 160px | = `spacing-section-compact` / `spacing-section-mobile` / `spacing-section-desktop` above |
| group-gap | 48px (mobile), 40px (desktop) | — | 40px | Vertical gap between a sibling group and the next (e.g. "Recomendación de Mariana" title and the row below it on Exercises/Exercise-detail desktop) |
| sheet-padding-y | 40px | 64px | 64px | = `spacing-xl` / `spacing-3xl` |

### Desktop split-layout gap correction

Exercises, Exercise detail, and Tips all lay out their desktop two-column rows (640px + 524px columns inside the 1312px content area) with **no explicit gap at all** — Figma relies purely on `justify-content: space-between` across the two fixed-width columns, producing a 148px visual gap as a side effect of the leftover space, not a bound token. The code previously added an explicit `gap: 48px` (`--spacing-2xl`) *on top of* that, inflating the real gap to ~196px. Fixed by removing the explicit gap and using `justify-content: space-between` (implemented as CSS Grid for Exercises/Exercise-detail, which also need a full-width heading row above the two columns; plain flex for Tips, which doesn't).

### Icon / card spacing

| Role | Value |
|------|-------|
| Icon to label | 8px |
| Card padding | 16px |

## Border Radius

| Token | Value |
|-------|-------|
| radius-md | 16px |
| radius-lg | 24px |
| radius-2xl | 40px |
| radius-full | 9999px |
| radius-sm | **unconfirmed** — no bound variable found; do not assume 4px |

## Design Tokens

### Token Categories
- **Color**: Primitive scales (`Primitives/Sky`, `Primitives/Peach`, `Primitives/Neutral`) plus four alias tokens (`color-text-primary`, `color-text-secondary`, `color-text-on-dark`, `color-bg-page`). No surface/border/action alias tier exists — components bind primitives directly.
- **Spacing**: 8px base unit; scale runs `2xs` through `3xl` plus three section-specific tokens.
- **Typography**: Manrope (heading/body) + Homemade Apple (script); full per-breakpoint size scale per the tables above; weights 400/500/600/700; line-height 1.3 for headings/labels/script, 1.5 for body/button (Display/Hero desktop uses 1.16).
- **Elevation**: no shadow or z-index variables exist in the file.
- **Border**: radius scale `md`/`lg`/`2xl`/`full` confirmed; `sm` unconfirmed.
- **Motion**: no duration/easing variables exist in the file.

### Token Tiers
1. **Global tokens** — the `Primitives/*` scales above.
2. **Alias tokens** — `color-text-primary`, `color-text-secondary`, `color-text-on-dark`, `color-bg-page`.
3. **Component tokens** — none found as named variables; components bind primitives/aliases directly.

### Naming Convention
Figma variable-collection names: `{Breakpoint}/{Category}/{Role}` for typography (e.g. `Desktop/Script/Hero`), `{Category}/{Scale}/{Step}` for color primitives (e.g. `Primitives/Sky/300`). CSS custom-property names mirror this: `--typography-{breakpoint}-font-size-{role}`.

### Best Practices
- Generate a full shade scale (50–900) for every brand and neutral color — still not done (see unconfirmed gaps above).
- Extend the alias tier to surface/border/action, not just text — recommended next step for the Figma file, not something to invent in code.
- Never reference raw hex/px values in component CSS — map everything through the tokens documented above.
- When adding a new per-breakpoint type role in Figma, use the same `{Breakpoint}/{Category}/{Role}` pattern already established, so it's unambiguous which breakpoint a style belongs to.

## Breakpoints

| Name | Range | Notes |
|------|-------|-------|
| sm (mobile) | 0–639px | Optimized for one-handed use. Figma artboard: 393px |
| md (tablet) | 640–1024px | Figma artboard: 768px |
| lg (small desktop) | 1024–1440px | — |
| xl (desktop) | 1440px | Max-width container, centered layout (confirmed: `layout-container-desktop`) |
| 2xl (large desktop) | 1920px | Centered layout; content still capped at 1440px |

### Layout Behaviour per Breakpoint

Not backed by Figma variables — reflects the actual auto-layout structure observed in the sampled frames, re-verify if new screens are added.

| Breakpoint | Behaviour |
|------------|-----------|
| sm | Stack all content vertically; full-width cards |
| md | Mostly stacked; the mood-filter UI relocates into the dark header instead of the content area (see Tips screen) |
| lg, xl, 2xl | Two-column splits for detail/list screens (Exercises, Tips, Exercise detail); Home goes featured-card + quick-links side by side. On Exercises and Exercise detail specifically, the section/exercise title ("Recomendaciones de Mariana", "Pies en la tierra") promotes to a full-width heading spanning both columns, with the two columns below it — confirmed 2026-11-11, implemented via CSS Grid (`grid-template-areas: "heading heading" "primary secondary"`) rather than duplicating markup |

### Exercises screen update (2026-11-15)

Re-verified against the updated desktop frame (`101:172`) and replicated to mobile/tablet per explicit instruction:

- Title copy: "Recomendación de Mariana" → **"Recomendaciones de Mariana"** (plural), at every breakpoint.
- The 3-item exercise list is now a **2-column grid at every breakpoint**, icon stacked above label inside each card (was a single-column list with icon+label side by side). The 3rd card spans both columns (`.exercise-row:last-child { grid-column: span 2; }`) — relies on there always being exactly 3 non-featured exercises in `data/exercises.json`.
- On desktop only, the Exercises split-layout's second column is now fluid (`.split-layout--exercises` overrides to `640px 1fr` with an explicit 80px gap) instead of the fixed 640/524 + `justify-content: space-between` pattern Exercise detail and Tips still use — Exercises' own frame moved to a flexible-width second column, those two didn't.
- Featured-card scrim darkened from `rgba(0,0,0,0.2)` to `rgba(0,0,0,0.39)` (confirmed on both the Home and Exercises featured cards) — shared `.featured-card__scrim` class, so this applies everywhere that component is used.

### Onboarding flow (corrected 2026-11-13)

The former "Splash" screen is **not a transient splash** — confirmed by the user: it's the first of two onboarding screens and stays until the person taps "Comenzar". The full flow, same on every breakpoint:

**Onboarding — Bienvenida** (headline + photo + "Comenzar", route `#/welcome`) → **Onboarding — Nombre** (name field, route `#/name`) → **Home** (`#/inicio`).

There is no auto-advance timer and no "skip to Home for returning users" shortcut — every visit goes through both onboarding screens in order unless the person explicitly backs out or skips. "Comenzar" always goes to the name screen; the name screen's back button returns to Bienvenida.

#### Onboarding — Nombre (header corrected 2026-11-14)

The header text ("¿Cómo te llamas?") was dropped from the Figma frame — it's now back-button-only at **every** breakpoint (same compact header pattern as Breathing/Exercise detail), not "back button on mobile, title-only on tablet/desktop" as previously documented. The code keeps a visually-hidden `<h1>` for screen-reader/focus-management purposes only.

Form: a name text input styled as an underlined, centered script-font field (placeholder "Escribe tu nombre", helper text below in Body/Small), a primary "Continuar" button, and an "Omitir por ahora" skip link below it.

| Breakpoint | Behaviour |
|------------|-----------|
| sm | Back button, compact header; input/button are full width |
| md, lg, xl, 2xl | Back button, compact header; input field caps at 464px (tablet) / 640px (desktop), centered; the primary button shrinks to its content width instead of staying full width, also centered |

The entered name **does** now feed into Home: `data-home-greeting` renders "Bienvenida, {name}" when a name is stored, falling back to the plain "Bienvenida" from Figma when it isn't (e.g. after "Omitir por ahora"). This is the one deliberate departure from the literal Figma frames in this doc — explicitly requested, not inferred.

#### Onboarding — Bienvenida: desktop layout bug (fixed 2026-11-14)

The desktop/2xl CSS had grouped the "Comenzar" button as a third flex sibling alongside the text block and the photo, instead of inside the text block beside the headline — this squeezed the fixed-width photo and stranded the button in its own column. Mobile/tablet happened to look fine because their single-column stacking order (text block → photo → button) matches Figma, but desktop's `flex-direction: row` turned that same flat sibling list into three competing columns.

Fixed without moving the button in the DOM (mobile/tablet's DOM order — text block, photo, button — is correct and must stay that way): at 1024px+, `.splash__copy` becomes a CSS Grid (`grid-template-areas: "text photo" "cta photo"`) that visually regroups the headline and button into one column beside the photo, the same technique used for the Exercises/Exercise-detail heading promotion above.

## Component Specification

### Specification Structure
1. **Overview** — Name, description, when to use / not use
2. **Anatomy** — Visual breakdown, required vs optional elements
3. **Variants** — Size (sm/md/lg), style (primary/secondary/ghost), layout
4. **Props/API** — Name, type, default, description, required status
5. **States** — Default, hover, focus, active, disabled, loading, error
6. **Behavior** — Interactions, animations, responsive behavior, edge cases
7. **Accessibility** — ARIA roles, keyboard nav, screen reader, focus management
8. **Usage Guidelines** — Do/don't examples, content rules, related components

### Component Generation Rules
Every component must include:
- Accessibility support
- Keyboard support
- Focus states
- Semantic HTML
- Responsive implementation

### Best Practices
- Write for both designers and developers
- Include examples for every variant and state
- Specify behavior, not just appearance
- Consider all input methods
- Document edge cases explicitly

## Deliberate departures from the literal Figma spec (Home — 2026-11-12)

The following were explicit product-owner requests, not Figma re-verification — code intentionally differs from the bound Figma values here:

- **Icon badges** (Home quick-links): now `neutral/100` at every breakpoint. Figma's desktop frame bound this to `sky/200` — the user asked to drop that desktop-only swap for visual consistency.
- **Featured card width** (Home, desktop/2xl): no longer the fixed 637px from Figma. It's now `flex: 1` so it shares the row with "Accesos rápidos" proportionally and keeps shrinking smoothly between breakpoints instead of hitting a hard-coded width.
- **"Comenzar" CTA width** (Featured card): full-width only on mobile; fit-content (not stretched) from 640px up. This actually matches Figma's own Button instances at tablet/desktop (they were never `w-full` there), so this one is a code bug-fix, not a departure.
- **Play/pause icon**: `assets/icons/icon-pause.svg` is a hand-authored generic pause glyph (two rounded bars, same fill/size as `icon-play.svg`) — Figma only ever defined a Play icon, no Pause state was designed. Swapped in via JS when `aria-pressed="true"`.

# Design Principles

## Accessibility guidelines

### Accessibility Rules
Must satisfy **WCAG AA**.
Requirements:
- `aria` labels
- Keyboard navigation
- Focus visibility
- Contrast validation

### Hallucination Prevention Rules

**Never invent:**
- Colors
- Typography
- Spacing
- Radius
- Shadows
- Grid systems
- Layout dimensions
- Responsive behavior

**If information is missing — STOP.**

Output exactly:

```
FIGMA SPECIFICATION INCOMPLETE
Missing:
- [list every missing item]
```

Do not guess. Do not infer silently. Do not proceed.
