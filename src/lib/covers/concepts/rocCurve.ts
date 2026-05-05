import { escapeXml, type Palette } from "../palette";

export function rocCurveCover({
    label,
    palette,
}: {
    title: string;
    label: string;
    category: string;
    palette: Palette;
}) {
    const { background, accent, deep, ink } = palette;

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${background}"/><stop offset="1" stop-color="#ffffff"/></linearGradient>
<linearGradient id="auc-fill" x1="0" y1="0" x2="0" y2="1"><stop stop-color="${accent}" stop-opacity="0.45"/><stop offset="1" stop-color="${accent}" stop-opacity="0.05"/></linearGradient>
</defs>
<rect width="1200" height="675" rx="44" fill="url(#bg)"/>
<circle cx="190" cy="110" r="230" fill="${accent}" opacity="0.12"/>
<circle cx="1010" cy="570" r="250" fill="${deep}" opacity="0.08"/>

<!-- ROC plot panel -->
<g transform="translate(560 74)">
  <rect width="550" height="500" rx="34" fill="#ffffff" opacity="0.92"/>
  <!-- axes -->
  <line x1="76" y1="420" x2="482" y2="420" stroke="${deep}" stroke-width="4" opacity="0.4"/>
  <line x1="76" y1="62" x2="76" y2="420" stroke="${deep}" stroke-width="4" opacity="0.4"/>
  <!-- diagonal (random) -->
  <line x1="76" y1="420" x2="482" y2="62" stroke="${deep}" stroke-width="3" stroke-dasharray="8 8" opacity="0.35"/>
  <!-- AUC area under curve -->
  <path d="M76 420 Q142 204 278 128 Q394 60 482 66 L482 420 Z" fill="url(#auc-fill)"/>
  <!-- ROC curve -->
  <path d="M76 420 Q142 204 278 128 Q394 60 482 66" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round"/>
  <!-- threshold dot -->
  <circle cx="220" cy="170" r="14" fill="${deep}" stroke="#fff" stroke-width="5"/>
  <text x="244" y="177" font-size="22" font-weight="700" fill="${deep}">drempel</text>
  <!-- axis labels -->
  <text x="280" y="466" font-size="20" font-weight="700" fill="${deep}" text-anchor="middle">1 - specificiteit</text>
  <text x="34" y="240" font-size="20" font-weight="700" fill="${deep}" text-anchor="middle" transform="rotate(-90 34 240)">sensitiviteit</text>
  <text x="285" y="102" font-size="28" font-weight="800" fill="${deep}">AUC</text>
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
