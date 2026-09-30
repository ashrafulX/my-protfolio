import { CollapsibleList } from "@/components/collapsible-list";
import { type ApiList,cmsGet } from "@/lib/cms-api";

import type { Project } from "../../types/projects";
import { Panel, PanelHeader, PanelTitle } from "../panel";
import { ProjectItem } from "./project-item";

export async function Projects() {
  const response = await cmsGet<Project[] | ApiList<Project>>("projects/?featured=true");
  const projects = Array.isArray(response) ? response : response?.results ?? null;
  return (
    <Panel id="projects">
      <PanelHeader>
        <PanelTitle>
          Projects
          <sup className="ml-1 font-mono text-sm text-muted-foreground select-none">
            ({projects?.length ?? 0})
          </sup>
        </PanelTitle>
      </PanelHeader>

      {projects === null ? <p className="px-4 py-6 text-sm text-muted-foreground">Projects unavailable.</p> : projects.length ? <CollapsibleList items={projects} max={4} renderItem={(item) => <ProjectItem project={item} />} /> : <p className="px-4 py-6 text-sm text-muted-foreground">No projects found.</p>}
    </Panel>
  );
}
