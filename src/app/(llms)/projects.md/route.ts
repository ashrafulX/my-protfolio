import { PROJECTS } from "@/features/profile/data/projects";

const content = `# Projects

${PROJECTS.map((item) => {
  const links = [
    item.liveLink && `Live URL: ${item.liveLink}`,
    item.githubLink && `GitHub URL: ${item.githubLink}`,
  ]
    .filter(Boolean)
    .join("\n");
  const skills = `\n\nSkills: ${item.skills.join(", ")}`;
  const description = item.description ? `\n\n${item.description.trim()}` : "";
  return `## ${item.title}\n\n${links}${skills}${description}`;
}).join("\n\n")}
`;

export const dynamic = "force-static";

export async function GET() {
  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  });
}
