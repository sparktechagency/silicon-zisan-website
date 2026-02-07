import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
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

  return (
    <Dialog onOpenChange={handleOpenChange}>
      {/* Trigger Button */}
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="bg-white text-gray-800  p-6 rounded-lg  border border-white/10 shadow-lg sm:max-w-xl w-[40vw]">
        <div>
          <div className="rounded-xl flex gap-4">
            {/* Profile Image */}
            <CustomImage
              src={item?.receiver?.image}
              title={item?.receiver?.name}
              className="sm:w-20 sm:h-20 rounded-full object-cover border-2 border-gray-700"
            />

            {/* Info Section */}
            <div>
              <h3 className="sm:text-xl font-semibold">
                {item?.receiver?.name}
              </h3>

              <div className="text-sm flex items-center gap-2">
                <span className="sm:text-xl">
                  {dayjs(item?.scheduledAt).format("YYYY-MM-DD")}
                </span>
                <span className="sm:text-xl">{item?.time}</span>
              </div>

              <div className="flex items-center gap-1">
                <Clock4 size={18} />
                <span className="sm:text-xl">
                  {dayjs(item.scheduledAt).format("HH:mm") || "No Time  "}
                </span>
              </div>

              <p>{item?.message}</p>
            </div>
          </div>
        </div>

        {/* <hr className="bg-green-950 my-5" /> */}
        {/* 
        <Button className="custom-btn py-2" onClick={handleClickModalTwo}>
          Reply
        </Button> */}

        <Button
          disabled={!showInbox}
          onClick={() => handleInbox(chatId)}
          className="custom-btn py-2 w-full"
        >
          Inbox
        </Button>
      </DialogContent>
    </Dialog>
  );
}
