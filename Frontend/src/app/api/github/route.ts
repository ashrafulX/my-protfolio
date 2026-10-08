import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
const responseCache = { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=900" };

const LEVEL_COLORS: Record<number, string> = {
  0: "#ebedf0",
  1: "#9be9a8",
  2: "#40c463",
  3: "#30a14e",
  4: "#216e39",
};

type ContributionApiDay = {
  date: string;
  count: number;
  level: number;
};

async function getPublicProfile(username: string) {
  const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    signal: AbortSignal.timeout(6000),
  });
  if (!response.ok) {
    return {
      login: username,
      name: username,
      bio: null,
      location: null,
      avatarUrl: `https://github.com/${username}.png`,
      url: `https://github.com/${username}`,
      websiteUrl: null,
    };
  }
  const profile = await response.json();
  return {
    login: profile.login,
    name: profile.name,
    bio: profile.bio,
    location: profile.location,
    avatarUrl: profile.avatar_url,
    url: profile.html_url,
    websiteUrl: profile.blog,
  };
}

async function getPublicContributions(username: string) {
  const response = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
    {
      signal: AbortSignal.timeout(8000),
    }
  );
  if (!response.ok) return null;
  const data = (await response.json()) as {
    total?: { lastYear?: number };
    contributions?: ContributionApiDay[];
  };
  if (!data.contributions || !Array.isArray(data.contributions)) return null;

  const weeks: {
    contributionDays: {
      date: string;
      contributionCount: number;
      color: string;
      weekday: number;
    }[];
  }[] = [];
  let currentWeek: {
    date: string;
    contributionCount: number;
    color: string;
    weekday: number;
  }[] = [];

  const monthsMap = new Map<
    string,
    { name: string; year: number; firstDay: string; totalWeeks: number }
  >();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  data.contributions.forEach((day) => {
    const d = new Date(day.date);
    const weekday = d.getUTCDay();

    if (weekday === 0 && currentWeek.length > 0) {
      weeks.push({ contributionDays: currentWeek });
      currentWeek = [];
    }

    currentWeek.push({
      date: day.date,
      contributionCount: day.count,
      color: LEVEL_COLORS[day.level] || LEVEL_COLORS[0],
      weekday,
    });

    const monthKey = `${d.getUTCFullYear()}-${d.getUTCMonth()}`;
    if (!monthsMap.has(monthKey)) {
      monthsMap.set(monthKey, {
        name: monthNames[d.getUTCMonth()],
        year: d.getUTCFullYear(),
        firstDay: day.date,
        totalWeeks: 0,
      });
    }
  });

  if (currentWeek.length > 0) {
    weeks.push({ contributionDays: currentWeek });
  }

  const months: {
    name: string;
    year: number;
    firstDay: string;
    totalWeeks: number;
  }[] = [];
  let currentMonthKey = "";
  let weeksInCurrentMonth = 0;

  weeks.forEach((week) => {
    const firstDayOfWeek = week.contributionDays[0];
    if (firstDayOfWeek) {
      const d = new Date(firstDayOfWeek.date);
      const mKey = `${d.getUTCFullYear()}-${d.getUTCMonth()}`;
      if (mKey !== currentMonthKey) {
        if (currentMonthKey && monthsMap.has(currentMonthKey)) {
          const m = monthsMap.get(currentMonthKey)!;
          m.totalWeeks = weeksInCurrentMonth;
          months.push(m);
        }
        currentMonthKey = mKey;
        weeksInCurrentMonth = 0;
      }
      weeksInCurrentMonth++;
    }
  });

  if (currentMonthKey && monthsMap.has(currentMonthKey)) {
    const m = monthsMap.get(currentMonthKey)!;
    m.totalWeeks = weeksInCurrentMonth;
    months.push(m);
  }

  return {
    totalContributions: data.total?.lastYear ?? 0,
    weeks,
    months,
  };
}

const contributionCalendarQuery = `
  query ContributionCalendar($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      login
      name
      bio
      location
      avatarUrl
      url
      websiteUrl
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
              weekday
            }
          }
          months {
            name
            year
            firstDay
            totalWeeks
          }
        }
      }
    }
  }
`;

export async function GET(request: Request) {
  const username = new URL(request.url).searchParams.get("username")?.trim();
  if (!username || !/^[a-z\d](?:[a-z\d-]{0,37}[a-z\d])?$/i.test(username)) {
    return NextResponse.json({ error: "A valid GitHub username is required." }, { status: 400 });
  }

  const token = process.env.GITHUB_TOKEN;

  if (token) {
    try {
      const to = new Date();
      const from = new Date(to);
      from.setFullYear(from.getFullYear() - 1);

      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        body: JSON.stringify({
          query: contributionCalendarQuery,
          variables: {
            login: username,
            from: from.toISOString(),
            to: to.toISOString(),
          },
        }),
        signal: AbortSignal.timeout(8000),
      });

      if (response.ok) {
        const result = await response.json();
        const user = result.data?.user;
        if (user && !result.errors?.length) {
          return NextResponse.json(
            {
              profile: {
                login: user.login,
                name: user.name,
                bio: user.bio,
                location: user.location,
                avatarUrl: user.avatarUrl,
                url: user.url,
                websiteUrl: user.websiteUrl,
              },
              calendar: user.contributionsCollection.contributionCalendar,
            },
            { headers: responseCache }
          );
        }
      }
    } catch {
      // Fall through to public provider
    }
  }

  try {
    const [profile, calendar] = await Promise.all([
      getPublicProfile(username),
      getPublicContributions(username),
    ]);

    return NextResponse.json(
      {
        profile,
        calendar,
      },
      { headers: responseCache }
    );
  } catch {
    return NextResponse.json(
      { error: "GitHub contribution data is temporarily unavailable." },
      { status: 502 }
    );
  }
}
