import React from "react";

import { cmsList } from "@/lib/cms-api";

import type { Experience } from "../../types/experiences";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { ExperienceItem } from "./experience-item";

export async function Experiences() {
  const [experiences, education] = await Promise.all([
    cmsList<Experience>("experience/"),
    cmsList<Experience>("education/"),
  ]);

  const entries =
    experiences === null || education === null ? null : [...experiences, ...education];

  return (
    <Panel id="experience">
      <PanelHeader>
        <PanelTitle>Experience</PanelTitle>
      </PanelHeader>

      <div className="pr-2 pl-4">
        {entries?.map((experience) => (
          <ExperienceItem key={experience.id} experience={experience} />
        ))}
        {entries === null && (
          <p className="py-4 text-sm text-muted-foreground">Experience information unavailable.</p>
        )}
        {entries?.length === 0 && (
          <p className="py-4 text-sm text-muted-foreground">No experience or education entries.</p>
        )}
      </div>
    </Panel>
  );
}
