import { usePathname } from "next/navigation";

const REMOTE_PROJECT_PATHNAME_PATTERN = /\/project\/[a-z0-9]+/i;

export const useIsRemoteProject = () => {
  const v = usePathname();
  const isRemote = REMOTE_PROJECT_PATHNAME_PATTERN.test(v);

  return isRemote;
};
