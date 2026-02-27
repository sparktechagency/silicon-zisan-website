"use client";
import Container from "@/share/Container";
import { Bell, Settings } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import NotificationReadApi from "./NotificationReadApi";
import { useRouter } from "next/navigation";
import { myFetch } from "@/utils/myFetch";
import { revalidate } from "@/utils/revalidateTag";

export default function Alerts({ res }: any) {
  const router = useRouter();

  const handleClickNotification = async (item: any) => {
    // Mark as read first
    const res = await myFetch(`/notifications/read/${item._id}`, {
      method: "PATCH",
    });

    if (res?.success) {
      revalidate("Notification");
    }

    // Navigate only for JOB_SEEKER_ALERT
    if (item.type === "JOB_SEEKER_ALERT") {
      router.push(`/view-profile?profieID=${item.referenceId}&check=true`);
    }
  };

  return (
    <Container className="my-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
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
              onClick={() => handleClickNotification(item)}
              className={`flex items-center justify-between  p-4 rounded border cursor-pointer border-gray-300/30
             
              ${item.isRead === false ? "bg-gray-600" : ""}`}
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
