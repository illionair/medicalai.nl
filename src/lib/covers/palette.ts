export type Palette = {
    background: string;
    accent: string;
    deep: string;
    ink: string;
};

export function paletteFor(category: string): Palette {
    switch (category) {
        case "Ethiek":
            return { background: "#fff7ed", accent: "#fb7185", deep: "#f97316", ink: "#7f1d1d" };
        case "Diagnostiek":
            return { background: "#ecfeff", accent: "#06b6d4", deep: "#0f766e", ink: "#083344" };
        case "Predictie":
            return { background: "#eef2ff", accent: "#6366f1", deep: "#0284c7", ink: "#1e1b4b" };
        default:
            return { background: "#eff6ff", accent: "#007ea7", deep: "#003459", ink: "#0b1f2a" };
    }
}

export function escapeXml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

export function wrapWords(value: string, maxLength: number) {
    const lines: string[] = [];
    let current = "";
    for (const word of value.split(/\s+/)) {
        const next = current ? `${current} ${word}` : word;
        if (next.length > maxLength && current) {
            lines.push(current);
            current = word;
        } else {
            current = next;
        }
    }
    if (current) lines.push(current);
    return lines.slice(0, 3);
}

export function svgToDataUri(svg: string) {
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
