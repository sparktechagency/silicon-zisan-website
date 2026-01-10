import ViewProfile from "@/components/job-details/ViewProfile";
import { myFetch } from "@/utils/myFetch";

export default async function page({
  searchParams,
}: {
  searchParams: { profieID: string };
}) {
  const { profieID } = await searchParams;
<<<<<<< HEAD
  //console.log("profieID", profieID);
=======
>>>>>>> ceb4b5c532f5ba14580cf7549592cb374d37f855

  const res = await myFetch(`/job-seekers/single/${profieID}`);

  return (
    <>
      <ViewProfile data={res?.data} />
    </>
  );
}
