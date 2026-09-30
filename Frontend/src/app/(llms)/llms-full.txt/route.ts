import { SITE_INFO } from "@/config/site";
import { getAllPosts } from "@/features/blog/data/posts";
import { cmsGet, cmsList, type CmsProfile } from "@/lib/cms-api";

export const dynamic = "force-dynamic";

export async function GET() {
  const [profile, about, projects, experiences, achievements, skills, posts] = await Promise.all([
    cmsGet<CmsProfile>("profile/"),
    cmsGet<{ content: string }>("about/"),
    cmsList<{ title: string; liveLink: string; githubLink: string; skills: string[]; description: string }>("projects/?featured=true"),
    cmsList<{ companyName: string; positions: { title: string; employmentPeriod: { start: string; end?: string }; description?: string }[] }>("experience/"),
    cmsList<{ prize: string; title: string; description: string }>("achievements/"),
    cmsList<{ title: string; href: string }>("skills/"),
    getAllPosts(),
  ]);
  const content = `# ${SITE_INFO.name}\n\n## Profile\n\n${profile?.displayName || ""} — ${profile?.jobTitle || ""}\n\n${profile?.address || ""} · ${profile?.email || ""} · ${profile?.website || ""}\n\n## About\n\n${about?.content || ""}\n\n## Projects\n\n${(projects ?? []).map((item) => `### ${item.title}\n\n${item.description}\n\nTechnologies: ${item.skills.join(", ")}\n\nLive: ${item.liveLink}\nGitHub: ${item.githubLink}`).join("\n\n")}\n\n## Experience\n\n${(experiences ?? []).flatMap((item) => item.positions.map((position) => `### ${position.title} | ${item.companyName}\n\n${position.employmentPeriod.start} — ${position.employmentPeriod.end || "Present"}\n\n${position.description || ""}`)).join("\n\n")}\n\n## Achievements\n\n${(achievements ?? []).map((item) => `- ${item.prize}: ${item.title}. ${item.description}`).join("\n")}\n\n## Skills\n\n${(skills ?? []).map((item) => item.title).join(", ")}\n\n## Published Blog Posts\n\n${(posts ?? []).map((item) => `### ${item.metadata.title}\n\n${SITE_INFO.url}/blog/${item.slug}\n\n${item.metadata.description}`).join("\n\n")}\n`;
  return new Response(content, { headers: { "Content-Type": "text/markdown;charset=utf-8" } });
}
