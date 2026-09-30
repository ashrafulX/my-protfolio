import { DownloadIcon, FileTextIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cmsGet } from "@/lib/cms-api";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

export async function Resume() {
  const resume = await cmsGet<{ title: string; url: string }>("resume/");
  return (
    <Panel id="resume">
      <PanelHeader>
        <PanelTitle>Resume</PanelTitle>
      </PanelHeader>

      <PanelContent>
        {!resume?.url && <p className="mb-4 text-sm text-muted-foreground">Resume unavailable.</p>}
        <div className="flex flex-col gap-4 rounded-xl border border-edge bg-muted/40 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-edge bg-background text-muted-foreground">
              <FileTextIcon className="size-5" aria-hidden />
            </div>

            <div>
              <h3 className="font-medium">{resume?.title ?? "My Resume"}</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Download a copy of my latest experience and skills.
              </p>
            </div>
          </div>

          {resume?.url && <Button className="w-full sm:w-auto" size="lg" asChild>
            <a
              href={resume.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Download ${resume.title}`}
            >
              <DownloadIcon />
              Download Resume
            </a>
          </Button>}
        </div>
      </PanelContent>
    </Panel>
  );
}
