"use client";

import Image from "next/image";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import one from "../../public/appartments/one.png";
import two from "../../public/appartments/two.png";
import three from "../../public/appartments/three.png";
import { Clock4, Eye } from "lucide-react";
import DeleteButton from "./DeleteButton";
import MessageSendModal from "./EmployeeDetailsModal";
import { useState } from "react";
import CancelModalTwo from "../dashboard/dashboardSubscription/CancelModalTwo";
import EmployeeDetailsModal from "./EmployeeDetailsModal";
import SendMessageModal from "./SendMessageModal";
import SendMessageModal2 from "./SendMessageModal2";

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
    id: 3,
    name: "Alex Gender",
    phone: "0133336567",
    date: "01.02.2025",
    time: "10:00",
    src: three,
  },
  {
    id: 2,
    name: "Alex Gender",
    phone: "01333327986",
    date: "01.02.2025",
    time: "10:00",
    src: two,
  },
];

export default function AppointmentCardsConfirmed() {
  const [isModalOneOpen, setIsModalOneOpen] = useState(false);
  const [isModalTwoOpen, setIsModalTwoOpen] = useState(false);

  const [isModalOneOpen2, setIsModalOneOpen2] = useState(false);
  const [isModalTwoOpen2, setIsModalTwoOpen2] = useState(false);
  return (
    <>
      {data?.map((item, index) => (
        <div
          className="bg-card text-white p-4 rounded-xl  shadow-lg sm:flex items-center gap-4 mt-5"
          key={index}
        >
          {/* Profile Image */}
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <Image
                src={item.src}
                alt="Md Kamran Khan"
                className="sm:w-28 sm:h-28 rounded-full object-cover border-2 border-gray-700"
              />

              {/* Info Section */}
              <div className="">
                <h3 className="sm:text-xl font-semibold">
                  {item.name} ({item.phone})
                </h3>

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
            </div>
          </div>

          {/* Cancel Button */}
          <div className="flex flex-row sm:flex-col items-center md:items-end space-x-2 my-3">
            <div>
              <EmployeeDetailsModal
                isModalOneOpen={isModalOneOpen}
                setIsModalOneOpen={setIsModalOneOpen}
                onOpenSecondModal={() => setIsModalTwoOpen(true)}
                trigger={
                  <button
                    className="cursor-pointer"
                    onClick={() => setIsModalOneOpen(true)}
                  >
                    <Eye />
                  </button>
                }
              />

              {/* Second Modal */}
              <SendMessageModal
                isModalTwoOpen={isModalTwoOpen}
                setIsModalTwoOpen={setIsModalTwoOpen}
              />
            </div>
            <div>
              <DeleteButton
                isModalOneOpen2={isModalOneOpen2}
                setIsModalOneOpen2={setIsModalOneOpen2}
                onOpenSecondModal2={() => setIsModalTwoOpen2(true)}
                trigger={
                  <button className="bg-red-600 hover:bg-red-500 text-white text-sm px-3 py-1 rounded-md">
                    Cancel
                  </button>
                }
              />
            </div>

            <SendMessageModal2
              isModalTwoOpen2={isModalTwoOpen2}
              setIsModalTwoOpen2={setIsModalTwoOpen2}
            />
          </div>
        </div>
      ))}
    </>
  );
}
