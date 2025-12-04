import { ExternalLink, Share2, Linkedin, Lock, Server, Globe, ShieldCheck, Building2 } from "lucide-react";
import TrustBadge from "./TrustBadge";

interface BlogSidebarProps {
    developer?: string | null;
    demoUrl?: string | null;
    vendorUrl?: string | null;
    privacy?: string | null;
    privacyType?: string | null;
    integration?: string | null;
    fdaStatus?: string | null;
    fdaNumber?: string | null;
    ceStatus?: string | null;
    specialism?: string | null;
    cost?: string | null;
    modelType?: string | null;
}

export default function BlogSidebar({ developer, demoUrl, vendorUrl, privacy, privacyType, integration, fdaStatus, fdaNumber, ceStatus, specialism, cost, modelType }: BlogSidebarProps) {
    // Check if any details exist
    const hasDetails = specialism || ceStatus || cost || modelType;
    // Check if any quick facts exist
    const hasQuickFacts = developer || privacyType || privacy || integration;
    // Check if any actions exist
    const hasActions = vendorUrl || demoUrl;

    // If nothing to show, return null
    if (!hasDetails && !hasQuickFacts && !hasActions && !fdaStatus) {
        return null;
    }

    return (
        <div className="sticky top-24 space-y-6">
            {/* Details Card - Only show if has data */}
            {hasDetails && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
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

            {/* Quick Facts - Only show if has data */}
            {hasQuickFacts && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <Globe size={16} className="text-brand-secondary" />
                        Quick Facts
                    </h3>
                    <ul className="space-y-4 text-sm">
                        {developer && (
                            <li className="flex flex-col">
                                <span className="text-xs text-gray-500 font-medium uppercase">Ontwikkelaar</span>
                                <span className="font-bold text-gray-900">{developer}</span>
                            </li>
                        )}
                        {(privacyType || privacy) && (
                            <li className="flex flex-col">
                                <span className="text-xs text-gray-500 font-medium uppercase">Privacy</span>
                                <span className="font-bold text-gray-900">{privacyType || privacy}</span>
                            </li>
                        )}
                        {integration && (
                            <li className="flex flex-col">
                                <span className="text-xs text-gray-500 font-medium uppercase">Integratie</span>
                                <span className="font-bold text-gray-900">{integration}</span>
                            </li>
                        )}
                    </ul>
                </div>
            )}

            {/* Actions - Only show if has data */}
            {hasActions && (
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Acties</h3>
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
