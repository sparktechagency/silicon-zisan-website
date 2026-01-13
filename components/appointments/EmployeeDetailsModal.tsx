import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import Image from "next/image";
import one from "../../public/appartments/one.png";
import two from "../../public/appartments/two.png";
import { Button } from "../ui/button";
import dayjs from "dayjs";
import CustomImage from "@/utils/CustomImage";
import Link from "next/link";
interface CancelModalProps {
  trigger?: React.ReactNode;
  isModalOneOpen: boolean;
  setIsModalOneOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onOpenSecondModal: () => void;
  data?: any;
}

export default function EmployeeDetailsModal({
  trigger,
  isModalOneOpen,
  setIsModalOneOpen,
  onOpenSecondModal,
  data,
}: CancelModalProps) {
  const handleClickModalTwo = () => {
    setIsModalOneOpen(false);
    onOpenSecondModal(); // trigger second modal from parent
  };

  console.log("data", data);

  return (
    <Dialog open={isModalOneOpen} onOpenChange={setIsModalOneOpen}>
      {/* Trigger Button */}
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="bg-white text-gray-800  p-6 rounded-lg  border border-white/10 shadow-lg sm:max-w-xl ">
        <div>
          <div className="rounded-xl flex gap-4">
            {/* Profile Image */}
            <CustomImage
              src={data?.receiver?.image}
              title={data?.receiver?.name}
              className="sm:w-20 sm:h-20 rounded-full object-cover border-2 border-gray-700"
            />

            {/* Info Section */}
            <div>
              <h3 className="sm:text-xl font-semibold">
                {data?.receiver?.name}
              </h3>

              <div className="text-sm flex items-center gap-2">
                <span className="sm:text-xl">
                  {dayjs(data?.scheduledAt).format("YYYY-MM-DD")}
                </span>
                <span className="sm:text-xl">{data?.time}</span>
              </div>

              <p>{data?.message}</p>
            </div>
          </div>
        </div>

        {/* <hr className="bg-green-950 my-5" /> */}
        {/* 
        <Button className="custom-btn py-2" onClick={handleClickModalTwo}>
          Reply
        </Button> */}
        <Link href={`/inbox`}>
          <Button className="custom-btn py-2 w-full">Inbox</Button>
        </Link>
      </DialogContent>
    </Dialog>
  );
}
