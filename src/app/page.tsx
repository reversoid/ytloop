import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
            placeholder="URL or video ID"
            className="input input-bordered w-full"
          />
          <Link href="/project" className="mt-6 btn btn-primary w-full">
            Start
          </Link>
        </div>
      </div>
    </section>
  );
}
