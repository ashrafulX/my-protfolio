import { USER } from "@/features/profile/data/user";
import type { NavItem } from "@/types/nav";

export const SITE_INFO = {
  name: "Ashraful's Protfolio",
  url: process.env.APP_URL || USER.website,
  ogImage: USER.ogImage,
  description: USER.bio,
  keywords: USER.keywords,
};

export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const MAIN_NAV: NavItem[] = [
  {
    title: "Ashraful's Protfolio",
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

export const GITHUB_USERNAME = "ashrafulX";
// TODO: update once you push this portfolio to your own GitHub repo
export const SOURCE_CODE_GITHUB_REPO = "abdulrehmanwaseem/My-Portfolio";
export const SOURCE_CODE_GITHUB_URL =
  "https://github.com/ashrafulX/My-Portfolio";

export const UTM_PARAMS = {
  utm_source: SITE_INFO.url,
  utm_medium: "portfolio_website",
  utm_campaign: "referral",
};
