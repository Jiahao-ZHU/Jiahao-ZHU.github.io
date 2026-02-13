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
  // Add publications here as they become available
  // Example:
  // {
  //   title: "Paper Title",
  //   authors: "Zhu, J., Figner, B., & Chen, Z.",
  //   venue: "Journal Name",
  //   year: 2026,
  //   status: "in-preparation",
  // },
];
