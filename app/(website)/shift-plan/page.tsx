import ShiftPlan from "@/components/shift-plan/ShiftPlan";
import { myFetch } from "@/utils/myFetch";

export default async function ShiftPlanpage() {
  const res = await myFetch("/shift-plans/me", {
    tags: ["shift-plan"],
  });
  return (
    <>
      <ShiftPlan data={res?.data} />
    </>
  );
}
