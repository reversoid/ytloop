import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="prose flex justify-center items-center max-w-none pt-10">
      <div className="welcome flex flex-col justify-center items-center w-96 bg-base-200 px-3 py-5 rounded-lg">
        <h1 className="text-center">Loop any youtube video</h1>

        <input
          type="text"
          placeholder="Enter url or video ID"
          className="input input-bordered w-full"
        />

        <Link className="mt-7 btn btn-neutral w-full" href="/project">
          Continue
        </Link>
      </div>
    </section>
  );
}
