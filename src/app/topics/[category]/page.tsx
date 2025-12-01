import { getPublishedBlogsByCategory } from "@/lib/blog";
import BlogGrid from "@/components/BlogGrid";
import TopicHeader from "@/components/TopicHeader";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const topicDescriptions: Record<string, string> = {
    "Predictie": "AI models for risk stratification and outcome forecasting.",
    "Diagnostiek": "Deep learning for medical imaging and early disease detection.",
    "Methodisch": "Best practices for validation, bias mitigation, and implementation.",
    "Ethiek": "Regulatory frameworks, patient privacy, and algorithmic fairness."
};

export default async function TopicPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;

    // Decode URI component just in case (though Next.js usually handles it)
    const decodedCategory = decodeURIComponent(category);

    // Validate category (optional, but good for 404s)
    if (!topicDescriptions[decodedCategory]) {
        // If it's not one of our known topics, we can either 404 or just show a generic header
        // Let's 404 for now to be strict, or allow it if we want flexibility.
        // Given the user's request, strict is probably better.
        // But wait, what if they add a new category in the DB?
        // Let's be flexible.
    }

    const blogs = await getPublishedBlogsByCategory(decodedCategory);
    const description = topicDescriptions[decodedCategory] || "Explore articles in this category.";

    return (
        <div className="container section-padding min-h-screen">
            <TopicHeader
                title={decodedCategory}
                description={description}
                color="bg-blue-500" // The component handles gradients based on title
            />

            <BlogGrid blogs={blogs} />
        </div>
    );
}
