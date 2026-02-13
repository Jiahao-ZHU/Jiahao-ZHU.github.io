import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import { getAllPostSlugs, getPostBySlug } from "@/lib/mdx";

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let post;
  try {
    post = getPostBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <article>
      <header className="pt-16 pb-8 text-center">
        <p className="text-xs font-semibold tracking-[0.1em] uppercase text-accent mb-3">
          {post.meta.category}
        </p>
        <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight mb-4 max-w-[600px] mx-auto">
          {post.meta.title}
        </h1>
        <p className="text-sm text-text-secondary">
          {new Date(post.meta.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}{" "}
          &middot; {post.meta.readingTime}
        </p>
      </header>

      <div className="pb-16 prose-custom">
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkMath],
              rehypePlugins: [
                rehypeKatex,
                [rehypePrettyCode, { theme: "github-light", keepBackground: false }],
              ],
            },
          }}
        />
      </div>
    </article>
  );
}
