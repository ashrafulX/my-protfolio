import { GlobeIcon, MapPinIcon, MarsIcon } from "lucide-react";

import { cmsGet, type CmsProfile } from "@/lib/cms-api";
import { urlToName } from "@/utils/url";

import { Panel, PanelContent } from "../panel";
import { CurrentLocalTimeItem } from "./current-local-time-item";
import { EmailItem } from "./email-item";
import {
  IntroItem,
  IntroItemContent,
  IntroItemIcon,
  IntroItemLink,
} from "./intro-item";
import { JobItem } from "./job-item";
import { PhoneItem } from "./phone-item";

export async function Overview() {
  const profile = await cmsGet<CmsProfile>("profile/");
  if (!profile) return <section className="border-x border-edge px-4 py-6 text-sm text-muted-foreground">Profile information unavailable.</section>;
  const job = profile.jobs?.[0];
  return (
    <Panel>
      <h2 className="sr-only">Overview</h2>

      <PanelContent className="space-y-2.5">
        <JobItem
          title={job?.title ?? profile.jobTitle}
          company={job?.company ?? ""}
          website={job?.website ?? ""}
        />

        <div className="grid gap-x-12 gap-y-2.5 sm:grid-cols-2">
          {profile.jobs?.[1] && (
            <JobItem
              title={profile.jobs[1].title}
              company={profile.jobs[1].company}
              website={profile.jobs[1].website}
            />
          )}

          {profile.pronouns && (
            <IntroItem>
              <IntroItemIcon>
                <MarsIcon />
              </IntroItemIcon>
              <IntroItemContent aria-label={`Pronouns: ${profile.pronouns}`}>
                {profile.pronouns}
              </IntroItemContent>
            </IntroItem>
          )}

          {profile.address && (
            <IntroItem>
              <IntroItemIcon>
                <MapPinIcon />
              </IntroItemIcon>
              <IntroItemContent>
                <IntroItemLink
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(profile.address)}`}
                  aria-label={`Location: ${profile.address}`}
                >
                  {profile.address}
                </IntroItemLink>
              </IntroItemContent>
            </IntroItem>
          )}

          <CurrentLocalTimeItem timeZone={profile.timezone} />

          {profile.email && <EmailItem email={profile.email} />}

          {profile.phoneNumber && <PhoneItem phoneNumber={profile.phoneNumber} />}

          {profile.website && (
            <IntroItem>
              <IntroItemIcon>
                <GlobeIcon />
              </IntroItemIcon>
              <IntroItemContent>
                <IntroItemLink
                  href={profile.website}
                  aria-label={`Personal website: ${urlToName(profile.website)}`}
                >
                  {urlToName(profile.website)}
                </IntroItemLink>
              </IntroItemContent>
            </IntroItem>
          )}
        </div>
      </PanelContent>
    </Panel>
  );
}
