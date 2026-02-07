"use client";
import { Chat } from "@/types/chat";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import CustomImage from "@/utils/CustomImage";
import defalutImage from "@/public/default-image.png";

interface ChatCardProps {
  chat: Chat;
  isActive?: boolean;
  onClick?: () => void;
}

export const ChatCard = ({ chat, isActive, onClick }: ChatCardProps) => {
  const participant = chat.participants[0];
  const lastMsg = chat.lastMessage;

  // Automatically call when unreadCount changes
  // useEffect(() => {
  //   if (chat.unreadCount && chat.unreadCount) {
  //     setCookie("list", chat.unreadCount);
  //   } else {
  //     setCookie("list", chat.unreadCount);
  //   }
  // }, [chat.unreadCount]); // Re-run when unreadCount changes

  return (
    <div
      onClick={onClick}
      className={cn(
        "flex flex-row justify-between p-4 rounded-lg shadow mb-3 border border-gray-400/30 cursor-pointer transition-colors",
        isActive
          ? "bg-gray-800 text-primary-foreground hover:bg-primary/90"
          : "bg-card hover:bg-gray-700 dark:hover:bg-gray-800",
      )}
    >
      <div className="flex items-center gap-2 ">
        <div>
          <CustomImage
            src={participant?.image}
            fallback={defalutImage}
            title={participant?.name || "User"}
            width={44}
            height={44}
            className="w-9 h-9 xl:h-11 xl:w-11 rounded-full object-cover"
          />
        </div>
        <div>
          <h4 className="text-xs 2xl:text-[15px] font-medium">
            {participant?.name || "Unknown User"}
          </h4>
          <div className="flex items-center gap-1">
            <h4 className=" text-[9px] 2xl:text-sm text-gray-500 line-clamp-1">
              {lastMsg?.text || "No messages yet"}
            </h4>
          </div>
        </div>
      </div>
      <div className="flex-col justify-end text-right">
        <p className=" text-[9px] 2xl:text-sm text-end text-gray-400">
          {lastMsg?.createdAt
            ? format(new Date(lastMsg.createdAt), "hh:mm a")
            : ""}
        </p>
        {chat.unreadCount > 0 && (
          <span className="bg-primary text-white text-[10px] px-1.5 py-0.5 rounded-full">
            {chat.unreadCount}
          </span>
        )}
      </div>
    </div>
  );
};
