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
        <div className="hub-container flex flex-col gap-10 md:gap-16">
            <HubHero />
            <FeaturedBento blogs={featuredBlogs} />
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                <ComingSoonCard />
                <CategoryGrid categories={categories} />
            </section>
        </div>
    );
}
