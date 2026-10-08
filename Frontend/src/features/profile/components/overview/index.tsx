import { GlobeIcon, MapPinIcon, MarsIcon } from "lucide-react";

import type { CmsProfile } from "@/lib/cms-api";
import { cmsGet } from "@/lib/cms-api";
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

  const primaryJob = profile.jobs?.[0];
  const secondaryJob = profile.jobs?.[1];

  return (
    <Panel>
      <h2 className="sr-only">Overview</h2>

      <PanelContent className="space-y-2.5">
        {primaryJob && (
          <JobItem
            title={primaryJob.title}
            company={primaryJob.company}
            website={primaryJob.website}
            prefix=" At @"
          />
        )}

        <div className="grid gap-x-12 gap-y-2.5 sm:grid-cols-2">
          {/* Row 1 Left: Secondary Job */}
          {secondaryJob ? (
            <JobItem
              title={secondaryJob.title}
              company={secondaryJob.company}
              website={secondaryJob.website}
              prefix=" @"
            />
          ) : <div />}

          {/* Row 1 Right: Pronouns */}
          {profile.pronouns ? (
            <IntroItem>
              <IntroItemIcon>
                <MarsIcon />
              </IntroItemIcon>
              <IntroItemContent aria-label={`Pronouns: ${profile.pronouns}`}>
                {profile.pronouns}
              </IntroItemContent>
            </IntroItem>
          ) : <div />}

          {/* Row 2 Left: Location */}
          {profile.address ? (
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
          ) : <div />}

          {/* Row 2 Right: Current Local Time */}
          {profile.timezone ? (
            <CurrentLocalTimeItem timeZone={profile.timezone} />
          ) : <div />}

          {/* Row 3 Left: Phone */}
          {profile.phoneNumber ? (
            <PhoneItem phoneNumber={profile.phoneNumber} />
          ) : <div />}

          {/* Row 3 Right: Secondary Phone */}
          {profile.secondary_phone ? (
            <PhoneItem
              phoneNumber={profile.secondary_phone}
              label={profile.secondary_phone_label || "WhatsApp"}
            />
          ) : profile.phoneNumber ? (
            <PhoneItem
              phoneNumber={profile.phoneNumber}
              label={profile.secondary_phone_label || "WhatsApp"}
            />
          ) : <div />}

          {/* Row 4 Left: Email */}
          {profile.email ? (
            <EmailItem email={profile.email} />
          ) : <div />}

          {/* Row 4 Right: Website */}
          {profile.website ? (
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
          ) : <div />}
        </div>
      </PanelContent>
    </Panel>
  );
}
