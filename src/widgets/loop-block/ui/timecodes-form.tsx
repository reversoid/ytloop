import {
  workspaceCurrentLoopAtom,
  workspaceDeltaAtom,
  workspaceIsPlayingAtom,
} from "@/entities/workspace/model";
import { PlayButton } from "@/features/play-button";
import { TimecodeInput } from "@/shared/timecode-input";
import { PlayerContext } from "@/shared/utils/player-context";
import { useAtom } from "jotai";
import { useCallback, useContext, useState } from "react";

export const TimecodesForm = () => {
  const [currentLoop, setCurrentLoop] = useAtom(workspaceCurrentLoopAtom);
  const [stepValue, setStepValue] = useAtom(workspaceDeltaAtom);
  const [isPlaying, setIsPlaying] = useAtom(workspaceIsPlayingAtom);

  const { getCurrentTime, seekTo } = useContext(PlayerContext);

  const setStartValue = useCallback(
    (v: number | null) => {
      setCurrentLoop((loop) => loop && { ...loop, from: v ?? undefined });
    },
    [setCurrentLoop]
  );

  const setEndValue = useCallback(
    (v: number | null) => {
      setCurrentLoop((loop) => loop && { ...loop, to: v ?? undefined });
    },
    [setCurrentLoop]
  );

  const [invalid, setInvalid] = useState(false);

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <TimecodeInput
        label="Start"
        value={currentLoop?.from || null}
        onChange={useCallback(
          (v) => {
            if (v === -1) {
              setInvalid(true);
            } else {
              setInvalid(false);
              setStartValue(v);
            }
          },
          [setInvalid, setStartValue]
        )}
        stepValue={stepValue}
        onTakeFromVideo={() => {
          const currentTime = getCurrentTime?.();
          if (currentTime !== undefined) {
            setStartValue(currentTime);
          }
        }}
      />

      <TimecodeInput
        label="End"
        value={currentLoop?.to || null}
        onChange={useCallback(
          (v) => {
            if (v === -1) {
              setInvalid(true);
            } else {
              setInvalid(false);
              setEndValue(v);
            }
          },
          [setInvalid, setEndValue]
        )}
        stepValue={stepValue}
        onTakeFromVideo={() => {
          const currentTime = getCurrentTime?.();

          if (currentTime !== undefined) {
            setEndValue(currentTime);
          }
        }}
      />

      <div className="sm:max-w-md mt-5">
        <PlayButton
          isPlaying={isPlaying}
          disabled={
            invalid ||
            currentLoop?.from === undefined ||
            currentLoop.to === undefined
          }
          onPlay={() => setIsPlaying(true)}
          onStop={() => {
            setIsPlaying(false);
            if (currentLoop?.from !== undefined) {
              seekTo?.(currentLoop?.from);
            }
          }}
        />
      </div>
    </form>
  );
};
