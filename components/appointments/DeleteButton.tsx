import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";

export default function DeleteButton({
  title,
  trigger,
}: {
  title: string;
  trigger: React.ReactNode;
}) {
  return (
    <Dialog>
      {/* Trigger Button */}
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="bg-gray-500/40 backdrop-blur-sm text-white p-6 rounded-lg  text-center border border-white/10 shadow-lg">
        <h2 className="text-lg font-semibold mb-6">
          {title ? (
            <p>
              Are You Sure You Want To Delete <br /> Whatasapp Link?
            </p>
          ) : (
            " Are You Sure You Want To Cancel The Appointment?"
          )}
        </h2>
        <div>
          <div className="flex gap-4">
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
