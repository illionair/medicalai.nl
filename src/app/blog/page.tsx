import BlogGrid from "@/components/BlogGrid";
import { getPublishedBlogs, getPublishedBlogsByTag } from "@/lib/blog";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BlogArchivePage({ searchParams }: { searchParams: Promise<{ tag?: string }> }) {
    const { tag } = await searchParams;

    const blogs = tag
        ? await getPublishedBlogsByTag(tag)
        : await getPublishedBlogs();

    return (
        <div className="min-h-screen bg-gray-50 pb-12 md:pb-20">
            <div className="bg-white border-b border-gray-200 pt-16 pb-10 md:pt-24 md:pb-16">
                <div className="container mx-auto px-4 max-w-6xl">
                    <Link
                        href="/"
                        className="inline-flex min-h-11 items-center gap-2 text-slate-500 hover:text-brand-primary transition-colors mb-6 md:mb-8 text-sm font-medium"
                    >
                        <ArrowLeft size={16} />
                        Terug naar home
                    </Link>

                    <h1 className="text-[clamp(38px,11vw,56px)] font-bold text-brand-dark mb-4 leading-tight">
                        {tag ? `Artikelen getagd met #${tag}` : "Alle artikelen"}
                    </h1>
                    {tag && (
                        <Link href="/blog" className="text-brand-primary hover:underline text-sm">
                            Wis filter
                        </Link>
                    )}
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-6xl py-8 md:py-12">
                {blogs.length > 0 ? (
                    <BlogGrid blogs={blogs} />
                ) : (
                    <div className="text-center py-20 text-gray-500">
                        Geen artikelen gevonden{tag ? ` met de tag "${tag}"` : ""}.
                    </div>
                )}
            </div>
        </div>
    );
}
