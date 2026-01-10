import ViewDetailsJobs from "@/components/job-details/ViewDetailsCompany";
import { myFetch } from "@/utils/myFetch";

export default async function page({ params }: { params: { id: string } }) {
  const id = (await params).id;

  const res = await myFetch(`/jobs/single/${id}`, {
    tags: ["single-job"],
  });

  return (
    <div className="my-16">
      <ViewDetailsJobs data={res?.data} />
    </div>
  );
}
