import React from "react";

import { cmsList } from "@/lib/cms-api";

import type { SocialLink } from "../../types/social-links";
import { Panel } from "../panel";
import { SocialLinkItem } from "./social-link-item";

export async function SocialLinks() {
  const links = await cmsList<SocialLink>("social-links/");

  return (
    <Panel>
      <h2 className="sr-only">Social Links</h2>

      <div className="relative">
        <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
          <div className="border-r border-edge"></div>
          <div className="border-l border-edge"></div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {links?.map((link, index) => (
            <SocialLinkItem key={index} {...link} />
          ))}
        </div>
        {links === null && (
          <p className="col-span-full px-4 py-6 text-sm text-muted-foreground">Social links unavailable.</p>
        )}
        {links?.length === 0 && (
          <p className="col-span-full px-4 py-6 text-sm text-muted-foreground">No social links configured.</p>
        )}
      </div>
    </Panel>
  );
}
