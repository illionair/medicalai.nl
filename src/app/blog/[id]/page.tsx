import { getBlogPost } from "@/app/actions";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import TrustBadge from "@/components/TrustBadge";
import BlogSidebar from "@/components/BlogSidebar";
import EvidenceBox from "@/components/EvidenceBox";

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
        <article className="min-h-screen bg-white pb-20">
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

                    {/* Trust Badges */}
                    <div className="flex flex-wrap gap-3 mb-6">
                        {blog.specialism && <TrustBadge type="specialism" label="Specialisme" value={blog.specialism} />}
                        {blog.ceStatus && <TrustBadge type="status" label="Status" value={blog.ceStatus} />}
                        {blog.cost && <TrustBadge type="cost" label="Kosten" value={blog.cost} />}
                        {blog.modelType && <TrustBadge type="model" label="Model" value={blog.modelType} />}
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-brand-dark mb-6">
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
                    </div>
                </div>
            </div>

            {/* Main Content Layout */}
            <div className="container mx-auto px-4 max-w-6xl py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Content Column */}
                    <div className="lg:col-span-8">
                        <div className="prose prose-lg prose-slate max-w-none 
                            prose-headings:font-bold prose-headings:text-brand-dark 
                            prose-a:text-brand-secondary hover:prose-a:text-brand-primary 
                            prose-img:rounded-2xl prose-img:shadow-md
                            prose-strong:text-brand-dark">
                            <ReactMarkdown
                                rehypePlugins={[rehypeRaw]}
                                components={{
                                    // Custom component mapping for EvidenceBox if we used a custom syntax, 
                                    // but for now we assume standard markdown or HTML injection.
                                    // We can also inject EvidenceBox manually in the content string if needed.
                                }}
                            >
                                {blog.content}
                            </ReactMarkdown>
                        </div>

                        {/* Citation Tool & Footer */}
                        <div className="mt-16 pt-8 border-t border-slate-100">
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Referentie</h4>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-600 font-mono break-all">
                                {blog.citation || "Citation not available."}
                            </div>
                            {blog.doi && (
                                <a href={blog.doi} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-brand-secondary hover:underline text-sm font-medium">
                                    Bekijk originele publicatie (DOI) &rarr;
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Sidebar Column */}
                    <div className="lg:col-span-4">
                        <BlogSidebar
                            developer={blog.developer}
                            demoUrl={blog.demoUrl}
                            privacy={blog.privacy}
                            integration={blog.integration}
                        />
                    </div>
                </div>
            </div>
        </article>
    );
}
