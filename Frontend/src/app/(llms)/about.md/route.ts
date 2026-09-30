import { cmsGet, cmsList, type CmsProfile } from "@/lib/cms-api";

export async function GET() {
  const [about, profile, socialLinks, skills] = await Promise.all([
    cmsGet<{ content: string }>("about/"),
    cmsGet<CmsProfile>("profile/"),
    cmsList<{ title: string; href: string }>("social-links/"),
    cmsList<{ title: string; href: string }>("skills/"),
  ]);
  const content = `# About\n\n${about?.content || ""}\n\n## Personal Information\n\n- Name: ${profile?.displayName || ""}\n- Location: ${profile?.address || ""}\n- Website: ${profile?.website || ""}\n\n## Social Links\n\n${(socialLinks ?? []).map((item) => `- [${item.title}](${item.href})`).join("\n")}\n\n## Tech Stack\n\n${(skills ?? []).map((item) => `- [${item.title}](${item.href})`).join("\n")}\n`;
  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  });
}
