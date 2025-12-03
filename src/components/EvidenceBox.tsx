import { CheckCircle2, AlertTriangle } from "lucide-react";

interface EvidenceBoxProps {
    title: string;
    children: React.ReactNode;
    type?: "success" | "warning" | "neutral";
}

export default function EvidenceBox({ title, children, type = "neutral" }: EvidenceBoxProps) {
    let bgClass = "bg-gray-50 border-gray-200";
    let iconColor = "text-gray-500";
    let Icon = CheckCircle2;

    if (type === "success") {
        bgClass = "bg-green-50 border-green-200";
        iconColor = "text-green-600";
    } else if (type === "warning") {
        bgClass = "bg-amber-50 border-amber-200";
        iconColor = "text-amber-600";
        Icon = AlertTriangle;
    }

    return (
        <div className={`my-8 p-6 rounded-2xl border ${bgClass}`}>
            <div className="flex items-center gap-3 mb-4">
                <Icon className={iconColor} size={24} />
                <h4 className="text-lg font-bold text-gray-900 m-0">{title}</h4>
            </div>
            <div className="text-gray-800 leading-relaxed">
                {children}
            </div>
        </div>
    );
}
