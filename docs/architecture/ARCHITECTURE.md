# UI Kit Architecture

## Overview

UI Kit follows the same repository-level separation used by larger Redurbabat projects while remaining intentionally smaller.

```text
UI-Kit/
├─ AI_START_HERE.md
├─ CLAUDE.md
├─ AGENTS.md
├─ README.md
├─ app/
│  ├─ index.html
│  ├─ package.json
│  ├─ public/
│  └─ src/
│     ├─ app/
│     ├─ components/
│     ├─ registry/
│     ├─ styles/
│     └─ test/
├─ docs/
│  ├─ architecture/
│  └─ design/
└─ tools/
```

## Responsibilities

### `app/src/app/`
Application shell for the showcase website: navigation, search, category filters and component detail presentation.

### `app/src/components/`
Reusable UI experiments and production-ready primitives. A component can begin as an experiment, but production primitives must follow the project naming, accessibility and motion rules.

### `app/src/registry/`
Metadata describing every component shown by the website. The registry is the source for category, title, tags, maturity and component rendering.

### `app/src/styles/`
Shared design tokens, global layout, motion primitives and reusable effects.

### `docs/design/`
Human-readable design language and motion specification. Code should implement these decisions rather than inventing a new visual language per component.

## Dependency direction

```text
app shell -> registry -> components -> styles/tokens
```

Reusable components must not import the application shell.

## Component maturity

Components use one of these maturity states:

- `experiment` — unusual concept, may change rapidly
- `candidate` — good enough for real product evaluation
- `stable` — reviewed for accessibility, motion, responsiveness and reuse

## Portability

The website is not the product dependency. BABAT RED or Redion should port/import a stable primitive intentionally rather than embedding the UI-Kit website.

## Data

The repository contains no user data model and no application database. Component metadata is static source code.
