import Image from "next/image";
// import image from "../../../public/user.png";
// import Chart from "../../../public/chart.png";
import man from "../../public/inbox/man.png";

interface cardPros {
  name: string;
  message: string;
  time: string;
  unread: string;
}

export const ChatCard = ({ card }: { card: cardPros }) => {
  const { name, message, time, unread } = card;
  return (
    <div className="flex flex-row justify-between p-4 bg-card rounded-lg shadow mb-3 border border-gray-400/30">
      <div className="flex items-center gap-2 ">
        <div>
          <Image
            className="w-9 h-9 xl:h-11 xl:w-11 rounded-full object-cover"
            src={man}
            alt="User avatar"
          />
        </div>
        <div>
          <h4 className="text-xs 2xl:text-[15px] font-medium">{name}</h4>
          <div className="flex items-center gap-1">
            <h4 className=" text-[9px] 2xl:text-sm">{message}</h4>
          </div>
        </div>
      </div>
      <div className="flex-col justify-end">
        <p className=" text-[9px] 2xl:text-sm text-end">{time}</p>
      </div>
    </div>
  );
};
