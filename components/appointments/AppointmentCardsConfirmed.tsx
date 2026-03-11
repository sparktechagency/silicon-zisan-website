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
          className="bg-card text-white p-5 rounded-xl shadow-lg mt-5 border border-gray-800/60 transition-all hover:bg-white/5"
          key={item?._id}
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            {/* Profile & Info Section */}
            <div className="flex-1 w-full">
              <div className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr] gap-4 sm:gap-6 items-start">
                <div className="flex items-center justify-center sm:justify-start pt-1">
                  <CustomImage
                    src={item?.receiver?.image}
                    title=""
                    className="w-16 h-16 sm:w-24 sm:h-24 rounded-full object-cover border border-gray-600 shadow-sm"
                  />
                </div>

                {/* Info Section */}
                <div className="pt-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <h3 className="text-lg sm:text-xl font-semibold notranslate text-gray-100 tracking-wide">
                      {item?.receiver?.name}
                    </h3>
                    {item?.status !== "Pending" && (
                      <p className="text-sm sm:text-base text-gray-400 font-medium">
                        ({item?.receiver?.phone || "No Number"})
                      </p>
                    )}
                  </div>

                  <div className="mt-2.5 sm:mt-3 flex flex-col gap-2 text-sm sm:text-base text-gray-300">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-400" />
                      <span className="font-medium text-gray-200">
                        {dayjs(item.scheduledAt).format("DD-MM-YYYY")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock4 size={18} className="text-gray-400" />
                      <span className="font-medium text-gray-200">
                        {dayjs(item.scheduledAt).format("HH:mm") || "No Time"}
                      </span>
                    </div>

                    {item?.message && item?.status !== "Cancelled" && (
                      <div className="mt-1">
                        <p className="text-gray-300 italic border-l-2 border-gray-600 pl-3 py-1 bg-gray-800/20 rounded-r">
                          {translatedMessages[item._id] || item.message}
                        </p>
                      </div>
                    )}

                    {/* reason */}
                    {item?.cancelReason && (
                      <div className="mt-1 text-red-300 bg-red-950/20 px-3 py-2 rounded-md border border-red-900/2 w-fit max-w-full text-sm">
                        <span className="font-semibold text-red-400">
                          Reason:
                        </span>{" "}
                        {item?.cancelReason.slice(0, 150)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Button */}
            <div className="flex flex-row md:flex-col items-center justify-end md:items-end gap-3 mt-2 md:mt-0 pt-3 md:pt-0 border-t md:border-none border-gray-700/50">
              {item.status !== "Cancelled" && (
                <div>
                  <EmployeeDetailsModal
                    item={{
                      ...item,
                      message: translatedMessages[item._id] || item.message,
                    }}
                    chatId={chatId}
                    trigger={
                      <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors cursor-pointer flex items-center justify-center">
                        <Eye size={20} />
                      </button>
                    }
                  />
                </div>
              )}
              {item.status !== "Cancelled" && (
                <div>
                  <DeleteButton
                    id={item?._id}
                    trigger={
                      <button className="bg-red-600/90 hover:bg-red-500 text-white text-sm px-4 py-2 rounded-lg cursor-pointer transition-colors font-medium shadow-sm">
                        Cancel
                      </button>
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
