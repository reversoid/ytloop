import { LoopOptions } from "./ui/loop-options";
import { TimecodesForm } from "./ui/timecodes-form";

export const LoopBlock = () => {
  return (
    <div className="sm:max-w-md flex flex-col gap-2">
      <div className="mt-1">
        <TimecodesForm />
      </div>
      <LoopOptions />
    </div>
  );
};
