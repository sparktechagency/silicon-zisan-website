import ShiftPlan from "@/components/shift-plan/ShiftPlan";
import { myFetch } from "@/utils/myFetch";

interface ShiftPlanPageProps {
  searchParams?: {
    shift?: string;
    startDate?: string;
    endDate?: string;
  };
}

export default async function ShiftPlanPage({
  searchParams,
}: ShiftPlanPageProps) {
  const {
    shift = "",
    startDate = "",
    endDate = "",
  } = (await searchParams) || {};

  const params = new URLSearchParams();
  if (shift) params.append("shift", shift);
  if (startDate) params.append("startDate", startDate);
  if (endDate) params.append("endDate", endDate);

  console.log("startDate", startDate);
  console.log("params", params.toString());

  const url = params.toString()
    ? `/shift-plans/me?${params.toString()}`
    : `/shift-plans/me`;

  console.log("url", url);

  // ✅ Fetch data on the server
  const data = await myFetch(url);
  console.log("data", data);

  return (
    <div className="relative">
      <ShiftPlan data={data?.data} />
    </div>
  );
}
