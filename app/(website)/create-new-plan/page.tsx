import Loading from "@/app/loading";
import CreateNewPlan from "@/components/shift-plan/CreateNewPlan";
import CreateNewPlan2 from "@/components/shift-plan/CreateNewPlan2";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<Loading />}>
      <CreateNewPlan2 />
    </Suspense>
  );
}
