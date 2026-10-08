import type { NavItem } from "@/types/nav";

const siteUrl = (
  process.env.APP_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://ashrafulx.vercel.app"
)
  .trim()
  .replace(/\/+$/, "");

const backendUrl = (
  process.env.NEXT_PUBLIC_API_URL ||
  "https://ashrafulx-server.vercel.app/api"
)
  .trim()
  .replace(/\/+$/, "");

export const SITE_INFO = {
  name: "Md. Ashraful Islam — Backend Developer & Software Engineer",
  shortName: "Md. Ashraful Islam",
  url: siteUrl,
  backendUrl,
  description:
    "Official portfolio of Md. Ashraful Islam — Backend Developer, Software Engineer, and Competitive Programmer specializing in Django, React, PostgreSQL, and scalable systems.",
  keywords: [
    "Md. Ashraful Islam",
    "Ashraful Islam",
    "ashrafulx",
    "Backend Developer",
    "Software Engineer",
    "Full Stack Developer",
    "Django Developer",
    "React Developer",
    "Python Developer",
    "Competitive Programmer",
    "Northern University Bangladesh",
    "SoftZen IT",
    "Portfolio",
    "Dhaka Bangladesh",
  ],
};

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const MAIN_NAV: NavItem[] = [
  {
    title: "Portfolio",
    href: "/",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  // {
  //   title: "Components",
  //   href: "/components",
  // },
];

export const UTM_PARAMS = {
  utm_source: SITE_INFO.url,
  utm_medium: "portfolio_website",
  utm_campaign: "referral",
};
