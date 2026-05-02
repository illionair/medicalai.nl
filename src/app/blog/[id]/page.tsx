import { getBlogPost } from "@/app/actions";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BriefcaseBusiness, Calendar, ExternalLink, Stethoscope, User, Users } from "lucide-react";
import TrustBadge from "@/components/TrustBadge";
import BlogSidebar from "@/components/BlogSidebar";
import EvidenceBox from "@/components/EvidenceBox";
import CopyButton from "@/components/CopyButton";
import ArticleEngagement from "@/components/ArticleEngagement";
import { getCurrentUser } from "@/lib/user-auth";

export const dynamic = "force-dynamic";

function doiHref(doi?: string | null) {
    if (!doi) return null;
    if (doi.startsWith("http://") || doi.startsWith("https://")) return doi;
    return `https://doi.org/${doi.replace(/^doi:/i, "").trim()}`;
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const blog = await getBlogPost(id);
    const currentUser = await getCurrentUser();

    if (!blog) {
        notFound();
    }

    const likedByCurrentUser = currentUser ? blog.likes.some((like) => like.userId === currentUser.id) : false;
    const canonicalUrl = `${(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "")}/blog/${blog.id}`;
    const originalPublicationUrl = doiHref(blog.doi);
    const trustBadges = [
        blog.specialism ? <TrustBadge key="specialism" type="specialism" label="Specialisme" value={blog.specialism} href={`/topics/${blog.specialism}`} /> : null,
        blog.ceStatus ? <TrustBadge key="ce" type="status" label="CE-status" value={blog.ceStatus} /> : null,
        blog.fdaStatus ? <TrustBadge key="fda" type="status" label="FDA" value={blog.fdaStatus} /> : null,
        blog.cost ? <TrustBadge key="cost" type="cost" label="Kosten" value={blog.cost} /> : null,
    ].filter(Boolean);

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

                    <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4 leading-tight">
                        {blog.title}
                    </h1>
                    {blog.subtitle && (
                        <p className="text-xl md:text-2xl text-slate-500 mb-6 font-light leading-relaxed">
                            {blog.subtitle}
                        </p>
                    )}

                    {trustBadges.length > 0 && (
                        <div className="mb-6 flex flex-wrap gap-2">
                            {trustBadges}
                        </div>
                    )}

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

                        <div className="mb-8 grid gap-4 md:grid-cols-2">
                            <section className="rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
                                <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-blue-800">
                                    <Stethoscope size={18} />
                                    Clinical Utility
                                </div>
                                <p className="text-sm leading-relaxed text-slate-700">
                                    Focus voor de kliniek: {blog.specialism || blog.category}. Gebruik dit artikel als snelle scan van bruikbaarheid, validatie en workflow-impact.
                                </p>
                            </section>
                            <section className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-800">
                                    <BriefcaseBusiness size={18} />
                                    Manager Check
                                </div>
                                <p className="text-sm leading-relaxed text-slate-700">
                                    Implementatie: {blog.integration || "nog niet gespecificeerd"}. Kostenindicatie: {blog.cost || "nog niet gespecificeerd"}.
                                </p>
                            </section>
                        </div>

                        {(blog.ceStatus || blog.fdaStatus || blog.modelType || blog.privacyType) && (
                            <EvidenceBox title="Evidence Check" type="neutral">
                                <div className="mb-4 flex flex-wrap gap-2">
                                    {blog.ceStatus && <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-emerald-700">CE: {blog.ceStatus}</span>}
                                    {blog.fdaStatus && <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-emerald-700">FDA: {blog.fdaStatus}</span>}
                                    {blog.modelType && <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-700">Model: {blog.modelType}</span>}
                                    {blog.privacyType && <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-700">Privacy: {blog.privacyType}</span>}
                                </div>
                                <p>
                                    Deze signalen vatten de beschikbare trust-indicatoren samen. Controleer altijd de primaire studie, CE/FDA-registratie en lokale implementatie-eisen voordat dit in besluitvorming wordt gebruikt.
                                </p>
                            </EvidenceBox>
                        )}

                        <div className="typography-theme max-w-none">
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
                                privacyType={blog.privacyType}
                                integration={blog.integration}
                                fdaStatus={blog.fdaStatus}
                                fdaNumber={blog.fdaNumber}
                                ceStatus={blog.ceStatus}
                                specialism={blog.specialism}
                                cost={blog.cost}
                                modelType={blog.modelType}
                                title={blog.title}
                                currentUrl={canonicalUrl}
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
                                            We zijn altijd op zoek naar meer auteurs. Wil jij jouw kennis delen met de community? Neem dan contact met ons op.
                                        </p>
                                        <Link href="/contact" className="inline-flex items-center gap-1 hover:underline font-bold">
                                            Word auteur &rarr;
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ArticleEngagement
                            blogPostId={blog.id}
                            currentUser={currentUser}
                            likedByCurrentUser={likedByCurrentUser}
                            likeCount={blog.likes.length}
                            comments={blog.comments}
                        />

                        <section className="mt-12 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                            <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-800">
                                <Users size={18} />
                                Wat vinden collega&apos;s?
                            </div>
                            <p className="mb-4 text-sm leading-relaxed text-slate-600">
                                Deel deze analyse met je netwerk of gebruik de reacties hieronder om klinische ervaringen en implementatievragen te verzamelen.
                            </p>
                            <a
                                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(canonicalUrl)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-xl bg-brand-secondary px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-primary"
                            >
                                <ExternalLink size={16} />
                                Deel op LinkedIn
                            </a>
                        </section>

                        {/* Citation Tool & Footer */}
                        <div className="mt-16 pt-8 border-t border-slate-100">
                            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4">Referentie</h4>
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-600 font-mono break-all flex items-center justify-between gap-4">
                                <span>{blog.citation || "Citation not available."}</span>
                                <CopyButton text={blog.citation || ""} />
                            </div>
                            {originalPublicationUrl && (
                                <a href={originalPublicationUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 text-brand-secondary hover:underline text-sm font-medium">
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
                            privacyType={blog.privacyType}
                            integration={blog.integration}
                            fdaStatus={blog.fdaStatus}
                            fdaNumber={blog.fdaNumber}
                            ceStatus={blog.ceStatus}
                            specialism={blog.specialism}
                            cost={blog.cost}
                            modelType={blog.modelType}
                            title={blog.title}
                            currentUrl={canonicalUrl}
                        />
                    </div>
                </div>
            </div>

            {/* Spacer to ensure footer separation */}
            <div className="h-40"></div>
        </article >
    );
}
