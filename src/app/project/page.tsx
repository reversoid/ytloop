"use client";
import { Collapse } from "@/shared/ui/collapse";
import { Tab, Tabs } from "@/shared/ui/tabs";
import { FC, PropsWithChildren, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";

import dynamic from "next/dynamic";
import { TimecodesForm } from "@/widgets/timecodes-form";
import { useAtom, useAtomValue } from "jotai";
import {
  workspaceEndTime,
  workspaceIsPlaying,
  workspaceStartTime,
} from "@/entities/workspace/model";

const Player = dynamic(
  () => import("../../widgets/player").then((p) => p.Player),
  {
    ssr: false,
  }
);

const ProjectWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col gap-3">{children}</div>;
};

export default function Page() {
  const ref = useRef<ReactPlayer | null>(null);
  const [playing, setPlaying] = useAtom(workspaceIsPlaying);

  const startValue = useAtomValue(workspaceStartTime);
  const endValue = useAtomValue(workspaceEndTime);

  const seekTo = (seconds: number) => {
    ref.current?.seekTo(seconds);
  };

  const handleProgress = ({ playedSeconds }: OnProgressProps) => {
    if (!endValue || !playing) {
      return;
    }

    if (playedSeconds >= startValue && playedSeconds <= endValue) {
      return;
    }

    seekTo(startValue);
    setPlaying(true);
  };

  return (
    <section className="prose max-w-screen-xl mx-auto pt-5 px-2">
      <h1>Your project</h1>

      <ProjectWrapper>
        {/* <Collapse label="Project settings" defaultOpen={false}>
          Some content
        </Collapse> */}

        <Collapse label="Video" defaultOpen={false}>
          <Player
            onProgress={handleProgress}
            url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
            refCallback={(player) => (ref.current = player)}
          />
        </Collapse>

        <Collapse label="Loops" defaultOpen={true}>
          <Tabs>
            <Tab title="Loop 1" selected>
              <TimecodesForm
                getCurrentTime={() => {
                  if (ref.current) {
                    return ref.current.getCurrentTime();
                  }
                }}
                seekTo={seekTo}
              />
            </Tab>
            <Tab title="New"></Tab>
          </Tabs>
        </Collapse>

        <Collapse label="Export" defaultOpen={false}>
          Some variants of export
        </Collapse>
      </ProjectWrapper>
    </section>
  );
}
