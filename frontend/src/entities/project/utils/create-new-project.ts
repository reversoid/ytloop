import { createId } from "@/shared/utils/create-id";
import { Project } from "../model";
import { createNewLoop } from "./create-new-loop";

const createProjectId = () => createId(5);

export const createNewProject = (videoId: string): Project => {
  return {
    id: createProjectId(),
    name: "My Project",
    loops: [createNewLoop({ postfixNumber: 1 })],
    videoId: videoId,
  };
};
