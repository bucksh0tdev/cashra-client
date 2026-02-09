import * as React from "react";

const SvgClosedCard = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 167.184 242.862"
    {...props}
  >
    <defs>
      {/* Mor → gece moru degrade */}
      <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3a0a6b" />
        <stop offset="100%" stopColor="#0a0618" />
      </linearGradient>

      {/* İç parlama */}
      <radialGradient id="sheen" cx="50%" cy="38%" r="70%">
        <stop offset="0%" stopColor="rgba(255,215,0,0.22)" />
        <stop offset="100%" stopColor="rgba(255,215,0,0)" />
      </radialGradient>

      {/* Altın tonları */}
      <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#ffe9a3" />
        <stop offset="45%" stopColor="#ffd34d" />
        <stop offset="60%" stopColor="#c89b2b" />
        <stop offset="100%" stopColor="#fff0b9" />
      </linearGradient>

      {/* İnce noktalı desen – çok hafif */}
      <pattern id="dots" width="10" height="10" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="1" fill="rgba(255,255,255,0.08)" />
      </pattern>

      {/* Yumuşak iç gölge */}
      <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feOffset dx="0" dy="1" />
        <feGaussianBlur stdDeviation="1.5" result="b" />
        <feComposite in="b" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" />
        <feColorMatrix type="matrix" values="
          0 0 0 0 0
          0 0 0 0 0
          0 0 0 0 0
          0 0 0 .35 0" />
        <feComposite in2="SourceGraphic" operator="over" />
      </filter>
    </defs>

    {/* Kart gövdesi */}
    <rect
      x="1.5"
      y="1.5"
      width="164.184"
      height="239.862"
      rx="14"
      ry="14"
      fill="url(#bg)"
      stroke="url(#gold)"
      strokeWidth="3.2"
    />
    {/* İç parlama ve iç çerçeve */}
    <rect x="6" y="6" width="155.184" height="230" rx="10" ry="10" fill="url(#sheen)" />
    <rect
      x="6"
      y="6"
      width="155.184"
      height="230"
      rx="10"
      ry="10"
      fill="none"
      stroke="url(#gold)"
      strokeWidth="1.8"
    />

    {/* Çok hafif doku */}
    <rect x="6" y="6" width="155.184" height="230" rx="10" ry="10" fill="url(#dots)" opacity=".25" />

    {/* —— ORTA MOTİF —— */}
    <g transform="translate(83.592,121.431)">
      {/* Altın rozet halkası */}
      <circle r="40" fill="none" stroke="url(#gold)" strokeWidth="3" />
      <circle r="33" fill="none" stroke="url(#gold)" strokeWidth="1.2" opacity=".8" />

      {/* Defne yaprakları */}
      <g fill="url(#gold)" filter="url(#innerShadow)" opacity=".95">
        {Array.from({ length: 8 }).map((_, i) => {
          const ang = -65 + i * 13; // sağ taç
          return (
            <path
              key={`r${i}`}
              d="M0 0 c8 -2 14 -6 18 -12 c2 -3 1 -6 -2 -8 c-6 -4 -14 -4 -22 -2 c5 5 7 14 6 22 z"
              transform={`rotate(${ang}) translate(22,-4) scale(.22)`}
            />
          );
        })}
        {Array.from({ length: 8 }).map((_, i) => {
          const ang = 245 - i * 13; // sol taç
          return (
            <path
              key={`l${i}`}
              d="M0 0 c8 -2 14 -6 18 -12 c2 -3 1 -6 -2 -8 c-6 -4 -14 -4 -22 -2 c5 5 7 14 6 22 z"
              transform={`rotate(${ang}) translate(22,-4) scale(.22)`}
            />
          );
        })}
      </g>

      {/* Küçük yıldızlar */}
      <g fill="url(#gold)">
        <path d="M0,-50 l1.6,4.8 h5.1 l-4.1,3 1.6,4.9 -4.2-3 -4.2,3 1.6-4.9 -4.1-3 h5.1z" opacity=".8" />
        <path d="M0,50 l1.4,-4.2 h4.5 l-3.6,-2.6 1.4,-4.3 -3.7,2.7 -3.7,-2.7 1.4,4.3 -3.6,2.6 h4.5z" opacity=".6" />
      </g>

      {/* Spade monogram – tam ortada */}
      <g transform="translate(2,-7) scale(.8)">
        <path
          d="M0 -12
             c 16 10 22 22 22 30
             c 0 7 -6 12 -13 12
             c -4 0 -7 -1 -9 -3
             c -2 2 -5 3 -9 3
             c -7 0 -13 -5 -13 -12
             c 0 -8 6 -20 22 -30
             z
             m -6 28
             c 3 2 6 3 6 9
             h -12
             c 0 -6 3 -7 6 -9 z"
          fill="url(#gold)"
          filter="url(#innerShadow)"
        />
      </g>
    </g>
  </svg>
);

export default SvgClosedCard;
