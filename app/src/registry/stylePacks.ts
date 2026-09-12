import type { ComponentFamily } from './componentRegistry'

export interface StylePack {
  id: string
  name: string
  tags: string[]
  background: string
  border: string
  accent: string
  text: string
  shadow: string
  radius: string
}

export const stylePacks: StylePack[] = [
  { id: 'neumorphic', name: 'Neumorphic', tags: ['soft', 'shadow', 'depth'], background: '#202226', border: '#ffffff08', accent: '#8580ff', text: '#f5f6f8', shadow: '10px 10px 24px #0e0f11, -8px -8px 20px #30343a', radius: '18px' },
  { id: 'soft-3d', name: 'Soft 3D', tags: ['3d', 'soft', 'press'], background: 'linear-gradient(145deg,#2b2e36,#17191f)', border: '#ffffff18', accent: '#7c73ff', text: '#ffffff', shadow: '0 9px 0 #0b0c10, 0 18px 28px #0007, inset 0 2px 0 #ffffff26', radius: '18px' },
  { id: 'chrome', name: 'Chrome', tags: ['metal', 'reflective', '3d'], background: 'linear-gradient(145deg,#f2f2f5,#777b82 28%,#20242b 52%,#dfe2e6 76%,#696d74)', border: '#ffffff80', accent: '#d9f8ff', text: '#0d1015', shadow: 'inset 0 2px 3px #fff, inset 0 -4px 8px #0008, 0 16px 30px #0007', radius: '16px' },
  { id: 'cyber', name: 'Cyber Grid', tags: ['cyber', 'neon', 'tech'], background: 'linear-gradient(135deg,#07131b,#11152b)', border: '#22d3ee80', accent: '#22d3ee', text: '#c7fbff', shadow: 'inset 0 0 24px #22d3ee18, 0 0 26px #22d3ee35', radius: '8px' },
  { id: 'retro', name: 'Retro Arcade', tags: ['retro', 'arcade', 'bold'], background: 'linear-gradient(180deg,#ffca58,#ff7c54)', border: '#351d47', accent: '#6d28d9', text: '#241128', shadow: '5px 5px 0 #351d47, 10px 10px 0 #17101e', radius: '8px' },
  { id: 'clay', name: 'Clay', tags: ['clay', 'rounded', 'playful'], background: 'linear-gradient(145deg,#8b7cff,#6555db)', border: '#ffffff33', accent: '#ffb4d8', text: '#ffffff', shadow: 'inset 7px 8px 14px #ffffff2b, inset -8px -10px 18px #32219255, 0 16px 28px #0004', radius: '26px' },
  { id: 'frost', name: 'Frosted', tags: ['glass', 'frost', 'blur'], background: 'linear-gradient(145deg,#ffffff24,#ffffff08)', border: '#ffffff38', accent: '#b6efff', text: '#ffffff', shadow: 'inset 0 1px 0 #ffffff55, 0 18px 40px #0005', radius: '20px' },
  { id: 'prism', name: 'Prism', tags: ['gradient', 'spectrum', 'color'], background: 'linear-gradient(120deg,#7c3aed,#2563eb,#06b6d4,#10b981,#f59e0b,#ec4899)', border: '#ffffff44', accent: '#ffffff', text: '#ffffff', shadow: '0 18px 38px #4f46e555', radius: '18px' },
  { id: 'brutalist', name: 'Brutalist', tags: ['brutal', 'bold', 'graphic'], background: '#f4f1e8', border: '#0a0a0a', accent: '#ff3b30', text: '#0a0a0a', shadow: '7px 7px 0 #0a0a0a', radius: '2px' },
  { id: 'pixel', name: 'Pixel', tags: ['pixel', 'game', 'retro'], background: '#252238', border: '#c4b5fd', accent: '#a78bfa', text: '#ffffff', shadow: '4px 0 0 #11101c, 0 4px 0 #11101c, 8px 8px 0 #07070b', radius: '0px' },
  { id: 'terminal', name: 'Terminal', tags: ['terminal', 'matrix', 'mono'], background: '#07110a', border: '#34d39966', accent: '#34d399', text: '#6ee7b7', shadow: 'inset 0 0 24px #10b98110, 0 0 22px #10b98118', radius: '6px' },
  { id: 'carbon', name: 'Carbon', tags: ['carbon', 'dark', 'texture'], background: 'linear-gradient(135deg,#17191d,#08090b)', border: '#ffffff16', accent: '#9ca3af', text: '#f9fafb', shadow: 'inset 0 1px 0 #ffffff12, 0 18px 32px #0009', radius: '14px' },
  { id: 'lava', name: 'Lava', tags: ['lava', 'warm', 'glow'], background: 'radial-gradient(circle at 25% 20%,#ff9f43,#ef4444 38%,#4c0519 90%)', border: '#fb718566', accent: '#fbbf24', text: '#ffffff', shadow: '0 0 32px #ef444455, inset 0 1px 0 #ffffff38', radius: '22px' },
  { id: 'aqua', name: 'Aqua', tags: ['aqua', 'liquid', 'glass'], background: 'linear-gradient(145deg,#0e7490,#164e63 60%,#082f49)', border: '#67e8f966', accent: '#67e8f9', text: '#ecfeff', shadow: 'inset 0 1px 0 #cffafe44, 0 18px 36px #0891b244', radius: '24px' },
  { id: 'sunset', name: 'Sunset', tags: ['gradient', 'warm', 'soft'], background: 'linear-gradient(135deg,#fb7185,#f97316 52%,#facc15)', border: '#ffffff42', accent: '#fff7ed', text: '#ffffff', shadow: '0 18px 36px #fb718544', radius: '18px' },
  { id: 'monochrome', name: 'Monochrome', tags: ['mono', 'minimal', 'clean'], background: '#f3f4f6', border: '#d1d5db', accent: '#111827', text: '#111827', shadow: '0 14px 30px #00000024', radius: '14px' },
  { id: 'candy', name: 'Candy', tags: ['playful', 'pastel', 'sweet'], background: 'linear-gradient(145deg,#f9a8d4,#c4b5fd 52%,#93c5fd)', border: '#ffffff66', accent: '#7c3aed', text: '#32164f', shadow: 'inset 0 3px 0 #ffffff55, 0 16px 30px #7c3aed33', radius: '28px' },
  { id: 'holographic', name: 'Holographic', tags: ['holo', 'iridescent', 'shine'], background: 'linear-gradient(115deg,#22d3ee44,#a78bfa66,#f472b666,#fde68a55,#22d3ee44)', border: '#ffffff55', accent: '#e0f2fe', text: '#ffffff', shadow: '0 0 32px #a78bfa44, inset 0 1px 0 #ffffff66', radius: '18px' },
  { id: 'paper', name: 'Paper Cut', tags: ['paper', 'layered', 'craft'], background: '#f5efe2', border: '#d7cbb8', accent: '#d97706', text: '#342d26', shadow: '0 4px 0 #d8cbb7, 0 12px 24px #0000002b', radius: '12px' },
  { id: 'cosmic', name: 'Cosmic', tags: ['space', 'cosmic', 'glow'], background: 'radial-gradient(circle at 30% 20%,#4338ca,#1e1b4b 45%,#050510 90%)', border: '#8b5cf666', accent: '#a5f3fc', text: '#ffffff', shadow: '0 0 40px #6d28d955, inset 0 1px 0 #ffffff24', radius: '20px' },
]

export const stylePackVariants: readonly [string, string][] = stylePacks.map((pack) => [pack.id, pack.name] as [string, string])
export const stylePackIds = new Set(stylePacks.map((pack) => pack.id))

export function getStylePack(id: string) {
  return stylePacks.find((pack) => pack.id === id)
}

export function getStylePackCss(family: ComponentFamily, variant: string) {
  const pack = getStylePack(variant)
  if (!pack) return ''

  const selector = {
    button: `.ui-button--${variant}`,
    toggle: `.ui-switch--${variant} .ui-switch-track`,
    checkbox: `.ui-check--${variant} .ui-check-box`,
    card: `.ui-card--${variant}`,
    loader: `.ui-loader--${variant}`,
    input: `.ui-field--${variant} .ui-input`,
    form: `.ui-mini-form--${variant}`,
    pattern: `.ui-pattern--${variant}`,
    radio: `.ui-radio--${variant} .ui-radio-dot`,
    tooltip: `.ui-tooltip-wrap--${variant} .ui-tooltip`,
    experimental: `.ui-xbtn--${variant}`,
  }[family]

  const common = `${selector} {
  background: ${pack.background};
  border-color: ${pack.border};
  color: ${pack.text};
  box-shadow: ${pack.shadow};
  border-radius: ${pack.radius};
}`

  if (family === 'button') {
    return `${common}
${selector}:hover { transform: translateY(-3px) scale(1.02); filter: brightness(1.08); }
${selector}:active { transform: translateY(2px) scale(.96); }`
  }

  if (family === 'card') {
    return `${common}
${selector}:hover { transform: perspective(700px) rotateX(2deg) rotateY(-2deg) translateY(-6px); filter: brightness(1.05); }`
  }

  if (family === 'loader') {
    return `${common}
${selector} { border: 3px solid ${pack.border}; border-top-color: ${pack.accent}; animation: ui-spin 1.05s linear infinite; }
@keyframes ui-spin { to { transform: rotate(360deg); } }`
  }

  if (family === 'pattern') {
    return `${common}
${selector} { background-image: linear-gradient(135deg, transparent 25%, ${pack.accent}22 25% 50%, transparent 50% 75%, ${pack.accent}22 75%); background-size: 24px 24px; }`
  }

  return common
}
