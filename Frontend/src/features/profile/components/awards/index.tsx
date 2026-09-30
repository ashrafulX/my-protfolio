import dayjs from "dayjs";

import { CollapsibleList } from "@/components/collapsible-list";
import { type ApiList,cmsGet } from "@/lib/cms-api";

import type { Award } from "../../types/awards";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { AwardItem } from "./award-item";

export async function Awards() {
  const response = await cmsGet<Award[] | ApiList<Award>>("achievements/");
  const data = Array.isArray(response) ? response : response?.results ?? null;
  const sortedAwards = data ? [...data].sort((a, b) => dayjs(b.date).diff(dayjs(a.date))) : null;
  return (
    <Panel id="awards">
      <PanelHeader>
        <PanelTitle>
          Achievements
          <sup className="ml-1 font-mono text-sm font-medium text-muted-foreground select-none">
            ({sortedAwards?.length ?? 0})
          </sup>
        </PanelTitle>
      </PanelHeader>

      {sortedAwards === null ? <p className="px-4 py-6 text-sm text-muted-foreground">Achievements unavailable.</p> : sortedAwards.length === 0 ? <p className="px-4 py-6 text-sm text-muted-foreground">No achievements yet.</p> : <CollapsibleList
        items={sortedAwards}
        max={8}
        keyExtractor={(item) => item.id}
        renderItem={(item) => <AwardItem award={item} />}
      />}
    </Panel>
  );
}
