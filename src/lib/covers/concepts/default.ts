import { escapeXml, wrapWords, type Palette } from "../palette";

export function defaultCover({
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
    const lines = wrapWords(title, 28);
    const titleNodes = lines
        .map((line, index) => `<text x="72" y="${300 + index * 70}" font-size="54" font-weight="800" fill="${ink}">${escapeXml(line)}</text>`)
        .join("");

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
<defs>
<linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${background}"/><stop offset="1" stop-color="#ffffff"/></linearGradient>
<linearGradient id="line" x1="0" y1="0" x2="1" y2="0"><stop stop-color="${accent}"/><stop offset="1" stop-color="${deep}"/></linearGradient>
</defs>
<rect width="1200" height="675" rx="44" fill="url(#bg)"/>
<circle cx="1030" cy="90" r="220" fill="${accent}" opacity="0.14"/>
<circle cx="1010" cy="560" r="260" fill="${deep}" opacity="0.09"/>
<path d="M725 426 C790 330 858 364 918 278 C962 215 1027 232 1080 170" fill="none" stroke="url(#line)" stroke-width="18" stroke-linecap="round" opacity="0.9"/>
<path d="M716 485 H1070" stroke="${deep}" stroke-width="10" stroke-linecap="round" opacity="0.18"/>
<path d="M716 535 H1010" stroke="${deep}" stroke-width="10" stroke-linecap="round" opacity="0.14"/>
<rect x="72" y="72" width="236" height="48" rx="24" fill="#ffffff" opacity="0.78"/>
<text x="96" y="103" font-size="22" font-weight="800" fill="${deep}" letter-spacing="2">${escapeXml(category.toUpperCase())}</text>
<text x="72" y="194" font-size="28" font-weight="800" fill="${deep}">${escapeXml(label)}</text>
${titleNodes}
<text x="74" y="606" font-size="24" font-weight="700" fill="${deep}" opacity="0.72">Medical AI Educational Hub</text>
</svg>`;
}
