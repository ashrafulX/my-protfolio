import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
const responseCache = { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=900" };

async function getPublicProfile(username: string) {
  const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error("GitHub profile is unavailable.");
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
  if (!token) {
    try {
      return NextResponse.json(
        {
          profile: await getPublicProfile(username),
          calendar: null,
          calendarError: "Configure GITHUB_TOKEN to load the real contribution calendar.",
        },
        { headers: responseCache }
      );
    } catch {
      return NextResponse.json({ error: "GitHub profile is temporarily unavailable." }, { status: 502 });
    }
  }

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

    if (!response.ok) {
      const profile = await getPublicProfile(username);
      return NextResponse.json(
        {
          profile,
          calendar: null,
          calendarError: "GitHub contribution data is temporarily unavailable.",
        },
        { headers: responseCache }
      );
    }

    const result = await response.json();
    const user = result.data?.user;
    const errors = result.errors;
    if (!user || errors?.length) {
      const profile = await getPublicProfile(username);
      return NextResponse.json(
        {
          profile,
          calendar: null,
          calendarError: errors?.[0]?.message || "GitHub contribution calendar is unavailable.",
        },
        { headers: responseCache }
      );
    }

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
  } catch {
    return NextResponse.json(
      { error: "GitHub contribution data is temporarily unavailable." },
      { status: 502 }
    );
  }
}
