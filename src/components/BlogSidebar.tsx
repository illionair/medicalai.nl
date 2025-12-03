import { ExternalLink, Share2, Linkedin, Lock, Server, Globe } from "lucide-react";

interface BlogSidebarProps {
    developer?: string | null;
    demoUrl?: string | null;
    privacy?: string | null;
    integration?: string | null;
}

export default function BlogSidebar({ developer, demoUrl, privacy, integration }: BlogSidebarProps) {
    return (
        <div className="sticky top-24 space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Quick Actions</h3>
                <div className="space-y-3">
                    {demoUrl && (
                        <a
                            href={demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-brand-secondary text-white rounded-xl font-bold hover:bg-brand-primary transition-colors shadow-sm hover:shadow-md"
                        >
                            <ExternalLink size={18} />
                            Bekijk Demo
                        </a>
                    )}
                    <button className="flex items-center justify-center gap-2 w-full py-3 px-4 bg-gray-50 text-gray-700 rounded-xl font-medium hover:bg-gray-100 transition-colors border border-gray-200">
                        <Share2 size={18} />
                        Delen
                    </button>
                </div>
            </div>

            {/* Quick Facts / Metadata */}
            <div className="bg-brand-dark/5 rounded-2xl p-6 border border-brand-dark/10">
                <h3 className="text-sm font-bold text-brand-dark uppercase tracking-wider mb-4">Quick Facts</h3>
                <ul className="space-y-4 text-sm">
                    {developer && (
                        <li className="flex items-start gap-3">
                            <Globe size={16} className="mt-0.5 text-brand-secondary" />
                            <div>
                                <span className="block text-xs text-gray-500 font-medium">Ontwikkelaar</span>
                                <span className="font-medium text-gray-900">{developer}</span>
                            </div>
                        </li>
                    )}
                    {privacy && (
                        <li className="flex items-start gap-3">
                            <Lock size={16} className="mt-0.5 text-brand-secondary" />
                            <div>
                                <span className="block text-xs text-gray-500 font-medium">Privacy</span>
                                <span className="font-medium text-gray-900">{privacy}</span>
                            </div>
                        </li>
                    )}
                    {integration && (
                        <li className="flex items-start gap-3">
                            <Server size={16} className="mt-0.5 text-brand-secondary" />
                            <div>
                                <span className="block text-xs text-gray-500 font-medium">Integratie</span>
                                <span className="font-medium text-gray-900">{integration}</span>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}
