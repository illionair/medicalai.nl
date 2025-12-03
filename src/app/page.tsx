import Hero from "@/components/Hero";
import BlogGrid from "@/components/BlogGrid";
import { getPublishedBlogs } from "@/lib/blog";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const blogs = await getPublishedBlogs();

  return (
    <div>
      <Hero />
      <BlogGrid blogs={blogs} />
    </div>
  );
}
