import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import dayjs from "dayjs";
import CustomImage from "@/utils/CustomImage";
import { myFetch } from "@/utils/myFetch";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
interface CancelModalProps {
  trigger?: React.ReactNode;

  item?: any;
}

export default function EmployeeDetailsModal({
  trigger,

  item,
}: CancelModalProps) {
  const router = useRouter();

  const handleInbox = async (appointmentId: string) => {
    const res = await myFetch(`/chats/create`, {
      method: "POST",
      body: {
        participants: [appointmentId],
      },
    });

    try {
      if (res.success) {
        router.push(`/inbox`);
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
    <Dialog>
      {/* Trigger Button */}
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="bg-white text-gray-800  p-6 rounded-lg  border border-white/10 shadow-lg sm:max-w-xl ">
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
              <p>{item?._id}</p>

              <div className="text-sm flex items-center gap-2">
                <span className="sm:text-xl">
                  {dayjs(item?.scheduledAt).format("YYYY-MM-DD")}
                </span>
                <span className="sm:text-xl">{item?.time}</span>
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
          onClick={() => handleInbox(item?.receiver?._id)}
          className="custom-btn py-2 w-full"
        >
          Inbox
        </Button>
      </DialogContent>
    </Dialog>
  );
}
