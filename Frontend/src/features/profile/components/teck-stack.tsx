import Image from "next/image";
import React from "react";

import { SimpleTooltip } from "@/components/ui/tooltip";
import { cmsList } from "@/lib/cms-api";
import { cn } from "@/lib/utils";

import type { TechStack } from "../types/tech-stack";
import { Panel, PanelContent, PanelHeader, PanelTitle } from "./panel";

export async function TeckStack() {
  const skills = await cmsList<TechStack>("skills/");

  return (
    <Panel id="stack">
      <PanelHeader>
        <PanelTitle>Stack</PanelTitle>
      </PanelHeader>

      <PanelContent
        className={cn(
          "[--pattern-foreground:var(--color-zinc-950)]/5 dark:[--pattern-foreground:var(--color-white)]/5",
          "bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[10px_10px] bg-center",
          "bg-zinc-950/0.75 dark:bg-white/0.75"
        )}
      >
        <ul className="flex flex-wrap gap-4 select-none">
          {skills?.map((tech) => (
            <li key={tech.key} className="flex">
              <SimpleTooltip content={tech.title}>
                <a
                  href={tech.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={tech.title}
                  className="transition-transform hover:scale-110"
                >
                  {tech.iconUrl ? (
                    <Image
                      src={tech.iconUrl}
                      alt={`${tech.title} icon`}
                      width={32}
                      height={32}
                      unoptimized
                      className={cn(
                        "h-8 w-8 object-contain",
                        tech.theme && "dark:invert"
                      )}
                    />
                  ) : (
                    <span className="text-xs font-mono font-medium">{tech.title}</span>
                  )}
                  <span className="sr-only">{tech.title}</span>
                </a>
              </SimpleTooltip>
            </li>
          ))}
        </ul>
        {skills === null && <p className="text-sm text-muted-foreground">Stack information unavailable.</p>}
        {skills?.length === 0 && <p className="text-sm text-muted-foreground">No skills found.</p>}
      </PanelContent>
    </Panel>
  );
}
