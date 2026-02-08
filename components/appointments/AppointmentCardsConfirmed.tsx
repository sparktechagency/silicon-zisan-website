"use client";

import { FaCalendarAlt } from "react-icons/fa";
import { Clock4, Eye } from "lucide-react";
import DeleteButton from "./DeleteButton";
import EmployeeDetailsModal from "./EmployeeDetailsModal";
import CustomImage from "@/utils/CustomImage";
import dayjs from "dayjs";

export default function AppointmentCardsConfirmed({ data, chatId }: any) {
  return (
    <>
      {data?.map((item: any) => (
        <div
          className="bg-card text-white p-4 rounded-xl  shadow-lg  gap-4 mt-5"
          key={item?._id}
        >
          {/* Profile Image */}
          <div className="grid grid-cols-[15%_85%] gap-3">
            <div className="flex-1">
              <CustomImage
                src={item?.receiver?.image}
                title={item?.receiver?.name}
                className="sm:w-28 sm:h-28 rounded-full object-cover border-2 border-gray-700"
              />
            </div>

            {/* Info Section */}
            <div className="">
              <div className="flex flex-col sm:flex-row items-center">
                <h3 className="sm:text-xl font-semibold">
                  {item?.receiver?.name}
                </h3>
                <p>
                  {item?.status !== "Pending" &&
                    `(${item?.receiver?.phone || "No Number"})`}
                </p>
              </div>

              <div className=" mt-2 text-sm text-gray-300 ">
                <div className="flex items-center gap-1">
                  <FaCalendarAlt />
                  <span className="sm:text-xl">
                    {dayjs(item.scheduledAt).format("YYYY-MM-DD")}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock4 size={18} />
                  <span className="sm:text-xl">
                    {dayjs(item.scheduledAt).format("HH:mm") || "No Time  "}
                  </span>
                </div>
                {item?.cancelReason && (
                  <div className="flex items-center gap-1">
                    <span className="sm:text-xl">
                      Reason : {item?.cancelReason}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Cancel Button */}
          <div className="flex flex-row sm:flex-col items-center md:items-end space-x-2  ">
            <div>
              {item.status !== "Cancelled" && (
                <EmployeeDetailsModal
                  item={item}
                  chatId={chatId}
                  trigger={
                    <button className="cursor-pointer">
                      <Eye />
                    </button>
                  }
                />
              )}
            </div>
            {item.status !== "Cancelled" && item.status !== "Confirmed" && (
              <div>
                <DeleteButton
                  id={item?._id}
                  trigger={
                    <button className="bg-red-600 hover:bg-red-500 text-white text-sm px-3 py-1 rounded-md">
                      Cancel
                    </button>
                  }
                />
              </div>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
