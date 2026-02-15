import { useSocket } from "@/context/SocketContext";
import { revalidate } from "@/utils/revalidateTag";

import { useEffect } from "react";

export const useChatSocket = ({
  onChatList,
  onMessage,
  onError,
}: {
  onChatList: (data: any) => void;
  onMessage: (message: any) => void;
  onError: (error: any) => void;
}) => {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) {
      console.log("[ChatSocket] Socket not available");
      return;
    }

    const onConnect = () => {
      console.log("[ChatSocket] Connected:", socket.id);
    };

    const handleChatList = (data: any) => {
      console.log("[ChatSocket] getChatList:", data);
      revalidate("messageList");
      // revalidate("chatlist");
      onChatList(data);
    };

    const handleMessage = (message: any) => {
      console.log("[ChatSocket] getMessage:", message);
      onMessage(message);
    };

    const handleError = (error: any) => {
      console.error("[ChatSocket] error:", error);
      onError(error);
    };

    socket.on("connect", onConnect);
    socket.on("getChatList", handleChatList);
    socket.on("getMessage", handleMessage);
    socket.on("error", handleError);

    return () => {
      socket.off("connect", onConnect);
      socket.off("getChatList", handleChatList);
      socket.off("getMessage", handleMessage);
      socket.off("error", handleError);
    };
  }, [socket]);
};
