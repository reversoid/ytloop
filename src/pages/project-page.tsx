"use client";
import { Collapse } from "@/shared/ui/collapse";
import { FC, useCallback, useRef } from "react";
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
import { ProjectWrapper } from "./ui/wrapper";

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
      <section className="prose max-w-screen-xl mx-auto pt-5 px-2">
        <h1>{project.name}</h1>
        {/* TODO make project settings in page head */}

        <ProjectWrapper>
          <Collapse label="Video" defaultOpen={false}>
            <Player
              onProgress={handleProgress}
              url={`https://www.youtube.com/watch?v=${project.videoId}`}
              refCallback={(player: ReactPlayer | null) =>
                (ref.current = player)
              }
            />
          </Collapse>

          <Collapse label="Loops" defaultOpen={true}>
            <LoopTabs />
          </Collapse>

          <Collapse label="Export" defaultOpen={false}>
            Some variants of export
          </Collapse>
        </ProjectWrapper>
      </section>
    </PlayerContext.Provider>
  );
};

ProjectPage.displayName = "ProjectPage";

export default ProjectPage;