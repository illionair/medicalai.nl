import { escapeXml, wrapWords, type Palette } from "../palette";

export function leakyPipeCover({
    title,
    label,
    category,
    palette,
}: {
    title: string;
    label: string;
    category: string;
    palette: Palette;
}) {
    const { background, accent, deep, ink } = palette;
    const lines = wrapWords(title, 24);
    const titleNodes = lines
        .map((line, index) => `<text x="72" y="${300 + index * 64}" font-size="48" font-weight="800" fill="${ink}">${escapeXml(line)}</text>`)
        .join("");
    const leakRed = "#dc2626";

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${background}"/><stop offset="1" stop-color="#ffffff"/></linearGradient>
</defs>
<rect width="1200" height="675" rx="44" fill="url(#bg)"/>

<!-- Pipeline -->
<g transform="translate(700 160)">
  <!-- Train box -->
  <rect x="0" y="80" width="140" height="80" rx="14" fill="${deep}" opacity="0.85"/>
  <text x="70" y="128" font-size="22" font-weight="800" fill="#ffffff" text-anchor="middle">TRAIN</text>
  <!-- arrow train→model -->
  <path d="M140 120 H230" stroke="${deep}" stroke-width="6" fill="none" stroke-linecap="round"/>
  <polygon points="230,120 222,114 222,126" fill="${deep}"/>
  <!-- Model box -->
  <rect x="240" y="80" width="140" height="80" rx="14" fill="${accent}" opacity="0.92"/>
  <text x="310" y="128" font-size="22" font-weight="800" fill="#ffffff" text-anchor="middle">MODEL</text>
  <!-- arrow model→test -->
  <path d="M380 120 H470" stroke="${deep}" stroke-width="6" fill="none" stroke-linecap="round"/>
  <polygon points="470,120 462,114 462,126" fill="${deep}"/>
  <!-- Test box -->
  <rect x="480" y="80" width="0" height="80"/>
  <rect x="480" y="80" width="0" height="80"/>
  <rect x="480" y="80" width="0" height="80"/>
  <rect x="480" y="80" width="0" height="80"/>
  <rect x="480" y="80" width="0" height="80"/>
  <rect x="480" y="80" width="0" height="80"/>
  <rect x="480" y="80" width="0" height="80"/>
  <rect x="480" y="80" width="0" height="80"/>
  <rect x="480" y="80" width="0" height="80"/>
  <rect x="480" y="80" width="0" height="80"/>
  <rect x="480" y="80" width="0" height="80"/>
  <rect x="480" y="80" width="0" height="80"/>
  <rect x="480" y="80" width="0" height="80"/>
  <rect x="480" y="80" width="0" height="80"/>
  <rect x="480" y="80" width="0" height="80"/>
  <rect x="480" y="80" width="0" height="80"/>
  <rect x="480" y="80" width="0" height="80"/>
  <rect x="480" y="80" width="0" height="80"/>
  <rect x="480" y="80" width="0" height="80"/>
  <rect x="480" y="80" width="0" height="80"/>
  <rect x="480" y="80" width="0" height="80"/>
  <rect x="480" y="80" width="0" height="80"/>
  <rect x="480" y="80" width="0" height="80"/>
  <rect x="480" y="80" width="0" height="80"/>
  <rect x="480" y="80" width="140" height="80" rx="14" fill="${deep}" opacity="0.75"/>
  <text x="550" y="128" font-size="22" font-weight="800" fill="#ffffff" text-anchor="middle">TEST</text>

  <!-- LEAK arrow test back to train -->
  <path d="M540 80 C 540 0, 100 0, 80 80" stroke="${leakRed}" stroke-width="6" stroke-dasharray="10 6" fill="none" stroke-linecap="round"/>
  <polygon points="80,80 72,68 92,68" fill="${leakRed}"/>
  <text x="310" y="20" font-size="22" font-weight="800" fill="${leakRed}" text-anchor="middle">LEKKAGE</text>

  <!-- Drips -->
  <circle cx="180" cy="200" r="6" fill="${leakRed}" opacity="0.85"/>
  <circle cx="240" cy="220" r="4" fill="${leakRed}" opacity="0.75"/>
  <circle cx="430" cy="210" r="5" fill="${leakRed}" opacity="0.85"/>
</g>

<rect x="72" y="72" width="236" height="48" rx="24" fill="#ffffff" opacity="0.78"/>
<text x="96" y="103" font-size="22" font-weight="800" fill="${deep}" letter-spacing="2">${escapeXml(category.toUpperCase())}</text>
<text x="72" y="194" font-size="28" font-weight="800" fill="${deep}">${escapeXml(label)}</text>
${titleNodes}
<text x="74" y="606" font-size="22" font-weight="700" fill="${deep}" opacity="0.72">Medical AI Educational Hub</text>
</svg>`;
}
