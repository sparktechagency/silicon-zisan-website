import Subscriptions from "@/components/subscriptions/Subscriptions";
import { myFetch } from "@/utils/myFetch";

export default async function SubscriptionsPage() {
  const res = await myFetch("/packages");

  return (
    <div className="my-16">
      <Subscriptions res={res?.data} />
    </div>
  );
}
