import dayjs from "dayjs";
import { SubscriptionCancelModal } from "./modal/SuscriptionCancelModal";

export default function MySubscription({ subscriptions }: any) {
  return (
    <>
      <div className="p-4 border border-gray-400 rounded-md bg-card ">
        <div className="space-y-4 grid grid-cols-1 lg:grid-cols-2">
          <div className=" text-white">
            <p className=" mb-2">
              Package Name : {subscriptions?.package?.name || "Basic"}
            </p>
            <p className=" mb-2">Price : €{subscriptions?.price || 0}</p>

            {subscriptions?._id && (
              <>
                <p className=" mb-2">
                  Expiry Date :{" "}
                  {dayjs(subscriptions?.currentPeriodEnd).format("DD-MM-YYYY")}
                </p>
                <p className=" mb-2 capitalize">
                  Payment Status : {subscriptions?.paymentStatus}
                </p>
                {subscriptions?.status === "canceled" ? (
                  <p className="capitalize">Status: Cancelled</p>
                ) : (
                  <p className="capitalize">Status: {subscriptions?.status}</p>
                )}
              </>
            )}
          </div>

          {subscriptions?.status !== "canceled" && subscriptions?._id && (
            <div className="flex justify-end items-end">
              <SubscriptionCancelModal subscriptionId={subscriptions?._id} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
