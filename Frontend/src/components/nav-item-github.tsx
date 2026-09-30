import { Button } from "@/components/ui/button";

import { Icons } from "./icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function NavItemGitHub({ profileUrl }: { profileUrl: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" asChild>
          <a href={profileUrl} target="_blank" rel="noopener">
            <Icons.github />
            <span className="sr-only">GitHub</span>
          </a>
        </Button>
      </TooltipTrigger>

      <TooltipContent>
        <p>GitHub profile</p>
      </TooltipContent>
    </Tooltip>
  );
}
