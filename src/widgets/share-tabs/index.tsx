import { projectAtom } from "@/entities/project/model";
import { projectToQuery } from "@/features/sync-project-with-query/utils/transform";
import { Tabs } from "@/shared/ui/tabs";
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
  const [selectedTab, setSelectedTab] = useState<"full" | "selected">("full");
  const project = useAtomValue(projectAtom);
  const { copy, isCopied } = useCopy();

  const [selectedLoops, setSelectedLoops] = useState(
    new Set([...(project?.loops ?? []).map((l) => l.id)])
  );

  return (
    <Tabs
      tabs={[
        {
          title: "Full project",
          selected: selectedTab === "full",
          onSelected: () => setSelectedTab("full"),
          content: (
            <>
              <p className="mt-0">
                The project will have all loops, available in this workspace
              </p>

              <button
                onClick={() => copy(window.location.href)}
                className="btn btn-primary w-40"
              >
                {isCopied ? <IconCheck /> : "Copy link"}
              </button>
            </>
          ),
        },
        {
          title: "Selected loops",
          selected: selectedTab === "selected",
          onSelected: () => setSelectedTab("selected"),
          content: (
            <>
              <p className="mt-0">The project will have only selected loops:</p>

              <form
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
                className="flex flex-col gap-4"
              >
                <div className="flex flex-col gap-1 loops">
                  {project?.loops.map((loop) => (
                    <div
                      key={loop.id}
                      className="form-control max-w-sm bg-base-200 rounded-md px-1"
                    >
                      <label className="label cursor-pointer">
                        <span className="label-text">{loop.name}</span>
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={selectedLoops.has(loop.id)}
                          onChange={(e) =>
                            setSelectedLoops((prev) => {
                              if (e.target.checked) {
                                prev.add(loop.id);
                              } else {
                                prev.delete(loop.id);
                              }

                              return new Set(prev);
                            })
                          }
                        />
                      </label>
                    </div>
                  ))}
                </div>

                <button type="submit" className="btn btn-primary w-40">
                  {isCopied ? <IconCheck /> : "Copy link"}
                </button>
              </form>
            </>
          ),
        },
      ]}
    />
  );
};
