"use client";

import { FaCalendarAlt } from "react-icons/fa";
import { Clock4, Eye } from "lucide-react";
import DeleteButton from "./DeleteButton";
import EmployeeDetailsModal from "./EmployeeDetailsModal";
import CustomImage from "@/utils/CustomImage";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useCookie } from "@/hooks/useCookies";

export default function AppointmentCardsConfirmed({ data, chatId }: any) {
  const [translatedMessages, setTranslatedMessages] = useState<
    Record<string, string>
  >({});
  const googtrans = useCookie("googtrans");
  const currentLang = googtrans?.split("/")[2] || "en";

  useEffect(() => {
    const translateMessages = async () => {
      if (!data || data.length === 0) return;

      const newTranslations: Record<string, string> = {};

      await Promise.all(
        data.map(async (item: any) => {
          if (item?.message) {
            try {
              const res = await fetch("/api/translate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  text: item.message,
                  target: currentLang,
                  format: "text",
                }),
              });
              if (res.ok) {
                const json = await res.json();
                newTranslations[item._id] = json.translatedText || item.message;
              } else {
                newTranslations[item._id] = item.message;
              }
            } catch {
              newTranslations[item._id] = item.message;
            }
          }
        }),
      );

      setTranslatedMessages(newTranslations);
    };

    translateMessages();
  }, [data, currentLang]);

  return (
    <>
      {data?.map((item: any) => (
        <div
          className="bg-card text-white p-4 rounded-xl  shadow-lg  gap-4 mt-5"
          key={item?._id}
        >
          {/* Profile Image */}
          <div className="grid sm:grid-cols-[15%_85%] gap-3">
            <div className="flex-1">
              <CustomImage
                src={item?.receiver?.image}
                title=""
                className="w-20 h-20 sm:w-28 sm:h-28 rounded-full  border-2 border-gray-700"
              />
            </div>

            {/* Info Section */}
            <div className="">
              <div className="flex flex-col sm:flex-row">
                <h3 className="sm:text-xl font-semibold notranslate">
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
                    {dayjs(item.scheduledAt).format("DD-MM-YYYY")}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock4 size={18} />
                  <span className="sm:text-xl">
                    {dayjs(item.scheduledAt).format("HH:mm") || "No Time  "}
                  </span>
                </div>

                <div>
                  {item?.message && (
                    <p className="sm:text-xl">
                      {translatedMessages[item._id] || item.message}
                    </p>
                  )}
                </div>

                {/* <div>
                  {item?.status !== "Cancelled" && item?.address ? (
                    <p
                      className={`sm:text-xl my-2 ${item?.status === "Cancelled" && "hidden"}`}
                    >
                      An Appointment Is Available For You. Kindly Confirm It ...
                    </p>
                  ) : (
                    <p
                      className={`sm:text-xl my-2 ${item?.status === "Cancelled" && "hidden"}`}
                    >
                      An appointment is available for you. Kindly confirm it
                    </p>
                  )}
                </div> */}

                {/* reason */}
                {item?.cancelReason && (
                  <div className="flex items-center gap-1">
                    <span className="sm:text-xl">
                      Reason : {item?.cancelReason.slice(0, 150)}
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
                  item={{
                    ...item,
                    message: translatedMessages[item._id] || item.message,
                  }}
                  chatId={chatId}
                  trigger={
                    <button className="cursor-pointer">
                      <Eye />
                    </button>
                  }
                />
              )}
            </div>
            {item.status !== "Cancelled" && (
              <div>
                <DeleteButton
                  id={item?._id}
                  trigger={
                    <button className="bg-red-600 hover:bg-red-500 text-white text-sm px-3 py-1 rounded-md cursor-pointer">
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
