import Loading from "@/app/loading";
import CreateNewPlan from "@/components/shift-plan/CreateNewPlan";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<Loading />}>
      <CreateNewPlan />
    </Suspense>
  );
}
