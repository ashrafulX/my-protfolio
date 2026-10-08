import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";
import type { Person, WebSite, WithContext } from "schema-dts";

import { Providers } from "@/components/providers";
import { META_THEME_COLORS, SITE_INFO } from "@/config/site";
import type { CmsProfile } from "@/lib/cms-api";
import { cmsGet } from "@/lib/cms-api";
import { fontMono, fontSans } from "@/lib/fonts";

function getWebSiteJsonLd(profile: CmsProfile | null): WithContext<WebSite> {
  const baseUrl = SITE_INFO.url.replace(/\/+$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: profile?.displayName || SITE_INFO.shortName,
    url: baseUrl,
    alternateName: profile?.username ? [profile.username] : undefined,
  };
}

function getPersonJsonLd(profile: CmsProfile | null): WithContext<Person> {
  const baseUrl = SITE_INFO.url.replace(/\/+$/, "");
  const displayName = profile?.displayName || "Md. Ashraful Islam";
  const image = profile?.avatar
    ? (profile.avatar.startsWith("http") ? profile.avatar : `${baseUrl}${profile.avatar}`)
    : `${baseUrl}/images/profile/avatar.jpg`;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: displayName,
    alternateName: ["ashrafulX", "Ashraful Islam"],
    url: baseUrl,
    image,
    jobTitle: profile?.jobTitle || "Backend Developer & Software Engineer",
    worksFor: {
      "@type": "Organization",
      name: "SoftZen IT",
      url: "https://softzenit.com",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Northern University Bangladesh",
      url: "https://nub.ac.bd",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressCountry: "Bangladesh",
    },
    email: profile?.email ? `mailto:${profile.email}` : "mailto:ashrafulwho@gmail.com",
    sameAs: [
      "https://github.com/ashrafulx",
      "https://linkedin.com/in/ashrafulx",
      "https://codeforces.com/profile/iashraf",
      "https://leetcode.com/u/ashrafulx/",
    ],
    knowsAbout: [
      "Backend Development",
      "Software Engineering",
      "Python",
      "Django",
      "Django REST Framework",
      "PostgreSQL",
      "React",
      "Next.js",
      "Algorithms",
      "Data Structures",
      "Competitive Programming",
    ],
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
  const displayName = profile?.displayName || "Md. Ashraful Islam";
  const title = `${displayName} — Backend Developer & Software Engineer`;
  const description =
    profile?.hero_description ||
    SITE_INFO.description;
  const baseUrl = SITE_INFO.url.replace(/\/+$/, "");
  const image = profile?.avatar
    ? (profile.avatar.startsWith("http") ? profile.avatar : `${baseUrl}${profile.avatar}`)
    : `${baseUrl}/images/profile/avatar.jpg`;

  const keywords = Array.from(
    new Set([
      ...(profile?.seo_keywords || []),
      ...SITE_INFO.keywords,
    ])
  );

  return {
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: "/",
    },
    title: {
      template: `%s — ${displayName}`,
      default: title,
    },
    description,
    keywords,
    authors: [{ name: displayName, url: baseUrl }],
    creator: displayName,
    publisher: displayName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      siteName: displayName,
      title,
      description,
      url: baseUrl,
      type: "profile",
      locale: "en_US",
      firstName: "Md. Ashraful",
      lastName: "Islam",
      username: profile?.username || "ashrafulx",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${displayName} — Backend Developer Portfolio`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@ashrafulx",
      images: [image],
    },
    verification: {
      google: [
        process.env.GOOGLE_SITE_VERIFICATION || "RDDXhM2_ea7jlhveHPII05reXHHZawSTf6tgGRMvnUY",
        "CuaIw6VOBCFNiu7V5dos0qx6mlVOtjt9qNIeNfhW64o",
      ],
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.png", type: "image/png" },
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
        <meta
          name="google-site-verification"
          content={process.env.GOOGLE_SITE_VERIFICATION || "RDDXhM2_ea7jlhveHPII05reXHHZawSTf6tgGRMvnUY"}
        />
        <meta
          name="google-site-verification"
          content="CuaIw6VOBCFNiu7V5dos0qx6mlVOtjt9qNIeNfhW64o"
        />
        <script type="text/javascript" dangerouslySetInnerHTML={{ __html: darkModeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebSiteJsonLd(profile)).replace(/</g, "\\u003c") }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getPersonJsonLd(profile)).replace(/</g, "\\u003c") }}
        />
      </head>

      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
