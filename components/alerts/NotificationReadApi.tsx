"use client";
import { myFetch } from "@/utils/myFetch";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { revalidate } from "@/utils/revalidateTag";

export default function NotificationReadApi() {
  const handleReadNotifications = async () => {
    try {
      const res = await myFetch(`/notifications/read-all`, {
        method: "PATCH",
      });

      if (res.success) {
        toast.success(res.message);
        await revalidate("allRead");
      } else {
        toast.error((res as any)?.error[0].message);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    }
  };
  return (
    <>
      <Button onClick={handleReadNotifications} className="custom-btn">
        All Read
      </Button>
    </>
  );
}
