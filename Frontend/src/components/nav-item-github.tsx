"use client";

import { cn } from "@/lib/utils";

import { Icons } from "./icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function NavItemGitHub({ profileUrl }: { profileUrl: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener"
          aria-label="GitHub profile"
          className={cn(
            "inline-flex size-8 items-center justify-center rounded-lg text-sm font-medium whitespace-nowrap transition-[background-color] outline-none select-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 hover:bg-accent hover:text-accent-foreground",
            "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
          )}
        >
          <Icons.github />
          <span className="sr-only">GitHub</span>
        </a>
      </TooltipTrigger>

      <TooltipContent>
        <p>GitHub profile</p>
      </TooltipContent>
    </Tooltip>
  );
}
