import { Project, project as projectAtom } from "@/entities/project/model";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { projectToQuery } from "./transform";
import { usePathname, useRouter } from "next/navigation";

/** Syncs project with query params */
export const useSyncProject = (project: Project) => {
  const [savedProject, setProject] = useAtom(projectAtom);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setProject(project);
  }, [project, setProject]);

  useEffect(() => {
    if (savedProject) {
      const query = projectToQuery(savedProject);
      router.replace(pathname.split("?")[0] + `?${query}`);
    }
  }, [savedProject, pathname, router]);

  return savedProject ?? project;
};
