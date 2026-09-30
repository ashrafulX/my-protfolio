import { MicroscopeIcon } from "lucide-react";

import { type ApiList,cmsGet } from "@/lib/cms-api";

import type { Research as ResearchEntry } from "../types/research";
import { Panel, PanelHeader, PanelTitle } from "./panel";

export async function Research() {
  const response = await cmsGet<ResearchEntry[] | ApiList<ResearchEntry>>("research/");
  const research = Array.isArray(response) ? response : response?.results ?? null;
  return (
    <Panel id="research">
      <PanelHeader>
        <PanelTitle>
          Research
          <sup className="ml-1 font-mono text-sm font-medium text-muted-foreground select-none">
            ({research?.length ?? 0})
          </sup>
        </PanelTitle>
      </PanelHeader>

      <div className="divide-y divide-dashed divide-edge">
        {research?.map((item) => (
          <div key={item.id} className="flex gap-4 p-4">
            <div
              className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted ring-1 ring-edge ring-offset-1 ring-offset-background"
              aria-hidden
            >
              <MicroscopeIcon className="size-4 text-muted-foreground" />
            </div>

            <div className="flex-1">
              <div className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                <h3 className="leading-snug font-medium text-balance">
                  {item.title}
                </h3>
                <span className="rounded-full border border-edge bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                  {item.status}
                </span>
              </div>

              {item.description && (
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        ))}
        {research === null && <p className="px-4 py-6 text-sm text-muted-foreground">Research information unavailable.</p>}
        {research?.length === 0 && <p className="px-4 py-6 text-sm text-muted-foreground">No research entries.</p>}
      </div>
    </Panel>
  );
}
