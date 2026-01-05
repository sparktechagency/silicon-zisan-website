import ViewDetailsPerson from "@/components/job-details/ViewDetailsPerson";
import { myFetch } from "@/utils/myFetch";

export default async function page({ params }: { params: { id: string } }) {
  const id = (await params)?.id;
  const res = await myFetch(`/applications/single/${id}`, {
    tags: ["job-seeker-details"],
  });

  return (
    <>
      <ViewDetailsPerson data={res?.data} />
    </>
  );
}
