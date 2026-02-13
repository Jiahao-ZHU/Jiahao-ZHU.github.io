import Link from "next/link";
import { researchProjects } from "@/content/research";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-16 pb-12 flex gap-10 items-start">
        <div className="w-[140px] h-[140px] rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex-shrink-0 flex items-center justify-center text-5xl text-gray-500 font-serif">
          J
        </div>
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

      {/* Recent Notes (placeholder until blog is built) */}
      <section className="py-10 border-t border-border">
        <div className="section-label">Recent Notes</div>
        <p className="text-sm text-text-secondary">Coming soon.</p>
      </section>
    </>
  );
}
