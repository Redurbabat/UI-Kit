# UI Kit — Claude Code Rules

## Mission

Build a distinctive, reusable UI and motion library plus a live showcase website for the Redurbabat project family.

## Repository boundaries

- Product application code lives under `app/`.
- Architecture documentation lives under `docs/architecture/`.
- Visual and motion specifications live under `docs/design/`.
- Tooling and validators live under `tools/`.
- Do not add BABAT RED business logic, user data models, device control, finance, health, or other product-domain code here.

## Frontend stack

- React 19
- TypeScript
- Vite
- Motion only when CSS is insufficient for interaction choreography
- Plain CSS design tokens and component styles are preferred over runtime styling frameworks

## Design direction

The kit should not look like a normal template library.

Prefer:

- tactile 3D interactions
- physical depth
- perspective
- glass used selectively
- glow used as state feedback, not decoration everywhere
- unusual silhouettes
- mechanical, orbital, liquid, holographic and playful interaction concepts
- strong press/release feedback
- state-driven animation

Avoid:

- generic SaaS cards
- endless gradients without purpose
- excessive permanent motion
- `transition: all`
- generic global selectors
- copied snippets with naming collisions
- animation without reduced-motion support

## Naming

All reusable classes, animation names and CSS custom properties should be scoped.

Examples:

```text
.ui-button
.ui-card
.ui-loader
--ui-color-accent
@keyframes ui-orbit-spin
```

Never use generic reusable names like `.button`, `.card`, `.loader`, `@keyframes pulse`, or `@keyframes rotate` in library code.

## Component quality contract

Each interactive component should define, where relevant:

- resting state
- hover state
- active/press state
- focus-visible state
- disabled state
- reduced-motion behavior
- mobile/touch behavior

## Performance

Prefer transform and opacity for motion. Use filter, blur, backdrop-filter and large shadows carefully. Continuous animations must be limited to components where motion communicates state.

## Changes

Before creating a new primitive, inspect existing primitives for reuse. Do not duplicate the same interaction under another name.

## Verification

Run:

```bash
cd app
npm run build
npm run test:unit
```

Visual changes also require manual desktop/mobile inspection.
