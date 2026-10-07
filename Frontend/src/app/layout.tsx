import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";
import type { WebSite, WithContext } from "schema-dts";

import { Providers } from "@/components/providers";
import { META_THEME_COLORS, SITE_INFO } from "@/config/site";
import type { CmsProfile } from "@/lib/cms-api";
import { cmsGet } from "@/lib/cms-api";
import { fontMono, fontSans } from "@/lib/fonts";

function getWebSiteJsonLd(profile: CmsProfile | null): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: profile?.displayName || SITE_INFO.name,
    url: SITE_INFO.url,
    alternateName: profile?.username ? [profile.username] : undefined,
  };
}

const darkModeScript = String.raw`
  try {
    if (localStorage.theme === 'dark' || (localStorage.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
    }
  } catch (_) {}

  try {
    if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
      document.documentElement.classList.add('os-macos')
    }
  } catch (_) {}
`;

export async function generateMetadata(): Promise<Metadata> {
  const profile = await cmsGet<CmsProfile>("profile/");
  const displayName = profile?.displayName || SITE_INFO.name;
  const nameParts = displayName.split(" ");
  const image = profile?.avatar || "/images/profile/avatar.jpg";

  return {
    metadataBase: new URL(SITE_INFO.url),
    alternates: { canonical: "/" },
    title: { template: `%s — ${displayName}`, default: displayName },
    description: profile?.hero_description || SITE_INFO.description,
    keywords: profile?.seo_keywords,
    authors: profile ? [{ name: displayName, url: SITE_INFO.url }] : undefined,
    creator: profile?.displayName,
    openGraph: {
      siteName: displayName,
      url: "/",
      type: "profile",
      firstName: nameParts[0],
      lastName: nameParts.slice(1).join(" "),
      username: profile?.username,
      images: [{ url: image, width: 1200, height: 630, alt: displayName }],
    },
    twitter: { card: "summary_large_image", images: [image] },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/images/brand/favicon.ico", sizes: "any" },
        { url: "/images/favicon.svg", type: "image/svg+xml" },
        { url: "/images/brand/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
      ],
      apple: { url: "/images/brand/apple-touch-icon.png", type: "image/png", sizes: "180x180" },
      shortcut: "/favicon.ico",
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: META_THEME_COLORS.light,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const profile = await cmsGet<CmsProfile>("profile/");

  return (
    <html lang="en" className={`${fontSans.variable} ${fontMono.variable}`} suppressHydrationWarning>
      <head>
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: darkModeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebSiteJsonLd(profile)).replace(/</g, "\\u003c") }}
        />
      </head>

      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
