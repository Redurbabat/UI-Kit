# UI Language

## Intent

UI Kit explores interfaces that feel like small interactive objects rather than flat web controls.

The visual language should be recognizable across BABAT RED, Redion and related projects without forcing every product to use the same color palette.

## Principles

### Calm at rest

The page should remain readable when nothing is happening. Depth and effects should not turn the interface into permanent visual noise.

### Expressive on interaction

Hover, press, open, connect, complete and error states can use stronger motion and material response.

### Material before decoration

Prefer effects that suggest a material or mechanism:

- glass
- metal
- rubber/jelly
- crystal
- liquid
- hologram
- physical switch
- mechanical press
- folding layer
- orbit/energy field

### State has a visual meaning

Glow should communicate energy, activity or focus. Blur can communicate depth or transition. 3D transforms should communicate structure or physical response.

## Component families

The initial library includes:

- Buttons
- Toggle switches
- Checkboxes
- Cards
- Loaders
- Inputs
- Forms
- Patterns
- Radio buttons
- Tooltips
- Experimental 3D controls

## Color

Colors are tokens. Components should not hardcode unrelated palettes unless a color is essential to the concept.

Default semantic roles:

- accent: violet
- information/energy: cyan
- success/online: teal
- warning: amber
- destructive/error: red/pink

## Depth

Use a small set of depth levels instead of arbitrary shadows:

- surface
- raised
- floating
- active/glowing

## Radius

Rounded geometry is common but not mandatory. Experimental components may use ticket, crystal, capsule, eye, folder or mechanical silhouettes.

## Typography

Typography stays comparatively calm. Interaction is expressed by shape, motion and material response rather than excessive display fonts.
