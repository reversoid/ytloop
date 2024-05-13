"use client";

import { projectAtom } from "@/entities/project/model";
import { createNewProject } from "@/entities/project/utils/create-new-project";
import { workspaceCurrentLoopAtom } from "@/entities/workspace/model";
import { queryToProject } from "@/features/sync-project-with-query/utils/transform";
import { ProjectPage } from "@/pages/project-page";
import { useHydrateAtoms } from "jotai/utils";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export default function Page({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const router = useRouter();
  const videoId = searchParams["videoId"];

  const stringifiedParams = new URLSearchParams(searchParams).toString();

  const project = useMemo(
    () => queryToProject(stringifiedParams) || createNewProject(videoId ?? ""),
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
