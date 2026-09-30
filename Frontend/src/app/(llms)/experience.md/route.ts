import { cmsList } from "@/lib/cms-api";

export async function GET() {
  const experiences = await cmsList<{ companyName: string; positions: { title: string; employmentPeriod: { start: string; end?: string }; description?: string }[] }>("experience/");
  const content = `# Experience\n\n${(experiences ?? []).flatMap((item) => item.positions.map((position) => `## ${position.title} | ${item.companyName}\n\nDuration: ${position.employmentPeriod.start} — ${position.employmentPeriod.end || "Present"}\n\n${position.description?.trim() || ""}`)).join("\n\n")}\n`;
  return new Response(content, {
    headers: {
      "Content-Type": "text/markdown;charset=utf-8",
    },
  });
}
