import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";

export default function DeleteButton() {
  return (
    <Dialog>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <button className="bg-red-600 hover:bg-red-500 text-white text-sm px-3 py-1 rounded-md">
          Cancel
        </button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="bg-gray-500/40 backdrop-blur-sm text-white p-6 rounded-lg  text-center border border-white/10 shadow-lg">
        <h2 className="text-lg font-semibold mb-6">
          Are You Sure You Want To Cancel The Appointment?
        </h2>
        <div>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                className="w-[50%] bg-red-600 border-none hover:bg-red-600 cursor-pointer"
                // variant="outline"
              >
                No
              </Button>
            </DialogClose>
            <Button className="w-[50%] btn" type="submit">
              Yes
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
