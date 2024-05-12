"use client";
import { Collapse } from "@/shared/ui/collapse";
import { Tab, Tabs } from "@/shared/ui/tabs";
import { FC, PropsWithChildren, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";
import { TimecodeInput } from "@/shared/ui/timecode-input";

import dynamic from "next/dynamic";
import { PlayButton } from "@/features/play-button";
import { TimecodesForm } from "@/features/timecodes-form";

const Player = dynamic(() => import("../../shared/ui/player"), {
  ssr: false,
});

const ProjectWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col gap-3">{children}</div>;
};

export default function Page() {
  const ref = useRef<ReactPlayer | null>(null);
  const [playing, setPlaying] = useState(false);

  const [startValue, setStartValue] = useState(0);
  const [endValue, setEndValue] = useState<number | null>(null);

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
            playing={playing}
            setPlaying={setPlaying}
            url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
            refCallback={(player) => (ref.current = player)}
          />
        </Collapse>

        <Collapse label="Loops" defaultOpen={true}>
          <Tabs>
            <Tab title="Loop 1" selected>
              <TimecodesForm
                endValue={endValue}
                getCurrentTime={() => {
                  if (ref.current) {
                    return ref.current.getCurrentTime();
                  }
                }}
                playing={playing}
                setPlaying={setPlaying}
                seekTo={seekTo}
                setEndValue={setEndValue}
                setStartValue={setStartValue}
                startValue={startValue}
              />
            </Tab>
          </Tabs>
        </Collapse>

        <Collapse label="Export" defaultOpen={false}>
          Some variants of export
        </Collapse>
      </ProjectWrapper>
    </section>
  );
}
