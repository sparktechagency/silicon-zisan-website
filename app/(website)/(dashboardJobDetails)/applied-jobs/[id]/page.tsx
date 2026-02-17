import AppliedJobs from "@/components/job-details/AppliedJobs";
import { myFetch } from "@/utils/myFetch";

export default async function page({ params }: { params: { id: string } }) {
  const id = (await params)?.id;
  const res = await myFetch(`/applications/job/${id}`);

  const limit = res?.data?.hasLimitation;
  const jobs = res?.data?.data || [];
  console.log("jobs", limit);

  return (
    <>
      {jobs.length > 0 ? (
        <AppliedJobs data={jobs} limit={limit} />
      ) : (
        <p className="text-center my-4">No Applications</p>
      )}
    </>
  );
}
