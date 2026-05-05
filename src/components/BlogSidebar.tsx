import { Building2, ExternalLink, Gauge, Globe, Linkedin, MessageCircle, Share2, ShieldCheck } from "lucide-react";
import TrustBadge from "./TrustBadge";
import DifficultyBadge from "./article/DifficultyBadge";

interface BlogSidebarProps {
    developer?: string | null;
    demoUrl?: string | null;
    vendorUrl?: string | null;
    privacyType?: string | null;
    integration?: string | null;
    fdaStatus?: string | null;
    fdaNumber?: string | null;
    ceStatus?: string | null;
    specialism?: string | null;
    cost?: string | null;
    modelType?: string | null;
    title?: string;
    currentUrl?: string;
    difficulty?: string;
}

export default function BlogSidebar({ developer, demoUrl, vendorUrl, privacyType, integration, fdaStatus, fdaNumber, ceStatus, specialism, cost, modelType, title, currentUrl, difficulty }: BlogSidebarProps) {
    // Check if any details exist
    const hasDetails = specialism || ceStatus || cost || modelType;
    const hasLevel = Boolean(difficulty);
    // Check if any quick facts exist
    const hasQuickFacts = developer || privacyType || integration;
    // Check if any actions exist
    const hasActions = vendorUrl || demoUrl;
    const encodedUrl = encodeURIComponent(currentUrl || "");
    const encodedTitle = encodeURIComponent(title || "Medical AI");
    const hasShare = Boolean(currentUrl);

    // If nothing to show, return null
    if (!hasDetails && !hasLevel && !hasQuickFacts && !hasActions && !fdaStatus && !hasShare) {
        return null;
    }

    return (
        <div className="sticky top-24 space-y-6">
            {/* Details Card - Only show if has data */}
            {hasDetails && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <h3 className="text-[11px] font-bold text-brand-secondary uppercase tracking-[0.12em] mb-4 flex items-center gap-2">
                        <ShieldCheck size={16} className="text-brand-secondary" />
                        Details
                    </h3>
                    <div className="flex flex-col gap-3">
                        {specialism && <TrustBadge type="specialism" label="Specialisme" value={specialism} href={`/topics/${specialism}`} />}
                        {ceStatus && <TrustBadge type="status" label="CE Status" value={ceStatus} />}
                        {cost && <TrustBadge type="cost" label="Kosten" value={cost} />}
                        {modelType && <TrustBadge type="model" label="Model" value={modelType} />}
                    </div>
                </div>
            )}

            {hasLevel && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <h3 className="text-[11px] font-bold text-brand-secondary uppercase tracking-[0.12em] mb-4 flex items-center gap-2">
                        <Gauge size={16} className="text-brand-secondary" />
                        Level
                    </h3>
                    <DifficultyBadge level={difficulty} />
                </div>
            )}

            {/* Quick Facts - Only show if has data */}
            {hasQuickFacts && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <h3 className="text-[11px] font-bold text-brand-secondary uppercase tracking-[0.12em] mb-4 flex items-center gap-2">
                        <Globe size={16} className="text-brand-secondary" />
                        Quick Facts
                    </h3>
                    <ul className="space-y-4 text-sm">
                        {developer && (
                            <li className="flex flex-col">
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.08em]">Ontwikkelaar</span>
                                <span className="font-bold text-gray-900">{developer}</span>
                            </li>
                        )}
                        {privacyType && (
                            <li className="flex flex-col">
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.08em]">Privacy</span>
                                <span className="font-bold text-gray-900">{privacyType}</span>
                            </li>
                        )}
                        {integration && (
                            <li className="flex flex-col">
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.08em]">Integratie</span>
                                <span className="font-bold text-gray-900">{integration}</span>
                            </li>
                        )}
                    </ul>
                </div>
            )}

            {/* Actions - Only show if has data */}
            {hasActions && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <h3 className="text-[11px] font-bold text-brand-secondary uppercase tracking-[0.12em] mb-4">Acties</h3>
                    <div className="space-y-3">
                        {vendorUrl && (
                            <a
                                href={vendorUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-brand-secondary text-white rounded-xl font-bold hover:bg-brand-primary transition-colors shadow-sm hover:shadow-md"
                            >
                                <Building2 size={18} />
                                Naar Website Leverancier
                            </a>
                        )}
                        {demoUrl && (
                            <a
                                href={demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-white text-brand-secondary border-2 border-brand-secondary rounded-xl font-bold hover:bg-brand-secondary hover:text-white transition-colors"
                            >
                                <ExternalLink size={18} />
                                Bekijk Demo
                            </a>
                        )}
                    </div>
                </div>
            )}

            {hasShare && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                    <h3 className="text-[11px] font-bold text-brand-secondary uppercase tracking-[0.12em] mb-4 flex items-center gap-2">
                        <Share2 size={16} className="text-brand-secondary" />
                        Deel analyse
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <a
                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-brand-secondary hover:text-brand-secondary"
                        >
                            <Linkedin size={16} />
                            LinkedIn
                        </a>
                        <a
                            href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-brand-secondary hover:text-brand-secondary"
                        >
                            <MessageCircle size={16} />
                            WhatsApp
                        </a>
                    </div>
                </div>
            )}

            {/* Status Card (FDA only now, since CE is moved) */}
            {fdaStatus && (
                <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                    <h3 className="text-sm font-bold text-green-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <ShieldCheck size={16} />
                        Status
                    </h3>
                    <div className="space-y-3">
                        {fdaStatus && (
                            <div>
                                <span className="block text-xs text-green-600 font-medium uppercase">FDA Status</span>
                                <span className="font-bold text-green-900">{fdaStatus}</span>
                                {fdaNumber && <span className="block text-xs text-green-700 mt-1">({fdaNumber})</span>}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
