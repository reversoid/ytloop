"use client";

import { queryToProject } from "@/features/sync-project-with-query";
import { ProjectPage } from "@/pages/project-page";
import { useParams, useSearchParams } from "next/navigation";
import { NextRequest } from "next/server";

export default function Page(request: NextRequest) {
  const p = useSearchParams();

  const stringifiedParams = p.toString();

  return <ProjectPage project={queryToProject(stringifiedParams)} />;
}
