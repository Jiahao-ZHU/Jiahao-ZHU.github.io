import Link from "next/link";

const navItems = [
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
];

export function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-bg border-b border-border">
      <div className="max-w-nav mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          href="/"
          className="font-serif text-xl font-semibold text-text tracking-tight"
        >
          Jiahao Zhu
        </Link>
        <ul className="flex gap-7">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-sm text-text-secondary hover:text-text transition-colors"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
