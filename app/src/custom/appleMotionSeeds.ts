import type { CustomDesign } from './types'
import { appleDepthMotionCss, appleDepthMotionJs } from './motion/appleDepthPreset'

const shellCss = `${appleDepthMotionCss}
.apple-stage{width:min(760px,92vw);display:grid;place-items:center;padding:28px;perspective:1200px}
.apple-surface{position:relative;overflow:hidden;border:1px solid rgba(255,255,255,.16);background:linear-gradient(145deg,rgba(38,42,54,.86),rgba(13,15,21,.88));backdrop-filter:blur(28px) saturate(155%);-webkit-backdrop-filter:blur(28px) saturate(155%);box-shadow:0 28px 70px rgba(0,0,0,.32),0 8px 24px rgba(0,0,0,.22),inset 0 1px 0 rgba(255,255,255,.11);color:white}
.apple-kicker{margin:0 0 8px;color:rgba(255,255,255,.5);font-size:11px;font-weight:750;letter-spacing:.12em;text-transform:uppercase}
.apple-title{margin:0;font-size:clamp(22px,4vw,38px);font-weight:760;letter-spacing:-.045em}
.apple-muted{color:rgba(255,255,255,.55)}
.apple-pill{display:inline-flex;align-items:center;gap:7px;padding:7px 10px;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(255,255,255,.055);font-size:11px;font-weight:650;color:rgba(255,255,255,.72)}
.apple-dot{width:7px;height:7px;border-radius:50%;background:#70efb2;box-shadow:0 0 16px #70efb288}
.apple-orb{position:absolute;width:190px;height:190px;border-radius:50%;filter:blur(2px);background:radial-gradient(circle at 35% 30%,rgba(255,255,255,.7),rgba(134,116,255,.32) 20%,rgba(72,112,255,.18) 48%,transparent 70%);opacity:.5;pointer-events:none}
`

export const appleMotionSeedDesigns: CustomDesign[] = [
  {
    id: 'apple-glass-stat-card',
    name: 'Apple Glass Stat Card',
    category: 'Apple Motion',
    description: 'Quiet glass metric card with pointer-tracked depth, specular light and layered content.',
    tags: ['apple', 'glass', 'card', 'metric', '3d', 'tilt'],
    source: 'seed',
    html: `<div class="apple-stage"><article class="apple-surface apple-stat" data-apple-depth><div class="apple-orb"></div><div data-apple-layer style="--apple-z:34px"><div class="apple-row"><div><p class="apple-kicker">Activity</p><h2 class="apple-title">12,480</h2></div><span class="apple-pill"><i class="apple-dot"></i>+18.4%</span></div><div class="apple-bars" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><p class="apple-muted apple-foot">Last 7 days · live</p></div></article></div>`,
    css: `${shellCss}.apple-stat{width:min(470px,88vw);min-height:250px;padding:28px;border-radius:32px}.apple-stat .apple-orb{right:-70px;top:-80px}.apple-row{display:flex;align-items:flex-start;justify-content:space-between;gap:24px}.apple-bars{height:92px;margin-top:26px;display:flex;align-items:end;gap:8px}.apple-bars i{flex:1;min-width:12px;border-radius:999px 999px 6px 6px;background:linear-gradient(to top,rgba(102,122,255,.28),rgba(191,183,255,.92));box-shadow:0 0 22px rgba(135,128,255,.14)}.apple-bars i:nth-child(1){height:32%}.apple-bars i:nth-child(2){height:47%}.apple-bars i:nth-child(3){height:42%}.apple-bars i:nth-child(4){height:71%}.apple-bars i:nth-child(5){height:58%}.apple-bars i:nth-child(6){height:82%}.apple-bars i:nth-child(7){height:93%}.apple-foot{margin:15px 0 0;font-size:12px}`,
    js: appleDepthMotionJs,
  },
  {
    id: 'apple-spatial-login',
    name: 'Apple Spatial Login',
    category: 'Apple Motion',
    description: 'Spatial glass login panel with restrained depth, soft focus lighting and layered controls.',
    tags: ['apple', 'login', 'glass', 'spatial', 'form', '3d'],
    source: 'seed',
    html: `<div class="apple-stage"><section class="apple-surface apple-login" data-apple-depth><div class="apple-orb"></div><div data-apple-layer style="--apple-z:30px"><p class="apple-kicker">Welcome back</p><h2 class="apple-title">Sign in</h2><p class="apple-muted apple-login-copy">Continue to your workspace.</p><label>Email<input type="email" value="red@example.com"></label><label>Password<input type="password" value="12345678"></label><button type="button">Continue <span>→</span></button><small>Protected by local session security</small></div></section></div>`,
    css: `${shellCss}.apple-login{width:min(420px,88vw);padding:32px;border-radius:34px}.apple-login .apple-orb{right:-85px;top:-90px}.apple-login-copy{margin:8px 0 24px;font-size:13px}.apple-login label{display:grid;gap:7px;margin-top:13px;color:rgba(255,255,255,.58);font-size:11px;font-weight:650}.apple-login input{height:48px;padding:0 14px;border:1px solid rgba(255,255,255,.11);border-radius:15px;outline:none;background:rgba(255,255,255,.055);color:white;box-shadow:inset 0 1px 0 rgba(255,255,255,.04);transition:border-color .2s,background .2s,box-shadow .2s}.apple-login input:focus{border-color:rgba(177,169,255,.62);background:rgba(255,255,255,.08);box-shadow:0 0 0 4px rgba(130,114,255,.09)}.apple-login button{width:100%;height:49px;margin-top:18px;border:1px solid rgba(255,255,255,.22);border-radius:15px;background:linear-gradient(180deg,rgba(255,255,255,.95),rgba(230,231,239,.88));color:#101118;font:750 13px Inter,system-ui;display:flex;align-items:center;justify-content:center;gap:8px;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,.18),inset 0 1px 0 white}.apple-login small{display:block;margin-top:14px;text-align:center;color:rgba(255,255,255,.34);font-size:10px}`,
    js: appleDepthMotionJs,
  },
  {
    id: 'apple-control-center-panel',
    name: 'Apple Control Center Panel',
    category: 'Apple Motion',
    description: 'Control-center inspired spatial panel with floating tiles and pointer-reactive glass depth.',
    tags: ['apple', 'control center', 'panel', 'glass', 'dashboard', '3d'],
    source: 'seed',
    html: `<div class="apple-stage"><section class="apple-surface apple-control" data-apple-depth><div class="apple-orb"></div><div class="apple-control-grid" data-apple-layer style="--apple-z:26px"><button class="apple-control-tile is-on"><b>◉</b><span>Network<small>Connected</small></span></button><button class="apple-control-tile"><b>☾</b><span>Focus<small>Off</small></span></button><button class="apple-control-tile apple-control-wide"><span>Display<small>72%</small></span><i><em></em></i></button><button class="apple-control-tile"><b>⌁</b><span>AirDrop<small>Contacts</small></span></button><button class="apple-control-tile"><b>▶</b><span>Media<small>Paused</small></span></button></div></section></div>`,
    css: `${shellCss}.apple-control{width:min(520px,90vw);padding:18px;border-radius:36px}.apple-control .apple-orb{left:-80px;bottom:-100px}.apple-control-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}.apple-control-tile{min-height:88px;padding:14px;border:1px solid rgba(255,255,255,.09);border-radius:22px;background:rgba(255,255,255,.055);color:white;text-align:left;display:flex;align-items:center;gap:12px;cursor:pointer;box-shadow:inset 0 1px 0 rgba(255,255,255,.04)}.apple-control-tile b{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;background:rgba(255,255,255,.08);font-size:15px}.apple-control-tile span{display:grid;font-size:12px;font-weight:700}.apple-control-tile small{margin-top:2px;color:rgba(255,255,255,.4);font-weight:500}.apple-control-tile.is-on b{background:#4b78ff;box-shadow:0 0 22px #4b78ff55}.apple-control-wide{grid-column:1/-1;display:grid;grid-template-columns:1fr auto}.apple-control-wide i{width:160px;height:7px;border-radius:999px;background:rgba(255,255,255,.09);overflow:hidden}.apple-control-wide em{display:block;width:72%;height:100%;border-radius:inherit;background:linear-gradient(90deg,#8995ff,#ece9ff)}@media(max-width:480px){.apple-control-wide i{width:110px}}`,
    js: appleDepthMotionJs,
  },
  {
    id: 'apple-media-depth-card',
    name: 'Apple Media Depth Card',
    category: 'Apple Motion',
    description: 'Media card with spatial album art, glass controls and subtle pointer-following highlight.',
    tags: ['apple', 'media', 'card', 'music', 'glass', 'depth'],
    source: 'seed',
    html: `<div class="apple-stage"><article class="apple-surface apple-media" data-apple-depth><div class="apple-orb"></div><div class="apple-cover" data-apple-layer style="--apple-z:40px"><span>RED</span></div><div class="apple-media-copy" data-apple-layer style="--apple-z:26px"><p class="apple-kicker">Now playing</p><h3>Spatial Echo</h3><p>Redurbabat · UI Sessions</p><div class="apple-progress"><i></i></div><div class="apple-media-controls"><button>‹</button><button class="play">▶</button><button>›</button></div></div></article></div>`,
    css: `${shellCss}.apple-media{width:min(590px,90vw);padding:22px;border-radius:34px;display:grid;grid-template-columns:180px 1fr;gap:24px}.apple-media .apple-orb{right:-40px;bottom:-80px}.apple-cover{aspect-ratio:1;border-radius:24px;background:radial-gradient(circle at 30% 20%,#d8d2ff 0,#7873d9 20%,#313659 47%,#11141d 73%);box-shadow:0 22px 50px rgba(0,0,0,.32),inset 0 1px 0 rgba(255,255,255,.22);display:grid;place-items:center}.apple-cover span{font-size:36px;font-weight:900;letter-spacing:-.08em;color:#ffffffd9}.apple-media-copy{align-self:center}.apple-media-copy h3{margin:0;font-size:25px;letter-spacing:-.035em}.apple-media-copy>p:not(.apple-kicker){margin:6px 0 20px;color:rgba(255,255,255,.46);font-size:12px}.apple-progress{height:5px;border-radius:999px;background:rgba(255,255,255,.09);overflow:hidden}.apple-progress i{display:block;width:62%;height:100%;border-radius:inherit;background:#f4f2ff}.apple-media-controls{margin-top:20px;display:flex;align-items:center;justify-content:center;gap:16px}.apple-media-controls button{width:36px;height:36px;border:0;border-radius:50%;background:transparent;color:white;font-size:21px;cursor:pointer}.apple-media-controls .play{width:46px;height:46px;background:white;color:#171820;font-size:14px;box-shadow:0 8px 26px rgba(0,0,0,.22)}@media(max-width:560px){.apple-media{grid-template-columns:1fr}.apple-cover{width:170px;margin:auto}.apple-media-copy{text-align:center}}`,
    js: appleDepthMotionJs,
  },
  {
    id: 'apple-spatial-app-tile',
    name: 'Apple Spatial App Tile',
    category: 'Apple Motion',
    description: 'Vision-style app tile with layered icon, glass plate and controlled spatial lift.',
    tags: ['apple', 'vision', 'app tile', 'icon', 'spatial', '3d'],
    source: 'seed',
    html: `<div class="apple-stage"><button class="apple-surface apple-app-tile" data-apple-depth><span class="apple-app-icon" data-apple-layer style="--apple-z:46px"><i></i><b>R</b></span><span class="apple-app-name" data-apple-layer style="--apple-z:26px">RED Studio</span><small data-apple-layer style="--apple-z:18px">Design workspace</small></button></div>`,
    css: `${shellCss}.apple-app-tile{width:220px;height:250px;padding:24px;border-radius:42px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;font-family:Inter,system-ui}.apple-app-icon{position:relative;width:112px;height:112px;border-radius:30px;display:grid;place-items:center;background:linear-gradient(145deg,#e2dfff,#7f78df 48%,#343758);box-shadow:0 24px 48px rgba(0,0,0,.28),inset 0 1px 0 rgba(255,255,255,.42);overflow:hidden}.apple-app-icon i{position:absolute;inset:-20%;background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,.48) 46%,transparent 62%);transform:translateX(-45%) rotate(8deg)}.apple-app-icon b{font-size:48px;letter-spacing:-.08em;text-shadow:0 7px 22px rgba(0,0,0,.24)}.apple-app-name{margin-top:22px;font-size:15px;font-weight:760}.apple-app-tile small{margin-top:4px;color:rgba(255,255,255,.4);font-size:10px}`,
    js: appleDepthMotionJs,
  },
  {
    id: 'apple-command-palette',
    name: 'Apple Command Palette',
    category: 'Apple Motion',
    description: 'Deep-blur command palette with spatial keyboard hints and restrained pointer depth.',
    tags: ['apple', 'command palette', 'search', 'glass', 'keyboard', 'panel'],
    source: 'seed',
    html: `<div class="apple-stage"><section class="apple-surface apple-command" data-apple-depth><div class="apple-command-search" data-apple-layer style="--apple-z:28px"><span>⌘</span><input value="Open project" aria-label="Command"><kbd>ESC</kbd></div><div class="apple-command-list" data-apple-layer style="--apple-z:20px"><button class="is-selected"><span>◫</span><b>Open project</b><kbd>↵</kbd></button><button><span>＋</span><b>Create new view</b><kbd>⌘N</kbd></button><button><span>⌕</span><b>Search components</b><kbd>⌘K</kbd></button><button><span>✦</span><b>Ask JARVIS</b><kbd>⌘J</kbd></button></div></section></div>`,
    css: `${shellCss}.apple-command{width:min(610px,90vw);padding:12px;border-radius:30px}.apple-command-search{height:56px;padding:0 12px;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:10px;border-bottom:1px solid rgba(255,255,255,.08)}.apple-command-search span{color:rgba(255,255,255,.48)}.apple-command-search input{min-width:0;border:0;outline:0;background:transparent;color:white;font:650 15px Inter,system-ui}.apple-command kbd{padding:4px 7px;border:1px solid rgba(255,255,255,.1);border-radius:7px;background:rgba(255,255,255,.045);color:rgba(255,255,255,.4);font:650 9px Inter,system-ui;box-shadow:inset 0 -1px 0 rgba(255,255,255,.04)}.apple-command-list{display:grid;padding:8px 0}.apple-command-list button{height:48px;padding:0 11px;border:0;border-radius:14px;background:transparent;color:rgba(255,255,255,.72);display:grid;grid-template-columns:28px 1fr auto;align-items:center;text-align:left;cursor:pointer}.apple-command-list button.is-selected,.apple-command-list button:hover{background:rgba(255,255,255,.075);color:white}.apple-command-list b{font-size:12px;font-weight:650}`,
    js: appleDepthMotionJs,
  },
]
