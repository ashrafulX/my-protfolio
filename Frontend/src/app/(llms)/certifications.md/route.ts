import { cmsList } from "@/lib/cms-api";

export async function GET() {
  const certifications = await cmsList<{ title: string; credentialURL: string }>("certifications/");
  const content = `# Certifications\n\n${(certifications ?? []).map((item) => `- [${item.title}](${item.credentialURL})`).join("\n")}\n`;
  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  });
}
