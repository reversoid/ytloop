import { projectAtom, projectLoopsAtom } from "@/entities/project/model";
import { useAtomValue } from "jotai";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { projectToQuery } from "./transform";
import { Project } from "@/core/models";

/** Syncs project with query params */
export const useSyncProjectWithQueryParams = (project: Project): Project => {
  const savedProject = useAtomValue(projectAtom);
  const savedLoops = useAtomValue(projectLoopsAtom);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (savedProject && savedLoops) {
      const query = projectToQuery(savedProject, savedLoops);
      router.replace(pathname?.split("?")[0] + `?${query}`, { scroll: false });
    }
  }, [savedProject, savedLoops, pathname, router]);

  return savedProject! ?? project;
};
