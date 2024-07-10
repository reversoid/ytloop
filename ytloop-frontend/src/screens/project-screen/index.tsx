"use client";
import { FC } from "react";

import { projectAtom, projectLoopsAtom } from "@/entities/project/model";
import { ExportProjectButton } from "@/features/export-project";
import { useInitMetronome } from "@/features/metronome";
import { ProjectSettingsButton } from "@/features/project-settings";
import { useSyncProjectWithQueryParams } from "@/features/sync-project-with-query/utils/use-sync-project-with-query-params";
import { LoopTabs } from "@/widgets/loop-tabs/ui/loop-tabs";
import { Timeline } from "@/widgets/timeline";
import { Accordion, AccordionItem } from "@nextui-org/react";
import {
  IconArrowRightBar,
  IconBrandYoutube,
  IconRefresh,
} from "@tabler/icons-react";
import { useAtomValue } from "jotai";
import dynamic from "next/dynamic";
import styles from "./ui/styles.module.css";
import { Loop, Project } from "@/core/models";
import { useHydrateAtoms } from "jotai/utils";
import { workspaceCurrentLoopAtom } from "@/entities/workspace/model";

const Player = dynamic(() => import("../../widgets/player/ui/player"), {
  ssr: false,
});

const ProjectScreen: FC<{ project: Project; loops: Loop[] }> = ({
  loops: inLoops,
  project: inProject,
}) => {
  useHydrateAtoms([
    [projectAtom, inProject],
    [projectLoopsAtom, inLoops],
    [workspaceCurrentLoopAtom, inLoops[0]],
  ]);

  const project = useAtomValue(projectAtom)!;

  useSyncProjectWithQueryParams(project);
  useInitMetronome();

  return (
    <section className="max-w-screen-xl mx-auto py-5 px-2">
      <div className="flex gap-3 justify-between items-center">
        <h1 className="font-black text-2xl">{project.name}</h1>

        <div className="flex gap-2">
          <ExportProjectButton />
          <ProjectSettingsButton />
        </div>
      </div>

      <div className={`mt-5 ${styles["accordion-wrapper"]}`}>
        <Accordion
          defaultExpandedKeys={["Loops"]}
          variant="splitted"
          selectionMode="single"
        >
          <AccordionItem
            key={"Video"}
            aria-label="Video"
            title={
              <div className="flex items-center gap-2">
                <IconBrandYoutube />
                <span>Video</span>
              </div>
            }
            keepContentMounted
          >
            <Player
              url={`https://www.youtube.com/watch?v=${project.videoId}`}
            />
          </AccordionItem>

          <AccordionItem
            key={"Loops"}
            aria-label="Loops"
            title={
              <div className="flex items-center gap-2">
                <IconRefresh />
                <span>Loops</span>
              </div>
            }
            keepContentMounted
          >
            <LoopTabs />
          </AccordionItem>

          <AccordionItem
            key={"Timeline"}
            aria-label="Timeline"
            title={
              <div className={`flex items-center gap-2`}>
                <IconArrowRightBar />
                <span>Timeline</span>
              </div>
            }
          >
            <Timeline />
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

ProjectScreen.displayName = "ProjectPage";

export default ProjectScreen;
