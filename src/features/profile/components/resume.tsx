import { DownloadIcon, FileTextIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { USER } from "@/features/profile/data/user";

import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

export function Resume() {
  return (
    <Panel id="resume">
      <PanelHeader>
        <PanelTitle>Resume</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <div className="flex flex-col gap-4 rounded-xl border border-edge bg-muted/40 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-edge bg-background text-muted-foreground">
              <FileTextIcon className="size-5" aria-hidden />
            </div>

            <div>
              <h3 className="font-medium">My Resume</h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Download a copy of my latest experience and skills.
              </p>
            </div>
          </div>

          <Button className="w-full sm:w-auto" size="lg" asChild>
            <a
              href={USER.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Ashraful's resume"
            >
              <DownloadIcon />
              Download Resume
            </a>
          </Button>
        </div>
      </PanelContent>
    </Panel>
  );
}
