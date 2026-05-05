import type { ReactNode } from "react";

type KeyTakeawayProps = {
    children?: ReactNode;
};

export default function KeyTakeaway({ children }: KeyTakeawayProps) {
    return (
        <blockquote className="not-prose my-8 border-l-4 border-brand-secondary bg-slate-50 px-5 py-4">
            <p className="text-base font-medium italic leading-7 text-slate-800">
                {children}
            </p>
        </blockquote>
    );
}
