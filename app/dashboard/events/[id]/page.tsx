import WorkshopDetailPage from "../workshop/page";

export function generateStaticParams() {
  return [{ id: "workshop" }, { id: "1" }];
}

export default async function EventByIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await params;
  return <WorkshopDetailPage />;
}
