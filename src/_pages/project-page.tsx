"use client";
import { Collapse } from "@/shared/ui/collapse";
import { FC, useRef } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";

import { projectAtom } from "@/entities/project/model";
import { isLoopValid } from "@/entities/project/utils/is-loop-valid";
import {
  workspaceCurrentLoopAtom,
  workspaceIsPlayingAtom,
} from "@/entities/workspace/model";
import { useSyncProjectWithQueryParams } from "@/features/sync-project-with-query/utils/use-sync-project-with-query-params";
import { PlayerContext } from "@/shared/utils/player-context";
import { LoopTabs } from "@/widgets/loop-tabs";
import { useAtom, useAtomValue } from "jotai";
import dynamic from "next/dynamic";
import { ShareTabs } from "@/widgets/share-tabs";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import styles from "./ui/styles.module.css";

const Player = dynamic(() => import("../widgets/player"), {
  ssr: false,
});

const ProjectPage: FC = () => {
  const project = useAtomValue(projectAtom)!;

  useSyncProjectWithQueryParams(project);

  const ref = useRef<ReactPlayer | null>(null);

  const [playing, setPlaying] = useAtom(workspaceIsPlayingAtom);

  const currentLoop = useAtomValue(workspaceCurrentLoopAtom);

  const seekTo = (seconds: number) => {
    ref.current?.seekTo(seconds);
  };

  const handleProgress = ({ playedSeconds }: OnProgressProps) => {
    if (!currentLoop || !isLoopValid(currentLoop)) {
      return;
    }

    if (!playing) {
      return;
    }

    if (playedSeconds >= currentLoop.from && playedSeconds < currentLoop.to) {
      return;
    }

    seekTo(currentLoop.from);
    setPlaying(true);
  };

  return (
    <PlayerContext.Provider
      value={{
        seekTo,
        getCurrentTime: ref.current?.getCurrentTime,
      }}
    >
      <section className="max-w-screen-xl mx-auto py-5 px-2">
        <div className="prose mb-5">
          <h1 className="font-black text-2xl">{project.name}</h1>
        </div>

        <div className={styles["accordion-wrapper"]}>
          <Accordion
            defaultExpandedKeys={["Loops"]}
            variant="splitted"
            selectionMode="multiple"
          >
            <AccordionItem
              key={"Video"}
              aria-label="Video"
              title="Video"
              keepContentMounted
            >
              <Player
                onProgress={handleProgress}
                url={`https://www.youtube.com/watch?v=${project.videoId}`}
                refCallback={(player: ReactPlayer | null) =>
                  (ref.current = player)
                }
              />
            </AccordionItem>

            <AccordionItem key={"Loops"} aria-label="Loops" title="Loops">
              <LoopTabs />
            </AccordionItem>

            <AccordionItem key={"Share"} aria-label="Share" title="Share">
              <ShareTabs />
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </PlayerContext.Provider>
  );
};

ProjectPage.displayName = "ProjectPage";

export default ProjectPage;
