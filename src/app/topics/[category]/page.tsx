import { getBlogsForTopic } from "@/lib/blog";
import BlogGrid from "@/components/BlogGrid";
import TopicHeader from "@/components/TopicHeader";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const topicDescriptions: Record<string, string> = {
    "Predictie": "AI models for risk stratification and outcome forecasting.",
    "Diagnostiek": "Deep learning for medical imaging and early disease detection.",
    "Methodisch": "Best practices for validation, bias mitigation, and implementation.",
    "Ethiek": "Regulatory frameworks, patient privacy, and algorithmic fairness.",
    "Prognostiek": "AI models for predicting disease course and treatment outcomes.",
    "AI-wetten": "Understanding the EU AI Act and medical device regulations.",
    "Richtlijnen": "Clinical guidelines and implementation standards for AI.",
};

export default async function TopicPage({ params }: { params: Promise<{ category: string }> }) {
    const { category } = await params;

    // Decode URI component just in case (though Next.js usually handles it)
    const decodedCategory = decodeURIComponent(category);

    // Validate category (optional, but good for 404s)
    // We allow any category now since we search by specialism too.

    const blogs = await getBlogsForTopic(decodedCategory);
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
