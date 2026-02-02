import { SubscriptionCancelModal } from "./modal/SuscriptionCancelModal";

export default function MySubscription({ subscriptions }: any) {
  return (
    <>
      <div className="p-4 border border-gray-400 rounded-md bg-card flex justify-between items-end">
        <div className="space-y-4">
          <div className=" text-white">
            <p className=" mb-2">
              Package Name : {subscriptions?.package?.name || "Basic"}
            </p>
            <p className=" mb-2">Price : ${subscriptions?.price || 0}</p>

            <>
              {" "}
              <p className=" mb-2">
                Expiry Date :{" "}
                {new Date(subscriptions?.currentPeriodEnd).toLocaleString()}
              </p>
              <p className=" mb-2 capitalize">
                Payment Status : {subscriptions?.paymentStatus}
              </p>
              <p className="capitalize">Status: {subscriptions?.status}</p>
            </>
          </div>
        </div>

        {/* subscritption button */}

        <div>
          <SubscriptionCancelModal subscriptionId={subscriptions?._id} />
        </div>
      </div>
    </>
  );
}
