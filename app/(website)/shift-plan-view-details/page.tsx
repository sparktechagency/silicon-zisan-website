import ShiftPlanDetails from "@/components/shift-plan/ShiftPlanDetails";
import { myFetch } from "@/utils/myFetch";

export default async function page({
  searchParams,
}: {
  searchParams: { details: string };
}) {
  const { details } = await searchParams;

  const res = await myFetch(`/shift-plans/single/${details}`);

  return (
    <>
      <ShiftPlanDetails details={res?.data} />
    </>
  );
}
