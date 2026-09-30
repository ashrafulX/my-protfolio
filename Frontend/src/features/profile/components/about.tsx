import { Markdown } from "@/components/markdown";
import { Prose } from "@/components/ui/typography";
import { cmsGet } from "@/lib/cms-api";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

export async function About() {
  const about = await cmsGet<{ content: string }>("about/");
  return (
    <Panel id="about">
      <PanelHeader>
        <PanelTitle>About</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <Prose>
          {about?.content ? <Markdown>{about.content}</Markdown> : <p className="text-sm text-muted-foreground">About information unavailable.</p>}
        </Prose>
      </PanelContent>
    </Panel>
  );
}
