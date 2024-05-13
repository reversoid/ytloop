"use client";
import { Collapse } from "@/shared/ui/collapse";
import { FC, createContext, useRef } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";

import {
  workspaceCurrentLoop,
  workspaceIsPlaying,
} from "@/entities/workspace/model";
import { LoopTabs } from "@/widgets/loop-tabs";
import { useAtom, useAtomValue } from "jotai";
import dynamic from "next/dynamic";
import { isLoopValid } from "@/entities/project/utils/is-loop-valid";
import { ProjectWrapper } from "./ui/wrapper";
import { PlayerContext } from "@/shared/utils/player-context";
import { Project } from "@/entities/project/model";
import { useSyncProject } from "@/features/sync-project-with-query/utils/use-sync-project";
import { ProjectContext } from "@/shared/utils/project-context";

const Player = dynamic(
  () => import("../widgets/player").then((p) => p.Player),
  {
    ssr: false,
  }
);

export interface ProjectPageProps {
  project: Project;
}

export const ProjectPage: FC<ProjectPageProps> = ({ project: inProject }) => {
  const project = useSyncProject(inProject);

  const ref = useRef<ReactPlayer | null>(null);

  const [playing, setPlaying] = useAtom(workspaceIsPlaying);

  const currentLoop = useAtomValue(workspaceCurrentLoop);

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
      <ProjectContext.Provider value={{ project }}>
        <section className="prose max-w-screen-xl mx-auto pt-5 px-2">
          <h1>{project.name}</h1>
          {/* TODO make project settings in page head */}

          <ProjectWrapper>
            <Collapse label="Video" defaultOpen={false}>
              <Player
                onProgress={handleProgress}
                url={`https://www.youtube.com/watch?v=${project.videoId}`}
                refCallback={(player) => (ref.current = player)}
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
      </ProjectContext.Provider>
    </PlayerContext.Provider>
  );
};
