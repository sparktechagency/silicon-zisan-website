import Subscriptions from "@/components/subscriptions/Subscriptions";
import { myFetch } from "@/utils/myFetch";

export default async function SubscriptionsPage() {
  const res = await myFetch("/packages");
  const gift = await myFetch("/subscriptions/me", {
    tags: ["subscription"],
  });

  return (
    <div className="my-16">
      <Subscriptions res={res?.data} giftSubscription={gift?.data} />
    </div>
  );
}
