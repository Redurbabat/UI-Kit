# AGENTS.md — UI Kit

## Purpose

This repository is a shared UI, motion and interaction laboratory. Agents should optimize for design quality, maintainability and portability into other Redurbabat projects.

## Read order

Before substantial work read:

1. `AI_START_HERE.md`
2. `CLAUDE.md`
3. `docs/architecture/ARCHITECTURE.md`
4. `docs/design/UI_LANGUAGE.md`
5. `docs/design/MOTION.md`

## Work rules

- Use a feature branch for substantial work.
- Keep `main` stable.
- Do not remove existing experiments without an explicit reason.
- Prefer additive migration when replacing experiments with production components.
- Reuse tokens and primitives.
- Do not introduce framework-specific coupling unless it clearly improves the showcase or portability.
- Do not add secrets, credentials, analytics keys or tracking by default.

## Visual implementation

A component is not complete because it compiles. Check:

- visual hierarchy
- pointer interaction
- keyboard interaction
- mobile/touch behavior
- reduced motion
- dark background compatibility
- clipping/overflow
- text contrast
- animation timing
- transform origin
- performance

## CSS rules

- No `transition: all` in reusable components.
- Namespace reusable keyframes with `ui-`.
- Namespace reusable classes with `ui-`.
- Prefer CSS variables for tunable values.
- Continuous animations should pause or simplify for `prefers-reduced-motion`.
- Avoid layout-triggering animation where transform/opacity can represent the same effect.

## Testing

Run the build and unit tests. Add focused tests for component metadata, registries, filtering and non-visual behavior. Use browser inspection for animation and visual behavior.
