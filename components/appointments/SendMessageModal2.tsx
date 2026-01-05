import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { myFetch } from "@/utils/myFetch";

export default function SendMessageModal2({
  item,
  trigger,
  isModalTwoOpen2,
  setIsModalTwoOpen2,
}: {
  trigger?: React.ReactNode;
  isModalTwoOpen2: any;
  setIsModalTwoOpen2: any;
  item?: any;
}) {
  const handleStatusUpdate = async (id: string) => {
    try {
      const res = await myFetch(`/appointments/update/${id}`, {
        method: "PATCH",
        body: { status: "ok" },
      });
      if (res.success) {
        toast.success(res.message);
        setIsModalTwoOpen2(false);
      } else {
        toast.error((res as any)?.error[0].message);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "something went wrong");
    }
  };
  return (
    <Dialog open={isModalTwoOpen2} onOpenChange={setIsModalTwoOpen2}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="border border-gray-400/30">
        <h1 className="text-xl">Cancel Reason</h1>
        <form>
          <div className="mt-6">
            <Textarea
              className="h-40 capitalize border border-white/20 rounded"
              placeholder="Enter your Message "
            />
          </div>
          <div>
            <DialogFooter>
              <Button
                className="w-full btn mt-5"
                type="submit"
                onClick={() => handleStatusUpdate(item?._id)}
              >
                Send
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
