import { Project, Loop } from "@/core/models";

export type SyncHook = (options: {
  project: Project | null;
  loops: Loop[] | null;
  enabled: boolean;
}) => void;
