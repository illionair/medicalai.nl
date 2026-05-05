import { escapeXml, type Palette } from "../palette";

export function scaleBalanceCover({
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
</defs>
<rect width="1200" height="675" rx="44" fill="url(#bg)"/>
<circle cx="190" cy="110" r="230" fill="${accent}" opacity="0.12"/>
<circle cx="1010" cy="570" r="250" fill="${deep}" opacity="0.08"/>

<!-- Unbalanced scale -->
<g transform="translate(640 96)">
  <rect x="0" y="0" width="462" height="430" rx="34" fill="#ffffff" opacity="0.74"/>
  <!-- pillar -->
  <rect x="222" y="132" width="16" height="250" rx="5" fill="${deep}" opacity="0.85"/>
  <rect x="190" y="382" width="80" height="22" rx="7" fill="${deep}" opacity="0.85"/>
  <!-- beam tilted -->
  <line x1="66" y1="112" x2="394" y2="192" stroke="${deep}" stroke-width="8" stroke-linecap="round"/>
  <!-- left pan (heavy, lower) -->
  <line x1="88" y1="118" x2="88" y2="238" stroke="${deep}" stroke-width="4" opacity="0.6"/>
  <ellipse cx="88" cy="264" rx="84" ry="16" fill="${accent}" opacity="0.35"/>
  <circle cx="60" cy="240" r="16" fill="${accent}"/>
  <circle cx="88" cy="234" r="22" fill="${accent}"/>
  <circle cx="118" cy="244" r="15" fill="${accent}"/>
  <circle cx="84" cy="212" r="14" fill="${accent}" opacity="0.7"/>
  <!-- right pan (light, higher) -->
  <line x1="374" y1="198" x2="374" y2="280" stroke="${deep}" stroke-width="4" opacity="0.6"/>
  <ellipse cx="374" cy="304" rx="84" ry="16" fill="${ink}" opacity="0.18"/>
  <circle cx="360" cy="282" r="12" fill="${ink}" opacity="0.55"/>
  <circle cx="388" cy="286" r="10" fill="${ink}" opacity="0.55"/>
  <!-- bias label -->
  <text x="230" y="68" font-size="24" font-weight="800" fill="${deep}" text-anchor="middle">subgroepen ongelijk</text>
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
