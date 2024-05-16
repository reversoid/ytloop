"use client";
import { FC, useRef } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";

import { projectAtom } from "@/entities/project/model";
import { isLoopValid } from "@/entities/project/utils/is-loop-valid";
import {
  workspaceCurrentLoopAtom,
  workspaceEnabledCountdown,
  workspaceIsPlayingAtom,
} from "@/entities/workspace/model";
import { ExportProjectButton } from "@/features/export-project";
import { MetronomeContext } from "@/features/metronome/utils/metronome-context";
import { useMetronome } from "@/features/metronome/utils/use-init-metronome";
import { ProjectSettingsButton } from "@/features/project-settings";
import { useSyncProjectWithQueryParams } from "@/features/sync-project-with-query/utils/use-sync-project-with-query-params";
import { PlayerContext } from "@/shared/utils/player-context";
import { LoopTabs } from "@/widgets/loop-tabs";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { useAtom, useAtomValue } from "jotai";
import dynamic from "next/dynamic";
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

  const enabledCountdown = useAtomValue(workspaceEnabledCountdown);

  const seekTo = (seconds: number) => {
    ref.current?.seekTo(seconds);
  };

  const {
    play: playMetronome,
    stop: stopMetronome,
    isPlaying: isMetronomePlaying,
  } = useMetronome();

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

    const playFromStart = () => {
      seekTo(currentLoop.from);
      setPlaying(true);
    };

    if (currentLoop.bpm && enabledCountdown) {
      setPlaying(false);
      playMetronome(currentLoop.bpm, 4).then(() => {
        playFromStart();
      });
    } else {
      playFromStart();
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        seekTo,
        getCurrentTime: ref.current?.getCurrentTime,
      }}
    >
      <MetronomeContext.Provider
        value={{
          isPlaying: isMetronomePlaying,
          play: playMetronome,
          stop: stopMetronome,
        }}
      >
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
            </Accordion>
          </div>
        </section>
      </MetronomeContext.Provider>
    </PlayerContext.Provider>
  );
};

ProjectPage.displayName = "ProjectPage";

export default ProjectPage;
