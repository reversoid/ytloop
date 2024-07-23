import { getProjectPermission } from "@/core/api";
import { Project } from "@/core/models";
import { currentUserAtom } from "@/entities/user";
import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

export const useProjectPermission = (projectId: Project["id"]) => {
  const currentUser = useAtomValue(currentUserAtom);

  const { data } = useQuery({
    queryKey: ["project-permission", projectId, currentUser?.id],
    queryFn: () => getProjectPermission(projectId),
  });

  return data?.permission;
};
