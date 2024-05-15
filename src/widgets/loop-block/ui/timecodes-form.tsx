"use client";

import {
  workspaceCurrentLoopAtom,
  workspaceDeltaAtom,
  workspaceIsPlayingAtom,
} from "@/entities/workspace/model";
import { useMetronome } from "@/features/metronome/utils/use-metronome";
import { PlayButton } from "@/features/play-button";
import { TimecodeInput } from "@/shared/timecode-input";
import { PlayerContext } from "@/shared/utils/player-context";
import { Checkbox } from "@nextui-org/react";
import { useAtom } from "jotai";
import { useCallback, useContext, useEffect, useState } from "react";
import { DisabledTickExplanation } from "./disabled-tick-explanation";
import { useBoolean } from "usehooks-ts";

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

  const [tickBeforeStart, setTickBeforeStart] = useState(false);

  const metronome = useMetronome({
    bpm: currentLoop?.bpm ?? -1,
  });

  useEffect(() => {
    if (!currentLoop?.bpm) {
      setTickBeforeStart(false);
    }
  }, [currentLoop?.bpm]);

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

      <div className="mt-2 flex items-center gap-3">
        <Checkbox
          isSelected={tickBeforeStart}
          onValueChange={(isSelected) => {
            setTickBeforeStart(isSelected);
          }}
          isDisabled={!currentLoop?.bpm}
          size="lg"
        >
          Tick before loop starts
        </Checkbox>

        {!currentLoop?.bpm && <DisabledTickExplanation />}
      </div>

      <div className="mt-1">
        <PlayButton
          isPlaying={isPlaying || metronome.isPlaying}
          disabled={
            invalid ||
            currentLoop?.from === undefined ||
            currentLoop.to === undefined
          }
          onPlay={() => {
            if (tickBeforeStart) {
              metronome.play(4).then(() => setIsPlaying(true));
            } else {
              setIsPlaying(true);
            }
          }}
          onStop={() => {
            metronome.stop();

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
