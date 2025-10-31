import Image from "next/image";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import one from "../../public/appartments/one.png";
import two from "../../public/appartments/two.png";
import three from "../../public/appartments/three.png";
import { Clock4, Eye } from "lucide-react";
import DeleteButton from "./DeleteButton";
import MessageSendModal from "./MessageSendModal";

const data = [
  {
    id: 1,
    name: "Kamran Khan",
    phone: "01333327633",
    date: "01.02.2025",
    time: "10:00",
    src: one,
  },
  {
    id: 2,
    name: "Alex Gender",
    phone: "01333327986",
    date: "01.02.2025",
    time: "10:00",
    src: two,
  },
  {
    id: 3,
    name: "Alex Gender",
    phone: "0133336567",
    date: "01.02.2025",
    time: "10:00",
    src: three,
  },
];

export default function AppointmentCardsCancelled() {
  return (
    <>
      {data?.map((item, index) => (
        <div className="bg-card text-white p-4 rounded-xl  shadow-lg flex items-center gap-4 mt-5">
          {/* Profile Image */}
          <Image
            src={item.src}
            alt="Md Kamran Khan"
            className="sm:w-28 sm:h-28 rounded-full object-cover border-2 border-gray-700"
          />

          {/* Info Section */}
          <div className="flex-1">
            <h3 className="sm:text-xl font-semibold">{item.name}</h3>

            <div className=" mt-2 text-sm text-gray-300">
              <div className="flex items-center gap-1">
                <FaCalendarAlt />
                <span className="sm:text-xl">{item.date}</span>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <Clock4 size={18} />
                <span className="sm:text-xl">{item.time}</span>
              </div>
            </div>
          </div>

          {/* Cancel Button */}
          <div className="flex flex-col items-end justify-between my-4 space-y-6">
            <MessageSendModal />
            <DeleteButton
              trigger={
                <button className=" text-white text-sm px-3 py-1 rounded-md">
                  Canceled
                </button>
              }
            />
          </div>
        </div>
      ))}
    </>
  );
}
