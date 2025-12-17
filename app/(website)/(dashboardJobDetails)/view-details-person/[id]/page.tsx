import ViewDetailsPerson from "@/components/job-details/ViewDetailsPerson";
import { myFetch } from "@/utils/myFetch";

export default async function page({ params }: { params: { id: string } }) {
  const id = (await params)?.id;
  const res = await myFetch(`/job-seekers/single/${id}`);

  return (
    <>
      <ViewDetailsPerson data={res?.data} />
    </>
  );
}
