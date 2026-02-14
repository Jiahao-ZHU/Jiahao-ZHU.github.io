import { researchProjects } from "@/content/research";

export default function ResearchPage() {
  return (
    <section className="py-16">
      <h1 className="font-serif text-3xl font-bold tracking-tight mb-2">
        Research
      </h1>
      <p className="text-text-secondary mb-10">
        My research focuses on understanding how people make decisions under
        uncertainty, using computational models and dynamic systems approaches.
      </p>
      <div className="space-y-10">
        {researchProjects.map((project) => (
          <article
            key={project.title}
            className="pb-10 border-b border-border last:border-b-0"
          >
            <h2 className="font-serif text-xl font-semibold leading-snug mb-1">
              {project.title}
            </h2>
            <p className="text-[13px] text-text-secondary mb-3">
              {project.role} &middot; {project.institution} &middot;{" "}
              {project.period}
            </p>
            <p className="text-[15px] leading-[1.7] text-text-secondary">
              {project.description}
            </p>
            {project.pdf && (
              <a
                href={project.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-[13px] text-accent underline underline-offset-2"
              >
                PDF
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
