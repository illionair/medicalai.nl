import { prisma } from "@/lib/prisma";
import Carousel from "@/components/Carousel";
import GuidelineCard from "@/components/GuidelineCard";
import { motion } from "framer-motion";

export const revalidate = 60; // Revalidate every 60 seconds

async function getGuidelineBlogs() {
    const blogs = await prisma.blogPost.findMany({
        where: {
            published: true,
            displayLocations: {
                has: "Guidelines"
            }
        },
        orderBy: { createdAt: "desc" }
    });
    return blogs;
}

export default async function GuidelinesPage() {
    const blogs = await getGuidelineBlogs();

    const categories = [
        "Klinisch onderzoek en evidence-standaarden",
        "Nederlandse regelgeving",
        "EU regelgeving",
        "Internationale regelgeving"
    ];

    const groupedBlogs = categories.reduce((acc, category) => {
        acc[category] = blogs.filter(blog => blog.guidelineCategory === category);
        return acc;
    }, {} as Record<string, typeof blogs>);

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-slate-50 border-b border-slate-200 pt-32 pb-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">
                        Richtlijnen & Regelgeving
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        Een overzicht van standaarden, wetgeving en ethische kaders voor AI in de zorg.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 space-y-12 pb-64">
                {categories.map((category) => {
                    const categoryBlogs = groupedBlogs[category];
                    if (categoryBlogs.length === 0) return null;

                    return (
                        <section key={category}>
                            <Carousel title={category}>
                                {categoryBlogs.map((blog) => (
                                    <div key={blog.id} className="snap-start shrink-0">
                                        <GuidelineCard
                                            title={blog.title}
                                            summary={blog.summary || ""}
                                            coverImage={blog.coverImage || undefined}
                                            slug={blog.id}
                                            category={blog.category}
                                        />
                                    </div>
                                ))}
                            </Carousel>
                        </section>
                    );
                })}

                {blogs.length === 0 && (
                    <div className="text-center py-20 text-gray-500">
                        Nog geen richtlijnen beschikbaar.
                    </div>
                )}
            </div>
        </div>
    );
}
