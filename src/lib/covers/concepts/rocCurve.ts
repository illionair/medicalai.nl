import { escapeXml, wrapWords, type Palette } from "../palette";

export function rocCurveCover({
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
<linearGradient id="auc-fill" x1="0" y1="0" x2="0" y2="1"><stop stop-color="${accent}" stop-opacity="0.45"/><stop offset="1" stop-color="${accent}" stop-opacity="0.05"/></linearGradient>
</defs>
<rect width="1200" height="675" rx="44" fill="url(#bg)"/>

<!-- ROC plot panel -->
<g transform="translate(700 100)">
  <rect width="440" height="440" rx="28" fill="#ffffff" opacity="0.92"/>
  <!-- axes -->
  <line x1="60" y1="380" x2="400" y2="380" stroke="${deep}" stroke-width="3" opacity="0.4"/>
  <line x1="60" y1="40" x2="60" y2="380" stroke="${deep}" stroke-width="3" opacity="0.4"/>
  <!-- diagonal (random) -->
  <line x1="60" y1="380" x2="400" y2="40" stroke="${deep}" stroke-width="2" stroke-dasharray="6 6" opacity="0.35"/>
  <!-- AUC area under curve -->
  <path d="M60 380 Q120 200 240 110 Q330 60 400 50 L400 380 Z" fill="url(#auc-fill)"/>
  <!-- ROC curve -->
  <path d="M60 380 Q120 200 240 110 Q330 60 400 50" fill="none" stroke="${accent}" stroke-width="6" stroke-linecap="round"/>
  <!-- threshold dot -->
  <circle cx="180" cy="170" r="12" fill="${deep}" stroke="#fff" stroke-width="4"/>
  <text x="200" y="175" font-size="20" font-weight="700" fill="${deep}">drempel</text>
  <!-- axis labels -->
  <text x="230" y="420" font-size="18" font-weight="700" fill="${deep}" text-anchor="middle">1 − specificiteit</text>
  <text x="30" y="210" font-size="18" font-weight="700" fill="${deep}" text-anchor="middle" transform="rotate(-90 30 210)">sensitiviteit</text>
  <text x="200" y="80" font-size="22" font-weight="800" fill="${deep}">AUC</text>
</g>

<rect x="72" y="72" width="236" height="48" rx="24" fill="#ffffff" opacity="0.78"/>
<text x="96" y="103" font-size="22" font-weight="800" fill="${deep}" letter-spacing="2">${escapeXml(category.toUpperCase())}</text>
<text x="72" y="194" font-size="28" font-weight="800" fill="${deep}">${escapeXml(label)}</text>
${titleNodes}
<text x="74" y="606" font-size="22" font-weight="700" fill="${deep}" opacity="0.72">Medical AI Educational Hub</text>
</svg>`;
}
