import { projectLoopsAtom } from "@/entities/project/model";
import { isLoopValid } from "@/entities/project/utils/is-loop-valid";
import { workspaceCurrentLoopAtom } from "@/entities/workspace/model";
import { loopColorHash } from "@/shared/utils/loop-color-hash";
import { Card, CardBody } from "@nextui-org/react";
import { useAtom, useAtomValue } from "jotai";
import { FC, useMemo } from "react";
import { TimelineLoop } from "./ui/timeline-loop";
import { VideoLine } from "./ui/video-line";
import { organizeLoopsIntoGrid } from "./utils/organize-loops-into-grid";

export const Timeline: FC = () => {
  const videoLength = 226;

  const loops = useAtomValue(projectLoopsAtom);

  const loopsGrid = useMemo(() => {
    return organizeLoopsIntoGrid(loops ?? []);
  }, [loops]);

  const [currentLoop, setCurrentLoop] = useAtom(workspaceCurrentLoopAtom);

  return (
    <div>
      <div className="w-full flex flex-col gap-4 overflow-x-scroll">
        <VideoLine />

        <div className="flex flex-col gap-4">
          {loopsGrid.map((loopsRow, index) => (
            <div className="w-full flex relative h-4" key={index}>
              {loopsRow.map((loop) => (
                <TimelineLoop loop={loop} key={loop.id} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {loops
          ?.filter(isLoopValid)
          .sort((a, b) => a.from - b.from)
          .map((loop) => (
            <Card
              className={`bg-zinc-800 hover:bg-zinc-700 ${
                currentLoop?.id === loop.id ? "bg-primary hover:bg-primary" : ""
              }`}
              key={loop.id}
            >
              <CardBody as={"button"} onClick={() => setCurrentLoop(loop)}>
                <div key={loop.id} className="flex gap-2 items-center">
                  <div
                    style={{ background: loopColorHash.hex(loop.id) }}
                    className="w-2 h-2 rounded-lg"
                  ></div>

                  <p>{loop.name}</p>
                </div>
              </CardBody>
            </Card>
          ))}
      </div>
    </div>
  );
};
