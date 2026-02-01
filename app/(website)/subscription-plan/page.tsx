import SubscriptionPlan from "@/components/dashboard/dashboardSubscription/SubscriptionPlan";
import { myFetch } from "@/utils/myFetch";

export default async function page() {
  const res = await myFetch("/packages");

  const gift = await myFetch("/subscriptions/me", {
    tags: ["subscription"],
  });
  return (
    <>
      <SubscriptionPlan data={res?.data} name={gift?.data?.package?.name} />
    </>
  );
}
