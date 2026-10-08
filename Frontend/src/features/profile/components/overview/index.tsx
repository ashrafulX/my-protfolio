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

const DEFAULT_PROFILE: CmsProfile = {
  displayName: "Md. Ashraful Islam",
  jobTitle: "Backend Developer",
  short_title: "Software Engineer",
  pronouns: "he/him",
  email: "ashrafulwho@gmail.com",
  phoneNumber: "+880 1590 026285",
  secondary_phone: "+880 1590 026285",
  secondary_phone_label: "WhatsApp",
  website: "https://ashraful.site",
  address: "Dhaka, Bangladesh",
  username: "ashrafulX",
  availability: "Available for hire",
  hero_description: "Building with code. Learning one problem at a time.",
  seo_keywords: ["Md. Ashraful Islam", "Backend Developer", "Software Engineer"],
  timezone: "Asia/Dhaka",
  avatar: "/images/profile/avatar.jpg",
  dateCreated: "2026-07-17",
  jobs: [
    {
      title: "Backend Developer",
      company: "SoftZen IT",
      website: "https://softzenit.com",
    },
    {
      title: "Computer Science Student",
      company: "Northern University Bangladesh",
      website: "https://nub.ac.bd",
    },
  ],
  flipSentences: [
    "Backend Developer",
    "Full Stack Web Developer",
    "Competitive Programmer",
    "CSE Undergraduate",
  ],
};

export async function Overview() {
  const apiProfile = await cmsGet<CmsProfile>("profile/");
  const profile: CmsProfile = {
    ...DEFAULT_PROFILE,
    ...(apiProfile || {}),
    pronouns: apiProfile?.pronouns || DEFAULT_PROFILE.pronouns,
    timezone: apiProfile?.timezone || DEFAULT_PROFILE.timezone,
    phoneNumber: apiProfile?.phoneNumber || DEFAULT_PROFILE.phoneNumber,
    secondary_phone: apiProfile?.secondary_phone || DEFAULT_PROFILE.secondary_phone,
    secondary_phone_label: apiProfile?.secondary_phone_label || DEFAULT_PROFILE.secondary_phone_label,
    website: (apiProfile?.website && !apiProfile.website.includes("historoam")) ? apiProfile.website : DEFAULT_PROFILE.website,
    address: apiProfile?.address || DEFAULT_PROFILE.address,
    email: apiProfile?.email || DEFAULT_PROFILE.email,
    jobs: (apiProfile?.jobs && apiProfile.jobs.length >= 2)
      ? [
          apiProfile.jobs[0],
          {
            ...apiProfile.jobs[1],
            title: apiProfile.jobs[1].title === "Bachelor's degree" ? "Computer Science Student" : apiProfile.jobs[1].title,
          }
        ]
      : (apiProfile?.jobs && apiProfile.jobs.length === 1)
        ? [apiProfile.jobs[0], DEFAULT_PROFILE.jobs[1]]
        : DEFAULT_PROFILE.jobs,
  };

  const primaryJob = profile.jobs?.[0] || DEFAULT_PROFILE.jobs[0];
  const secondaryJob = profile.jobs?.[1] || DEFAULT_PROFILE.jobs[1];

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
