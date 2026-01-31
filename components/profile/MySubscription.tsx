"use client";

import { useEffect, useState } from "react";
import { myFetch } from "@/utils/myFetch";
import { SubscriptionCancelModal } from "./modal/SuscriptionCancelModal";

type Package = {
  package: {
    name: string;
    interval: string;
  };
  price: string;
  status: string;
  paymentStatus: string;
  currentPeriodEnd: string;
  _id: string;
  length: number;
};

export default function MySubscription() {
  const [subscriptions, setSubscriptions] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await myFetch("/subscriptions/me", {
          tags: ["subscription"],
        });

        if (res.success) {
          setSubscriptions(res.data || []);
        } else {
          setSubscriptions(null);
          console.error(res.error);
        }
      } catch (err) {
        console.error(err);
        setSubscriptions(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (subscriptions === null) return <p>No subscriptions found.</p>;

  return (
    <>
      {subscriptions.length > 0 ? (
        <div className="p-4 border border-gray-400 rounded-md bg-card flex justify-between items-end">
          <div className="space-y-4">
            <div className=" text-white">
              <p className=" mb-2">
                Package Name : {subscriptions?.package?.name}
              </p>
              <p className=" mb-2">Price : ${subscriptions?.price}</p>
              <p className=" mb-2">
                Period End :{" "}
                {new Date(subscriptions?.currentPeriodEnd).toLocaleString()}
              </p>
              <p className=" mb-2 capitalize">
                Payment Status : {subscriptions?.paymentStatus}
              </p>
              <p className="capitalize">Status: {subscriptions?.status}</p>
            </div>
          </div>

          {/* subscritption button */}
          <div>
            <SubscriptionCancelModal subscriptionId={subscriptions?._id} />
          </div>
        </div>
      ) : (
        <p className="text-xl text-center">No subscriptions found.</p>
      )}
    </>
  );
}
