import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CancelModalTwo({
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
      <DialogContent className="bg-white text-gray-700">
        <div className="mt-5">
          <h1 className="capitalize text-2xl font-medium text-center">
            We have a best offer for you 50% discount on your subscription for
            next three months
          </h1>

          <div className="flex justify-between gap-4 mt-5">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="bg-red-500 text-white w-[50%] h-12"
              >
                Decline
              </Button>
            </DialogClose>

            <Button
              variant="outline"
              className="custom-btn text-white w-[50%] h-12"
            >
              Accecpt
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
