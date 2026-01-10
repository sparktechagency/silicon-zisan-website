"use client";

import { FaCalendarAlt } from "react-icons/fa";
import { Clock4, Eye } from "lucide-react";
import DeleteButton from "./DeleteButton";
import { useState } from "react";
import EmployeeDetailsModal from "./EmployeeDetailsModal";
import SendMessageModal from "./SendMessageModal";
import SendMessageModal2 from "./SendMessageModal2";
import CustomImage from "@/utils/CustomImage";
import dayjs from "dayjs";

export default function AppointmentCardsConfirmed({ data }: any) {
  const [isModalOneOpen, setIsModalOneOpen] = useState(false);
  const [isModalTwoOpen, setIsModalTwoOpen] = useState(false);
  const [isModalOneOpen2, setIsModalOneOpen2] = useState(false);
  const [isModalTwoOpen2, setIsModalTwoOpen2] = useState(false);

  return (
    <>
      {data?.map((item: any) => (
        <div
          className="bg-card text-white p-4 rounded-xl  shadow-lg sm:flex items-center gap-4 mt-5"
          key={item?._id}
        >
          {/* Profile Image */}
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <CustomImage
                src={item?.receiver?.image}
                title={item?.receiver?.name}
                className="sm:w-28 sm:h-28 rounded-full object-cover border-2 border-gray-700"
              />

              {/* Info Section */}
              <div className="">
                <div className="flex flex-col sm:flex-row items-center">
                  <h3 className="sm:text-xl font-semibold">
                    {item?.receiver?.name}
                  </h3>
                  <p>({item?.receiver?.phone || "No Number"})</p>
                </div>

                <div className=" mt-2 text-sm text-gray-300">
                  <div className="flex items-center gap-1">
                    <FaCalendarAlt />
                    <span className="sm:text-xl">
                      {dayjs(item.scheduledAt).format("YYYY-MM-DD")}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <Clock4 size={18} />
                    <span className="sm:text-xl">{item.time || "12:00"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cancel Button */}
          <div className="flex flex-row sm:flex-col items-center md:items-end space-x-2 my-3">
            <div>
              {item.status !== "Cancelled" && (
                <EmployeeDetailsModal
                  isModalOneOpen={isModalOneOpen}
                  setIsModalOneOpen={setIsModalOneOpen}
                  onOpenSecondModal={() => setIsModalTwoOpen(true)}
                  data={item}
                  trigger={
                    <button
                      className="cursor-pointer"
                      onClick={() => setIsModalOneOpen(true)}
                    >
                      <Eye />
                    </button>
                  }
                />
              )}

              {/* Second Modal */}
              <SendMessageModal
                isModalTwoOpen={isModalTwoOpen}
                setIsModalTwoOpen={setIsModalTwoOpen}
              />
            </div>
            {item.status !== "Cancelled" && (
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
            )}

            <SendMessageModal2
              item={item?._id}
              isModalTwoOpen2={isModalTwoOpen2}
              setIsModalTwoOpen2={setIsModalTwoOpen2}
            />
          </div>
        </div>
      ))}
    </>
  );
}
