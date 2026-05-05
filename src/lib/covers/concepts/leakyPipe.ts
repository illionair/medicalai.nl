import { escapeXml, type Palette } from "../palette";

export function leakyPipeCover({
    label,
    palette,
}: {
    title: string;
    label: string;
    category: string;
    palette: Palette;
}) {
    const { background, accent, deep, ink } = palette;
    const leakRed = "#dc2626";

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${background}"/><stop offset="1" stop-color="#ffffff"/></linearGradient>
</defs>
<rect width="1200" height="675" rx="44" fill="url(#bg)"/>
<circle cx="190" cy="110" r="230" fill="${accent}" opacity="0.12"/>
<circle cx="1010" cy="570" r="250" fill="${deep}" opacity="0.08"/>

<g transform="translate(610 116)">
  <rect x="0" y="0" width="520" height="360" rx="34" fill="#ffffff" opacity="0.74"/>
  <rect x="54" y="142" width="118" height="78" rx="16" fill="${deep}" opacity="0.85"/>
  <text x="113" y="188" font-size="21" font-weight="800" fill="#ffffff" text-anchor="middle">TRAIN</text>
  <path d="M172 181 H242" stroke="${deep}" stroke-width="8" fill="none" stroke-linecap="round"/>
  <polygon points="242,181 231,172 231,190" fill="${deep}"/>
  <rect x="254" y="142" width="118" height="78" rx="16" fill="${accent}" opacity="0.92"/>
  <text x="313" y="188" font-size="21" font-weight="800" fill="#ffffff" text-anchor="middle">MODEL</text>
  <path d="M372 181 H442" stroke="${deep}" stroke-width="8" fill="none" stroke-linecap="round"/>
  <polygon points="442,181 431,172 431,190" fill="${deep}"/>
  <rect x="454" y="142" width="118" height="78" rx="16" fill="${deep}" opacity="0.75"/>
  <text x="513" y="188" font-size="21" font-weight="800" fill="#ffffff" text-anchor="middle">TEST</text>
  <path d="M512 142 C512 46 140 46 118 142" stroke="${leakRed}" stroke-width="8" stroke-dasharray="12 8" fill="none" stroke-linecap="round"/>
  <polygon points="118,142 106,126 132,126" fill="${leakRed}"/>
  <text x="313" y="62" font-size="24" font-weight="800" fill="${leakRed}" text-anchor="middle">lekkage</text>
  <circle cx="214" cy="264" r="7" fill="${leakRed}" opacity="0.85"/>
  <circle cx="276" cy="292" r="5" fill="${leakRed}" opacity="0.75"/>
  <circle cx="420" cy="276" r="6" fill="${leakRed}" opacity="0.85"/>
</g>

<g transform="translate(72 132)">
  <rect x="0" y="0" width="405" height="286" rx="32" fill="#ffffff" opacity="0.64"/>
  <path d="M58 94 H318" stroke="${deep}" stroke-width="16" stroke-linecap="round" opacity="0.16"/>
  <path d="M58 152 H344" stroke="${deep}" stroke-width="16" stroke-linecap="round" opacity="0.12"/>
  <path d="M58 210 H260" stroke="${deep}" stroke-width="16" stroke-linecap="round" opacity="0.1"/>
  <circle cx="334" cy="214" r="34" fill="${accent}" opacity="0.22"/>
  <path d="M316 214 h36 M334 196 v36" stroke="${ink}" stroke-width="7" stroke-linecap="round" opacity="0.34"/>
</g>
<text x="74" y="604" font-size="25" font-weight="800" fill="${deep}" opacity="0.74">${escapeXml(label)}</text>
<text x="74" y="638" font-size="18" font-weight="700" fill="${deep}" opacity="0.42">Medical AI Educational Hub</text>
</svg>`;
}
