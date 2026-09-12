import type { UiComponentDefinition } from './componentRegistry'

export interface ComponentCode {
  react: string
  html: string
  css: string
  all: string
}

const baseCss: Record<string, string> = {
  button: `.ui-button {
  position: relative;
  min-height: 48px;
  padding: 0 20px;
  border: 1px solid rgba(255,255,255,.16);
  border-radius: 15px;
  color: white;
  font: 700 14px/1 Inter, system-ui, sans-serif;
  cursor: pointer;
  overflow: hidden;
  transition: transform .22s cubic-bezier(.2,.8,.2,1), box-shadow .22s ease;
}
.ui-button:active { transform: translateY(2px) scale(.97); }`,
  toggle: `.ui-switch { position: relative; display: inline-flex; width: 64px; height: 36px; }
.ui-switch input { position: absolute; opacity: 0; }
.ui-switch-track { position: absolute; inset: 0; border-radius: 999px; background: #272a33; cursor: pointer; transition: .3s ease; }
.ui-switch-knob { position: absolute; width: 28px; height: 28px; left: 4px; top: 4px; border-radius: 50%; background: white; box-shadow: 0 4px 12px #0008; transition: .34s cubic-bezier(.2,.8,.2,1); }
.ui-switch input:checked + .ui-switch-track .ui-switch-knob { transform: translateX(28px); }`,
  checkbox: `.ui-check { display: inline-flex; align-items: center; gap: 10px; cursor: pointer; }
.ui-check input { position: absolute; opacity: 0; }
.ui-check-box { width: 26px; height: 26px; border: 1px solid rgba(255,255,255,.18); border-radius: 8px; background: #171920; display: grid; place-items: center; transition: .22s ease; }
.ui-check-box::after { content: ""; width: 9px; height: 5px; border-left: 2px solid white; border-bottom: 2px solid white; transform: rotate(-45deg) scale(0); transition: .2s ease; }
.ui-check input:checked + .ui-check-box::after { transform: rotate(-45deg) scale(1); }`,
  card: `.ui-card { width: min(100%, 290px); min-height: 155px; padding: 20px; border-radius: 20px; border: 1px solid rgba(255,255,255,.1); background: #12151c; transition: transform .3s cubic-bezier(.2,.8,.2,1), box-shadow .3s ease; }
.ui-card h3 { margin: 0 0 8px; font-size: 19px; }
.ui-card p { margin: 0; color: #8f96a5; line-height: 1.5; }
.ui-card-chip { display: inline-flex; margin-top: 18px; padding: 5px 8px; border: 1px solid rgba(255,255,255,.1); border-radius: 999px; font-size: 10px; }`,
  loader: `.ui-loader { width: 52px; height: 52px; position: relative; }
@keyframes ui-spin { to { transform: rotate(360deg); } }
@keyframes ui-bounce { 50% { transform: translateY(-9px); opacity: 1; } }`,
  input: `.ui-field { position: relative; display: block; width: min(100%, 300px); }
.ui-input { width: 100%; height: 50px; padding: 0 14px; border: 1px solid rgba(255,255,255,.14); border-radius: 14px; background: #11141a; color: white; outline: none; transition: .2s ease; }
.ui-input:focus { border-color: #756cff; box-shadow: 0 0 0 3px rgba(117,108,255,.13); }`,
  form: `.ui-mini-form { width: min(100%, 300px); display: grid; gap: 10px; padding: 14px; border: 1px solid rgba(255,255,255,.1); border-radius: 16px; background: #101218; }
.ui-mini-form input, .ui-mini-form button { height: 40px; border-radius: 10px; }
.ui-mini-form input { border: 1px solid rgba(255,255,255,.1); background: #171a22; color: white; padding: 0 11px; }
.ui-mini-form button { border: 0; background: #6f67ff; color: white; font-weight: 800; cursor: pointer; }`,
  pattern: `.ui-pattern { width: 100%; height: 160px; border-radius: 18px; overflow: hidden; }`,
  radio: `.ui-radio { display: inline-flex; align-items: center; gap: 9px; cursor: pointer; }
.ui-radio input { position: absolute; opacity: 0; }
.ui-radio-dot { width: 24px; height: 24px; border-radius: 50%; border: 1px solid rgba(255,255,255,.18); background: #15171e; display: grid; place-items: center; }
.ui-radio-dot::after { content: ""; width: 9px; height: 9px; border-radius: 50%; background: #756cff; transform: scale(0); transition: .2s ease; }
.ui-radio input:checked + .ui-radio-dot::after { transform: scale(1); }`,
  tooltip: `.ui-tooltip-wrap { position: relative; display: inline-flex; }
.ui-tooltip-wrap > button { width: 48px; height: 48px; border-radius: 14px; border: 1px solid rgba(255,255,255,.12); background: #171a21; color: white; cursor: help; }
.ui-tooltip { position: absolute; left: 50%; bottom: calc(100% + 10px); transform: translate(-50%,8px); opacity: 0; white-space: nowrap; padding: 8px 10px; border-radius: 9px; background: #20232c; border: 1px solid rgba(255,255,255,.12); transition: .2s ease; pointer-events: none; }
.ui-tooltip-wrap:hover .ui-tooltip { opacity: 1; transform: translate(-50%,0); }`,
}

const variantCss: Record<string, string> = {
  'button-glass': `.ui-button--glass { background: linear-gradient(145deg,rgba(255,255,255,.15),rgba(255,255,255,.04)); backdrop-filter: blur(16px); box-shadow: inset 0 1px 0 #fff4, 0 16px 30px #0005; }
.ui-button--glass:hover { transform: translateY(-3px); }`,
  'button-neon': `.ui-button--neon { background: #10131a; border-color: #756cff; box-shadow: inset 0 0 20px #756cff18, 0 0 24px #756cff30; }
.ui-button--neon:hover { box-shadow: 0 0 36px #756cff66; }`,
  'button-liquid': `.ui-button--liquid { border: 0; background: linear-gradient(90deg,#675cff,#a855f7); box-shadow: 0 15px 34px #6f67ff55; border-radius: 18px 22px 16px 24px; }`,
  'button-physical': `.ui-button--physical { background: linear-gradient(#30343e,#171920); box-shadow: inset 0 1px 0 #fff4, inset 0 -6px 0 #0006, 0 14px 25px #0006; padding-bottom: 5px; }
.ui-button--physical:active { transform: translateY(5px); box-shadow: inset 0 -2px 0 #0005, 0 5px 10px #0005; }`,
  'button-aurora': `.ui-button--aurora { background: linear-gradient(120deg,#6f67ff,#22d3ee,#f472b6,#6f67ff); background-size: 250% 100%; animation: ui-aurora 5s linear infinite; }
@keyframes ui-aurora { to { background-position: 250% 0; } }`,
  'toggle-standard': `.ui-switch--standard input:checked + .ui-switch-track { background: linear-gradient(90deg,#5f57ff,#8b5cf6); box-shadow: 0 0 22px #6f67ff55; }`,
  'toggle-glass': `.ui-switch--glass .ui-switch-track { background: rgba(255,255,255,.08); backdrop-filter: blur(12px); }
.ui-switch--glass input:checked + .ui-switch-track { background: rgba(111,103,255,.4); }`,
  'toggle-neon': `.ui-switch--neon input:checked + .ui-switch-track { background: #071a1d; box-shadow: 0 0 20px #22d3ee66; border: 1px solid #22d3ee; }
.ui-switch--neon input:checked + .ui-switch-track .ui-switch-knob { background: #22d3ee; box-shadow: 0 0 14px #22d3ee; }`,
  'toggle-segment': `.ui-switch--segment .ui-switch-track::after { content: "OFF"; position: absolute; right: 8px; top: 11px; font: 900 9px Inter,sans-serif; color: #777e8c; }
.ui-switch--segment input:checked + .ui-switch-track::after { content: "ON"; left: 9px; right: auto; color: white; }`,
  'toggle-orb': `.ui-switch--orb .ui-switch-track { background: linear-gradient(90deg,#211d32,#0e272c); }
.ui-switch--orb .ui-switch-knob::after { content: ""; position: absolute; inset: 7px; border-radius: 50%; background: #6f67ff; box-shadow: 0 0 12px #6f67ff; }
.ui-switch--orb input:checked + .ui-switch-track .ui-switch-knob::after { background: #2dd4bf; box-shadow: 0 0 14px #2dd4bf; }`,
  'checkbox-default': `.ui-check--default input:checked + .ui-check-box { background: #6f67ff; border-color: #8d88ff; box-shadow: 0 0 20px #6f67ff55; }`,
  'checkbox-round': `.ui-check--round .ui-check-box { border-radius: 50%; }
.ui-check--round input:checked + .ui-check-box { background: #6f67ff; }`,
  'checkbox-glow': `.ui-check--glow input:checked + .ui-check-box { background: #092327; border-color: #22d3ee; box-shadow: 0 0 18px #22d3ee88; }`,
  'checkbox-line': `.ui-check--line .ui-check-box { background: transparent; border: 2px solid #565d6c; }
.ui-check--line input:checked + .ui-check-box { border-color: #2dd4bf; transform: rotate(4deg); }`,
  'checkbox-soft': `.ui-check--soft .ui-check-box { border: 0; background: #15171d; box-shadow: inset 3px 3px 7px #08090d, inset -3px -3px 7px #292d38; }
.ui-check--soft input:checked + .ui-check-box { box-shadow: inset 3px 3px 7px #08090d, 0 0 18px #6f67ff55; }`,
  'card-glass': `.ui-card--glass { background: linear-gradient(145deg,#ffffff18,#ffffff06); backdrop-filter: blur(16px); }
.ui-card--glass:hover { transform: translateY(-6px); box-shadow: 0 22px 45px #0006; }`,
  'card-neon': `.ui-card--neon { background: #10131a; box-shadow: inset 0 0 0 1px #756cff22; }
.ui-card--neon:hover { border-color: #756cff99; box-shadow: 0 0 35px #756cff22; }`,
  'card-tilt': `.ui-card--tilt { transform: perspective(700px) rotateX(3deg) rotateY(-3deg); background: linear-gradient(155deg,#191c25,#0e1016); }
.ui-card--tilt:hover { transform: perspective(700px) rotateX(0) rotateY(0) translateY(-6px) scale(1.02); }`,
  'card-accent': `.ui-card--accent { border-left: 3px solid #22d3ee; background: #101218; }
.ui-card--accent::after { content: ""; position: absolute; right: 18px; top: 18px; width: 8px; height: 8px; border-radius: 50%; background: #2dd4bf; box-shadow: 0 0 14px #2dd4bf; }`,
  'card-orbit': `.ui-card--orbit { background: #0e1117; overflow: hidden; }
.ui-card--orbit::after { content: ""; position: absolute; width: 150px; height: 150px; right: -75px; bottom: -85px; border-radius: 50%; border: 1px solid #22d3ee55; box-shadow: 0 0 35px #22d3ee22; }`,
  'loader-ring': `.ui-loader--ring { border-radius: 50%; border: 3px solid #ffffff18; border-top-color: #756cff; animation: ui-spin .9s linear infinite; }`,
  'loader-dual': `.ui-loader--dual { border-radius: 50%; border: 3px solid transparent; border-top-color: #22d3ee; border-bottom-color: #8b5cf6; animation: ui-spin 1s linear infinite; }
.ui-loader--dual::after { content: ""; position: absolute; inset: 8px; border-radius: 50%; border: 2px solid transparent; border-left-color: #f472b6; border-right-color: #2dd4bf; animation: ui-spin .7s linear infinite reverse; }`,
  'loader-dots': `.ui-loader--dots { display: flex; align-items: center; justify-content: center; gap: 6px; }
.ui-loader--dots span { width: 9px; height: 9px; border-radius: 50%; background: #8b86ff; opacity: .4; animation: ui-bounce 1s ease infinite; }
.ui-loader--dots span:nth-child(2) { animation-delay: .12s; }
.ui-loader--dots span:nth-child(3) { animation-delay: .24s; }`,
  'loader-orb': `.ui-loader--orb { border-radius: 50%; background: radial-gradient(circle at 35% 28%,#fff 0 4%,#8b5cf6 18%,#3d2e98 48%,#11131a 72%); box-shadow: 0 0 32px #8b5cf666; animation: ui-orb 2.4s ease-in-out infinite; }
@keyframes ui-orb { 50% { transform: scale(1.1); filter: hue-rotate(35deg); } }`,
  'loader-bars': `.ui-loader--bars { display: flex; align-items: center; justify-content: center; gap: 4px; }
.ui-loader--bars span { width: 5px; height: 30px; border-radius: 8px; background: linear-gradient(#22d3ee,#6f67ff); animation: ui-bars .85s ease-in-out infinite; }
.ui-loader--bars span:nth-child(2){animation-delay:.1s}.ui-loader--bars span:nth-child(3){animation-delay:.2s}.ui-loader--bars span:nth-child(4){animation-delay:.3s}.ui-loader--bars span:nth-child(5){animation-delay:.4s}
@keyframes ui-bars { 50% { transform: scaleY(1.35); } }`,
  'input-default': ``,
  'input-glass': `.ui-field--glass .ui-input { background: #ffffff0d; backdrop-filter: blur(12px); }`,
  'input-neon': `.ui-field--neon .ui-input:focus { border-color: #22d3ee; box-shadow: 0 0 0 3px #22d3ee15, 0 0 24px #22d3ee25; }`,
  'input-floating': `.ui-field--floating > span { position: absolute; left: 14px; top: 16px; color: #747b8a; pointer-events: none; transition: .2s ease; }
.ui-field--floating .ui-input:focus + span, .ui-field--floating .ui-input:not(:placeholder-shown) + span { transform: translateY(-11px) scale(.78); transform-origin: left top; color: #9f9aff; }`,
  'input-search': `.ui-field--search::before { content: "⌕"; position: absolute; left: 14px; top: 10px; font-size: 24px; color: #747b8a; z-index: 1; }
.ui-field--search .ui-input { padding-left: 42px; border-radius: 999px; }`,
  'form-standard': ``,
  'form-glass': `.ui-mini-form--glass { background: linear-gradient(145deg,#ffffff10,#ffffff04); backdrop-filter: blur(14px); }`,
  'form-accent': `.ui-mini-form--accent { border-left: 3px solid #22d3ee; }`,
  'form-compact': `.ui-mini-form--compact { grid-template-columns: 1fr auto; }
.ui-mini-form--compact button { padding: 0 15px; }`,
  'form-ai': `.ui-mini-form--ai button { background: linear-gradient(90deg,#6f67ff,#a855f7,#22d3ee); background-size: 180% 100%; animation: ui-ai 4s linear infinite; }
@keyframes ui-ai { to { background-position: 180% 0; } }`,
  'pattern-grid': `.ui-pattern--grid { background-image: linear-gradient(#ffffff0d 1px,transparent 1px),linear-gradient(90deg,#ffffff0d 1px,transparent 1px); background-size: 22px 22px; }`,
  'pattern-dots': `.ui-pattern--dots { background-image: radial-gradient(#8b5cf699 1.2px,transparent 1.2px); background-size: 18px 18px; }`,
  'pattern-diagonal': `.ui-pattern--diagonal { background: repeating-linear-gradient(135deg,#22d3ee22 0 2px,transparent 2px 15px); }`,
  'pattern-orbits': `.ui-pattern--orbits { background: radial-gradient(circle at center,transparent 0 18px,#ffffff12 19px 20px,transparent 21px 38px,#756cff33 39px 40px,transparent 41px); }`,
  'pattern-aurora': `.ui-pattern--aurora { background: radial-gradient(circle at 30% 40%,#6f67ff66,transparent 30%),radial-gradient(circle at 70% 55%,#22d3ee44,transparent 26%),radial-gradient(circle at 50% 80%,#f472b633,transparent 25%); filter: blur(5px); }`,
  'radio-default': ``,
  'radio-ring': `.ui-radio--ring input:checked + .ui-radio-dot { border: 5px solid #22d3ee; }
.ui-radio--ring input:checked + .ui-radio-dot::after { display: none; }`,
  'radio-glow': `.ui-radio--glow input:checked + .ui-radio-dot { border-color: #f472b6; box-shadow: 0 0 18px #f472b666; }
.ui-radio--glow .ui-radio-dot::after { background: #f472b6; }`,
  'radio-soft': `.ui-radio--soft .ui-radio-dot { border: 0; box-shadow: inset 3px 3px 6px #090a0d, inset -3px -3px 6px #282b35; }`,
  'radio-pop': `.ui-radio--pop input:checked + .ui-radio-dot { animation: ui-pop .34s cubic-bezier(.2,.8,.2,1); }
@keyframes ui-pop { 50% { transform: scale(1.2); } }`,
  'tooltip-default': ``,
  'tooltip-glass': `.ui-tooltip-wrap--glass .ui-tooltip { background: #20232caa; backdrop-filter: blur(14px); }`,
  'tooltip-neon': `.ui-tooltip-wrap--neon .ui-tooltip { border-color: #756cff; box-shadow: 0 0 20px #756cff44; }`,
  'tooltip-arrow': `.ui-tooltip-wrap--arrow .ui-tooltip::after { content: ""; position: absolute; top: 100%; left: 50%; transform: translateX(-50%); border: 6px solid transparent; border-top-color: #20232c; }`,
  'tooltip-side': `.ui-tooltip-wrap--side .ui-tooltip { left: calc(100% + 10px); bottom: 50%; transform: translate(8px,50%); }
.ui-tooltip-wrap--side:hover .ui-tooltip { transform: translate(0,50%); }`,
}

const experimentalCss: Record<string, string> = {
  mechanical: `.ui-xbtn--mechanical { width: 132px; height: 62px; border: 0; border-radius: 20px; color: white; background: linear-gradient(#363944,#181a20); box-shadow: 0 10px 0 #0b0c10,0 16px 25px #0008,inset 0 2px 0 #fff3; cursor: pointer; transition: .14s ease; }
.ui-xbtn--mechanical span { display: grid; place-items: center; margin: 8px; height: 46px; border-radius: 14px; background: linear-gradient(#8d86ff,#6258e8); box-shadow: inset 0 2px 0 #fff5,inset 0 -6px 10px #0003,0 0 24px #756cff55; font-weight: 900; }
.ui-xbtn--mechanical:active { transform: translateY(9px); box-shadow: 0 2px 0 #0b0c10,0 6px 12px #0006; }`,
  cube: `.ui-xbtn--cube { width: 92px; height: 58px; border: 0; background: none; position: relative; transform-style: preserve-3d; transform: rotateX(-15deg) rotateY(20deg); transition: .45s cubic-bezier(.2,.8,.2,1); cursor: pointer; }
.ui-cube-face { position: absolute; inset: 0; display: grid; place-items: center; border-radius: 12px; color: white; font-weight: 900; border: 1px solid #fff3; }
.ui-cube-face--front { background: linear-gradient(145deg,#6d63ff,#493fd1); transform: translateZ(18px); }
.ui-cube-face--top { background: #928bff; transform: rotateX(90deg) translateZ(18px); height: 36px; transform-origin: top; }
.ui-cube-face--side { background: #3f37aa; transform: rotateY(90deg) translateZ(18px); width: 36px; left: auto; transform-origin: right; }
.ui-xbtn--cube:hover { transform: rotateX(-22deg) rotateY(-25deg) translateY(-4px) scale(1.04); }`,
  jelly: `.ui-xbtn--jelly { border: 0; border-radius: 22px; padding: 16px 26px; color: white; font-weight: 900; background: linear-gradient(145deg,#ff6fae,#a855f7); box-shadow: inset 0 3px 0 #fff6,inset 0 -8px 16px #58157847,0 18px 28px #72288c47; cursor: pointer; animation: ui-jelly 3.4s ease-in-out infinite; }
@keyframes ui-jelly { 50% { border-radius: 18px 26px 19px 28px; transform: scale(1.03); } }`,
  orbit: `.ui-xbtn--orbit { width: 116px; height: 54px; border: 1px solid #fff2; border-radius: 18px; color: white; background: #11131b; position: relative; font-weight: 900; cursor: pointer; }
.ui-xbtn--orbit::before { content: ""; position: absolute; inset: -14px; border-radius: 28px; border: 1px solid #22d3ee55; transform: rotateX(68deg); animation: ui-orbit 3s linear infinite; }
@keyframes ui-orbit { to { transform: rotateX(68deg) rotateZ(360deg); } }`,
  magnetic: `.ui-magnetic-zone { width: 220px; height: 120px; display: grid; place-items: center; }
.ui-xbtn--magnetic { width: 126px; height: 54px; border: 1px solid #fff2; border-radius: 17px; color: white; background: linear-gradient(145deg,#161923,#0d0f15); font-weight: 900; transform: translate(var(--ui-mx),var(--ui-my)); transition: transform .12s ease-out; box-shadow: 0 18px 30px #0005; cursor: pointer; }`,
  hologram: `.ui-xbtn--hologram { padding: 16px 23px; border-radius: 14px; border: 1px solid #51e4ff88; background: #031c2655; color: #bff7ff; font-weight: 900; letter-spacing: .06em; box-shadow: inset 0 0 18px #22d3ee22,0 0 20px #22d3ee33; text-shadow: 0 0 10px #22d3eeaa; position: relative; overflow: hidden; cursor: pointer; }
.ui-xbtn--hologram::before { content: ""; position: absolute; inset: 0; background: repeating-linear-gradient(0deg,transparent 0 3px,#7df9ff1f 3px 4px); animation: ui-scan .9s linear infinite; }
@keyframes ui-scan { to { background-position: 0 4px; } }`,
  folder: `.ui-xbtn--folder { width: 130px; height: 64px; border: 0; border-radius: 10px 16px 16px 16px; color: white; background: linear-gradient(#7384ff,#5364df); position: relative; font-weight: 900; box-shadow: 0 16px 25px #0005,inset 0 -7px 12px #0002; cursor: pointer; transition: .35s ease; }
.ui-xbtn--folder::before { content: ""; position: absolute; left: 0; top: -10px; width: 52px; height: 18px; border-radius: 10px 10px 0 0; background: #8796ff; }
.ui-xbtn--folder:hover { transform: perspective(500px) rotateX(-12deg) translateY(-5px); }`,
  arcade: `.ui-xbtn--arcade { width: 112px; height: 66px; border: 0; border-radius: 50%; background: #23252c; position: relative; box-shadow: 0 10px 0 #090a0d,0 18px 24px #0007,inset 0 3px 0 #fff3; cursor: pointer; }
.ui-xbtn--arcade::before { content: "GO"; position: absolute; left: 50%; top: 45%; transform: translate(-50%,-50%); width: 76px; height: 44px; border-radius: 50%; display: grid; place-items: center; color: white; font-weight: 1000; background: radial-gradient(circle at 50% 25%,#ff8aa0,#ef3152 58%,#a80f2c); box-shadow: inset 0 5px 5px #fff5,inset 0 -7px 8px #46000f59,0 0 20px #fb718544; }
.ui-xbtn--arcade:active { transform: translateY(8px); box-shadow: 0 2px 0 #090a0d,0 6px 10px #0006; }`,
  crystal: `.ui-xbtn--crystal { width: 118px; height: 58px; border: 0; clip-path: polygon(12% 0,88% 0,100% 50%,88% 100%,12% 100%,0 50%); color: white; font-weight: 900; background: linear-gradient(135deg,#ffffff73,#6f67ff85 26%,#22d3ee52 65%,#ffffff47); backdrop-filter: blur(12px); cursor: pointer; transition: .35s ease; }
.ui-xbtn--crystal:hover { transform: translateY(-5px) rotate(-2deg) scale(1.04); filter: hue-rotate(18deg) saturate(1.2); }`,
  flip: `.ui-xbtn--flip { width: 126px; height: 52px; border: 0; background: none; perspective: 500px; cursor: pointer; }
.ui-flip-inner { display: block; width: 100%; height: 100%; position: relative; transform-style: preserve-3d; transition: transform .55s ease; }
.ui-xbtn--flip:hover .ui-flip-inner { transform: rotateX(180deg); }
.ui-flip-face { position: absolute; inset: 0; border-radius: 15px; display: grid; place-items: center; color: white; font-weight: 900; backface-visibility: hidden; }
.ui-flip-face--front { background: #20232b; border: 1px solid #fff2; }
.ui-flip-face--back { background: linear-gradient(135deg,#6f67ff,#22d3ee); transform: rotateX(180deg); }`,
  split: `.ui-xbtn--split { width: 138px; height: 54px; border: 0; background: linear-gradient(90deg,#191c24 50%,#20232c 50%); border-radius: 15px; color: white; font-weight: 900; cursor: pointer; transition: .3s ease; }
.ui-xbtn--split:hover { letter-spacing: .12em; box-shadow: -10px 0 25px #6f67ff33,10px 0 25px #22d3ee22; transform: scaleX(1.08); }`,
  bubble: `.ui-xbtn--bubble { width: 116px; height: 54px; border: 0; color: white; font-weight: 900; background: linear-gradient(145deg,#70dcffb8,#7558ffb3); box-shadow: inset 8px 9px 16px #fff3,inset -9px -12px 18px #361b8747,0 16px 28px #2e3baa47; cursor: pointer; animation: ui-bubble 5s ease-in-out infinite; }
@keyframes ui-bubble { 0%,100%{border-radius:50% 45% 50% 42%/55% 50% 45% 50%}50%{border-radius:42% 55% 43% 57%/50% 42% 58% 50%} }`,
  ticket: `.ui-xbtn--ticket { min-width: 132px; height: 54px; border: 0; color: #2a1707; font-weight: 1000; letter-spacing: .04em; background: linear-gradient(90deg,#f7cc5f,#ff8f5c); clip-path: polygon(0 0,100% 0,100% 35%,94% 50%,100% 65%,100% 100%,0 100%,0 65%,6% 50%,0 35%); cursor: pointer; transition: .25s; }
.ui-xbtn--ticket:hover { transform: translateY(-4px) rotate(-1deg); }`,
  'space-door': `.ui-xbtn--door { width: 128px; height: 60px; border: 1px solid #fff2; border-radius: 16px; background: #0d0f15; color: white; font-weight: 900; position: relative; overflow: hidden; cursor: pointer; }
.ui-xbtn--door::before,.ui-xbtn--door::after { content: ""; position: absolute; top: 5px; bottom: 5px; width: 48%; background: linear-gradient(145deg,#262a34,#14171e); transition: .42s ease; z-index: 1; }
.ui-xbtn--door::before { left: 5px; }.ui-xbtn--door::after { right: 5px; }
.ui-xbtn--door span { position: relative; z-index: 2; }
.ui-xbtn--door:hover::before { transform: translateX(-86%); }.ui-xbtn--door:hover::after { transform: translateX(86%); }`,
  lever: `.ui-xbtn--lever { width: 120px; height: 66px; border: 1px solid #fff2; border-radius: 18px; background: #14161c; position: relative; box-shadow: inset 0 0 18px #0008,0 15px 28px #0005; cursor: pointer; }
.ui-xbtn--lever::before { content: ""; position: absolute; left: 50%; top: 50%; width: 10px; height: 48px; border-radius: 8px; background: linear-gradient(#c9ced8,#555b67); transform-origin: 50% 85%; transform: translate(-50%,-75%) rotate(-28deg); transition: .4s cubic-bezier(.2,1.4,.3,1); }
.ui-xbtn--lever:hover::before { transform: translate(-50%,-75%) rotate(28deg); }`,
  capsule: `.ui-xbtn--capsule { width: 138px; height: 54px; border: 1px solid #fff3; border-radius: 999px; overflow: hidden; color: white; font-weight: 900; background: linear-gradient(90deg,#d72f55 50%,#f4f4f5 50%); box-shadow: inset 0 0 18px #0004,0 15px 25px #0004; cursor: pointer; transition: .3s; }
.ui-xbtn--capsule span { mix-blend-mode: difference; }
.ui-xbtn--capsule:hover { transform: rotate(-3deg) translateY(-3px); }`,
  stacked: `.ui-xbtn--stacked { width: 120px; height: 50px; border: 0; border-radius: 14px; color: white; background: #6f67ff; font-weight: 900; box-shadow: 0 7px 0 #4d46b7,0 14px 0 #2c286c,0 22px 30px #0006; cursor: pointer; transition: .18s; }
.ui-xbtn--stacked:active { transform: translateY(12px); box-shadow: 0 2px 0 #4d46b7,0 4px 0 #2c286c,0 8px 12px #0005; }`,
  wave: `.ui-xbtn--wave { width: 136px; height: 56px; border: 1px solid #fff2; border-radius: 17px; color: white; background: #12141a; position: relative; overflow: hidden; font-weight: 900; cursor: pointer; }
.ui-xbtn--wave::before { content: ""; position: absolute; width: 180%; height: 140%; left: -40%; top: 45%; background: radial-gradient(ellipse at center,#6f67ff 0 45%,transparent 46%); animation: ui-wave 3s ease-in-out infinite; }
.ui-xbtn--wave span { position: relative; z-index: 2; }
@keyframes ui-wave { 50% { transform: translateX(12%) rotate(3deg); } }`,
  eye: `.ui-xbtn--eye { width: 124px; height: 58px; border: 0; border-radius: 55% 45% 55% 45%/65% 65% 35% 35%; background: #f6f7fb; color: #11131a; font-weight: 1000; position: relative; overflow: hidden; cursor: pointer; }
.ui-xbtn--eye::before { content: ""; position: absolute; width: 28px; height: 28px; border-radius: 50%; background: #6f67ff; left: 18px; top: 15px; box-shadow: inset 0 0 0 7px #22252c,0 0 12px #6f67ff66; transition: .25s ease; }
.ui-xbtn--eye span { position: relative; margin-left: 26px; }
.ui-xbtn--eye:hover::before { left: 78px; }`,
  portal: `.ui-xbtn--portal { width: 122px; height: 58px; border: 0; border-radius: 17px; background: #0b0d12; color: white; font-weight: 900; position: relative; overflow: hidden; cursor: pointer; }
.ui-xbtn--portal::before { content: ""; position: absolute; width: 90px; height: 90px; border-radius: 50%; left: 50%; top: 50%; transform: translate(-50%,-50%) scale(.55); background: conic-gradient(#22d3ee,#6f67ff,#f472b6,#22d3ee); filter: blur(3px); animation: ui-spin 2.5s linear infinite; transition: .35s; }
.ui-xbtn--portal::after { content: ""; position: absolute; width: 62px; height: 62px; border-radius: 50%; left: 50%; top: 50%; transform: translate(-50%,-50%); background: #0b0d12; }
.ui-xbtn--portal span { position: relative; z-index: 3; }
.ui-xbtn--portal:hover::before { transform: translate(-50%,-50%) scale(1.15); }`,
}

function markup(component: UiComponentDefinition, react: boolean): string {
  const classAttribute = react ? 'className' : 'class'

  if (component.family === 'experimental') {
    const classes: Record<string, string> = {
      mechanical: `<button ${classAttribute}="ui-xbtn ui-xbtn--mechanical" type="button"><span>PRESS</span></button>`,
      cube: `<button ${classAttribute}="ui-xbtn ui-xbtn--cube" type="button">\n  <span ${classAttribute}="ui-cube-face ui-cube-face--front">OPEN</span>\n  <span ${classAttribute}="ui-cube-face ui-cube-face--top"></span>\n  <span ${classAttribute}="ui-cube-face ui-cube-face--side"></span>\n</button>`,
      jelly: `<button ${classAttribute}="ui-xbtn ui-xbtn--jelly" type="button">BOUNCE</button>`,
      orbit: `<button ${classAttribute}="ui-xbtn ui-xbtn--orbit" type="button">ORBIT</button>`,
      magnetic: `<button ${classAttribute}="ui-xbtn ui-xbtn--magnetic" type="button">FOLLOW</button>`,
      hologram: `<button ${classAttribute}="ui-xbtn ui-xbtn--hologram" type="button">JARVIS</button>`,
      folder: `<button ${classAttribute}="ui-xbtn ui-xbtn--folder" type="button">FILES</button>`,
      arcade: `<button ${classAttribute}="ui-xbtn ui-xbtn--arcade" type="button" aria-label="Go"></button>`,
      crystal: `<button ${classAttribute}="ui-xbtn ui-xbtn--crystal" type="button">CRYSTAL</button>`,
      flip: `<button ${classAttribute}="ui-xbtn ui-xbtn--flip" type="button">\n  <span ${classAttribute}="ui-flip-inner">\n    <span ${classAttribute}="ui-flip-face ui-flip-face--front">READY</span>\n    <span ${classAttribute}="ui-flip-face ui-flip-face--back">GO!</span>\n  </span>\n</button>`,
      split: `<button ${classAttribute}="ui-xbtn ui-xbtn--split" type="button">UNLOCK</button>`,
      bubble: `<button ${classAttribute}="ui-xbtn ui-xbtn--bubble" type="button">POP</button>`,
      ticket: `<button ${classAttribute}="ui-xbtn ui-xbtn--ticket" type="button">ENTER</button>`,
      'space-door': `<button ${classAttribute}="ui-xbtn ui-xbtn--door" type="button"><span>ACCESS</span></button>`,
      lever: `<button ${classAttribute}="ui-xbtn ui-xbtn--lever" type="button" aria-label="Lever"></button>`,
      capsule: `<button ${classAttribute}="ui-xbtn ui-xbtn--capsule" type="button"><span>BOOST</span></button>`,
      stacked: `<button ${classAttribute}="ui-xbtn ui-xbtn--stacked" type="button">LAUNCH</button>`,
      wave: `<button ${classAttribute}="ui-xbtn ui-xbtn--wave" type="button"><span>FLOW</span></button>`,
      eye: `<button ${classAttribute}="ui-xbtn ui-xbtn--eye" type="button"><span>LOOK</span></button>`,
      portal: `<button ${classAttribute}="ui-xbtn ui-xbtn--portal" type="button"><span>ENTER</span></button>`,
    }
    return classes[component.variant] ?? ''
  }

  if (component.family === 'button') return `<button ${classAttribute}="ui-button ui-button--${component.variant}" type="button">Starten</button>`
  if (component.family === 'toggle') return `<label ${classAttribute}="ui-switch ui-switch--${component.variant}">\n  <input type="checkbox" />\n  <span ${classAttribute}="ui-switch-track"><span ${classAttribute}="ui-switch-knob"></span></span>\n</label>`
  if (component.family === 'checkbox') return `<label ${classAttribute}="ui-check ui-check--${component.variant}">\n  <input type="checkbox" />\n  <span ${classAttribute}="ui-check-box"></span>\n  Aktiv\n</label>`
  if (component.family === 'card') return `<article ${classAttribute}="ui-card ui-card--${component.variant}">\n  <h3>BABAT RED</h3>\n  <p>Eine interaktive Oberfläche mit eigener Materialität.</p>\n  <span ${classAttribute}="ui-card-chip">${component.variant}</span>\n</article>`
  if (component.family === 'loader') {
    if (component.variant === 'dots') return `<div ${classAttribute}="ui-loader ui-loader--dots"><span></span><span></span><span></span></div>`
    if (component.variant === 'bars') return `<div ${classAttribute}="ui-loader ui-loader--bars"><span></span><span></span><span></span><span></span><span></span></div>`
    return `<div ${classAttribute}="ui-loader ui-loader--${component.variant}" aria-label="Loading"></div>`
  }
  if (component.family === 'input') return `<label ${classAttribute}="ui-field ui-field--${component.variant}">\n  <input ${classAttribute}="ui-input" placeholder="Text eingeben" />\n</label>`
  if (component.family === 'form') return `<form ${classAttribute}="ui-mini-form ui-mini-form--${component.variant}">\n  <input placeholder="Name" />\n  <input placeholder="Beschreibung" />\n  <button type="submit">Speichern</button>\n</form>`
  if (component.family === 'pattern') return `<div ${classAttribute}="ui-pattern ui-pattern--${component.variant}"></div>`
  if (component.family === 'radio') return `<label ${classAttribute}="ui-radio ui-radio--${component.variant}">\n  <input type="radio" name="option" />\n  <span ${classAttribute}="ui-radio-dot"></span>\n  Option A\n</label>`
  return `<span ${classAttribute}="ui-tooltip-wrap ui-tooltip-wrap--${component.variant}">\n  <button type="button">?</button>\n  <span ${classAttribute}="ui-tooltip">Mehr Informationen</span>\n</span>`
}

export function getComponentCode(component: UiComponentDefinition): ComponentCode {
  const react = markup(component, true)
  const html = markup(component, false)
  const css = component.family === 'experimental'
    ? experimentalCss[component.variant] ?? ''
    : `${baseCss[component.family] ?? ''}\n\n${variantCss[component.id] ?? ''}`.trim()

  return {
    react,
    html,
    css,
    all: `${react}\n\n/* CSS */\n${css}`,
  }
}
