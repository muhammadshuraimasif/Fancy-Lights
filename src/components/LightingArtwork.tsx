import React, { useId } from 'react';
import { CategoryItem, ProductVisualArchetype } from '../types/lighting';

interface ProductVisualProps {
  archetype: ProductVisualArchetype;
  finish?: string;
  colorTemp?: string;
  viewMode?: 'studio' | 'lit' | 'dimensions';
  dimensions?: string;
  className?: string;
}

function getFinishPalette(finish = '') {
  const f = finish.toLowerCase();
  if (f.includes('black') && f.includes('brass')) {
    return { primary: '#22201D', secondary: '#C59B52', accent: '#E4C88B', highlight: '#423E38' };
  }
  if (f.includes('black') || f.includes('graphite')) {
    return { primary: '#201E1B', secondary: '#35312C', accent: '#756C5E', highlight: '#4A453E' };
  }
  if (f.includes('bronze')) {
    return { primary: '#6C5237', secondary: '#8E6D48', accent: '#B9976C', highlight: '#A6835B' };
  }
  if (f.includes('nickel') || f.includes('silver') || f.includes('white')) {
    return { primary: '#B7B5B0', secondary: '#DCDAD5', accent: '#F0EEE9', highlight: '#E5E3DF' };
  }
  // Champagne Gold / Brushed Brass default
  return { primary: '#B48B44', secondary: '#D4B26F', accent: '#F0DAA8', highlight: '#E4C786' };
}

function getGlowTone(colorTemp = '') {
  const t = colorTemp.toLowerCase();
  if (t.includes('6000') || t.includes('cool')) {
    return { core: '#F7FBFF', mid: '#DCEBFF', outer: 'rgba(205, 226, 255, 0.35)' };
  }
  if (t.includes('4000') || t.includes('neutral')) {
    return { core: '#FFFDF7', mid: '#FFF2D6', outer: 'rgba(255, 236, 194, 0.42)' };
  }
  if (t.includes('rgb')) {
    return { core: '#FFF6E8', mid: '#F6C68E', outer: 'rgba(222, 148, 128, 0.45)' };
  }
  // 3000K Warm White default
  return { core: '#FFF9E8', mid: '#F7D996', outer: 'rgba(224, 173, 86, 0.48)' };
}

export const ProductLightingVisual: React.FC<ProductVisualProps> = ({
  archetype,
  finish = 'Champagne Gold',
  colorTemp = '3000K Warm White',
  viewMode = 'studio',
  dimensions,
  className = '',
}) => {
  const uid = useId().replace(/:/g, '');
  const metal = getFinishPalette(finish);
  const glow = getGlowTone(colorTemp);
  const isLitDark =
    viewMode === 'lit' ||
    archetype === 'corner-ambient-bar' ||
    archetype === 'rgb-led-strip' ||
    archetype === 'outdoor-wall-lantern' ||
    archetype === 'garden-pathway-bollard' ||
    archetype === 'waterproof-cube-wall' ||
    archetype === 'smart-ambient-orb';

  const bgTop = isLitDark ? '#191714' : '#F4EFE7';
  const bgBottom = isLitDark ? '#26221D' : '#EAE1D3';

  return (
    <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
      <svg
        viewBox="0 0 400 300"
        className="w-full h-full block"
        role="img"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={bgTop} />
            <stop offset="100%" stopColor={bgBottom} />
          </linearGradient>
          <radialGradient id={`glow-${uid}`} cx="50%" cy="48%" r="48%">
            <stop offset="0%" stopColor={glow.core} stopOpacity="0.95" />
            <stop offset="40%" stopColor={glow.mid} stopOpacity="0.52" />
            <stop offset="100%" stopColor={glow.mid} stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`halo-${uid}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={glow.mid} stopOpacity="0.72" />
            <stop offset="65%" stopColor={glow.outer} />
            <stop offset="100%" stopColor={glow.mid} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`metal-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={metal.highlight} />
            <stop offset="45%" stopColor={metal.secondary} />
            <stop offset="100%" stopColor={metal.primary} />
          </linearGradient>
          <linearGradient id={`beam-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={glow.core} stopOpacity="0.75" />
            <stop offset="100%" stopColor={glow.mid} stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`beamUp-${uid}`} x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor={glow.core} stopOpacity="0.75" />
            <stop offset="100%" stopColor={glow.mid} stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`glass-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.92" />
            <stop offset="55%" stopColor={glow.mid} stopOpacity="0.65" />
            <stop offset="100%" stopColor="#E6DCCB" stopOpacity="0.45" />
          </linearGradient>
        </defs>

        {/* Studio backdrop */}
        <rect width="400" height="300" fill={`url(#bg-${uid})`} />

        {/* Subtle architectural wall molding / plinth horizon */}
        {!isLitDark ? (
          <line x1="0" y1="246" x2="400" y2="246" stroke="#DDD2C0" strokeWidth="1" />
        ) : (
          <line x1="0" y1="246" x2="400" y2="246" stroke="#363029" strokeWidth="1" />
        )}

        {/* Ambient illumination pool */}
        <circle cx="200" cy="145" r="135" fill={`url(#glow-${uid})`} />

        {/* ARCHETYPE RENDERER */}
        {renderArchetype(archetype, uid, metal, glow, isLitDark)}

        {/* Dimensions technical overlay mode */}
        {viewMode === 'dimensions' && (
          <g>
            <line x1="78" y1="264" x2="322" y2="264" stroke="#B68F48" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="78" y1="258" x2="78" y2="270" stroke="#B68F48" strokeWidth="1.2" />
            <line x1="322" y1="258" x2="322" y2="270" stroke="#B68F48" strokeWidth="1.2" />
            <rect x="112" y="254" width="176" height="20" rx="2" fill={isLitDark ? '#181613' : '#FAF8F4'} stroke="#B68F48" strokeWidth="0.75" />
            <text
              x="200"
              y="267"
              textAnchor="middle"
              fontSize="9"
              fontFamily="Plus Jakarta Sans, sans-serif"
              fill={isLitDark ? '#F3ECE0' : '#2C2721'}
            >
              {dimensions ? dimensions.slice(0, 36) : 'Architectural Proportion Spec'}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

function renderArchetype(
  archetype: ProductVisualArchetype,
  uid: string,
  metal: ReturnType<typeof getFinishPalette>,
  glow: ReturnType<typeof getGlowTone>,
  isLitDark: boolean
) {
  const m = `url(#metal-${uid})`;
  const g = `url(#glass-${uid})`;
  const b = `url(#beam-${uid})`;
  const bUp = `url(#beamUp-${uid})`;
  const h = `url(#halo-${uid})`;

  switch (archetype) {
    case 'crystal-tier-chandelier':
      return (
        <g>
          <rect x="172" y="0" width="56" height="8" fill={m} />
          <line x1="185" y1="8" x2="140" y2="108" stroke={metal.primary} strokeWidth="1" opacity="0.7" />
          <line x1="215" y1="8" x2="260" y2="108" stroke={metal.primary} strokeWidth="1" opacity="0.7" />
          <line x1="200" y1="8" x2="200" y2="108" stroke={metal.primary} strokeWidth="1" opacity="0.7" />
          <ellipse cx="200" cy="112" rx="92" ry="18" fill="none" stroke={m} strokeWidth="5" />
          <ellipse cx="200" cy="112" rx="88" ry="15" fill="none" stroke={glow.core} strokeWidth="2" opacity="0.85" />
          {Array.from({ length: 15 }).map((_, i) => {
            const x = 122 + i * 11;
            const drop = 42 + Math.sin(i * 0.45) * 26;
            return (
              <g key={i}>
                <line x1={x} y1="120" x2={x} y2={122 + drop} stroke="#E9DFCE" strokeWidth="1" />
                <polygon
                  points={`${x},${120 + drop} ${x - 4},${127 + drop} ${x},${138 + drop} ${x + 4},${127 + drop}`}
                  fill={g}
                  stroke="#FFFFFF"
                  strokeWidth="0.6"
                />
              </g>
            );
          })}
        </g>
      );

    case 'gold-ring-chandelier':
      return (
        <g>
          <rect x="168" y="0" width="64" height="7" fill={m} />
          <line x1="176" y1="7" x2="112" y2="108" stroke={metal.primary} strokeWidth="0.9" opacity="0.65" />
          <line x1="224" y1="7" x2="288" y2="108" stroke={metal.primary} strokeWidth="0.9" opacity="0.65" />
          <line x1="190" y1="7" x2="145" y2="152" stroke={metal.primary} strokeWidth="0.9" opacity="0.55" />
          <line x1="210" y1="7" x2="255" y2="152" stroke={metal.primary} strokeWidth="0.9" opacity="0.55" />
          <ellipse cx="200" cy="108" rx="96" ry="20" fill="none" stroke={m} strokeWidth="6" />
          <ellipse cx="200" cy="108" rx="96" ry="20" fill="none" stroke={glow.core} strokeWidth="2" />
          <ellipse cx="200" cy="152" rx="68" ry="15" transform="rotate(-7 200 152)" fill="none" stroke={m} strokeWidth="5.5" />
          <ellipse cx="200" cy="152" rx="68" ry="15" transform="rotate(-7 200 152)" fill="none" stroke={glow.core} strokeWidth="1.8" />
          <ellipse cx="200" cy="192" rx="44" ry="10" transform="rotate(6 200 192)" fill="none" stroke={m} strokeWidth="5" />
          <ellipse cx="200" cy="192" rx="44" ry="10" transform="rotate(6 200 192)" fill="none" stroke={glow.core} strokeWidth="1.6" />
        </g>
      );

    case 'led-halo-chandelier':
      return (
        <g>
          <rect x="176" y="0" width="48" height="7" fill={m} />
          <line x1="184" y1="7" x2="152" y2="100" stroke={metal.primary} strokeWidth="1" opacity="0.65" />
          <line x1="216" y1="7" x2="248" y2="100" stroke={metal.primary} strokeWidth="1" opacity="0.65" />
          <path d="M90,132 C140,78 260,185 310,126" fill="none" stroke={m} strokeWidth="9" strokeLinecap="round" />
          <path d="M90,132 C140,78 260,185 310,126" fill="none" stroke={glow.core} strokeWidth="3.5" strokeLinecap="round" />
          <path d="M108,164 C162,210 245,92 294,158" fill="none" stroke={m} strokeWidth="7.5" strokeLinecap="round" />
          <path d="M108,164 C162,210 245,92 294,158" fill="none" stroke={glow.core} strokeWidth="2.8" strokeLinecap="round" />
        </g>
      );

    case 'black-linear-chandelier':
      return (
        <g>
          <rect x="176" y="0" width="48" height="7" fill={m} />
          <rect x="197" y="7" width="6" height="108" fill={m} />
          <rect x="92" y="114" width="216" height="6" rx="3" fill={m} />
          <line x1="145" y1="117" x2="145" y2="148" stroke={metal.primary} strokeWidth="3" />
          <line x1="255" y1="117" x2="255" y2="148" stroke={metal.primary} strokeWidth="3" />
          {[92, 145, 200, 255, 308].map((x, idx) => {
            const cy = idx % 2 === 0 ? 117 : 155;
            return (
              <g key={x}>
                <circle cx={x} cy={cy} r="28" fill={h} />
                <circle cx={x} cy={cy} r="15" fill={glow.core} stroke="#E4DDD0" strokeWidth="1" />
              </g>
            );
          })}
        </g>
      );

    case 'classic-brass-chandelier':
      return (
        <g>
          <rect x="182" y="0" width="36" height="7" fill={m} />
          <line x1="200" y1="7" x2="200" y2="154" stroke={m} strokeWidth="4" />
          <ellipse cx="200" cy="148" rx="14" ry="22" fill={m} />
          {[-95, -52, 52, 95].map((dx, i) => (
            <g key={i}>
              <path
                d={`M200,152 Q${200 + dx * 0.6},190 ${200 + dx},132`}
                fill="none"
                stroke={m}
                strokeWidth="3.2"
              />
              <ellipse cx={200 + dx} cy="120" rx="14" ry="24" fill={h} />
              <path
                d={`M${200 + dx - 10},132 L${200 + dx - 7},108 L${200 + dx + 7},108 L${200 + dx + 10},132 Z`}
                fill={glow.core}
                stroke={metal.secondary}
                strokeWidth="0.8"
              />
            </g>
          ))}
          <circle cx="200" cy="116" r="18" fill={h} />
          <path d="M190,126 L193,102 L207,102 L210,126 Z" fill={glow.core} />
        </g>
      );

    case 'multi-tier-grand-chandelier':
      return (
        <g>
          <rect x="166" y="0" width="68" height="8" fill={m} />
          <line x1="180" y1="8" x2="120" y2="74" stroke={metal.primary} strokeWidth="1" />
          <line x1="220" y1="8" x2="280" y2="74" stroke={metal.primary} strokeWidth="1" />
          {[
            { y: 74, rx: 94, crystals: 17, drop: 36 },
            { y: 126, rx: 68, crystals: 13, drop: 38 },
            { y: 180, rx: 42, crystals: 9, drop: 42 },
          ].map((tier, tIdx) => (
            <g key={tIdx}>
              <ellipse cx="200" cy={tier.y} rx={tier.rx} ry={tier.rx * 0.17} fill="none" stroke={m} strokeWidth="4.5" />
              <ellipse cx="200" cy={tier.y} rx={tier.rx - 2} ry={tier.rx * 0.14} fill="none" stroke={glow.core} strokeWidth="1.6" />
              {Array.from({ length: tier.crystals }).map((_, i) => {
                const ratio = (i / (tier.crystals - 1)) * 2 - 1;
                const x = 200 + ratio * (tier.rx - 6);
                const d = tier.drop - Math.abs(ratio) * 10;
                return (
                  <polygon
                    key={i}
                    points={`${x},${tier.y + 8} ${x - 3.5},${tier.y + 8 + d * 0.55} ${x},${tier.y + 8 + d} ${x + 3.5},${tier.y + 8 + d * 0.55}`}
                    fill={g}
                    stroke="#FFFFFF"
                    strokeWidth="0.5"
                  />
                );
              })}
            </g>
          ))}
        </g>
      );

    case 'round-flush-ceiling':
      return (
        <g>
          <ellipse cx="200" cy="86" rx="130" ry="38" fill={h} />
          <ellipse cx="200" cy="70" rx="105" ry="28" fill={m} />
          <ellipse cx="200" cy="75" rx="96" ry="23" fill={glow.core} />
          <ellipse cx="200" cy="75" rx="74" ry="15" fill={glow.mid} opacity="0.4" />
        </g>
      );

    case 'slim-flush-ceiling':
      return (
        <g>
          <ellipse cx="200" cy="92" rx="120" ry="32" fill={h} />
          <ellipse cx="200" cy="72" rx="88" ry="20" fill={m} />
          <path d="M116,74 Q200,114 284,74" fill={glow.core} stroke={metal.secondary} strokeWidth="1" />
        </g>
      );

    case 'geometric-ceiling':
      return (
        <g>
          <rect x="108" y="64" width="128" height="72" rx="3" transform="rotate(-12 172 100)" fill="none" stroke={m} strokeWidth="7" />
          <rect x="108" y="64" width="128" height="72" rx="3" transform="rotate(-12 172 100)" fill="none" stroke={glow.core} strokeWidth="2.5" />
          <rect x="164" y="92" width="128" height="72" rx="3" transform="rotate(10 228 128)" fill="none" stroke={m} strokeWidth="7" />
          <rect x="164" y="92" width="128" height="72" rx="3" transform="rotate(10 228 128)" fill="none" stroke={glow.core} strokeWidth="2.5" />
          <circle cx="200" cy="116" r="36" fill="none" stroke={m} strokeWidth="6" />
          <circle cx="200" cy="116" r="36" fill="none" stroke={glow.core} strokeWidth="2" />
        </g>
      );

    case 'gold-drum-ceiling':
      return (
        <g>
          <rect x="174" y="0" width="52" height="14" fill={m} />
          <rect x="196" y="14" width="8" height="36" fill={m} />
          <rect x="116" y="50" width="168" height="68" rx="4" fill={m} />
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1={126 + i * 13} y1="54" x2={126 + i * 13} y2="114" stroke={metal.primary} strokeWidth="1.5" opacity="0.5" />
          ))}
          <ellipse cx="200" cy="118" rx="80" ry="12" fill={glow.core} />
          <polygon points="124,118 276,118 320,235 80,235" fill={b} opacity="0.5" />
        </g>
      );

    case 'square-minimal-ceiling':
      return (
        <g>
          <polygon points="110,96 230,66 294,112 174,144" fill={m} />
          <polygon points="122,97 228,71 280,109 174,136" fill={glow.core} />
          <polygon points="122,136 280,109 320,220 90,220" fill={b} opacity="0.45" />
        </g>
      );

    case 'hall-medallion-ceiling':
      return (
        <g>
          <circle cx="200" cy="115" r="76" fill={h} />
          {Array.from({ length: 12 }).map((_, i) => (
            <ellipse
              key={i}
              cx="200"
              cy="115"
              rx="68"
              ry="16"
              transform={`rotate(${i * 30} 200 115)`}
              fill="none"
              stroke={m}
              strokeWidth="2.5"
            />
          ))}
          <circle cx="200" cy="115" r="32" fill={glow.core} stroke={m} strokeWidth="3" />
        </g>
      );

    case 'single-drop-pendant':
      return (
        <g>
          <rect x="184" y="0" width="32" height="6" fill={m} />
          <line x1="200" y1="6" x2="200" y2="108" stroke="#2C2722" strokeWidth="2.2" />
          <rect x="185" y="108" width="30" height="72" rx="3" fill={m} />
          <ellipse cx="200" cy="180" rx="14" ry="5" fill={glow.core} />
          <polygon points="186,180 214,180 264,265 136,265" fill={b} opacity="0.7" />
        </g>
      );

    case 'trio-kitchen-pendant':
      return (
        <g>
          <rect x="92" y="0" width="216" height="7" fill={m} />
          {[
            { x: 120, y: 124 },
            { x: 200, y: 146 },
            { x: 280, y: 124 },
          ].map((p, i) => (
            <g key={i}>
              <line x1={p.x} y1="7" x2={p.x} y2={p.y - 26} stroke="#2E2924" strokeWidth="1.8" />
              <rect x={p.x - 7} y={p.y - 28} width="14" height="14" fill={m} />
              <circle cx={p.x} cy={p.y} r="36" fill={h} />
              <circle cx={p.x} cy={p.y} r="24" fill={g} stroke={metal.secondary} strokeWidth="1" />
              <ellipse cx={p.x} cy={p.y + 3} rx="6" ry="9" fill={glow.core} />
            </g>
          ))}
        </g>
      );

    case 'opal-globe-pendant':
      return (
        <g>
          <rect x="182" y="0" width="36" height="6" fill={m} />
          <rect x="197.5" y="6" width="5" height="106" fill={m} />
          <rect x="188" y="110" width="24" height="10" rx="2" fill={m} />
          <circle cx="200" cy="160" r="66" fill={h} />
          <circle cx="200" cy="160" r="44" fill={glow.core} stroke="#ECE4D5" strokeWidth="1.2" />
          <ellipse cx="185" cy="144" rx="12" ry="8" transform="rotate(-25 185 144)" fill="#FFFFFF" opacity="0.65" />
        </g>
      );

    case 'modern-brass-pendant':
      return (
        <g>
          <rect x="182" y="0" width="36" height="6" fill={m} />
          <line x1="200" y1="6" x2="200" y2="108" stroke="#2D2823" strokeWidth="2" />
          <path d="M132,148 Q200,88 268,148 Z" fill={m} />
          <ellipse cx="200" cy="150" rx="68" ry="12" fill={glow.mid} />
          <path d="M158,158 Q200,132 242,158 Z" fill={m} />
          <polygon points="134,154 266,154 316,256 84,256" fill={b} opacity="0.65" />
        </g>
      );

    case 'linear-dining-pendant':
      return (
        <g>
          <rect x="112" y="0" width="176" height="6" fill={m} />
          <line x1="128" y1="6" x2="128" y2="126" stroke={metal.primary} strokeWidth="1.4" />
          <line x1="272" y1="6" x2="272" y2="126" stroke={metal.primary} strokeWidth="1.4" />
          <rect x="74" y="126" width="252" height="14" rx="7" fill={m} />
          <rect x="82" y="136" width="236" height="5" rx="2" fill={glow.core} />
          <polygon points="84,141 316,141 352,250 48,250" fill={b} opacity="0.6" />
        </g>
      );

    case 'black-cone-pendant':
      return (
        <g>
          <rect x="184" y="0" width="32" height="6" fill={m} />
          <line x1="200" y1="6" x2="200" y2="104" stroke="#222" strokeWidth="2" />
          <rect x="192" y="102" width="16" height="14" fill="#C49A4E" />
          <polygon points="190,116 210,116 264,174 136,174" fill={m} />
          <ellipse cx="200" cy="174" rx="64" ry="12" fill={glow.mid} />
          <polygon points="140,176 260,176 312,262 88,262" fill={b} opacity="0.65" />
        </g>
      );

    case 'gold-arch-sconce':
      return (
        <g>
          <polygon points="172,110 228,110 258,28 142,28" fill={bUp} opacity="0.85" />
          <polygon points="172,188 228,188 258,268 142,268" fill={b} opacity="0.85" />
          <rect x="174" y="96" width="52" height="106" rx="26" fill={m} />
          <rect x="186" y="108" width="28" height="82" rx="14" fill={metal.highlight} opacity="0.45" />
        </g>
      );

    case 'bedroom-linen-sconce':
      return (
        <g>
          <circle cx="200" cy="128" r="74" fill={h} />
          <rect x="182" y="182" width="36" height="36" rx="18" fill={m} />
          <rect x="196" y="148" width="8" height="44" fill={m} />
          <polygon points="164,88 236,88 254,152 146,152" fill={glow.core} stroke="#DFD4C2" strokeWidth="1.2" />
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={i} x1={168 + i * 8} y1="88" x2={152 + i * 12} y2="152" stroke="#E4DAC8" strokeWidth="0.9" />
          ))}
        </g>
      );

    case 'updown-beam-sconce':
      return (
        <g>
          <polygon points="178,125 222,125 262,28 138,28" fill={bUp} />
          <polygon points="178,175 222,175 262,268 138,268" fill={b} />
          <rect x="176" y="122" width="48" height="56" rx="4" fill={m} />
          <line x1="176" y1="150" x2="224" y2="150" stroke={metal.highlight} strokeWidth="1" opacity="0.4" />
        </g>
      );

    case 'fluted-crystal-sconce':
      return (
        <g>
          <circle cx="200" cy="148" r="78" fill={h} />
          <rect x="180" y="96" width="40" height="114" rx="4" fill={m} />
          {[-18, -6, 6, 18].map((dx, i) => (
            <rect key={i} x={196 + dx} y="82" width="8" height="138" rx="3" fill={g} stroke="#FFFFFF" strokeWidth="0.7" />
          ))}
          <rect x="174" y="138" width="52" height="18" rx="2" fill={m} />
        </g>
      );

    case 'black-minimal-sconce':
      return (
        <g>
          <circle cx="200" cy="150" r="88" fill={h} />
          <circle cx="200" cy="150" r="56" fill={glow.core} />
          <circle cx="200" cy="150" r="48" fill={m} />
        </g>
      );

    case 'corridor-linear-sconce':
      return (
        <g>
          <rect x="186" y="42" width="28" height="212" rx="14" fill={h} />
          <rect x="194" y="54" width="12" height="188" rx="6" fill={glow.core} />
          <rect x="196" y="60" width="8" height="176" rx="4" fill={m} />
        </g>
      );

    case 'travertine-table-lamp':
      return (
        <g>
          <polygon points="154,132 246,132 292,246 108,246" fill={b} opacity="0.45" />
          <rect x="176" y="162" width="48" height="84" rx="4" fill="#D9CEBC" stroke="#C5B8A3" strokeWidth="1" />
          <rect x="195" y="136" width="10" height="28" fill={m} />
          <polygon points="148,72 252,72 268,142 132,142" fill={glow.core} stroke="#DCD1BF" strokeWidth="1.2" />
        </g>
      );

    case 'alabaster-bedside-lamp':
      return (
        <g>
          <circle cx="200" cy="146" r="88" fill={h} />
          <rect x="172" y="218" width="56" height="26" rx="3" fill={m} />
          <path d="M150,218 C150,118 250,118 250,218 Z" fill={glow.core} stroke="#E4DAC7" strokeWidth="1.2" />
          <path d="M168,176 Q198,164 232,184" fill="none" stroke="#E5D8C1" strokeWidth="1" opacity="0.65" />
        </g>
      );

    case 'arched-floor-lamp':
      return (
        <g>
          <ellipse cx="242" cy="246" rx="36" ry="8" fill="#D9D1C4" stroke={metal.primary} strokeWidth="1" />
          <path d="M242,244 L242,102 C242,56 146,54 146,108" fill="none" stroke={m} strokeWidth="5.5" strokeLinecap="round" />
          <circle cx="146" cy="128" r="46" fill={h} />
          <circle cx="146" cy="128" r="22" fill={glow.core} stroke="#E6DEC8" strokeWidth="1" />
        </g>
      );

    case 'smoked-glass-table-lamp':
      return (
        <g>
          <ellipse cx="200" cy="204" rx="38" ry="42" fill="#9E825E" opacity="0.45" stroke={metal.primary} strokeWidth="1.2" />
          <rect x="195" y="140" width="10" height="24" fill={m} />
          <polygon points="146,78 254,78 266,144 134,144" fill={glow.core} stroke="#D9CEBC" strokeWidth="1.2" />
          <rect x="178" y="242" width="44" height="6" rx="2" fill={m} />
        </g>
      );

    case 'corner-ambient-bar':
      return (
        <g>
          <line x1="200" y1="24" x2="200" y2="246" stroke="#36312A" strokeWidth="1" />
          <ellipse cx="200" cy="145" rx="75" ry="118" fill={h} />
          <rect x="195" y="54" width="10" height="186" rx="3" fill={m} />
          <rect x="197" y="58" width="6" height="178" rx="2" fill={glow.core} />
          <line x1="200" y1="240" x2="162" y2="256" stroke={m} strokeWidth="4" strokeLinecap="round" />
          <line x1="200" y1="240" x2="238" y2="256" stroke={m} strokeWidth="4" strokeLinecap="round" />
        </g>
      );

    case 'architect-desk-lamp':
      return (
        <g>
          <ellipse cx="164" cy="244" rx="40" ry="7" fill={m} />
          <line x1="164" y1="240" x2="142" y2="150" stroke={m} strokeWidth="5" strokeLinecap="round" />
          <circle cx="142" cy="150" r="6" fill={metal.secondary} />
          <line x1="142" y1="150" x2="224" y2="96" stroke={m} strokeWidth="4.5" strokeLinecap="round" />
          <polygon points="210,88 266,118 228,128 198,108" fill={m} />
          <polygon points="214,118 260,122 288,244 186,244" fill={b} opacity="0.65" />
        </g>
      );

    case 'warm-led-strip':
    case 'rgb-led-strip':
      return (
        <g>
          <rect x="40" y="64" width="320" height="18" fill={isLitDark ? '#2B2621' : '#E2D8C8'} />
          <rect x="40" y="82" width="320" height="8" fill={glow.core} />
          <polygon points="40,90 360,90 360,210 40,210" fill={b} opacity="0.85" />
          <circle cx="200" cy="176" r="48" fill="none" stroke={m} strokeWidth="7" />
          <circle cx="200" cy="176" r="48" fill="none" stroke={glow.core} strokeWidth="3" />
        </g>
      );

    case 'recessed-spotlight':
      return (
        <g>
          <ellipse cx="200" cy="76" rx="56" ry="18" fill={m} />
          <ellipse cx="200" cy="76" rx="38" ry="11" fill="#2A2622" />
          <ellipse cx="200" cy="78" rx="22" ry="7" fill={glow.core} />
          <polygon points="168,84 232,84 300,256 100,256" fill={b} opacity="0.85" />
        </g>
      );

    case 'track-spot-single':
      return (
        <g>
          <rect x="80" y="34" width="240" height="10" fill={m} />
          <rect x="188" y="44" width="24" height="14" fill={m} />
          <g transform="rotate(-18 200 92)">
            <rect x="176" y="64" width="48" height="62" rx="4" fill={m} />
            <ellipse cx="200" cy="126" rx="20" ry="7" fill={glow.core} />
          </g>
          <polygon points="188,128 230,114 316,254 148,254" fill={b} opacity="0.8" />
        </g>
      );

    case 'magnetic-track-system':
      return (
        <g>
          <rect x="48" y="54" width="304" height="16" fill="#23201C" />
          <rect x="92" y="70" width="96" height="8" fill={glow.core} />
          <polygon points="92,78 188,78 214,234 66,234" fill={b} opacity="0.65" />
          <rect x="228" y="70" width="26" height="38" rx="3" fill={m} />
          <polygon points="228,108 254,108 292,246 196,246" fill={b} opacity="0.7" />
          <rect x="284" y="70" width="26" height="38" rx="3" fill={m} />
          <polygon points="284,108 310,108 346,246 250,246" fill={b} opacity="0.7" />
        </g>
      );

    case 'stair-step-led':
      return (
        <g>
          <polygon points="40,246 120,246 120,196 200,196 200,146 280,146 280,96 360,96 360,246" fill={isLitDark ? '#2E2923' : '#DFD5C5'} />
          {[
            { x: 102, y: 174 },
            { x: 182, y: 124 },
            { x: 262, y: 74 },
          ].map((s, i) => (
            <g key={i}>
              <rect x={s.x - 12} y={s.y - 12} width="24" height="24" rx="2" fill={m} />
              <rect x={s.x - 8} y={s.y - 4} width="16" height="5" fill={glow.core} />
              <polygon points={`${s.x - 8},${s.y + 1} ${s.x + 8},${s.y + 1} ${s.x + 22},${s.y + 42} ${s.x - 22},${s.y + 42}`} fill={b} opacity="0.85" />
            </g>
          ))}
        </g>
      );

    case 'outdoor-wall-lantern':
      return (
        <g>
          <rect x="190" y="78" width="20" height="148" fill="#2A2622" />
          <rect x="158" y="64" width="84" height="14" rx="2" fill={m} />
          <rect x="166" y="78" width="68" height="114" fill="none" stroke={m} strokeWidth="4" />
          <rect x="170" y="82" width="60" height="106" fill={h} />
          <ellipse cx="200" cy="134" rx="14" ry="24" fill={glow.core} />
          <rect x="158" y="192" width="84" height="12" rx="2" fill={m} />
        </g>
      );

    case 'garden-pathway-bollard':
      return (
        <g>
          <rect x="182" y="78" width="36" height="168" rx="3" fill={m} />
          <rect x="184" y="92" width="32" height="28" fill={glow.core} />
          <ellipse cx="200" cy="108" rx="90" ry="44" fill={h} />
          <ellipse cx="200" cy="246" rx="95" ry="14" fill={glow.mid} opacity="0.4" />
        </g>
      );

    case 'waterproof-cube-wall':
      return (
        <g>
          <polygon points="164,114 236,114 276,26 124,26" fill={bUp} />
          <polygon points="164,186 236,186 276,268 124,268" fill={b} />
          <rect x="160" y="110" width="80" height="80" rx="5" fill={m} />
          <rect x="168" y="118" width="64" height="64" rx="3" fill="#2A2621" />
        </g>
      );

    case 'balcony-cylindrical-light':
      return (
        <g>
          <rect x="178" y="0" width="44" height="12" fill={m} />
          <rect x="168" y="72" width="64" height="110" rx="32" fill={glow.core} stroke={metal.primary} strokeWidth="3" />
          <rect x="164" y="66" width="72" height="22" rx="4" fill={m} />
          <circle cx="200" cy="132" r="76" fill={h} />
        </g>
      );

    case 'mirror-vanity-bar':
      return (
        <g>
          <ellipse cx="200" cy="176" rx="72" ry="72" fill="#E3DBD0" stroke={metal.secondary} strokeWidth="3" />
          <rect x="86" y="76" width="228" height="14" rx="7" fill={m} />
          <rect x="92" y="84" width="216" height="6" rx="3" fill={glow.core} />
          <polygon points="92,90 308,90 326,232 74,232" fill={b} opacity="0.55" />
        </g>
      );

    case 'office-suspended-linear':
      return (
        <g>
          <line x1="106" y1="0" x2="106" y2="112" stroke={metal.primary} strokeWidth="1.3" />
          <line x1="294" y1="0" x2="294" y2="112" stroke={metal.primary} strokeWidth="1.3" />
          <rect x="52" y="112" width="296" height="18" rx="2" fill={m} />
          <rect x="60" y="124" width="280" height="6" fill={glow.core} />
          <polygon points="60,130 340,130 368,248 32,248" fill={b} opacity="0.65" />
        </g>
      );

    case 'hallway-double-ring':
      return (
        <g>
          <circle cx="200" cy="132" r="76" fill={h} />
          <ellipse cx="174" cy="126" rx="54" ry="30" transform="rotate(-14 174 126)" fill="none" stroke={m} strokeWidth="6" />
          <ellipse cx="174" cy="126" rx="54" ry="30" transform="rotate(-14 174 126)" fill="none" stroke={glow.core} strokeWidth="2" />
          <ellipse cx="228" cy="142" rx="50" ry="26" transform="rotate(14 228 142)" fill="none" stroke={m} strokeWidth="6" />
          <ellipse cx="228" cy="142" rx="50" ry="26" transform="rotate(14 228 142)" fill="none" stroke={glow.core} strokeWidth="2" />
        </g>
      );

    case 'smart-ambient-orb':
      return (
        <g>
          <circle cx="200" cy="144" r="95" fill={h} />
          <circle cx="200" cy="140" r="68" fill="none" stroke={m} strokeWidth="6" />
          <circle cx="200" cy="140" r="68" fill="none" stroke={glow.core} strokeWidth="2" />
          <circle cx="200" cy="148" r="28" fill={glow.core} />
          <rect x="164" y="212" width="72" height="14" rx="7" fill={m} />
        </g>
      );
  }
}

interface SceneVisualProps {
  sceneType: CategoryItem['sceneType'] | 'hero';
  className?: string;
}

export const ArchitecturalSceneVisual: React.FC<SceneVisualProps> = ({
  sceneType,
  className = '',
}) => {
  const uid = useId().replace(/:/g, '');
  const isDarkScene =
    sceneType === 'hero' ||
    sceneType === 'outdoor-garden' ||
    sceneType === 'staircase' ||
    sceneType === 'smart-ambient';

  return (
    <div className={`relative w-full h-full overflow-hidden select-none ${className}`}>
      <svg
        viewBox="0 0 600 420"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full block"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={`wall-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={isDarkScene ? '#1D1A16' : '#EFE8DC'} />
            <stop offset="100%" stopColor={isDarkScene ? '#2B251E' : '#E2D7C5'} />
          </linearGradient>
          <radialGradient id={`sun-${uid}`} cx="50%" cy="38%" r="55%">
            <stop offset="0%" stopColor="#FFF7E2" stopOpacity="0.88" />
            <stop offset="45%" stopColor="#E6BC72" stopOpacity="0.34" />
            <stop offset="100%" stopColor="#E6BC72" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`brass-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E7CA8E" />
            <stop offset="50%" stopColor="#C1974D" />
            <stop offset="100%" stopColor="#8E6A2D" />
          </linearGradient>
          <linearGradient id={`floor-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={isDarkScene ? '#231E19' : '#D5C7B2'} />
            <stop offset="100%" stopColor={isDarkScene ? '#14120F' : '#C2B198'} />
          </linearGradient>
        </defs>

        <rect width="600" height="420" fill={`url(#wall-${uid})`} />

        {/* Architectural perspective ceiling & floor */}
        <polygon
          points="0,0 600,0 520,58 80,58"
          fill={isDarkScene ? '#171411' : '#F6F1E8'}
          opacity="0.7"
        />
        <polygon points="0,420 600,420 520,312 80,312" fill={`url(#floor-${uid})`} />

        {/* Wall panel molding */}
        <rect
          x="84"
          y="78"
          width="170"
          height="208"
          fill="none"
          stroke={isDarkScene ? '#3A3229' : '#D4C7B3'}
          strokeWidth="1.2"
        />
        <rect
          x="346"
          y="78"
          width="170"
          height="208"
          fill="none"
          stroke={isDarkScene ? '#3A3229' : '#D4C7B3'}
          strokeWidth="1.2"
        />

        {/* Cove glow */}
        <rect x="80" y="56" width="440" height="4" fill="#FFF2CE" opacity="0.6" />
        <circle cx="300" cy="175" r="210" fill={`url(#sun-${uid})`} />

        {sceneType === 'hero' && (
          <g>
            {/* Statement crystal chandelier */}
            <line x1="270" y1="0" x2="215" y2="112" stroke="#D5B26E" strokeWidth="1" />
            <line x1="330" y1="0" x2="385" y2="112" stroke="#D5B26E" strokeWidth="1" />
            <ellipse cx="300" cy="112" rx="112" ry="20" fill="none" stroke={`url(#brass-${uid})`} strokeWidth="6" />
            <ellipse cx="300" cy="112" rx="108" ry="17" fill="none" stroke="#FFF9E6" strokeWidth="2" />
            <ellipse cx="300" cy="154" rx="74" ry="14" fill="none" stroke={`url(#brass-${uid})`} strokeWidth="5" />
            {Array.from({ length: 19 }).map((_, i) => {
              const x = 196 + i * 11.5;
              const h = 34 + Math.sin(i * 0.4) * 20;
              return (
                <polygon
                  key={i}
                  points={`${x},122 ${x - 3},${122 + h * 0.6} ${x},${122 + h} ${x + 3},${122 + h * 0.6}`}
                  fill="#FFF8E8"
                  opacity="0.88"
                />
              );
            })}
            {/* Wall sconces left & right */}
            {[168, 432].map((sx) => (
              <g key={sx}>
                <circle cx={sx} cy="178" r="36" fill={`url(#sun-${uid})`} />
                <rect x={sx - 10} y="156" width="20" height="44" rx="10" fill={`url(#brass-${uid})`} />
              </g>
            ))}
            {/* Minimalist sofa & travertine coffee table */}
            <rect x="150" y="276" width="300" height="58" rx="10" fill="#DDD4C6" />
            <rect x="166" y="256" width="268" height="32" rx="6" fill="#E8E0D4" />
            <rect x="224" y="346" width="152" height="22" rx="4" fill="#CFC2AE" />
            <rect x="242" y="368" width="20" height="20" fill="#B8AA95" />
            <rect x="338" y="368" width="20" height="20" fill="#B8AA95" />
          </g>
        )}

        {(sceneType === 'chandelier-crystal' || sceneType === 'decorative-led') && (
          <g>
            <line x1="278" y1="0" x2="218" y2="112" stroke="#B68F48" strokeWidth="1" />
            <line x1="322" y1="0" x2="382" y2="112" stroke="#B68F48" strokeWidth="1" />
            <ellipse cx="300" cy="112" rx="96" ry="20" fill="none" stroke={`url(#brass-${uid})`} strokeWidth="6" />
            <ellipse cx="300" cy="156" rx="64" ry="14" fill="none" stroke={`url(#brass-${uid})`} strokeWidth="5" />
            <ellipse cx="300" cy="156" rx="64" ry="14" fill="none" stroke="#FFF9E6" strokeWidth="1.5" />
            <rect x="180" y="290" width="240" height="40" rx="6" fill="#CBBFA9" />
          </g>
        )}

        {sceneType === 'ceiling-flush' && (
          <g>
            <ellipse cx="300" cy="92" rx="125" ry="30" fill={`url(#brass-${uid})`} />
            <ellipse cx="300" cy="98" rx="112" ry="24" fill="#FFF9E8" />
            <rect x="190" y="286" width="220" height="44" rx="4" fill="#CFC4B2" />
          </g>
        )}

        {sceneType === 'pendant-dining' && (
          <g>
            <line x1="210" y1="0" x2="210" y2="132" stroke="#9C7A3D" strokeWidth="1.5" />
            <line x1="390" y1="0" x2="390" y2="132" stroke="#9C7A3D" strokeWidth="1.5" />
            <rect x="155" y="132" width="290" height="14" rx="7" fill={`url(#brass-${uid})`} />
            <rect x="165" y="142" width="270" height="5" fill="#FFF9E8" />
            <rect x="148" y="288" width="304" height="18" rx="3" fill="#6E5239" />
            <rect x="190" y="306" width="16" height="58" fill="#5A422D" />
            <rect x="394" y="306" width="16" height="58" fill="#5A422D" />
          </g>
        )}

        {sceneType === 'wall-sconce' && (
          <g>
            {[200, 400].map((x) => (
              <g key={x}>
                <circle cx={x} cy="168" r="64" fill={`url(#sun-${uid})`} />
                <rect x={x - 16} y="132" width="32" height="72" rx="16" fill={`url(#brass-${uid})`} />
              </g>
            ))}
            <rect x="210" y="274" width="180" height="60" fill="#C9BCA8" />
          </g>
        )}

        {sceneType === 'led-cove' && (
          <g>
            <rect x="96" y="72" width="408" height="8" fill="#FFF7DF" />
            <rect x="130" y="114" width="340" height="5" fill="#FFECC2" />
            <rect x="130" y="168" width="340" height="5" fill="#FFECC2" />
            <rect x="130" y="222" width="340" height="5" fill="#FFECC2" />
          </g>
        )}

        {(sceneType === 'table-lamp' || sceneType === 'bedside-lamp') && (
          <g>
            <rect x="140" y="280" width="320" height="66" rx="6" fill="#CFC4B2" />
            <rect x="282" y="198" width="36" height="82" rx="3" fill="#D8CDBB" />
            <polygon points="246,120 354,120 370,198 230,198" fill="#FFF8E6" stroke="#D5C8B3" strokeWidth="1.5" />
          </g>
        )}

        {sceneType === 'floor-lamp' && (
          <g>
            <ellipse cx="220" cy="348" rx="44" ry="9" fill="#B8AC99" />
            <path d="M220,348 L220,126 C220,76 320,76 320,126" fill="none" stroke={`url(#brass-${uid})`} strokeWidth="6" />
            <circle cx="320" cy="144" r="24" fill="#FFF9E8" />
            <rect x="330" y="268" width="126" height="68" rx="16" fill="#DCD3C5" />
          </g>
        )}

        {sceneType === 'mirror-vanity' && (
          <g>
            <ellipse cx="300" cy="182" rx="78" ry="102" fill="#E9E3D8" stroke={`url(#brass-${uid})`} strokeWidth="4" />
            <rect x="194" y="144" width="10" height="76" rx="5" fill={`url(#brass-${uid})`} />
            <rect x="396" y="144" width="10" height="76" rx="5" fill={`url(#brass-${uid})`} />
            <rect x="180" y="308" width="240" height="30" fill="#CFC5B6" />
          </g>
        )}

        {sceneType === 'outdoor-garden' && (
          <g>
            <rect x="130" y="90" width="340" height="220" fill="#2A251F" />
            {[176, 424].map((x) => (
              <g key={x}>
                <circle cx={x} cy="166" r="46" fill={`url(#sun-${uid})`} />
                <rect x={x - 14} y="140" width="28" height="52" fill="#181512" stroke="#B68F48" strokeWidth="2" />
                <ellipse cx={x} cy="166" rx="8" ry="14" fill="#FFF4D1" />
              </g>
            ))}
            {[220, 380].map((bx) => (
              <g key={bx}>
                <rect x={bx - 8} y="278" width="16" height="78" fill="#181512" stroke="#8C6D36" strokeWidth="1" />
                <rect x={bx - 7} y="286" width="14" height="14" fill="#FFF4D1" />
              </g>
            ))}
          </g>
        )}

        {sceneType === 'staircase' && (
          <g>
            {[0, 1, 2, 3, 4].map((step) => (
              <g key={step}>
                <rect x={140 + step * 58} y={320 - step * 44} width="120" height="16" fill="#3B342C" />
                <rect x={146 + step * 58} y={334 - step * 44} width="108" height="3" fill="#FFE6A8" />
              </g>
            ))}
            <line x1="250" y1="0" x2="250" y2="148" stroke="#D1AA62" strokeWidth="1.5" />
            <line x1="286" y1="0" x2="286" y2="188" stroke="#D1AA62" strokeWidth="1.5" />
            <circle cx="250" cy="148" r="14" fill="#FFF9E8" />
            <circle cx="286" cy="188" r="16" fill="#FFF9E8" />
          </g>
        )}

        {sceneType === 'office-linear' && (
          <g>
            <line x1="160" y1="0" x2="160" y2="108" stroke="#8F8A82" strokeWidth="1.4" />
            <line x1="440" y1="0" x2="440" y2="108" stroke="#8F8A82" strokeWidth="1.4" />
            <rect x="120" y="108" width="360" height="14" fill="#23201C" />
            <rect x="126" y="118" width="348" height="4" fill="#FFFDF6" />
            <rect x="148" y="284" width="304" height="16" fill="#B5A188" />
            <rect x="190" y="300" width="14" height="62" fill="#3C3731" />
            <rect x="396" y="300" width="14" height="62" fill="#3C3731" />
          </g>
        )}

        {sceneType === 'track-spotlight' && (
          <g>
            <rect x="110" y="54" width="380" height="12" fill="#23201C" />
            {[180, 300, 420].map((tx) => (
              <g key={tx}>
                <rect x={tx - 12} y="66" width="24" height="34" rx="3" fill="#23201C" />
                <polygon points={`${tx - 10},100 ${tx + 10},100 ${tx + 46},260 ${tx - 46},260`} fill="#FFF4D4" opacity="0.34" />
              </g>
            ))}
            <rect x="220" y="156" width="160" height="110" fill="none" stroke="#B68F48" strokeWidth="2" />
          </g>
        )}

        {sceneType === 'smart-ambient' && (
          <g>
            <circle cx="300" cy="186" r="108" fill={`url(#sun-${uid})`} />
            <circle cx="300" cy="186" r="76" fill="none" stroke={`url(#brass-${uid})`} strokeWidth="6" />
            <circle cx="300" cy="186" r="28" fill="#FFF7DF" />
          </g>
        )}
      </svg>
    </div>
  );
};
