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
    console.log("Guidelines Page Fetched Blogs:", blogs.length);
    blogs.forEach(b => console.log(`- ${b.title} (Cat: ${b.guidelineCategory}, Locs: ${b.displayLocations})`));

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
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 relative overflow-hidden">
            {/* Background Pattern for Glassmorphism */}
            <div className="absolute inset-0 z-0 opacity-70 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-primary/20 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-secondary/20 blur-[120px]" />
                <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] rounded-full bg-blue-200/20 blur-[100px]" />
            </div>

            <div className="relative z-10">
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
        </div>
    );
}
