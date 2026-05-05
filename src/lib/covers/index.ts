import { paletteFor, svgToDataUri } from "./palette";
import { defaultCover } from "./concepts/default";
import { rocCurveCover } from "./concepts/rocCurve";
import { scaleBalanceCover } from "./concepts/scaleBalance";
import { leakyPipeCover } from "./concepts/leakyPipe";

type Concept = "roc-curve" | "scale-balance" | "leaky-pipe";

const CONCEPT_BUILDERS: Record<Concept, typeof defaultCover> = {
    "roc-curve": rocCurveCover,
    "scale-balance": scaleBalanceCover,
    "leaky-pipe": leakyPipeCover,
};

export function getCover({
    title,
    label,
    category,
    concept,
}: {
    title: string;
    label: string;
    category: string;
    concept?: string;
}) {
    const palette = paletteFor(category);
    const build = concept && concept in CONCEPT_BUILDERS
        ? CONCEPT_BUILDERS[concept as Concept]
        : defaultCover;
    const svg = build({ title, label, category, palette });
    return svgToDataUri(svg);
}
