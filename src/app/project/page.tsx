"use client";

import { projectAtom } from "@/entities/project/model";
import { createNewProject } from "@/entities/project/utils/create-new-project";
import { workspaceCurrentLoopAtom } from "@/entities/workspace/model";
import {
  projectToQuery,
  queryToProject,
} from "@/features/sync-project-with-query/utils/transform";
import ProjectPage from "@/_pages/project-page";
import { useHydrateAtoms } from "jotai/utils";
import { useRouter, useSearchParams } from "next/navigation";
import QueryString from "qs";
import { useMemo } from "react";

export default function Page() {
  const router = useRouter();
  const params = useSearchParams();
  const videoId = params?.get("videoId");

  const project = useMemo(
    () => {
      return (
        queryToProject(params?.toString() ?? "") ||
        createNewProject(videoId ?? "")
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useHydrateAtoms([
    [projectAtom, project],
    [workspaceCurrentLoopAtom, project.loops[0]],
  ]);

  if (!videoId) {
    return router.replace("/");
  }

  return <ProjectPage />;
}
