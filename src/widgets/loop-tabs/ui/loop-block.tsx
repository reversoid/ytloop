import { LoopOptionsButton } from "@/features/loop-options/ui/loop-options-button";
import { TimecodesForm } from "./timecodes-form";

export const LoopBlock = () => {
  return (
    <div className="sm:max-w-md flex flex-col gap-2">
      <div className="mt-1">
        <TimecodesForm />
      </div>
      <LoopOptionsButton />
    </div>
  );
};
