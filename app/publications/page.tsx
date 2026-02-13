import { publications } from "@/content/publications";

export default function PublicationsPage() {
  return (
    <section className="py-16">
      <h1 className="font-serif text-3xl font-bold tracking-tight mb-8">
        Publications
      </h1>
      {publications.length === 0 ? (
        <p className="text-text-secondary text-[15px]">
          Publications coming soon. See{" "}
          <a href="/research" className="text-accent underline underline-offset-2">
            Research
          </a>{" "}
          for current projects.
        </p>
      ) : (
        <div className="space-y-6">
          {publications.map((pub) => (
            <article key={pub.title} className="pb-6 border-b border-border">
              <h3 className="font-serif text-lg font-semibold leading-snug mb-1">
                {pub.title}
              </h3>
              <p className="text-sm text-text-secondary mb-1">{pub.authors}</p>
              <p className="text-sm text-text-secondary">
                <em>{pub.venue}</em>, {pub.year}
                {pub.status !== "published" && (
                  <span className="ml-2 text-xs font-medium uppercase tracking-wider">
                    ({pub.status})
                  </span>
                )}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
