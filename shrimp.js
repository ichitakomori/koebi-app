/* =========================================================
   Koebi 桜えびロゴ — 単一ソース（SSOT）
   アプリ内UI・ヘッダー・PWAアイコンすべてここから生成する。
   viewBox は "0 0 200 170" を前提とした内部マークアップを返す。

   デザインの要（桜えびの記号）：
   1. 大きな頭（甲羅）＝体の4割。先端がとがる
   2. 前方へ長く伸びる触角
   3. 先細りでカールする腹節＋はっきりした扇形の尾びれ
   ========================================================= */
"use strict";

function koebiShrimpMarkup(stage, opts){
  opts = opts || {};
  const shadow = opts.shadow !== false;

  if(stage === 0){ // 卵
    return `
      <ellipse cx="100" cy="95" rx="30" ry="37" fill="#fbd9d3" stroke="#f2a196" stroke-width="3"/>
      <circle cx="91" cy="86" r="4.5" fill="#fff" opacity=".85"/>
      ${shadow ? '<ellipse cx="100" cy="143" rx="40" ry="7" fill="#cfe8df"/>' : ''}`;
  }

  const HEAD = "#f2a08f";   // 頭：濃いめサーモン
  const BODY = "#f7c2b8";   // 腹節：淡いピンク
  const LINE = "#ec9174";   // 節・触角・斑点

  /* --- 腹節（頭の後ろから下へカールして右上へ） --- */
  const CX = 121, CY = 84, R = 35;
  const T0 = 155, T1 = -58;          // 度：頭側 → 尾側
  const W0 = 16, W1 = 6.5;           // 半幅（先細り）
  const N = 24;
  const rad = d => d * Math.PI / 180;
  const cl = [];
  for(let i = 0; i <= N; i++){
    const f = i / N;
    const t = rad(T0 + (T1 - T0) * f);
    cl.push({
      x: CX + R * Math.cos(t),
      y: CY + R * Math.sin(t),
      w: W0 + (W1 - W0) * f,
      t
    });
  }
  const P = p => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
  const outer = cl.map(p => [p.x + Math.cos(p.t) * p.w, p.y + Math.sin(p.t) * p.w]);
  const inner = cl.map(p => [p.x - Math.cos(p.t) * p.w, p.y - Math.sin(p.t) * p.w]);
  const bodyPath =
    "M" + P(outer[0]) +
    outer.slice(1).map(p => "L" + P(p)).join("") +
    "L" + P(inner[N]) +
    inner.slice(0, N).reverse().map(p => "L" + P(p)).join("") + "Z";

  /* 節の帯（3本） */
  let joints = "";
  [0.32, 0.55, 0.76].forEach(f => {
    const i = Math.round(f * N);
    const p = cl[i], o = outer[i], q = inner[i];
    joints += `<path d="M${P(o)} Q${p.x.toFixed(1)} ${p.y.toFixed(1)} ${P(q)}" stroke="${LINE}" stroke-width="3" fill="none" opacity=".4" stroke-linecap="round"/>`;
  });

  /* 斑点（桜えびの点々） */
  let dots = "";
  [[0.25,4,2.2],[0.45,-3,1.6],[0.6,5,1.8],[0.72,-2,1.4],[0.85,2,1.5]].forEach(([f,off,r])=>{
    const i = Math.round(f * N);
    const p = cl[i];
    dots += `<circle cx="${(p.x+off).toFixed(1)}" cy="${(p.y+off*0.4).toFixed(1)}" r="${r}" fill="${LINE}" opacity=".45"/>`;
  });

  /* --- 尾びれ（V字ノッチの扇）：カールの外向き＝放射方向に大きく --- */
  const tp = cl[N];
  const fdir = tp.t;   // 放射方向（カールの外側へ）
  const fanPt = (a, L) => [tp.x + Math.cos(a) * L, tp.y + Math.sin(a) * L];
  const A  = fanPt(fdir - 0.50, 29);
  const M1 = fanPt(fdir, 21);
  const B  = fanPt(fdir + 0.50, 29);
  const A2 = fanPt(fdir - 0.20, 28);
  const B2 = fanPt(fdir + 0.20, 28);
  const root = fanPt(fdir, -4);
  const tailFan = `<path d="M${P(root)} L${P(A)} L${P(A2)} L${P(M1)} L${P(B2)} L${P(B)} Z" fill="${HEAD}"/>`;

  /* --- 頭（大きな甲羅：前がとがった丸三角） --- */
  // 前端(nose)=(30,78) / 上=(92,44) / 後上=(118,62) / 後下=(106,108) / 下=(58,102)
  const headPath = `
    M30 78
    Q46 52 92 46
    Q114 44 118 64
    Q121 86 106 104
    Q84 116 58 102
    Q36 92 30 78 Z`;
  // 甲羅前縁のギザ（とげ）2枚
  const spikes = `
    <path d="M52 56 L34 42 L60 50 Z" fill="${HEAD}"/>
    <path d="M42 66 L20 60 L46 76 Z" fill="${HEAD}"/>`;

  /* --- 触角：前方へ長く（3本）＋下あごヒゲ（2本） --- */
  const antennae = `
    <path d="M34 72 Q6 58 2 40"   stroke="${LINE}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M32 78 Q2 74 0 62"   stroke="${LINE}" stroke-width="3" fill="none" stroke-linecap="round"/>
    <path d="M34 86 Q10 96 4 112" stroke="${LINE}" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <path d="M52 100 Q36 118 24 124" stroke="${LINE}" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <path d="M62 104 Q54 122 44 130" stroke="${LINE}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;

  /* --- 顔 --- */
  const face = `
    <circle cx="72" cy="70" r="6" fill="#3a4a47"/>
    <circle cx="74.2" cy="67.8" r="2" fill="#fff"/>
    <circle cx="86" cy="88" r="4.5" fill="#f7b8c2" opacity=".8"/>
    <circle cx="98" cy="60" r="2" fill="${LINE}" opacity=".45"/>
    <circle cx="90" cy="76" r="1.6" fill="${LINE}" opacity=".45"/>`;

  const crown = stage >= 6
    ? `<path d="M88 18 l5 11 12 2 -9 8 2 12 -10 -6 -10 6 2 -12 -9 -8 12 -2 z" fill="#ffd98e"/>`
    : "";

  return `
    ${shadow ? '<ellipse cx="100" cy="150" rx="56" ry="7" fill="#cfe8df"/>' : ''}
    ${antennae}
    ${tailFan}
    <path d="${bodyPath}" fill="${BODY}"/>
    ${joints}${dots}
    ${spikes}
    <path d="${headPath}" fill="${HEAD}"/>
    ${face}${crown}`;
}

/* 中央基準でスケールした <g> ラッパー付きマークアップ */
function koebiShrimpSvg(stage, opts){
  opts = opts || {};
  const scale = opts.scale != null ? opts.scale : 1;
  const inner = koebiShrimpMarkup(stage, opts);
  const ox = 100 * (1 - scale), oy = 88 * (1 - scale);
  return `<g transform="translate(${ox.toFixed(1)} ${oy.toFixed(1)}) scale(${scale})">${inner}</g>`;
}
