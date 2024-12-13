import { createId } from "@/shared/utils/create-id";
import { Project } from "@/core/models";

/** Generates project for local use */
export const generateNewProject = (videoId: string): Project => {
  return {
    id: createId(),
    name: "My Project",
    videoId: videoId,
    bpm: null,
    createdAt: new Date(),
    deletedAt: null,
    description: null,
    isPrivate: true,
    user: {
      id: createId(),
      createdAt: new Date(),
      email: "user@email.com",
      username: "user",
    },
    videoSpeed: "1.00",
  };
};
