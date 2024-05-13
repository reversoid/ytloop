"use client";

import { createNewProject } from "@/entities/project/utils/create-new-project";
import { queryToProject } from "@/features/sync-project-with-query";
import { ProjectPage } from "@/pages/project-page";
import { useSearchParams, useRouter } from "next/navigation";
import { NextRequest } from "next/server";

export default function Page(request: NextRequest) {
  const query = useSearchParams();
  const router = useRouter();

  const videoId = query.get("videoId");

  if (!videoId) {
    return router.replace("/");
  }

  const stringifiedParams = query.toString();

  const project =
    queryToProject(stringifiedParams) || createNewProject(videoId);

  return <ProjectPage project={project} />;
}
