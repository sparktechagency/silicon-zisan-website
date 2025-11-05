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

export default function SendMessageModal({
  trigger,
  isModalTwoOpen,
  setIsModalTwoOpen,
}: {
  trigger?: React.ReactNode;
  isModalTwoOpen: any;
  setIsModalTwoOpen: any;
}) {
  return (
    <Dialog open={isModalTwoOpen} onOpenChange={setIsModalTwoOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="border border-gray-400/30">
        <h1 className="text-xl">Reply Message</h1>
        <div className="mt-6">
          <Input
            className="border border-white/20 rounded mb-4"
            placeholder="Type Contact number"
          />
          <Textarea
            className="h-40 capitalize border border-white/20 rounded"
            placeholder="Enter your Message "
          />
        </div>
        <div>
          <DialogFooter>
            <Button className="w-full btn" type="submit">
              Send
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
