import ViewDetailsJobs from "@/components/job-details/ViewDetailsCompany";
import { myFetch } from "@/utils/myFetch";

export default async function page({ params }: { params: { id: string } }) {
  const id = (await params).id;

  const res = await myFetch(`/jobs/single/${id}`, {
    tags: ["single-job"],
  });

  const length = await myFetch(`/applications/job/${id}`);

  return (
    <>
      <ViewDetailsJobs data={res?.data} length={length?.data?.data.length} />
    </>
  );
}
