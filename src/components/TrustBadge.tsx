import { Shield, CreditCard, Stethoscope, Activity } from "lucide-react";

import Link from "next/link";

interface TrustBadgeProps {
    type: "specialism" | "status" | "cost" | "model";
    label: string;
    value: string;
    href?: string;
}

export default function TrustBadge({ type, label, value, href }: TrustBadgeProps) {
    let icon;
    let colorClass = "bg-slate-100 text-slate-700";

    switch (type) {
        case "specialism":
            icon = <Stethoscope size={14} />;
            colorClass = "bg-blue-100 text-blue-800";
            break;
        case "status":
            icon = <Shield size={14} />;
            if (value.toLowerCase().includes("onbek")) {
                colorClass = "bg-amber-100 text-amber-800";
            } else {
                colorClass = "bg-green-100 text-green-800";
            }
            break;
        case "cost":
            icon = <CreditCard size={14} />;
            colorClass = "bg-purple-100 text-purple-800";
            break;
        case "model":
            icon = <Activity size={14} />;
            colorClass = "bg-indigo-100 text-indigo-800";
            break;
    }

    const badge = (
        <div className={`inline-flex items-center gap-1.5 px-[11px] py-[5px] rounded-full text-xs font-semibold ${colorClass} ${href ? 'hover:opacity-80 transition-opacity cursor-pointer' : ''}`}>
            {icon}
            <span className="opacity-75 font-medium">{label}:</span>
            <span className="font-bold">{value}</span>
        </div>
    );

    if (href) {
        return (
            <Link href={href}>
                {badge}
            </Link>
        );
    }

    return badge;
}
