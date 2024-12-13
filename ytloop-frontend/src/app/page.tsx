import { CreateProjectForm } from "@/features/create-project-form";

export default function Home() {
  return (
    <section className="h-full">
      <div className="flex items-center justify-center h-full">
        <div className="max-w-md px-3">
          <h1 className="text-5xl font-bold text-center">Loop YouTube video</h1>
          <p className="py-6 text-center">
            Free, beatiful and easy-to-use service for musicians, allowing them
            to loop specific parts of YouTube video.
          </p>

          <CreateProjectForm />
        </div>
      </div>
    </section>
  );
}
