import { ExternalLink, Share2, Linkedin, Lock, Server, Globe, ShieldCheck, Building2 } from "lucide-react";

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
}

export default function BlogSidebar({ developer, demoUrl, vendorUrl, privacy, privacyType, integration, fdaStatus, fdaNumber, ceStatus }: BlogSidebarProps) {
    return (
        <div className="sticky top-24 space-y-6">
            {/* Quick Facts */}
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

            {/* Actions */}
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

            {/* Status Card */}
            {(fdaStatus || ceStatus) && (
                <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
                    <h3 className="text-sm font-bold text-green-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <ShieldCheck size={16} />
                        Status
                    </h3>
                    <div className="space-y-3">
                        {ceStatus && (
                            <div>
                                <span className="block text-xs text-green-600 font-medium uppercase">CE Markering</span>
                                <span className="font-bold text-green-900">{ceStatus}</span>
                            </div>
                        )}
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
