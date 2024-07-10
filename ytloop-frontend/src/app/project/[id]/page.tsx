import { getProject } from "@/core/api";
import { Suspense } from "react";
import { PageContent } from "./_page-content";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const result = await getProject(params.id).catch(() => null);

  if (result === null) {
    return notFound();
  }

  return (
    <Suspense>
      <PageContent project={result.project} loops={result.loops} />;
    </Suspense>
  );
}
