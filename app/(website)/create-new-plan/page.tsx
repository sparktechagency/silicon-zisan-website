import Loading from "@/app/loading";
// import CreateNewPlan from "@/components/shift-plan/CreateNewPlan";
import CreateNewPlan2 from "@/components/shift-plan/CreateNewPlan2";
import { myFetch } from "@/utils/myFetch";
import { Suspense } from "react";

export default async function page({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const { id } = await searchParams;
  const res = await myFetch("/workers/me");
  const editData = await myFetch(`/shift-plans/single/${id}`);

  console.log("editData");

  return (
    <Suspense fallback={<Loading />}>
      <CreateNewPlan2 employee={res?.data} editData={editData?.data} />
    </Suspense>
  );
}
