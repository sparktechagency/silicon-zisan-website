import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

export default function SendMessageModal2({
  item,
  trigger,
  isModalTwoOpen2,
  setIsModalTwoOpen2,
}: {
  trigger?: React.ReactNode;
  isModalTwoOpen2: boolean;
  setIsModalTwoOpen2: (val: boolean) => void;
  item?: any;
}) {
  const handleStatusUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const cancelReason = formData.get("cancel");

    try {
      const res = await myFetch(`/appointments/update/${item}`, {
        method: "PATCH",
        body: {
          status: "Cancelled",
          cancelReason,
        },
      });

      if (res.success) {
        toast.success(res.message);
        setIsModalTwoOpen2(false);
      } else {
        toast.error((res as any)?.error?.[0]?.message);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <Dialog open={isModalTwoOpen2} onOpenChange={setIsModalTwoOpen2}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent className="border border-gray-400/30">
        <h1 className="text-xl">Cancel Reason</h1>

        <form onSubmit={handleStatusUpdate}>
          <div className="mt-6">
            <Textarea
              name="cancel"
              required
              className="h-40 capitalize border border-white/20 rounded"
              placeholder="Enter your message"
            />
          </div>

          <DialogFooter>
            <Button className="w-full btn mt-5" type="submit">
              Send
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
