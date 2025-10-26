import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";
import { Textarea } from "../ui/textarea";

export default function MessageSendModal() {
  return (
    <Dialog>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <button className="cursor-pointer">
          <Eye />
        </button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="bg-gray-500/40 backdrop-blur-sm text-white p-6 rounded-lg  text-center border border-white/10 shadow-lg">
        <div className="mt-6">
          <Textarea
            className="h-32 capitalize border border-white/20 rounded"
            placeholder="type message to job seeker "
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
