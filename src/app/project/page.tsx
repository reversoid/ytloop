"use client";

import { createNewProject } from "@/entities/project/utils/create-new-project";
import { queryToProject } from "@/features/sync-project-with-query/utils/transform";
import { ProjectPage } from "@/pages/project-page";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const query = useSearchParams();
  const router = useRouter();

  const videoId = query.get("videoId");

  const stringifiedParams = query.toString();

  const [project] = useState(
    queryToProject(stringifiedParams) || createNewProject(videoId ?? "")
  );

  if (!videoId) {
    return router.replace("/");
  }

  return <ProjectPage project={project} />;
}
