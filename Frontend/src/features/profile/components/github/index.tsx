"use client";

import { ExternalLinkIcon, LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Panel, PanelHeader, PanelTitle } from "../panel";

type ContributionDay = {
  date: string;
  contributionCount: number;
  color: string;
  weekday: number;
};

type ContributionWeek = { contributionDays: ContributionDay[] };

type ContributionMonth = {
  name: string;
  firstDay: string;
  totalWeeks: number;
};

type GitHubData = {
  profile: {
    login: string;
    name: string | null;
    bio: string | null;
    location: string | null;
    avatarUrl: string;
    url: string;
    websiteUrl: string | null;
  };
  calendar: {
    totalContributions: number;
    weeks: ContributionWeek[];
    months: ContributionMonth[];
  } | null;
  calendarError?: string;
};

export function GitHubIntegration({ username }: { username: string }) {
  const [data, setData] = useState<GitHubData | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) {
      setError(true);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    fetch(`/api/github?username=${encodeURIComponent(username)}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("GitHub is unavailable");
        return response.json() as Promise<GitHubData>;
      })
      .then(setData)
      .catch((cause: unknown) => {
        if (cause instanceof Error && cause.name === "AbortError") return;
        setError(true);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [username]);

  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>GitHub</PanelTitle>
      </PanelHeader>

      {loading ? (
        <div className="flex h-40 items-center justify-center" role="status">
          <LoaderIcon className="animate-spin text-muted-foreground" />
          <span className="sr-only">Loading GitHub profile and contributions</span>
        </div>
      ) : error ? (
        <div className="p-4 text-sm text-muted-foreground" role="status">
          The real GitHub profile or contribution calendar is unavailable. Check the portfolio profile API and server&apos;s <code>GITHUB_TOKEN</code> configuration.
        </div>
      ) : data ? (
        <div>
          <div className="flex items-center gap-3 border-b border-edge p-4">
            <img
              className="size-12 rounded-full border border-edge"
              src={data.profile.avatarUrl}
              alt={`${data.profile.login} avatar`}
              width={48}
              height={48}
            />
            <div className="min-w-0 flex-1">
              <a
                className="font-medium hover:underline"
                href={data.profile.url}
                target="_blank"
                rel="noreferrer"
              >
                {data.profile.name || data.profile.login}
              </a>
              <p className="text-sm text-muted-foreground">
                @{data.profile.login}
              </p>
            </div>
            <a
              className="inline-flex shrink-0 items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              href={data.profile.url}
              target="_blank"
              rel="noreferrer"
            >
              Profile <ExternalLinkIcon className="size-3.5" />
            </a>
          </div>

          {(data.profile.bio || data.profile.location || data.profile.websiteUrl) && (
            <div className="space-y-1 border-b border-edge px-4 py-3 text-sm">
              {data.profile.bio && <p>{data.profile.bio}</p>}
              {data.profile.location && (
                <p className="text-muted-foreground">{data.profile.location}</p>
              )}
              {data.profile.websiteUrl && (
                <a
                  className="text-muted-foreground hover:text-foreground hover:underline"
                  href={data.profile.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {data.profile.websiteUrl}
                </a>
              )}
            </div>
          )}

          {data.calendar ? (
            <ContributionCalendar calendar={data.calendar} username={data.profile.login} />
          ) : (
            <p className="border-t border-edge p-4 text-sm text-muted-foreground" role="status">
              The real contribution calendar is unavailable. {data.calendarError}
            </p>
          )}
        </div>
      ) : null}
    </Panel>
  );
}

function ContributionCalendar({
  calendar,
  username,
}: {
  calendar: NonNullable<GitHubData["calendar"]>;
  username: string;
}) {
  const columns = `repeat(${calendar.weeks.length}, 11px)`;

  return (
    <div className="p-4">
      <p className="mb-3 text-sm text-muted-foreground">
        {calendar.totalContributions.toLocaleString()} contributions in the last
        year on GitHub
      </p>

      <div className="overflow-x-auto pb-2">
        <div className="w-max">
          <div
            className="mb-2 grid gap-x-[3px] text-xs text-muted-foreground"
            style={{ gridTemplateColumns: columns }}
            aria-hidden="true"
          >
            {calendar.months.map((month) => {
              const weekIndex = calendar.weeks.findIndex((week) =>
                week.contributionDays.some((day) => day.date === month.firstDay)
              );
              return (
                <span
                  key={`${month.name}-${month.firstDay}`}
                  className="whitespace-nowrap"
                  style={{ gridColumn: `${weekIndex + 1} / span ${month.totalWeeks}` }}
                >
                  {month.name}
                </span>
              );
            })}
          </div>

          <div className="flex gap-2">
            <div className="grid grid-rows-7 gap-[3px] pt-px text-[9px] leading-[11px] text-muted-foreground" aria-hidden="true">
              <span />
              <span>Mon</span>
              <span />
              <span>Wed</span>
              <span />
              <span>Fri</span>
              <span />
            </div>

            <div
              className="grid grid-flow-col grid-rows-7 gap-[3px]"
              style={{ gridTemplateColumns: columns }}
              aria-label="GitHub contribution calendar for the last year"
            >
              {calendar.weeks.flatMap((week) => week.contributionDays).map((day) => (
                <span
                  key={day.date}
                  className="size-[11px] rounded-[2px] ring-1 ring-black/5 ring-inset dark:ring-white/10"
                  style={{ backgroundColor: day.color, gridRow: day.weekday + 1 }}
                  title={`${day.date}: ${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"}`}
                  aria-label={`${day.date}: ${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="mt-2 text-xs text-muted-foreground">
        Contribution days and colors are provided by GitHub for @{username}.
      </p>
    </div>
  );
}
