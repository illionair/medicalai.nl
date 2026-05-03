import HubHero from "@/components/hub/HubHero";
import FeaturedBento from "@/components/hub/FeaturedBento";
import ComingSoonCard from "@/components/hub/ComingSoonCard";
import CategoryGrid from "@/components/hub/CategoryGrid";
import { getCategoryCounts, getPublishedBlogs } from "@/lib/blog";

export const revalidate = 60;

export default async function Home() {
    const [blogs, categories] = await Promise.all([
        getPublishedBlogs(),
        getCategoryCounts(),
    ]);
    const featuredBlogs = blogs
        .filter((blog) => !blog.isGuideline)
        .slice(0, 3)
        .map((blog) => ({
            id: blog.id,
            title: blog.title,
            subtitle: blog.subtitle,
            summary: blog.summary,
            category: blog.category,
            imageUrl: blog.imageUrl,
            coverImage: blog.coverImage,
            createdAt: blog.createdAt.toISOString(),
            source: blog.source,
            developer: blog.developer,
        }));

    return (
        <div className="min-h-screen bg-white pt-28 pb-40">
            <div className="hub-container flex flex-col gap-12">
                <HubHero />

                <FeaturedBento blogs={featuredBlogs} />

                <div className="grid gap-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
                    <ComingSoonCard />
                    <CategoryGrid categories={categories} />
                </div>
            </div>
        </div>
    );
}
