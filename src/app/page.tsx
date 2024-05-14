"use client";

import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";

const useVideoId = (str: string) => {
  const regex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\s*[^\/\n\s]+\/|embed\/|v\/|watch\?v=)|youtu\.be\/)([^"&?\/\s]{11})/gi;

  const match = regex.exec(str);

  return match ? match[1] : null;
};

export default function Home() {
  const [inputValue, setInputValue] = useState("");

  const videoId = useVideoId(inputValue);

  return (
    <section className="h-screen">
      <div className="flex items-center justify-center h-full">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-center">
            Loop any YouTube video
          </h1>
          <p className="py-6 text-center">
            Free, beatiful and easy-to-use service for musicians, allowing them
            to loop specific parts of YouTube video.
          </p>

          <Input
            size="lg"
            placeholder="Video URL"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <Button
            href={`/project?videoId=${videoId}`}
            isDisabled={!(inputValue && videoId)}
            color="primary"
            className="mt-5"
            fullWidth
            size="lg"
            as={"a"}
          >
            Start
          </Button>
        </div>
      </div>
    </section>
  );
}
