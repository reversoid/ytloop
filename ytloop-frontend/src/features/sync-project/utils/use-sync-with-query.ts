import { useEffect } from "react";
import { SyncHook } from "./types";
import { usePathname, useRouter } from "next/navigation";
import { projectToQuery } from "./query-transforms";

export const useSyncWithQuery: SyncHook = ({ project, loops, enabled }) => {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!enabled) {
      return;
    }

    if (project && loops) {
      const query = projectToQuery(project, loops);
      router.replace(pathname?.split("?")[0] + `?${query}`, { scroll: false });
    }
  }, [project, loops, pathname, router]);
};
