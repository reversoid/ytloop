"use client";

import ProjectScreen from "@/screens/project-screen";
import { projectAtom, projectLoopsAtom } from "@/entities/project/model";
import { generateNewProject } from "@/entities/project/utils/generate-new-project";
import { workspaceCurrentLoopAtom } from "@/entities/workspace/model";
import { queryToProject } from "@/features/sync-project-with-query/utils/transform";
import { useHydrateAtoms } from "jotai/utils";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { FC, Suspense, useMemo } from "react";
import { getProject } from "@/core/api";
import { generateNewLoop } from "@/entities/project/utils/generate-new-loop";
import { Loop, Project } from "@/core/models";

export const PageContent: FC<{ project: Project; loops: Loop[] }> = ({
  loops,
  project,
}) => {
  //   const router = useRouter();
  //   const searchparams = useSearchParams();

  //   const params = useParams();
  //   const videoId = searchparams?.get("videoId");

  //   const { loops, project }: { project: Project; loops: Loop[] } = useMemo(
  //     () => {
  //       return (
  //         queryToProject(searchparams?.toString() ?? "") || {
  //           project: generateNewProject(videoId ?? ""),
  //           loops: [generateNewLoop({ id: 1 })],
  //         }
  //       );
  //     },
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //     []
  //   );

  useHydrateAtoms([
    [projectAtom, project],
    [projectLoopsAtom, loops],
    [workspaceCurrentLoopAtom, loops[0]],
  ]);

  // if (!videoId) {
  //   router.replace("/");
  //   return <></>;
  // }

  return <ProjectScreen />;
};
