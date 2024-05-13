"use client";

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
    <section className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Loop any YouTube video</h1>
          <p className="py-6">
            Free, beatiful and easy-to-use service for musicians, allowing them
            to loop specific parts of YouTube video.
          </p>

          <input
            type="text"
            placeholder="Video URL"
            className="input input-bordered w-full"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <Link
            href={`/project?videoId=${videoId}`}
            className={`mt-6 btn btn-primary w-full ${
              inputValue && videoId ? "" : "btn-disabled"
            }`}
          >
            Start
          </Link>
        </div>
      </div>
    </section>
  );
}
