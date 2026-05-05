import { resolveWidget } from "@/lib/widgets/registry";

type InteractiveSlotProps = {
    name?: string;
    rawProps?: string;
};

export default function InteractiveSlot({ name, rawProps }: InteractiveSlotProps) {
    if (!name) return null;
    const result = resolveWidget(name, rawProps);

    if (!result.ok) {
        if (result.reason === "unknown") {
            return (
                <div className="my-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
                    Onbekende interactieve module: <code>{result.detail || name}</code>
                </div>
            );
        }

        if (process.env.NODE_ENV !== "production") {
            return (
                <div className="my-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                    <p className="font-bold">Widget &quot;{name}&quot; faalde validatie ({result.reason}).</p>
                    {result.detail && <p className="mt-1 font-mono text-xs">{result.detail}</p>}
                </div>
            );
        }

        const fallback = resolveWidget(name);
        if (fallback.ok) {
            const FallbackComponent = fallback.Component;
            return <FallbackComponent {...fallback.props} />;
        }
        return null;
    }

    const Component = result.Component;
    return <Component {...result.props} />;
}
