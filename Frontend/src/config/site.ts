import type { NavItem } from "@/types/nav";

export const SITE_INFO = {
  name: "Portfolio",
  url: process.env.APP_URL || process.env.NEXT_PUBLIC_SITE_URL || "https://ashraful.site",
  description: "Portfolio website",
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
