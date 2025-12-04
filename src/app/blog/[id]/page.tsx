import { getBlogPost } from "@/app/actions";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import TrustBadge from "@/components/TrustBadge";
import BlogSidebar from "@/components/BlogSidebar";
import EvidenceBox from "@/components/EvidenceBox";
import CopyButton from "@/components/CopyButton";

export const dynamic = "force-dynamic";

const categoryGradients: Record<string, string> = {
    "Predictie": "from-blue-600 to-cyan-500",
    "Diagnostiek": "from-purple-600 to-pink-500",
    "Methodisch": "from-green-600 to-emerald-500",
    "Ethiek": "from-orange-600 to-amber-500",
    "default": "from-gray-900 to-gray-700"
};

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const blog = await getBlogPost(id);

    if (!blog) {
        notFound();
    }

    return (
        <article className="min-h-screen bg-white pb-64">
            {/* Header Section */}
            <div className="bg-slate-50 border-b border-slate-200 pt-32 pb-16">
                <div className="container mx-auto px-4 max-w-6xl">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-primary transition-colors mb-8 text-sm font-medium"
                    >
                        <ArrowLeft size={16} />
                        Terug naar overzicht
                    </Link>

                    <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6 leading-tight">
                        {blog.title}
                    </h1>

                    {/* Subtitle/Summary if available, or just meta */}
                    <div className="flex items-center gap-4 text-slate-500 text-sm font-medium">
                        <span className="flex items-center gap-2">
                            <Calendar size={16} />
                            {new Date(blog.createdAt).toLocaleDateString("nl-NL", {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </span>
                        <span>•</span>
                        <span>{blog.category}</span>
                        <span>•</span>
                        <span className="flex items-center gap-2">
                            <User size={16} />
                            {blog.article?.authors || "Drs. S. S. Mahes"}
                        </span>
                    </div>
                </div >
            </div >

            {/* Main Content Layout */}
            <div className="container mx-auto px-4 max-w-6xl py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Content Column */}
                    {/* Content Column */}
                    <div className="lg:col-span-8">
                        {/* Summary Module */}
                        {blog.summary && (
                            <div className="mb-8 mt-8 p-6 bg-brand-primary/5 rounded-2xl border border-brand-primary/10">
                                <h3 className="text-lg font-bold text-brand-dark mb-2 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-brand-primary rounded-full"></span>
                                    In het kort
                                </h3>
                                <p className="text-slate-700 leading-relaxed">
                                    {blog.summary}
                                </p>
                            </div>
                        )}

                        <div className="prose prose-lg prose-gray max-w-none 
                            prose-headings:font-bold prose-headings:text-brand-dark 
                            prose-p:text-gray-900 prose-li:text-gray-900
                            prose-a:text-brand-secondary hover:prose-a:text-brand-primary 
                            prose-img:rounded-2xl prose-img:shadow-md
                            prose-strong:text-brand-dark">
                            <ReactMarkdown
                                rehypePlugins={[rehypeRaw]}
                                urlTransform={(value) => value} // Allow data: URIs
                                components={{
                                    // Custom component mapping for EvidenceBox if we used a custom syntax, 
                                    // but for now we assume standard markdown or HTML injection.
                                    // We can also inject EvidenceBox manually in the content string if needed.
                                }}
                            >
                                {blog.content}
                            </ReactMarkdown>
                        </div>

                        {/* Mobile-only Quick Facts & Details */}
                        <div className="lg:hidden mb-12">
                            <BlogSidebar
                                developer={blog.developer}
                                demoUrl={blog.demoUrl}
                                vendorUrl={blog.vendorUrl}
                                privacy={blog.privacy}
                                privacyType={blog.privacyType}
                                integration={blog.integration}
                                fdaStatus={blog.fdaStatus}
                                fdaNumber={blog.fdaNumber}
                                ceStatus={blog.ceStatus}
                                specialism={blog.specialism}
                                cost={blog.cost}
                                modelType={blog.modelType}
                            />
                        </div>

                        {/* Author & CTA Section */}
                        <div className="mt-12 p-6 bg-brand-secondary/5 rounded-2xl border border-brand-secondary/10">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-brand-secondary/10 rounded-full text-brand-secondary">
                                    <User size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-brand-dark mb-1">
                                        Auteur: {blog.article?.authors || "Drs. S. S. Mahes"}
                                    </h3>
                                    <p className="text-slate-600 text-sm mb-3">
                                        Medical AI is een platform voor en door medische professionals.
                                    </p>
                                    <div className="text-sm font-medium text-brand-secondary">
                                        <p className="italic mb-2">
                                            "We zijn altijd op zoek naar meer auteurs. Wil jij jouw kennis delen met de community? Neem dan contact met ons op!"
                                        </p>
                                        <Link href="/contact" className="inline-flex items-center gap-1 hover:underline font-bold">
                                            Word auteur &rarr;
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Community Section */}
                        <div className="mt-8 p-8 bg-brand-dark/5 rounded-2xl border border-brand-dark/10 text-center">
                            <h3 className="text-xl font-bold text-brand-dark mb-2">Heb jij ervaring met deze tool?</h3>
                            <p className="text-slate-600 mb-6">Deel jouw inzichten met collega's en help de community.</p>
                            <a
                                href="https://www.linkedin.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0077b5] text-white rounded-xl font-bold hover:bg-[#006396] transition-colors"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                                Deel je ervaring op LinkedIn
                            </a>
                        </div>

                        {/* Citation Tool & Footer */}
                        <div className="mt-16 pt-8 border-t border-slate-100">
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Referentie</h4>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-600 font-mono break-all flex items-center justify-between gap-4">
                                <span>{blog.citation || "Citation not available."}</span>
                                <CopyButton text={blog.citation || ""} />
                            </div>
                            {blog.doi && (
                                <a href={blog.doi} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-brand-secondary hover:underline text-sm font-medium">
                                    Bekijk originele publicatie (DOI) &rarr;
                                </a>
                            )}
                        </div>

                        {/* Disclaimer */}
                        <div className="mt-8 pt-8 border-t border-slate-100 text-xs text-slate-400 italic">
                            <p>
                                <strong>Disclaimer:</strong> Dit artikel is gebaseerd op publiek beschikbare informatie tot {new Date(blog.createdAt).toLocaleDateString("nl-NL", { month: 'long', year: 'numeric' })}. Voor medische besluitvorming dient altijd de meest actuele literatuur en lokale richtlijnen geraadpleegd te worden.
                            </p>
                        </div>
                    </div>

                    {/* Sidebar Column (Desktop Only) */}
                    <div className="hidden lg:block lg:col-span-4">
                        <BlogSidebar
                            developer={blog.developer}
                            demoUrl={blog.demoUrl}
                            vendorUrl={blog.vendorUrl}
                            privacy={blog.privacy}
                            privacyType={blog.privacyType}
                            integration={blog.integration}
                            fdaStatus={blog.fdaStatus}
                            fdaNumber={blog.fdaNumber}
                            ceStatus={blog.ceStatus}
                            specialism={blog.specialism}
                            cost={blog.cost}
                            modelType={blog.modelType}
                        />
                    </div>
                </div>
            </div>

            {/* Spacer to ensure footer separation */}
            <div className="h-40"></div>
        </article >
    );
}
