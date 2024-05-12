import { IconArrowBadgeDown, IconMinus, IconPlus } from "@tabler/icons-react";

export const TimecodeInput = () => {
  return (
    <label className="form-control w-full max-w-sm mt-2">
      <div className="label">
        <span className="label-text">Start</span>
      </div>
      <div className="gap-2 flex">
        <input
          type="text"
          placeholder="00:00:00"
          className="input input-bordered w-full max-w-xs"
        />
        <div className="flex gap-1">
          <button className="btn btn-square">
            <IconMinus />
          </button>
          <button className="btn btn-square">
            <IconPlus />
          </button>
          <button className="btn btn-square">
            <IconArrowBadgeDown />
          </button>
        </div>
      </div>
    </label>
  );
};
