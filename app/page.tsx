import Link from "next/link";
import { researchProjects } from "@/content/research";
import { getAllPosts } from "@/lib/mdx";

export default function HomePage() {
  const recentPosts = getAllPosts().slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="pt-16 pb-12 flex gap-10 items-start">
        <img
          src="/images/jiahaozhu.jpg"
          alt="Jiahao Zhu"
          className="w-[140px] h-[140px] rounded-full object-cover object-[center_20%] flex-shrink-3"
        />
        <div>
          <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight mb-2">
            Jiahao Zhu
          </h1>
          <p className="text-base text-text-secondary mb-4">
            Research Master&apos;s Student in Behavioural Science
            <br />
            Radboud University, Nijmegen
          </p>
          <p className="text-[15px] leading-[1.7] mb-5">
            I study how decision-makers adapt to stochastic environments through
            continuous interaction. My work bridges computational cognitive
            modelling, risky decision-making, and dynamic systems&mdash;using
            tools like hierarchical Bayesian statistics, state-space models, and
            particle filters.
          </p>
          <div className="flex gap-5">
            {[
              { label: "Email", href: "mailto:zhujh0528@gmail.com" },
              { label: "GitHub", href: "https://github.com/Jiahao-ZHU" },
              {
                label: "Google Scholar",
                href: "#",
              },
              { label: "CV \u2193", href: "/CV_Jiahao_2026.pdf" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-medium text-text-secondary uppercase tracking-wider hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Research */}
      <section className="py-10 border-t border-border">
        <div className="section-label">Selected Research</div>
        <div className="space-y-7">
          {researchProjects.map((project) => (
            <article key={project.title}>
              <h3 className="font-serif text-lg font-semibold leading-snug mb-1">
                <Link
                  href={project.href}
                  className="text-text hover:text-accent transition-colors"
                >
                  {project.title}
                </Link>
              </h3>
              <p className="text-[13px] text-text-secondary mb-1.5">
                {project.role} &middot; {project.institution} &middot;{" "}
                {project.period}
              </p>
              <p className="text-[15px] leading-relaxed text-text-secondary">
                {project.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Recent Notes */}
      <section className="py-10 border-t border-border">
        <div className="section-label">Recent Notes</div>
        <div>
          {recentPosts.map((post) => (
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
        </div>
      </section>
    </>
  );
}
