import { getProject } from "@/core/api";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProjectScreen from "@/screens/project-screen";

export default async function Page({ params }: { params: { id: string } }) {
  const result = await getProject(params.id).catch(() => null);

  if (result === null) {
    return notFound();
  }

  return (
    <Suspense>
      <ProjectScreen project={result.project} loops={result.loops} />;
    </Suspense>
  );
}
