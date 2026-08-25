import type { Project } from "../types/projects";

export const PROJECTS: Project[] = [
  {
    id: "dokanly",
    title: "Dokanly — RESTful E-Commerce API Backend",
    period: { start: "09.2026" },
    liveLink: "#",
    githubLink: "https://github.com/ashrafulX/Dokanly",
    skills: ["Django", "Django REST Framework", "React", "PostgreSQL"],
    isExpanded: true,
    description: `In development: an API-first e-commerce backend built with Django REST Framework, Djoser (JWT), and PostgreSQL.
- Built user registration, account activation, and password-reset flows.
- Designed a scalable product catalog, cart system, and order workflow for anonymous and authenticated users.
- Integrated Swagger/OpenAPI documentation with drf-spectacular for interactive API testing and visualization.`,
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=Dokanly",
  },
  {
    id: "vangari-mama",
    title: "Vangari Mama",
    period: { start: "08.2026", end: "08.2026" },
    liveLink: "https://vangari-mama.onrender.com/",
    githubLink: "https://github.com/ashrafulx/vangari-mama",
    skills: ["Django", "PostgreSQL", "Tailwind CSS"],
    description: `A niche recycling marketplace that enables users to sell household scrap to local collectors.
- Developed the Django and PostgreSQL backend for listings, users, and transactions.
- Implemented a bidding system for transparent price negotiation.`,
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=Vangari+Mama",
  },
  {
    id: "skill-match-collaboration",
    title: "Skill Match and Collaboration Platform",
    period: { start: "04.2025", end: "05.2025" },
    liveLink: "https://skill-match-and-collaboration-platform.onrender.com/",
    githubLink: "https://github.com/ashrafulX/skill-match-and-collaboration-platform",
    skills: ["Django", "PostgreSQL", "Tailwind CSS"],
    description: `A skill-based networking platform where users create profiles, post jobs, and apply based on shared expertise.
- Developed the backend with Django class-based views and PostgreSQL for job posts, applications, and categories.
- Implemented authentication, profile management, and a responsive Tailwind CSS interface.`,
    logo: "https://api.dicebear.com/7.x/shapes/svg?seed=Skill+Match",
  },
];
