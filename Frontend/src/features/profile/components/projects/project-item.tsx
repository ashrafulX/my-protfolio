import { InfinityIcon, LinkIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

import { Icons } from "@/components/icons";
import { Markdown } from "@/components/markdown";
import {
  CollapsibleChevronsIcon,
  CollapsibleContent,
  CollapsibleTrigger,
  CollapsibleWithContext,
} from "@/components/ui/collapsible";
import { Tag } from "@/components/ui/tag";
import { SimpleTooltip } from "@/components/ui/tooltip";
import { Prose } from "@/components/ui/typography";

import type { Project } from "../../types/projects";

export function ProjectItem({
  className,
  project,
}: {
  className?: string;
  project: Project;
}) {
  const { start, end } = project.period ?? {};
  const isOngoing = !end;

  return (
    <CollapsibleWithContext defaultOpen={project.isExpanded} asChild>
      <div className={className}>
        <div className="flex items-center hover:bg-accent2">
          {project.logo ? (
            <Image
              src={project.logo}
              alt={project.title}
              width={32}
              height={32}
              quality={100}
              className="mx-4 flex size-6 shrink-0 select-none"
              unoptimized
              aria-hidden="true"
            />
          ) : (
            <div
              className="mx-4 flex size-6 shrink-0 items-center justify-center rounded-lg border border-muted-foreground/15 bg-muted text-muted-foreground ring-1 ring-edge ring-offset-1 ring-offset-background select-none"
              aria-hidden="true"
            >
              <Icons.project className="size-4" />
            </div>
          )}

          <div className="flex-1 border-l border-dashed border-edge">
            <div className="flex w-full items-center gap-4 p-4 pr-2">
              <CollapsibleTrigger className="flex min-w-0 flex-1 items-center gap-4 text-left select-none">
                <div className="min-w-0 flex-1">
                  <h3 className="mb-1 leading-snug font-medium text-balance">
                    {project.title}
                  </h3>

                  {start && <dl className="text-sm text-muted-foreground">
                    <dt className="sr-only">Period</dt>
                    <dd className="flex items-center gap-0.5">
                      <span>{start}</span>
                      <span className="font-mono">—</span>
                      {isOngoing ? (
                        <>
                          <InfinityIcon
                            className="size-4.5 translate-y-[0.5px]"
                            aria-hidden
                          />
                          <span className="sr-only">Present</span>
                        </>
                      ) : (
                        <span>{end}</span>
                      )}
                    </dd>
                  </dl>}
                </div>
                <div
                  className="shrink-0 text-muted-foreground [&_svg]:size-4"
                  aria-hidden
                >
                  <CollapsibleChevronsIcon />
                </div>
              </CollapsibleTrigger>

              <div className="flex shrink-0 items-center gap-3 text-sm text-muted-foreground">
                {project.liveLink && (
                  <SimpleTooltip content="Open Live Project">
                    <a
                      className="flex items-center gap-1 hover:text-foreground"
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener"
                    >
                      <span>Live</span>
                      <LinkIcon className="size-3.5" aria-hidden />
                      <span className="sr-only">Open Live Project</span>
                    </a>
                  </SimpleTooltip>
                )}

                {project.githubLink && (
                  <SimpleTooltip content="Open GitHub Repository">
                    <a
                      className="flex items-center gap-1 hover:text-foreground"
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener"
                    >
                      <span>GitHub</span>
                      <Icons.github className="size-3.5" aria-hidden />
                      <span className="sr-only">Open GitHub Repository</span>
                    </a>
                  </SimpleTooltip>
                )}
              </div>
            </div>
          </div>
        </div>

        <CollapsibleContent className="group overflow-hidden duration-300 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div className="border-t border-edge shadow-inner">
            <div className="space-y-4 p-4 duration-300 group-data-[state=closed]:animate-fade-out group-data-[state=open]:animate-fade-in">
              {(project.image || project.description) && (
                <Prose>
                  {project.image && <img className="mb-4 aspect-video w-full rounded-xl border border-edge object-cover" src={project.image} alt={`${project.title} project preview`} />}
                  {project.description && <Markdown>{project.description}</Markdown>}
                </Prose>
              )}

              {project.skills.length > 0 && (
                <ul className="flex flex-wrap gap-1.5">
                  {project.skills.map((skill, index) => (
                    <li key={index} className="flex">
                      <Tag>{skill}</Tag>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </CollapsibleContent>
      </div>
    </CollapsibleWithContext>
  );
}
