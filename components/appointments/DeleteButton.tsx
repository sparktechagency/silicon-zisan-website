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

  isModalOneOpen2,
  setIsModalOneOpen2,
  onOpenSecondModal2,
}: {
  title?: string;
  trigger?: React.ReactNode;
  isModalOneOpen2?: any;
  setIsModalOneOpen2?: any;
  onOpenSecondModal2?: any;
}) {
  const handleClickModalTwo = () => {
    setIsModalOneOpen2(false);
    onOpenSecondModal2(); // trigger second modal from parent
  };
  return (
    <Dialog open={isModalOneOpen2} onOpenChange={setIsModalOneOpen2}>
      {/* Trigger Button */}
      <DialogTrigger className="cursor-pointer" asChild>
        {trigger}
      </DialogTrigger>

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
            <Button
              className="w-[50%] btn"
              type="submit"
              onClick={handleClickModalTwo}
            >
              Yes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
