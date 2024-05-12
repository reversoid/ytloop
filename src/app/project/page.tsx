"use client";
import { useRef, useState } from "react";
import ReactPlayer from "react-player";
import { OnProgressProps } from "react-player/base";

export default function Page() {
  const ref = useRef<ReactPlayer | null>();
  const [playing, setPlaying] = useState(false);

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

      <ReactPlayer
        playing={playing}
        onPlay={() => setPlaying(true)}
        ref={(player) => {
          ref.current = player;
        }}
        onProgress={handleProgress}
        loop={true}
        controls={true}
        progressInterval={10}
        url="https://www.youtube.com/watch?v=LXb3EKWsInQ"
      />
    </section>
  );
}
