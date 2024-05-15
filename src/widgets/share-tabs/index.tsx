import { projectAtom } from "@/entities/project/model";
import { projectToQuery } from "@/features/sync-project-with-query/utils/transform";
import { Button, Checkbox, Tab, Tabs } from "@nextui-org/react";
import { IconCheck } from "@tabler/icons-react";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import { useCopyToClipboard } from "usehooks-ts";

const useCopy = () => {
  const [, copy] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCopied(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isCopied]);

  return {
    copy: (value: string) => copy(value).then(() => setIsCopied(true)),
    isCopied,
  };
};

export const ShareTabs = () => {
  const project = useAtomValue(projectAtom);
  const { copy, isCopied } = useCopy();

  const [selectedLoops, setSelectedLoops] = useState(
    new Set([...(project?.loops ?? []).map((l) => l.id)])
  );

  return (
    <Tabs size="lg">
      <Tab title="Full project">
        <div className="prose">
          <p className="mt-0">
            The project will have all loops, available in this workspace
          </p>

          <Button
            size="lg"
            onClick={() => copy(window.location.href)}
            fullWidth
            className="mt-4 max-w-sm"
            color="primary"
          >
            {isCopied ? <IconCheck /> : "Copy link"}
          </Button>
        </div>
      </Tab>

      <Tab title="Selected loops">
        <div>
          <p>The project will have only selected loops:</p>

          <form
            className="mt-2 flex flex-col gap-4 max-w-sm"
            onSubmit={(e) => {
              e.preventDefault();
              if (!project) {
                return;
              }

              const host = window.location.host;
              const pathname = window.location.pathname;
              const query = projectToQuery({
                ...project,
                loops: project.loops.filter((l) => selectedLoops.has(l.id)),
              });

              const url = `${host}${pathname}?${query}`;

              copy(url);
            }}
          >
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

            <Button color="primary" size="lg" fullWidth type="submit">
              {isCopied ? <IconCheck /> : "Copy link"}
            </Button>
          </form>
        </div>
      </Tab>
    </Tabs>
  );
};
