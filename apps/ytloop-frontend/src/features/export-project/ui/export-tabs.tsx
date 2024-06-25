import { projectAtom } from "@/entities/project/model";
import { projectToQuery } from "@/features/sync-project-with-query/utils/transform";
import { Checkbox, Tab, Tabs } from "@nextui-org/react";
import { useAtomValue } from "jotai";
import { FC, useCallback, useEffect, useState } from "react";

export interface ShareTabsProps {
  onSetLink: (link: string | null) => void;
}

export const ShareTabs: FC<ShareTabsProps> = ({ onSetLink }) => {
  const project = useAtomValue(projectAtom);

  const [selectedLoops, setSelectedLoops] = useState(
    new Set([...(project?.loops ?? []).map((l) => l.id)])
  );

  const getLinkToFullProject = () => {
    return window.location.href;
  };

  const getLinkToSelectedProjectLoops = useCallback(() => {
    if (!project) {
      return null;
    }

    const host = window.location.host;
    const pathname = window.location.pathname;
    const query = projectToQuery({
      ...project,
      loops: project.loops.filter((l) => selectedLoops.has(l.id)),
    });

    const url = `${host}${pathname}?${query}`;

    return url;
  }, [project, selectedLoops]);

  useEffect(() => {
    onSetLink(getLinkToSelectedProjectLoops());
  }, [getLinkToSelectedProjectLoops, onSetLink, selectedLoops]);

  return (
    <Tabs
      onSelectionChange={(k) => {
        if (k === "FULL_PROJECT") {
          onSetLink(getLinkToFullProject());
        } else {
          onSetLink(getLinkToSelectedProjectLoops());
        }
      }}
      size="lg"
    >
      <Tab key="FULL_PROJECT" title="Full project">
        <div className="prose">
          <p className="mt-0">
            Exported project will have all loops, available in this workspace
          </p>
        </div>
      </Tab>

      <Tab key="SELECTED_LOOPS" title="Selected loops">
        <div>
          <p>Exported project will have only selected loops:</p>

          <form className="mt-4 flex flex-col gap-4 max-w-sm">
            <div className="flex flex-col gap-1 loops">
              {project?.loops.map((loop) => (
                <div
                  key={loop.id}
                  className="form-control max-w-sm bg-base-200 rounded-md px-1"
                >
                  <Checkbox
                    size="lg"
                    isSelected={selectedLoops.has(loop.id)}
                    onValueChange={(selected) =>
                      setSelectedLoops((prev) => {
                        if (selected) {
                          prev.add(loop.id);
                        } else {
                          prev.delete(loop.id);
                        }

                        return new Set(prev);
                      })
                    }
                  >
                    {loop.name}
                  </Checkbox>
                </div>
              ))}
            </div>
          </form>
        </div>
      </Tab>
    </Tabs>
  );
};
