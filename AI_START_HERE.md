# AI START HERE — UI Kit

## Source of truth

GitHub `main` is the long-term source of truth. Active work happens on feature branches and is merged only after verification.

## Product

UI Kit is the shared experimental interface and motion laboratory for projects such as BABAT RED and Redion.

The repository has two goals:

1. provide a high-quality website where components can be explored live;
2. maintain reusable design primitives, motion rules, and component patterns that can later be ported into product repositories.

## Structure

- `app/` — the actual React/TypeScript/Vite website
- `docs/architecture/` — architecture and project boundaries
- `docs/design/` — visual language, motion, interaction rules
- `tools/` — validators and maintenance scripts
- `CLAUDE.md` — project rules for Claude Code
- `AGENTS.md` — rules for coding agents

## Non-negotiable principles

- Do not turn this repository into BABAT RED or Redion.
- Components should be visually distinctive, not generic SaaS UI.
- Prefer interaction quality, depth, 3D, materiality and playful motion where appropriate.
- The resting state must remain readable and calm.
- Every interactive component needs keyboard focus and reduced-motion behavior.
- Avoid global generic class names such as `.button`, `.card`, `.loader`, `.pulse`, or `.rotate`.
- Reusable component styles must use the `ui-` namespace.
- Do not copy experimental snippets blindly. Extract the idea and rebuild it cleanly.
- Keep dependencies minimal.

## First command after checkout

```bash
cd app
npm install
npm run dev
```

## Verification

Before considering a change complete:

```bash
cd app
npm run build
npm run test:unit
```

For visual work, also inspect desktop and mobile layouts and test keyboard focus and reduced motion.
