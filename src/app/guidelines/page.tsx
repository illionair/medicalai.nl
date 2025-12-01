import { prisma } from "@/lib/prisma";
import BlogGrid from "@/components/BlogGrid";

export const dynamic = "force-dynamic";

export default async function GuidelinesPage() {
    const guidelines = await prisma.blogPost.findMany({
        where: {
            published: true,
            isGuideline: true
        },
        orderBy: { createdAt: "desc" },
        include: { article: true },
    });

    return (
        <div className="container section-padding min-h-screen">
            <div className="max-w-3xl mx-auto mb-12 text-center">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Guidelines</h1>
                <p className="text-gray-500 text-lg">
                    Official guidelines, frameworks, and consensus statements on medical AI.
                </p>
            </div>

            {guidelines.length > 0 ? (
                <BlogGrid initialPosts={guidelines} />
            ) : (
                <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
                    <p className="text-gray-500">No guidelines published yet.</p>
                </div>
            )}
        </div>
    );
}
