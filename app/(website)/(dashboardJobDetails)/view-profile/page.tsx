import ViewProfile from "@/components/job-details/ViewProfile";
import { myFetch } from "@/utils/myFetch";

export default async function page({
  searchParams,
}: {
  searchParams: { profieID: string };
}) {
  const { profieID } = await searchParams;
  console.log("profieID", profieID);

  const res = await myFetch(`/job-seekers/single/${profieID}`);

  return (
    <>
      <ViewProfile data={res?.data} />
    </>
  );
}
