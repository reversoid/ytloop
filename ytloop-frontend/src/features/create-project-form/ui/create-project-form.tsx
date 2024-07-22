"use client";

import { Button, Input } from "@nextui-org/react";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { extractVideoIdFromUrl } from "../utils/extract-video-id";
import { YT_VIDEO_PATTERN } from "../utils/video-id-pattern";
import { createLoop, createProject } from "@/core/api";
import { useRouter } from "next/navigation";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "@/entities/user";

export const CreateProjectForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<{ videoUrl: string }>();

  const router = useRouter();

  const currentUser = useAtomValue(currentUserAtom);

  return (
    <form
      className="flex flex-col gap-5"
      onSubmit={handleSubmit(async ({ videoUrl }) => {
        const videoId = extractVideoIdFromUrl(videoUrl)!;

        if (currentUser === null) {
          return router.push(`/project?videoId=${videoId}`);
        } else if (currentUser) {
          const { project } = await createProject({
            videoId,
            name: "New project",
          });

          await createLoop(project.id, { name: "New Loop 1" });

          router.push(`/project/${project.id}`);
        }
      })}
    >
      <Input
        size="lg"
        placeholder="Video URL"
        {...register("videoUrl", { pattern: YT_VIDEO_PATTERN, required: true })}
      />

      <Button
        type="submit"
        isDisabled={!isValid}
        isLoading={isSubmitting}
        color="primary"
        fullWidth
        size="lg"
      >
        Start
      </Button>
    </form>
  );
};
