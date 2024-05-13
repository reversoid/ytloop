import { Project, projectAtom as projectAtom } from "@/entities/project/model";
import { useAtomValue } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { projectToQuery } from "./transform";

/** Syncs project with query params */
export const useSyncProjectWithQueryParams = (project: Project): Project => {
  const savedProject = useAtomValue(projectAtom);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (savedProject) {
      const query = projectToQuery(savedProject);
      router.replace(pathname?.split("?")[0] + `?${query}`);
    }
  }, [savedProject, pathname, router]);

  return savedProject! ?? project;
};
