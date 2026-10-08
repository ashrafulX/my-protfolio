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

  const primaryJob = profile.jobs?.[0] ?? {
    title: profile.jobTitle || "Software Engineer",
    company: "SoftZen IT",
    website: "https://softzenit.com",
  };

  const secondaryJob = profile.jobs?.[1] ?? {
    title: "Computer Science Student",
    company: "Northern University Bangladesh",
    website: "https://nub.ac.bd",
  };

  const address = profile.address || "Dhaka, Bangladesh";
  const email = profile.email || "ashrafulwho@gmail.com";
  const phone = profile.phoneNumber || "+8801590-026285";
  const pronouns = profile.pronouns || "he/him";
  const timezone = profile.timezone || "Asia/Dhaka";
  const website = profile.website || "https://ashraful.site";

  return (
    <Panel>
      <h2 className="sr-only">Overview</h2>

      <PanelContent className="space-y-2.5">
        <JobItem
          title={primaryJob.title}
          company={primaryJob.company}
          website={primaryJob.website}
          prefix=" At @"
        />

        <div className="grid gap-x-12 gap-y-2.5 sm:grid-cols-2">
          {/* Row 1 Left: Secondary Job */}
          <JobItem
            title={secondaryJob.title}
            company={secondaryJob.company}
            website={secondaryJob.website}
            prefix=" @"
          />

          {/* Row 1 Right: Pronouns */}
          <IntroItem>
            <IntroItemIcon>
              <MarsIcon />
            </IntroItemIcon>
            <IntroItemContent aria-label={`Pronouns: ${pronouns}`}>
              {pronouns}
            </IntroItemContent>
          </IntroItem>

          {/* Row 2 Left: Location */}
          <IntroItem>
            <IntroItemIcon>
              <MapPinIcon />
            </IntroItemIcon>
            <IntroItemContent>
              <IntroItemLink
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                aria-label={`Location: ${address}`}
              >
                {address}
              </IntroItemLink>
            </IntroItemContent>
          </IntroItem>

          {/* Row 2 Right: Current Local Time */}
          <CurrentLocalTimeItem timeZone={timezone} />

          {/* Row 3 Left: Phone */}
          <PhoneItem phoneNumber={phone} />

          {/* Row 3 Right: WhatsApp / Secondary Phone */}
          <PhoneItem phoneNumber={phone} label="WhatsApp" />

          {/* Row 4 Left: Email */}
          <EmailItem email={email} />

          {/* Row 4 Right: Website */}
          <IntroItem>
            <IntroItemIcon>
              <GlobeIcon />
            </IntroItemIcon>
            <IntroItemContent>
              <IntroItemLink
                href={website}
                aria-label={`Personal website: ${urlToName(website)}`}
              >
                {urlToName(website)}
              </IntroItemLink>
            </IntroItemContent>
          </IntroItem>
        </div>
      </PanelContent>
    </Panel>
  );
}
