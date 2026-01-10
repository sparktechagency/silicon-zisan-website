import AppliedJobs from "@/components/job-details/AppliedJobs";
import { myFetch } from "@/utils/myFetch";

export default async function page({ params }: { params: { id: string } }) {
  const id = (await params)?.id;
  const res = await myFetch(`/applications/job/${id}`);
<<<<<<< HEAD
  //console.log("res", res);
=======
>>>>>>> ceb4b5c532f5ba14580cf7549592cb374d37f855

  console.log("applications", res);

  return (
    <>
      {res?.data.length > 0 ? (
        <AppliedJobs data={res?.data} />
      ) : (
        <p className="text-center my-4">No Applications</p>
      )}
    </>
  );
}
