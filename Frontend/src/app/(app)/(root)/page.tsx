import dayjs from "dayjs";
import type { ProfilePage as PageSchema, WithContext } from "schema-dts";

import { About } from "@/features/profile/components/about";
import { Awards } from "@/features/profile/components/awards";
import { Blog } from "@/features/profile/components/blog";
import { Certifications } from "@/features/profile/components/certifications";
import { Experiences } from "@/features/profile/components/experiences";
import { GitHubIntegration } from "@/features/profile/components/github";
import { Overview } from "@/features/profile/components/overview";
import { ProfileCover } from "@/features/profile/components/profile-cover";
import { ProfileHeader } from "@/features/profile/components/profile-header";
import { Projects } from "@/features/profile/components/projects";
import { Research } from "@/features/profile/components/research";
import { Resume } from "@/features/profile/components/resume";
import { SocialLinks } from "@/features/profile/components/social-links";
import { TeckStack } from "@/features/profile/components/teck-stack";
import { cmsGet, type CmsProfile } from "@/lib/cms-api";
import { cn } from "@/lib/utils";

export const revalidate = 60;

export default async function Page() {
  const profile = await cmsGet<CmsProfile>("profile/");
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd(profile)).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto md:max-w-3xl">
        <ProfileCover />
        <ProfileHeader />
        <Separator />

        <Overview />
        <Separator />

        <Resume />
        <Separator />

        <SocialLinks />
        <Separator />

        <About />
        <Separator />

        <GitHubIntegration username={profile?.username ?? ""} />
        <Separator />

        <TeckStack />
        <Separator />

        <Blog />
        <Separator />

        <Experiences />
        <Separator />

        <Projects />
        <Separator />

        <Awards />
        <Separator />

        <Certifications />
        <Separator />

        <Research />
        <Separator />
      </div>
    </>
  );
}

function getPageJsonLd(profile: CmsProfile | null): WithContext<PageSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: dayjs(profile?.dateCreated || undefined).toISOString(),
    dateModified: dayjs().toISOString(),
    mainEntity: {
      "@type": "Person",
      name: profile?.displayName || "",
      identifier: profile?.username || "",
      image: profile?.avatar || "",
    },
  };
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full border-x border-edge",
        "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
        className
      )}
    />
  );
}
