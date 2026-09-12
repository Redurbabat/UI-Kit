# Motion Language

## Purpose

Motion communicates state, hierarchy, material and physical response. It is not used simply because movement is possible.

## Timing

Recommended ranges:

- micro feedback: 100–180 ms
- normal interaction: 180–300 ms
- object transformation: 280–520 ms
- expressive one-shot sequence: up to 800 ms
- continuous state animation: only when the state itself is ongoing

## Easing

Use named project easings through CSS variables.

- standard: smooth and controlled
- emphasized: strong deceleration for entrances and physical release
- spring-like: limited to playful/mechanical interactions

Do not invent a new easing on every component.

## Performance

Prefer:

- `transform`
- `opacity`

Use carefully:

- `filter`
- `blur()`
- `backdrop-filter`
- large shadows
- masks
- clip-path animation

Avoid animating layout properties when an equivalent transform is possible.

## Reduced motion

All reusable motion must remain usable under:

```css
@media (prefers-reduced-motion: reduce) { ... }
```

Continuous rotation, floating, scanning and morphing must stop or become effectively static. Essential state changes remain visible without requiring animation.

## Interaction states

### Hover

Can reveal depth, lift, light, tilt, orbit or secondary information. Hover must never be the only way to access essential functionality.

### Press

Should feel immediate. Physical controls may compress or move toward the surface.

### Focus

Focus-visible must be obvious and independent of hover.

### Success

Prefer a short pulse, color/state transition or mechanical completion rather than a permanent celebration animation.

### Loading

Continuous motion is valid because the state is continuous. Provide a static reduced-motion alternative.

## 3D

Perspective and 3D transforms should preserve legibility. Use 3D strongest on isolated controls and showcase cards, not on dense tables or long text content.
