import { getCurrentUser } from "@/core/api";
import { currentUserAtom } from "@/entities/user";
import { useQuery } from "@tanstack/react-query";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

export const useGetCurrentUser = () => {
  const { data, error } = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
  });

  const setCurrentUser = useSetAtom(currentUserAtom);

  useEffect(() => {
    if (data?.user) {
      setCurrentUser(data.user);
    }
  }, [data]);

  useEffect(() => {
    if (error?.message === "UNAUTHORIZED") {
      return setCurrentUser(null);
    }
  }, [error]);
};
