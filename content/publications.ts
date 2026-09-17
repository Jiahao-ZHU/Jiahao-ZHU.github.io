export interface Publication {
  title: string;
  authors: string;
  venue: string;
  year: number;
  status: "published" | "in-preparation" | "under-review";
  doi?: string;
  pdf?: string;
}

export const publications: Publication[] = [
  {
    title: "Between-session chasing via time of return in online eCasino gambling",
    authors: "Banerjee, N., Noël, X., Zhu, J., & Chen, Z.",
    venue: "Journal of Behavioral Addictions",
    year: 2026,
    status: "published",
    doi: "https://doi.org/10.1556/2006.2025.00454",
  },
];
