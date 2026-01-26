import React from "react";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ChatCard } from "./ChartCard";
import CustomBackButton from "@/share/CustomBackButton";
import { Chat } from "@/types/chat";

interface AllUserChartProps {
  chats: Chat[];
  selectedChatId?: string;
  onChatSelect?: (chat: Chat) => void;
}

const AllUserChart = ({
  chats,
  selectedChatId,
  onChatSelect,
}: AllUserChartProps) => {
  return (
    <div
      className=" pr-2 flex flex-col"
      style={{ height: "calc(100vh - 150px)" }}
    >
      <div>
        <div className="flex items-center gap-4">
          <CustomBackButton />

          <h1 className="text-lg font-semibold">Message</h1>
        </div>
        <hr className="my-3 w-[97%]" />
      </div>
      <div className="mb-4 mr-3">
        <div className="">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search Here"
              className="w-full pl-12  h-10
              "
            />
            <Search className="-mt-8 ml-4" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 hide-scrollbar">
        <div className="xl:mr-4">
          {chats?.length > 0 ? (
            chats.map((chat) => (
              <ChatCard
                key={chat._id}
                chat={chat}
                isActive={chat._id === selectedChatId}
                onClick={() => onChatSelect?.(chat)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">No chats found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUserChart;
