import { Shield, CreditCard, Stethoscope, Activity } from "lucide-react";

interface TrustBadgeProps {
    type: "specialism" | "status" | "cost" | "model";
    label: string;
    value: string;
}

export default function TrustBadge({ type, label, value }: TrustBadgeProps) {
    let icon;
    let colorClass = "bg-gray-100 text-gray-700 border-gray-200";

    switch (type) {
        case "specialism":
            icon = <Stethoscope size={14} />;
            colorClass = "bg-blue-50 text-blue-700 border-blue-100";
            break;
        case "status":
            icon = <Shield size={14} />;
            if (value.includes("FDA") || value.includes("CE")) {
                colorClass = "bg-green-50 text-green-700 border-green-100";
            } else if (value.includes("n.v.t")) {
                colorClass = "bg-gray-50 text-gray-600 border-gray-200";
            } else {
                colorClass = "bg-yellow-50 text-yellow-700 border-yellow-100";
            }
            break;
        case "cost":
            icon = <CreditCard size={14} />;
            colorClass = "bg-purple-50 text-purple-700 border-purple-100";
            break;
        case "model":
            icon = <Activity size={14} />;
            colorClass = "bg-indigo-50 text-indigo-700 border-indigo-100";
            break;
    }

    return (
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium ${colorClass}`}>
            {icon}
            <span className="opacity-75">{label}:</span>
            <span className="font-bold">{value}</span>
        </div>
    );
}
