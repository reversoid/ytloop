"use client";

import { Loop, Project } from "@/core/models";
import { generateNewLoop } from "@/entities/project/utils/generate-new-loop";
import { generateNewProject } from "@/entities/project/utils/generate-new-project";
import { queryToProject } from "@/features/sync-project-with-query/utils/transform";
import ProjectScreen from "@/screens/project-screen";
import { useRouter, useSearchParams } from "next/navigation";
import { FC, useMemo, useRef } from "react";

const Page: FC = () => {
  const router = useRouter();
  const searchparams = useSearchParams();
  const checked = useRef(false);

  const videoId = searchparams?.get("videoId");

  const { loops, project }: { project: Project; loops: Loop[] } = useMemo(
    () => {
      return (
        queryToProject(searchparams?.toString() ?? "") || {
          project: generateNewProject(videoId ?? ""),
          loops: [generateNewLoop({ id: 1 })],
        }
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (!videoId && !checked.current) {
    router.replace("/");
    return <></>;
  }

  checked.current = true;

  return <ProjectScreen project={project} loops={loops} />;
};

export default Page;
