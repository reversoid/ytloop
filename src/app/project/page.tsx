"use client";
import { Collapse } from "@/shared/collapse";
import { Tab, Tabs } from "@/shared/tabs";
import Player from "@/shared/player";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { FC, PropsWithChildren, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";
import { TimecodeInput } from "@/shared/timecode-input";

const ProjectWrapper: FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex flex-col gap-3">{children}</div>;
};

export default function Page() {
  const ref = useRef<ReactPlayer | null>(null);
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);

  const [leftBound, rightBound] = [100, 103];

  const seekTo = (seconds: number) => {
    ref.current?.seekTo(seconds);
    setPlaying(true);
  };

  const handleProgress = ({ playedSeconds }: OnProgressProps) => {
    if (playedSeconds >= leftBound && playedSeconds <= rightBound) {
      return;
    }

    seekTo(leftBound);
  };

  return (
    <section className="prose max-w-screen-xl mx-auto pt-5">
      <h1>Your project</h1>

      <ProjectWrapper>
        <Collapse label="Project settings" defaultOpen={false}>
          Some content
        </Collapse>

        <Collapse label="Video" defaultOpen={false}>
          <Player
            onProgress={handleProgress}
            playing={playing}
            setPlaying={setPlaying}
            url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
            ref={ref}
          />
        </Collapse>

        <Collapse label="Loops" defaultOpen={true}>
          <Tabs>
            <Tab title="Loop 1">
              <TimecodeInput />
              <TimecodeInput />
            </Tab>
          </Tabs>
        </Collapse>

        <Collapse label="Export" defaultOpen={false}>
          Some variants
        </Collapse>
      </ProjectWrapper>
    </section>
  );
}
