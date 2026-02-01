import { SubscriptionCancelModal } from "./modal/SuscriptionCancelModal";

// type Package = {
//   package: {
//     name: string;
//     interval: string;
//   };
//   price: string;
//   status: string;
//   paymentStatus: string;
//   currentPeriodEnd: string;
//   _id: string;
//   length: number;
// };

export default function MySubscription({ subscriptions }: any) {
  console.log("subscriptions", subscriptions);

  // if (subscriptions === null) return <p>No subscriptions found.</p>;

  return (
    <>
      <div className="p-4 border border-gray-400 rounded-md bg-card flex justify-between items-end">
        <div className="space-y-4">
          <div className=" text-white">
            <p className=" mb-2">
              Package Name : {subscriptions?.package?.name || "Basic"}
            </p>
            <p className=" mb-2">Price : ${subscriptions?.price || 0}</p>
            {!subscriptions === null && (
              <>
                {" "}
                <p className=" mb-2">
                  Period End :{" "}
                  {new Date(subscriptions?.currentPeriodEnd).toLocaleString()}
                </p>
                <p className=" mb-2 capitalize">
                  Payment Status : {subscriptions?.paymentStatus}
                </p>
                <p className="capitalize">Status: {subscriptions?.status}</p>
              </>
            )}
          </div>
        </div>

        {/* subscritption button */}
        {!subscriptions === null && (
          <div>
            <SubscriptionCancelModal subscriptionId={subscriptions?._id} />
          </div>
        )}
      </div>
    </>
  );
}
