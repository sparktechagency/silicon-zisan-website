import EditJobPost from "@/components/job-details/post-job-form/EditjobPost";
import { myFetch } from "@/utils/myFetch";

export default async function page({ params }: { params: { id: string } }) {
  const id = (await params)?.id;
  const res = await myFetch(`/jobs/single/${id}`);

  return (
    <div className="max-w-5xl mx-auto my-10">
      <EditJobPost data={res?.data} />
    </div>
  );
}
