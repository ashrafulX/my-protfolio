import type { Experience } from "../types/experiences";

// I'm currently a fresher — no professional work experience yet.
// Once I start working, uncomment the block below, fill in the real
// details, and add the entries into the EXPERIENCES array below
// (e.g. `export const EXPERIENCES: Experience[] = [...WORK_EXPERIENCES, educationEntry]`).
//
// const WORK_EXPERIENCES: Experience[] = [
//   {
//     id: "company-slug",
//     companyName: "Company Name",
//     companyLogo: "/images/experience/company-logo.png",
//     positions: [
//       {
//         id: "position-slug",
//         title: "Job Title",
//         employmentPeriod: {
//           start: "MM.YYYY",
//           // end: "MM.YYYY", // omit while the role is ongoing
//         },
//         employmentType: "Full-time",
//         icon: "code",
//         description: `- Key responsibility one.
// - Key responsibility two.
// - Key responsibility three.`,
//         skills: ["Skill 1", "Skill 2", "Skill 3"],
//         isExpanded: true,
//       },
//     ],
//     isCurrentEmployer: true,
//   },
// ];

export const EXPERIENCES: Experience[] = [
  {
    id: "education",
    companyName: "Education",
    positions: [
      {
        id: "northern-university-bangladesh",
        title: "Northern University Bangladesh",
        employmentPeriod: {
          start: "01.2023",
          end: "12.2026",
        },
        icon: "education",
        description: `- Pursuing a Bachelor's degree in Computer Science.
- Coursework spans programming fundamentals, data structures & algorithms, and software development.`,
        skills: [
          "Data Structures & Algorithms",
          "Object-Oriented Programming (OOP)",
          "Web Development",
          "Database Management Systems (DBMS)",
          "Problem Solving",
        ],
      },
    ],
  },
];
