export interface Project {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    title: "Particle Filter Toolbox",
    description:
      "A Python package for applying Sequential Monte Carlo methods to cognitive models. Supports Auxiliary Particle Filters and parameter estimation.",
    tags: ["Python", "NumPy", "Bayesian"],
    github: "#",
  },
  {
    title: "Joystick AAT Engine",
    description:
      "PsychoPy-based continuous Approach-Avoidance Task with real-time visual feedback and millisecond-precision trajectory recording.",
    tags: ["PsychoPy", "Python"],
    github: "#",
  },
  {
    title: "Emotion Network Analyzer",
    description:
      "NLP pipeline for constructing emotional co-expression networks from large text corpora, with network topology metrics extraction.",
    tags: ["NLP", "Python", "NetworkX"],
    github: "#",
  },
];
