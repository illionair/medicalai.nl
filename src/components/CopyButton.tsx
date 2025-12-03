"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CopyButtonProps {
    text: string;
    label?: string;
}

export default function CopyButton({ text, label = "Kopieer" }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="text-brand-secondary hover:text-brand-primary font-medium text-xs uppercase tracking-wider flex items-center gap-1"
            title="Kopieer naar klembord"
        >
            {copied ? (
                <>
                    <Check size={14} />
                    <span>Gekopieerd!</span>
                </>
            ) : (
                <>
                    {label}
                </>
            )}
        </button>
    );
}
