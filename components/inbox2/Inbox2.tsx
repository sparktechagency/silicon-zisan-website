"use client";

import { useSocket } from "@/context/SocketContext";
import { useEffect } from "react";
import AllUserChart from "./AllUserChart";
import MessageChart3 from "./MessageChart3";
import { useChatSocket } from "@/hooks/useChatSocket";

export default function Inbox2({
  chats,
  allMessages,
  chatId,
  singleData,
}: any) {
  const socket = useSocket();

  useChatSocket({
    onChatList: (chats: any) => chats,
    onMessage: (msg: any) => msg,
    // onMessage: (msg) => setMessages((prev: any) => [...prev, msg]),
    onError: (err: any) => console.error(err),
  });

  useEffect(() => {
    if (socket && chatId) {
      socket?.emit("joinChat", chatId);
    }

    return () => {
      socket?.emit("leaveChat", chatId);
    };
  }, [chatId, socket]);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[35%_auto]">
      <div className="w-[90%] xl:w-[90%] mx-auto">
        <AllUserChart chats={chats || []} />
      </div>

      <div className="w-[90%] xl:w-full mx-auto px-1">
        <MessageChart3 messages={allMessages || []} singleData={singleData} />
      </div>
    </div>
  );
}
