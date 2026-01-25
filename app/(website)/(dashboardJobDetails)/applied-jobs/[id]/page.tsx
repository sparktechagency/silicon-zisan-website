import AppliedJobs from "@/components/job-details/AppliedJobs";
import { myFetch } from "@/utils/myFetch";

export default async function page({ params }: { params: { id: string } }) {
  const id = (await params)?.id;
  const res = await myFetch(`/applications/job/${id}`);

  return (
    <>
      {res?.data?.data?.length > 0 ? (
        <AppliedJobs data={res?.data?.data} />
      ) : (
        <p className="text-center my-4">No Applications</p>
      )}
    </>
  );
}
