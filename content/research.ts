export interface ResearchProject {
  title: string;
  href: string;
  role: string;
  institution: string;
  period: string;
  description: string;
  pdf?: string;
}

export const researchProjects: ResearchProject[] = [
  {
    title: "Dynamic Modelling of Latent Risk-Taking using Particle Filters",
    href: "/research#particle-filters",
    role: "Master's Thesis",
    institution: "Radboud University",
    period: "2025 – present",
    description:
      "Challenging the assumption of risk-taking as a static trait. Developed a computational pipeline using Auxiliary Particle Filters to recover individual trial-by-trial trajectories of latent risk sensitivity.",
  },
  {
    title: "Automatic and Motivational Avoidance in Academic Worry",
    href: "/research#avoidance",
    role: "Research Project Co-Lead",
    institution: "Radboud University",
    period: "2024 – 2025",
    description:
      "Engineered a continuous joystick-based Approach-Avoidance Task in PsychoPy with millisecond precision to investigate cognitive mechanisms underlying academic anxiety.",
  },
  {
    title: "Emotion Labeling Through the Lens of Predictive Coding",
    href: "/research#emotion-labeling",
    role: "Position Paper (Course Project)",
    institution: "Radboud University",
    period: "2024",
    description:
      "Proposed a predictive coding account to reconcile conflicting evidence on whether naming emotions dampens or intensifies them. Argued that prediction uncertainty is the key mechanism, modulated by label-experience intensity mismatch and labeling freedom.",
    pdf: "/assets/research/emotion-labeling-predictive-coding-2024.pdf",
  },
  {
    title: "Emotional Co-Expressions: A Network Perspective",
    href: "/research#emotion-network",
    role: "Research Project Lead",
    institution: "Sun Yat-sen University",
    period: "2022 – 2024",
    description:
      "Applied NLP to extract sentiment from 53,000+ crowdfunding texts. Constructed a novel Emotional Co-expression Network framework to quantify structural properties of emotional information.",
  },
];
