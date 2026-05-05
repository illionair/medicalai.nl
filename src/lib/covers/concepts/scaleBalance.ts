import { escapeXml, wrapWords, type Palette } from "../palette";

export function scaleBalanceCover({
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

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${background}"/><stop offset="1" stop-color="#ffffff"/></linearGradient>
</defs>
<rect width="1200" height="675" rx="44" fill="url(#bg)"/>

<!-- Unbalanced scale -->
<g transform="translate(720 130)">
  <!-- pillar -->
  <rect x="195" y="100" width="14" height="280" rx="4" fill="${deep}" opacity="0.85"/>
  <rect x="170" y="380" width="64" height="20" rx="6" fill="${deep}" opacity="0.85"/>
  <!-- beam tilted -->
  <line x1="40" y1="80" x2="360" y2="160" stroke="${deep}" stroke-width="6" stroke-linecap="round"/>
  <!-- left pan (heavy, lower) -->
  <line x1="60" y1="90" x2="60" y2="200" stroke="${deep}" stroke-width="3" opacity="0.6"/>
  <ellipse cx="60" cy="220" rx="80" ry="14" fill="${accent}" opacity="0.35"/>
  <circle cx="40" cy="200" r="14" fill="${accent}"/>
  <circle cx="62" cy="196" r="18" fill="${accent}"/>
  <circle cx="86" cy="202" r="13" fill="${accent}"/>
  <circle cx="58" cy="180" r="12" fill="${accent}" opacity="0.7"/>
  <!-- right pan (light, higher) -->
  <line x1="340" y1="170" x2="340" y2="260" stroke="${deep}" stroke-width="3" opacity="0.6"/>
  <ellipse cx="340" cy="280" rx="80" ry="14" fill="${ink}" opacity="0.18"/>
  <circle cx="328" cy="260" r="11" fill="${ink}" opacity="0.55"/>
  <circle cx="352" cy="262" r="9" fill="${ink}" opacity="0.55"/>
  <!-- bias label -->
  <text x="200" y="60" font-size="22" font-weight="800" fill="${deep}" text-anchor="middle">subgroepen ongelijk</text>
</g>

<rect x="72" y="72" width="236" height="48" rx="24" fill="#ffffff" opacity="0.78"/>
<text x="96" y="103" font-size="22" font-weight="800" fill="${deep}" letter-spacing="2">${escapeXml(category.toUpperCase())}</text>
<text x="72" y="194" font-size="28" font-weight="800" fill="${deep}">${escapeXml(label)}</text>
${titleNodes}
<text x="74" y="606" font-size="22" font-weight="700" fill="${deep}" opacity="0.72">Medical AI Educational Hub</text>
</svg>`;
}
