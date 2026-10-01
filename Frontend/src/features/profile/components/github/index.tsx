"use client";

import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { Panel } from "../panel";

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
    if (!username) return;

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
      {loading && username ? (
        <div className="flex h-32 items-center justify-center" role="status">
          <LoaderIcon className="animate-spin text-muted-foreground" />
          <span className="sr-only">Loading GitHub contributions</span>
        </div>
      ) : error || !username ? (
        <div className="p-4 text-sm text-muted-foreground" role="status">
          GitHub contributions are currently unavailable.
        </div>
      ) : data ? (
        <div className="p-4">
          {data.calendar ? (
            <ContributionCalendar
              calendar={data.calendar}
              profileUrl={data.profile.url}
            />
          ) : (
            <p className="text-sm text-muted-foreground" role="status">
              GitHub contributions are currently unavailable.
            </p>
          )}
        </div>
      ) : null}
    </Panel>
  );
}

function ContributionCalendar({
  calendar,
  profileUrl,
}: {
  calendar: NonNullable<GitHubData["calendar"]>;
  profileUrl: string;
}) {
  const columns = `repeat(${calendar.weeks.length}, minmax(0, 1fr))`;
  const legendColors = ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"];

  return (
    <div>
      <div
        className="mb-2 grid gap-x-1 text-xs text-muted-foreground sm:text-sm"
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

      <div
        className="grid grid-flow-col grid-rows-7 gap-1"
        style={{ gridTemplateColumns: columns }}
        aria-label="GitHub contribution calendar for the last year"
      >
        {calendar.weeks.flatMap((week) => week.contributionDays).map((day) => (
          <span
            key={day.date}
            className="aspect-square min-w-0 rounded-[1px]"
            style={{ backgroundColor: day.color, gridRow: day.weekday + 1 }}
            title={`${day.date}: ${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"}`}
            aria-label={`${day.date}: ${day.contributionCount} contribution${day.contributionCount === 1 ? "" : "s"}`}
          />
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-sm text-muted-foreground sm:text-base">
        <p>
          {calendar.totalContributions.toLocaleString()} contributions in the last year on{" "}
          <a
            className="underline underline-offset-4 hover:text-foreground"
            href={profileUrl}
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </p>
        <div className="flex items-center gap-1.5" aria-label="Contribution activity: less to more">
          <span>Less</span>
          {legendColors.map((color) => (
            <span
              key={color}
              className="size-3 rounded-[1px] sm:size-3.5"
              style={{ backgroundColor: color }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
