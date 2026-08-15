import type { Project } from "../types/projects";

export const PROJECTS: Project[] = [
  {
    id: "vangari-mama",
    title: "Vangari-Mama",
    period: { start: "07.2026" },
    // TODO: update with the real repository/deployment URL
    link: "#",
    skills: ["Django", "Python", "PostgreSQL"],
    isExpanded: true,
    description: `A Django-based scrap marketplace platform connecting sellers and buyers of scrap materials.
- Built with Django and PostgreSQL
- Apps: users, listings, bids, orders, reviews
- Actively in development — more details coming soon`,
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=Vangari+Mama",
  },
  {
    id: "project-placeholder",
    title: "Untitled Project",
    period: { start: "01.2026" },
    // TODO: replace this whole entry with your next project
    link: "#",
    skills: ["TBD"],
    description: `Details coming soon — I'll update this project once it's ready to share.`,
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=Untitled+Project",
  },
];
