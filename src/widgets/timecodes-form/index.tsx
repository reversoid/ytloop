import {
  workspaceCurrentLoopAtom,
  workspaceDeltaAtom,
  workspaceIsPlayingAtom,
} from "@/entities/workspace/model";
import { TimecodeInput } from "@/shared/ui/timecode-input";
import { useAtom } from "jotai";
import { useCallback, useContext, useState } from "react";
import { PlayButton } from "../../features/play-button";
import { PlayerContext } from "@/shared/utils/player-context";

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
    <div>
      {/* <div className="collapse bg-base-200 collapse-arrow">
        <input type="checkbox" />
        <div className="collapse-title text-lg font-medium">Loop options</div>
        <div className="collapse-content">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Loop name</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
              value={"New loop 1"}
            />
          </label>

          <label className="form-control max-w-xs">
            <div className="label">
              <span className="label-text">Description</span>
            </div>
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Bio"
            ></textarea>
          </label>
        </div>
      </div> */}

      <form
        className="flex flex-col gap-2 sm:max-w-md"
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
    </div>
  );
};
