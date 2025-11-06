import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";

export default function SendMessageModal2({
  trigger,
  isModalTwoOpen2,
  setIsModalTwoOpen2,
}: {
  trigger?: React.ReactNode;
  isModalTwoOpen2: any;
  setIsModalTwoOpen2: any;
}) {
  return (
    <Dialog open={isModalTwoOpen2} onOpenChange={setIsModalTwoOpen2}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="border border-gray-400/30">
        <h1 className="text-xl">Cancel Reason</h1>
        <div className="mt-6">
          {/* <Input
            className="border border-white/20 rounded mb-4"
            placeholder="Type Contact number"
          /> */}
          <Textarea
            className="h-40 capitalize border border-white/20 rounded"
            placeholder="Enter your Message "
          />
        </div>
        <div>
          <DialogFooter>
            <Button
              className="w-full btn"
              type="submit"
              onClick={() => setIsModalTwoOpen2(false)}
            >
              Send
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
