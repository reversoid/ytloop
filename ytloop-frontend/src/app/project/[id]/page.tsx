"use client";

import ProjectScreen from "@/screens/project-screen";
import { projectAtom } from "@/entities/project/model";
import { createNewProject } from "@/entities/project/utils/create-new-project";
import { workspaceCurrentLoopAtom } from "@/entities/workspace/model";
import { queryToProject } from "@/features/sync-project-with-query/utils/transform";
import { useHydrateAtoms } from "jotai/utils";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";

const PageContent = () => {
  const router = useRouter();
  const searchparams = useSearchParams();

  const params = useParams();
  const videoId = searchparams?.get("videoId");

  const project = useMemo(
    () => {
      return (
        queryToProject(searchparams?.toString() ?? "") ||
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

  // if (!videoId) {
  //   router.replace("/");
  //   return <></>;
  // }

  return <ProjectScreen />;
};

export default async function Page() {
  await new Promise<string>((resolve) =>
    setTimeout(() => resolve("bober"), 10_000)
  );

  return (
    <Suspense>
      <PageContent />
    </Suspense>
  );
}
