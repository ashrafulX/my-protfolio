import { CollapsibleList } from "@/components/collapsible-list";
import { cmsList } from "@/lib/cms-api";

import type { Certification } from "../../types/certifications";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { CertificationItem } from "./certification-item";

export async function Certifications() {
  const certifications = await cmsList<Certification>("certifications/");

  return (
    <Panel id="certs">
      <PanelHeader>
        <PanelTitle>
          Certifications
          <sup className="ml-1 font-mono text-sm font-medium text-muted-foreground select-none">
            ({certifications?.length ?? 0})
          </sup>
        </PanelTitle>
      </PanelHeader>

      {certifications === null ? (
        <p className="px-4 py-6 text-sm text-muted-foreground">Certifications unavailable.</p>
      ) : certifications.length === 0 ? (
        <p className="px-4 py-6 text-sm text-muted-foreground">No certifications yet.</p>
      ) : (
        <CollapsibleList
          items={certifications}
          max={2}
          renderItem={(item) => <CertificationItem certification={item} />}
        />
      )}
    </Panel>
  );
}
