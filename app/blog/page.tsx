import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <section className="py-16">
      <h1 className="font-serif text-3xl font-bold tracking-tight mb-8">
        Notes
      </h1>
      <div>
        {posts.map((post) => (
          <div
            key={post.slug}
            className="flex justify-between items-baseline py-3.5 border-b border-border last:border-b-0"
          >
            <Link
              href={`/blog/${post.slug}`}
              className="text-base text-text hover:text-accent transition-colors"
            >
              {post.title}
            </Link>
            <span className="text-[13px] text-text-secondary flex-shrink-0 ml-6">
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        ))}
        {posts.length === 0 && (
          <p className="text-sm text-text-secondary">No posts yet.</p>
        )}
      </div>
    </section>
  );
}
