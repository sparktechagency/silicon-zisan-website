"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ChatCard } from "./ChartCard";
import { Chat } from "@/types/chat";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface AllUserChartProps {
  selectedChatId?: string;
  onChatSelect?: (chat: Chat) => void;
  tallChats: Chat[];
}

const AllUserChart = ({
  selectedChatId,
  onChatSelect,
  tallChats,
}: AllUserChartProps) => {
  const [value, setValue] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    // Update URL params
    const params = new URLSearchParams(searchParams.toString());

    if (newValue) {
      params.set("name", newValue);
    } else {
      params.delete("name");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <div
      className="pr-2 flex flex-col"
      style={{ height: "calc(100vh - 150px)" }}
    >
      <div className="mb-4 mr-3">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search Here"
            className="w-full pl-12  h-10"
            onChange={handleInputChange}
            value={value}
          />
          <Search className="-mt-8 ml-4" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 hide-scrollbar">
        <div className="xl:mr-4">
          {tallChats?.length > 0 ? (
            tallChats?.map(
              (
                chat, // Map allChats instead of chats prop
              ) => (
                <ChatCard
                  key={chat._id}
                  chat={chat}
                  isActive={chat._id === selectedChatId}
                  onClick={() => onChatSelect?.(chat)}
                />
              ),
            )
          ) : (
            <p className="text-center text-gray-500 mt-4">No chats found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllUserChart;
