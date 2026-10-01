import { cmsGet, type CmsProfile } from "@/lib/cms-api";
import { cn } from "@/lib/utils";
import { FlipSentences } from "@/registry/flip-sentences";


export async function ProfileHeader() {
  const profile = await cmsGet<CmsProfile>("profile/");
  if (!profile) return <div className="border-x border-edge px-4 py-8 text-sm text-muted-foreground">Profile unavailable.</div>;
  return (
    <div className="screen-line-after flex border-x border-edge">
      {profile.avatar && (
        <div className="shrink-0 border-r border-edge">
          <div className="mx-[0.5px] my-[3px] size-32 overflow-hidden rounded-full ring-1 ring-border ring-offset-2 ring-offset-background sm:size-40">
            <img
              className="size-32 scale-110 rounded-full object-cover object-center select-none sm:size-40"
              alt={`${profile.displayName}'s avatar`}
              src={profile.avatar}
              fetchPriority="high"
              onError={(event) => event.currentTarget.parentElement?.parentElement?.classList.add("hidden")}
            />
          </div>
        </div>
      )}

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
          <h1 className="flex items-center pl-4 text-3xl font-semibold">
            {profile.displayName}
          </h1>

          <div className="h-12 border-t border-edge py-1 pl-4 sm:h-auto">
            <FlipSentences sentences={[profile.jobTitle]} />
          </div>
        </div>
      </div>
    </div>
  );
}
