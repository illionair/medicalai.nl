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
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-white border-b border-gray-200 pt-32 pb-16">
                <div className="container mx-auto px-4 max-w-6xl">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-primary transition-colors mb-8 text-sm font-medium"
                    >
                        <ArrowLeft size={16} />
                        Terug naar home
                    </Link>

                    <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
                        {tag ? `Blogs getagd met #${tag}` : "Alle Blogs"}
                    </h1>
                    {tag && (
                        <Link href="/blog" className="text-brand-primary hover:underline text-sm">
                            Wis filter
                        </Link>
                    )}
                </div>
            </div>

            <div className="container mx-auto px-4 max-w-6xl py-12">
                {blogs.length > 0 ? (
                    <BlogGrid blogs={blogs} />
                ) : (
                    <div className="text-center py-20 text-gray-500">
                        Geen blogs gevonden{tag ? ` met de tag "${tag}"` : ""}.
                    </div>
                )}
            </div>
        </div>
    );
}
