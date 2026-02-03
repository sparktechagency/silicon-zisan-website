"use client";
import Container from "@/share/Container";
import { Bell, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import NotificationReadApi from "./NotificationReadApi";
import { useRouter } from "next/navigation";
import { myFetch } from "@/utils/myFetch";

export default function Alerts({ res }: any) {
  const router = useRouter();
  const handleClickNotification = async (id: string) => {
    router.push(`/view-details-person/${id}`);
    await myFetch(`/notifications/read/${id}`, {
      method: "PATCH",
    });
  };

  return (
    <Container className="my-16">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">All Alerts</h1>

        <div className="flex gap-3">
          <NotificationReadApi />
          <Link href="/alert-setting">
            <Button className="flex items-center gap-2 custom-btn px-1 py-3 ">
              <Settings size={28} />
              Settings
            </Button>
          </Link>
        </div>
      </div>
      {res?.data?.data.length > 0 ? (
        res?.data?.data?.map((item: any) => (
          <div key={item?._id} className="mb-4">
            {/* Transaction Info */}
            <div
              onClick={
                item.type === "JOB_SEEKER_ALERT"
                  ? () => handleClickNotification(item?.referenceId)
                  : undefined
              }
              className={`flex items-center justify-between bg-card p-4 rounded border border-gray-300/30 ${item.type === "JOB_SEEKER_ALERT" && "cursor-pointer"}${
                item.isRead === false ? "bg-gray-600" : ""
              }`}
            >
              <div className={``}>
                <p className="text-lg flex gap-3 items-center font">
                  <Bell />
                  {item.message}
                </p>
              </div>

              <div className="flex space-x-2">
                <button className="p-1 rounded hover:bg-gray-500 transition cursor-pointer">
                  {item?.timeAgo}
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-lg">Notifications Not Found</p>
      )}
    </Container>
  );
}
