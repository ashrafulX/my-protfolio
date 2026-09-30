import { cmsList } from "@/lib/cms-api";

export async function GET() {
  const awards = await cmsList<{ prize: string; title: string; description: string }>("achievements/");
  const content = `# Awards\n\n${(awards ?? []).map((item) => `## ${item.prize} | ${item.title}\n\n${item.description}`).join("\n\n")}\n`;
  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  });
}
