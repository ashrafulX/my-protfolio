import type { CmsProfile } from "@/lib/cms-api";
import { cmsGet } from "@/lib/cms-api";
import { cn } from "@/lib/utils";
import { FlipSentences } from "@/registry/flip-sentences";

import { ProfileAvatar } from "./profile-avatar";
import { VerifiedIcon } from "./verified-icon";

export async function ProfileHeader() {
  const apiProfile = await cmsGet<CmsProfile>("profile/");
  const profile = {
    displayName: apiProfile?.displayName || "Md. Ashraful Islam",
    jobTitle: apiProfile?.jobTitle || "Backend Developer",
    avatar: apiProfile?.avatar || "/images/profile/avatar.jpg",
    flipSentences: apiProfile?.flipSentences?.length
      ? apiProfile.flipSentences
      : [
          apiProfile?.jobTitle || "Backend Developer",
          "Full Stack Web Developer",
          "Competitive Programmer",
          "CSE Undergraduate",
        ],
  };

  return (
    <div className="screen-line-after flex border-x border-edge">
      {profile.avatar && <ProfileAvatar avatar={profile.avatar} displayName={profile.displayName} />}

      <div className="flex flex-1 flex-col">
        <div
          className={cn(
            "flex grow items-end pb-1 pl-4",
            "bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] bg-size-[10px_10px] [--pattern-foreground:var(--color-edge)]/56"
          )}
        >
          <div className="line-clamp-1 font-mono text-xs text-zinc-300 select-none max-sm:hidden dark:text-zinc-800">
            {"text-3xl "}
            <span className="inline dark:hidden">text-zinc-950</span>
            <span className="hidden dark:inline">text-zinc-50</span>
            {" font-medium"}
          </div>
        </div>

        <div className="border-t border-edge">
          <h1 className="flex items-center gap-2 pl-4 font-sans text-[30px] leading-[36px] font-semibold text-foreground">
            <span>{profile.displayName}</span>
            <VerifiedIcon className="size-[0.65em] text-[#0095f6]" aria-label="Verified profile" />
          </h1>

          <div className="h-12 border-t border-edge py-1 pl-4 sm:h-auto">
            <FlipSentences sentences={profile.flipSentences} />
          </div>
        </div>
      </div>
    </div>
  );
}
