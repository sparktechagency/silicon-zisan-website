import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import dayjs from "dayjs";
import CustomImage from "@/utils/CustomImage";
import { myFetch } from "@/utils/myFetch";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Clock4 } from "lucide-react";
import { useRef, useState } from "react";
interface CancelModalProps {
  trigger?: React.ReactNode;
  item?: any;
  chatId: any;
}

export default function EmployeeDetailsModal({
  trigger,
  item,
  chatId,
}: CancelModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showInbox, setShowInbox] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleOpenChange = (open: boolean) => {
    const params = new URLSearchParams(searchParams.toString());

    if (open) {
      params.set("id", item?.receiver?._id);

      // ⏳ 1 second delay
      timerRef.current = setTimeout(() => {
        setShowInbox(true);
      }, 1000);
    } else {
      params.delete("id");

      // reset state
      setShowInbox(false);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleInbox = async (id: string) => {
    try {
      const res = await myFetch(`/chats/create`, {
        method: "POST",
        body: {
          participants: [id],
        },
      });
      if (res.success) {
        router.push(`/inbox?id=${id}`);
      } else {
        toast.error((res as any)?.error[0]?.message);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "something went wrong",
      );
    }
  };

  // console.log("sfbsfbsfbsfb =======>", item);

  return (
    <Dialog onOpenChange={handleOpenChange}>
      {/* Trigger Button */}
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="bg-card text-white p-6 rounded-xl border border-gray-800/60 shadow-lg sm:w-[40vw] xl:w-[30vw] transition-all">
        <DialogTitle className="sr-only">Employee Details</DialogTitle>
        <div>
          <div className="rounded-xl flex flex-col sm:grid sm:grid-cols-[auto_1fr] gap-4 sm:gap-6 items-start">
            {/* Profile Image */}
            <div className="flex justify-center sm:justify-start">
              <CustomImage
                src={item?.receiver?.image}
                title=""
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border border-gray-600 shadow-sm"
              />
            </div>

            {/* Info Section */}
            <div className="w-full">
              <h3 className="text-lg sm:text-xl font-semibold notranslate text-gray-100 tracking-wide text-center sm:text-left">
                {item?.receiver?.name}
              </h3>

              <div className="mt-3 flex flex-col gap-2 text-sm sm:text-base text-gray-300">
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <span className="font-medium text-gray-200">
                    {dayjs(item?.scheduledAt).format("DD-MM-YYYY")}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="font-medium text-gray-200">
                    {item?.time}
                  </span>
                </div>

                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <Clock4 size={18} className="text-gray-400" />
                  <span className="font-medium text-gray-200">
                    {dayjs(item.scheduledAt).format("HH:mm") || "No Time"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="mt-4">
          <p className="text-sm sm:text-base whitespace-pre-wrap text-gray-300 italic">
            {item?.address && item.address.trim() !== ""
              ? `An Appointment Is Available For You. Kindly Confirm It In Your JobsinApp Account. Please Come To ${item.address}.`
              : "An appointment is available for you. Kindly confirm it in your JobsinApp Account and share your active contact number. We will call you."}
          </p>
        </div> */}

        <div className="mt-4 bg-gray-800/20 p-3 rounded-lg border-l-2 border-gray-600">
          <p>Instructions:</p>
          <p className="text-sm sm:text-base whitespace-pre-wrap text-gray-300 italic">
            {item?.message || "No message provided."}
          </p>
        </div>

        <Button
          disabled={!showInbox}
          onClick={() => handleInbox(chatId)}
          className="custom-btn py-2 w-full mt-4 font-semibold text-white shadow-sm transition-all"
        >
          Inbox
        </Button>
      </DialogContent>
    </Dialog>
  );
}
