import { projectLoopsAtom } from "@/entities/project/model";
import { workspaceCurrentLoopAtom } from "@/entities/workspace/model";
import { IconSettings } from "@tabler/icons-react";
import { useAtom } from "jotai";
import { useRef, useState } from "react";

export const LoopOptions = () => {
  const [currentLoop, setCurrentLoop] = useAtom(workspaceCurrentLoopAtom);
  const [projectLoops, setProjectLoops] = useAtom(projectLoopsAtom);

  const [name, setName] = useState(currentLoop?.name ?? "");
  const [description, setDescription] = useState(
    currentLoop?.description ?? ""
  );

  const canDelete = projectLoops?.length && projectLoops.length > 1;
  const removeLoop = () => {
    if (!canDelete || !currentLoop) {
      return;
    }

    const currentLoopPosition = projectLoops.findIndex(
      (l) => l.id === currentLoop.id
    );

    setProjectLoops(
      (loops) => loops?.filter((l) => l.id !== currentLoop?.id) ?? null
    );

    setCurrentLoop(
      projectLoops[(currentLoopPosition + 1) % projectLoops.length]
    );
  };

  const editLoop = () => {
    setCurrentLoop((l) => {
      if (!l) {
        return null;
      }
      return { ...l, name, description };
    });
  };

  const dialogRef = useRef<HTMLDialogElement | null>(null);

  return (
    <>
      <button
        onClick={() => dialogRef.current?.showModal()}
        className="btn btn-neutral no-animation"
      >
        Settings <IconSettings />
      </button>

      <dialog ref={dialogRef} className="modal">
        <div className="modal-box w-11/12 max-w-sm">
          <h3 className="font-bold text-lg mt-0">Settings</h3>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              editLoop();
              dialogRef.current?.close();
            }}
            className="form pb-1"
          >
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Loop name</span>
              </div>
              <input
                type="text"
                placeholder="Loop name"
                className="input input-bordered w-full max-w-xs"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>

            <label className="form-control max-w-xs">
              <div className="label">
                <span className="label-text">Description</span>
              </div>
              <textarea
                className="textarea textarea-bordered h-24"
                placeholder="Bio"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </label>

            <div className="flex flex-col gap-3 mt-5">
              <button
                onClick={removeLoop}
                type="button"
                className={`btn btn-error btn-outline ${
                  canDelete ? "" : "btn-disabled"
                }`}
              >
                Remove loop
              </button>
              <button type="submit" className="btn btn-primary w-full">
                Save
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};
