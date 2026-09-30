import { cmsList } from "@/lib/cms-api";

export async function GET() {
  const projects = await cmsList<{ title: string; liveLink: string; githubLink: string; skills: string[]; description: string }>("projects/?featured=true");
  const content = `# Projects\n\n${(projects ?? []).map((item) => `## ${item.title}\n\nLive URL: ${item.liveLink}\nGitHub URL: ${item.githubLink}\n\nSkills: ${item.skills.join(", ")}\n\n${item.description}`).join("\n\n")}\n`;
  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  });
}
