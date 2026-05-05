import { escapeXml, type Palette } from "../palette";

function baseMotif({ accent, deep, ink }: Palette) {
    return `
<g transform="translate(650 120)">
  <rect x="0" y="0" width="420" height="360" rx="34" fill="#ffffff" opacity="0.72"/>
  <path d="M56 250 C112 172 168 212 224 128 C278 48 346 88 390 42" fill="none" stroke="${accent}" stroke-width="18" stroke-linecap="round"/>
  <path d="M64 292 H372" stroke="${deep}" stroke-width="10" stroke-linecap="round" opacity="0.18"/>
  <path d="M64 322 H310" stroke="${deep}" stroke-width="10" stroke-linecap="round" opacity="0.12"/>
  <circle cx="112" cy="172" r="16" fill="${deep}" opacity="0.85"/>
  <circle cx="224" cy="128" r="16" fill="${deep}" opacity="0.85"/>
  <circle cx="346" cy="88" r="16" fill="${ink}" opacity="0.55"/>
</g>`;
}

function tuningMotif({ accent, deep, ink }: Palette) {
    return `
<g transform="translate(650 110)">
  <rect x="0" y="0" width="430" height="380" rx="34" fill="#ffffff" opacity="0.74"/>
  ${[0, 1, 2].map((row) => {
        const y = 88 + row * 82;
        const knob = [270, 150, 320][row];
        return `<line x1="72" y1="${y}" x2="360" y2="${y}" stroke="${deep}" stroke-width="10" stroke-linecap="round" opacity="0.18"/>
  <circle cx="${knob}" cy="${y}" r="22" fill="${row === 1 ? accent : deep}" opacity="0.92"/>
  <circle cx="${knob}" cy="${y}" r="8" fill="#ffffff" opacity="0.85"/>`;
    }).join("\n")}
  <path d="M70 320 C128 274 174 290 226 242 C276 196 322 208 366 154" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" opacity="0.9"/>
  <circle cx="366" cy="154" r="13" fill="${ink}" opacity="0.64"/>
</g>`;
}

function modelMotif({ accent, deep, ink }: Palette) {
    const nodes = [
        [40, 82], [40, 184], [40, 286],
        [190, 62], [190, 184], [190, 306],
        [340, 122], [340, 246],
    ];
    const links = [[0, 3], [0, 4], [1, 3], [1, 4], [1, 5], [2, 4], [2, 5], [3, 6], [4, 6], [4, 7], [5, 7]];
    return `
<g transform="translate(690 112)">
  <rect x="-30" y="-18" width="440" height="390" rx="34" fill="#ffffff" opacity="0.74"/>
  ${links.map(([a, b]) => `<line x1="${nodes[a][0]}" y1="${nodes[a][1]}" x2="${nodes[b][0]}" y2="${nodes[b][1]}" stroke="${deep}" stroke-width="5" opacity="0.18"/>`).join("\n")}
  ${nodes.map(([x, y], index) => `<circle cx="${x}" cy="${y}" r="${index > 5 ? 26 : 22}" fill="${index % 2 ? accent : deep}" opacity="${index > 5 ? 0.92 : 0.78}"/>`).join("\n")}
  <path d="M332 242 l22 0 l0 22" fill="none" stroke="${ink}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" opacity="0.46"/>
</g>`;
}

function checklistMotif({ accent, deep, ink }: Palette) {
    return `
<g transform="translate(665 96)">
  <rect x="0" y="0" width="420" height="410" rx="34" fill="#ffffff" opacity="0.76"/>
  <rect x="88" y="42" width="244" height="54" rx="18" fill="${deep}" opacity="0.86"/>
  ${[0, 1, 2, 3].map((row) => {
        const y = 142 + row * 62;
        return `<rect x="62" y="${y - 18}" width="34" height="34" rx="9" fill="${row < 3 ? accent : "#ffffff"}" stroke="${deep}" stroke-width="4" opacity="${row < 3 ? 0.92 : 0.26}"/>
  ${row < 3 ? `<path d="M70 ${y} l9 9 l22 -26" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>` : ""}
  <path d="M126 ${y - 4} H340" stroke="${ink}" stroke-width="10" stroke-linecap="round" opacity="${0.22 - row * 0.03}"/>
  <path d="M126 ${y + 18} H286" stroke="${ink}" stroke-width="8" stroke-linecap="round" opacity="${0.13 - row * 0.02}"/>`;
    }).join("\n")}
</g>`;
}

function validationMotif({ accent, deep, ink }: Palette) {
    return `
<g transform="translate(648 112)">
  <rect x="0" y="0" width="444" height="384" rx="34" fill="#ffffff" opacity="0.74"/>
  <rect x="54" y="68" width="128" height="244" rx="22" fill="${deep}" opacity="0.82"/>
  <rect x="264" y="68" width="128" height="244" rx="22" fill="${accent}" opacity="0.78"/>
  <path d="M182 190 H264" stroke="${ink}" stroke-width="10" stroke-linecap="round" opacity="0.34"/>
  <path d="M242 164 l32 26 l-32 26" fill="none" stroke="${ink}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" opacity="0.34"/>
  <path d="M82 262 C112 218 144 228 160 154" fill="none" stroke="#ffffff" stroke-width="9" stroke-linecap="round" opacity="0.82"/>
  <path d="M292 266 C316 230 344 242 366 172" fill="none" stroke="#ffffff" stroke-width="9" stroke-linecap="round" opacity="0.82"/>
  <circle cx="150" cy="154" r="14" fill="#ffffff" opacity="0.9"/>
  <circle cx="360" cy="172" r="14" fill="#ffffff" opacity="0.9"/>
</g>`;
}

function calibrationMotif({ accent, deep, ink }: Palette) {
    return `
<g transform="translate(652 104)">
  <rect x="0" y="0" width="438" height="398" rx="34" fill="#ffffff" opacity="0.74"/>
  <line x1="74" y1="320" x2="366" y2="320" stroke="${deep}" stroke-width="5" opacity="0.34"/>
  <line x1="74" y1="76" x2="74" y2="320" stroke="${deep}" stroke-width="5" opacity="0.34"/>
  <line x1="80" y1="314" x2="350" y2="88" stroke="${deep}" stroke-width="5" stroke-dasharray="9 10" opacity="0.3"/>
  <path d="M82 300 C132 286 164 250 212 232 C266 212 304 150 354 118" fill="none" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>
  ${[[124, 274], [176, 238], [224, 222], [286, 162], [344, 126]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="15" fill="${ink}" opacity="0.58"/>`).join("\n")}
</g>`;
}

function mdrMotif({ accent, deep, ink }: Palette) {
    return `
<g transform="translate(650 104)">
  <rect x="0" y="0" width="438" height="398" rx="34" fill="#ffffff" opacity="0.74"/>
  <path d="M218 62 l126 58 v90 c0 80 -54 128 -126 160 c-72 -32 -126 -80 -126 -160 v-90z" fill="${deep}" opacity="0.84"/>
  <path d="M164 210 l38 38 l82 -104" fill="none" stroke="#ffffff" stroke-width="18" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="72" y="290" width="292" height="52" rx="26" fill="${accent}" opacity="0.22"/>
  <circle cx="120" cy="316" r="10" fill="${ink}" opacity="0.44"/>
  <circle cx="218" cy="316" r="10" fill="${ink}" opacity="0.44"/>
  <circle cx="316" cy="316" r="10" fill="${ink}" opacity="0.44"/>
</g>`;
}

function deploymentMotif({ accent, deep, ink }: Palette) {
    return `
<g transform="translate(642 104)">
  <rect x="0" y="0" width="456" height="398" rx="34" fill="#ffffff" opacity="0.74"/>
  ${[0, 1, 2, 3].map((step) => {
        const x = 58 + step * 82;
        const y = 280 - step * 46;
        return `<rect x="${x}" y="${y}" width="72" height="${330 - y}" rx="16" fill="${step % 2 ? accent : deep}" opacity="${0.42 + step * 0.12}"/>`;
    }).join("\n")}
  <path d="M78 132 C142 78 220 92 286 58 C334 34 370 54 402 82" fill="none" stroke="${ink}" stroke-width="8" stroke-linecap="round" opacity="0.34"/>
  <circle cx="402" cy="82" r="17" fill="${accent}" opacity="0.92"/>
</g>`;
}

function workflowMotif({ accent, deep, ink }: Palette) {
    return `
<g transform="translate(642 104)">
  <rect x="0" y="0" width="456" height="398" rx="34" fill="#ffffff" opacity="0.74"/>
  ${[[76, 86], [276, 86], [76, 246], [276, 246]].map(([x, y], index) => `<rect x="${x}" y="${y}" width="118" height="78" rx="20" fill="${index === 3 ? accent : deep}" opacity="${index === 3 ? 0.86 : 0.68}"/>`).join("\n")}
  <path d="M194 125 H276 M335 164 V246 M276 285 H194 M135 246 V164" fill="none" stroke="${ink}" stroke-width="9" stroke-linecap="round" opacity="0.28"/>
  <circle cx="228" cy="125" r="11" fill="${accent}" opacity="0.85"/>
  <circle cx="335" cy="202" r="11" fill="${accent}" opacity="0.85"/>
  <path d="M325 38 l18 18 l-18 18" fill="none" stroke="${accent}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
</g>`;
}

function ragMotif({ accent, deep, ink }: Palette) {
    return `
<g transform="translate(638 102)">
  <rect x="0" y="0" width="464" height="402" rx="34" fill="#ffffff" opacity="0.74"/>
  ${[0, 1, 2].map((i) => `<rect x="58" y="${72 + i * 88}" width="136" height="58" rx="16" fill="${deep}" opacity="${0.72 - i * 0.1}"/>
  <path d="M82 ${96 + i * 88} H168" stroke="#ffffff" stroke-width="8" stroke-linecap="round" opacity="0.72"/>`).join("\n")}
  <path d="M194 188 H272" stroke="${ink}" stroke-width="9" stroke-linecap="round" opacity="0.28"/>
  <path d="M250 162 l30 26 l-30 26" fill="none" stroke="${ink}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" opacity="0.28"/>
  <rect x="284" y="116" width="124" height="144" rx="26" fill="${accent}" opacity="0.86"/>
  <circle cx="326" cy="174" r="15" fill="#ffffff" opacity="0.8"/>
  <circle cx="366" cy="174" r="15" fill="#ffffff" opacity="0.8"/>
  <path d="M322 216 H370" stroke="#ffffff" stroke-width="8" stroke-linecap="round" opacity="0.72"/>
</g>`;
}

function llmMotif({ accent, deep, ink }: Palette) {
    return `
<g transform="translate(642 104)">
  <rect x="0" y="0" width="456" height="398" rx="34" fill="#ffffff" opacity="0.74"/>
  <rect x="86" y="92" width="284" height="184" rx="34" fill="${deep}" opacity="0.8"/>
  <path d="M146 276 l-28 52 l78 -52" fill="${deep}" opacity="0.8"/>
  <circle cx="164" cy="176" r="18" fill="#ffffff" opacity="0.84"/>
  <circle cx="228" cy="176" r="18" fill="#ffffff" opacity="0.84"/>
  <circle cx="292" cy="176" r="18" fill="#ffffff" opacity="0.84"/>
  <rect x="102" y="66" width="118" height="42" rx="21" fill="${accent}" opacity="0.9"/>
  <path d="M316 66 l18 18 l36 -44" fill="none" stroke="${ink}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" opacity="0.34"/>
</g>`;
}

function clinicalUtilityMotif({ accent, deep, ink }: Palette) {
    return `
<g transform="translate(640 102)">
  <rect x="0" y="0" width="464" height="402" rx="34" fill="#ffffff" opacity="0.74"/>
  <path d="M84 272 C132 214 172 238 214 184 C258 128 308 132 374 84" fill="none" stroke="${accent}" stroke-width="12" stroke-linecap="round"/>
  <path d="M84 304 C142 292 190 292 246 262 C298 232 330 238 384 210" fill="none" stroke="${deep}" stroke-width="12" stroke-linecap="round" opacity="0.42"/>
  <line x1="76" y1="322" x2="390" y2="322" stroke="${ink}" stroke-width="5" opacity="0.22"/>
  <line x1="76" y1="78" x2="76" y2="322" stroke="${ink}" stroke-width="5" opacity="0.22"/>
  <rect x="108" y="74" width="112" height="48" rx="24" fill="${deep}" opacity="0.14"/>
  <rect x="246" y="74" width="112" height="48" rx="24" fill="${accent}" opacity="0.2"/>
</g>`;
}

function motifFor(label: string, palette: Palette) {
    const key = label.toLowerCase();
    if (key.includes("tuning")) return tuningMotif(palette);
    if (key.includes("modelkaart")) return modelMotif(palette);
    if (key.includes("10-minuten")) return checklistMotif(palette);
    if (key.includes("validatie") || key.includes("external")) return validationMotif(palette);
    if (key.includes("calibratie")) return calibrationMotif(palette);
    if (key.includes("mdr") || key.includes("claim")) return mdrMotif(palette);
    if (key.includes("deployment")) return deploymentMotif(palette);
    if (key.includes("workflow")) return workflowMotif(palette);
    if (key.includes("clinical utility")) return clinicalUtilityMotif(palette);
    if (key.includes("llm")) return llmMotif(palette);
    if (key.includes("rag")) return ragMotif(palette);
    return baseMotif(palette);
}

export function defaultCover({
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
<linearGradient id="rail" x1="0" y1="0" x2="1" y2="0"><stop stop-color="${accent}"/><stop offset="1" stop-color="${deep}"/></linearGradient>
</defs>
<rect width="1200" height="675" rx="44" fill="url(#bg)"/>
<circle cx="170" cy="112" r="210" fill="${accent}" opacity="0.12"/>
<circle cx="1035" cy="565" r="280" fill="${deep}" opacity="0.08"/>
<g transform="translate(72 116)">
  <rect x="0" y="0" width="496" height="338" rx="34" fill="#ffffff" opacity="0.64"/>
  <path d="M60 126 H356" stroke="${deep}" stroke-width="18" stroke-linecap="round" opacity="0.16"/>
  <path d="M60 188 H420" stroke="${deep}" stroke-width="18" stroke-linecap="round" opacity="0.12"/>
  <path d="M60 250 H306" stroke="${deep}" stroke-width="18" stroke-linecap="round" opacity="0.1"/>
  <rect x="60" y="58" width="170" height="36" rx="18" fill="url(#rail)" opacity="0.82"/>
  <circle cx="392" cy="74" r="42" fill="${accent}" opacity="0.2"/>
  <path d="M374 74 h36 M392 56 v36" stroke="${ink}" stroke-width="8" stroke-linecap="round" opacity="0.36"/>
</g>
${motifFor(label, palette)}
<text x="74" y="604" font-size="25" font-weight="800" fill="${deep}" opacity="0.74">${escapeXml(label)}</text>
<text x="74" y="638" font-size="18" font-weight="700" fill="${deep}" opacity="0.42">Medical AI Educational Hub</text>
</svg>`;
}
