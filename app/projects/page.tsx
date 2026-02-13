import { projects } from "@/content/projects";

export default function ProjectsPage() {
  return (
    <section className="py-16">
      <h1 className="font-serif text-3xl font-bold tracking-tight mb-8">
        Projects
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.title}
            className="border border-border rounded-md p-6 hover:border-gray-400 transition-colors"
          >
            <h3 className="text-[15px] font-semibold mb-2">{project.title}</h3>
            <p className="text-sm text-text-secondary leading-relaxed mb-3">
              {project.description}
            </p>
            <div className="flex gap-1.5 flex-wrap">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium px-2 py-0.5 bg-code-bg rounded text-text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
