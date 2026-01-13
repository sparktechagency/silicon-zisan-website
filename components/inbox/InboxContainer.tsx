"use client";

import React, { useState, useEffect, useRef } from "react";
import AllUserChart from "./AllUserChart";
import MessageChart from "./MessageChart";
import { Chat } from "@/types/chat";
import { Message } from "@/types/message";
import { myFetch } from "@/utils/myFetch";
import { getToken } from "@/utils/getToken";
import { initializeSocket, disconnectSocket, getSocket } from "@/utils/socket";

interface InboxContainerProps {
  initialChats: Chat[];
}

export default function InboxContainer({ initialChats }: InboxContainerProps) {
  const [chats] = useState<Chat[]>(initialChats);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const selectedChatRef = useRef<Chat | null>(null);

  // Keep ref in sync for socket callback
  useEffect(() => {
    selectedChatRef.current = selectedChat;
  }, [selectedChat]);

  // Initial Socket Connection
  useEffect(() => {
    const setupSocket = async () => {
      const token = await getToken();
      if (token) {
        const socket = initializeSocket(token);

        socket.on("getMessage", (newMessage: Message) => {
          // We only append if it belongs to the active chat
          if (
            selectedChatRef.current &&
            newMessage.chat === selectedChatRef.current._id
          ) {
            setMessages((prev) => {
              // Prevent duplicates
              if (prev.some((m) => m._id === newMessage._id)) return prev;
              return [...prev, newMessage];
            });
          }
        });
      }
    };

    setupSocket();

    return () => {
      disconnectSocket();
    };
  }, []);

  // Handle Room Join/Leave
  useEffect(() => {
    const socket = getSocket();
    if (socket && selectedChat) {
      socket.emit("join-chat-room", selectedChat._id);
    }

    return () => {
      if (socket && selectedChat) {
        socket.emit("leave-chat-room", selectedChat._id);
      }
    };
  }, [selectedChat]);

  const handleChatSelect = async (chat: Chat) => {
    setSelectedChat(chat);
    setLoadingMessages(true);
    try {
      const response = await myFetch(`/messages/chat/${chat._id}`);
      if (response.success && response.data) {
        // API returns newest first, so we reverse it to show oldest first (standard chat order)
        setMessages([...response.data].reverse());
      } else {
        setMessages([]);
      }
    } catch (error) {
      console.error("Failed to fetch messages:", error);
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleMessageSent = (newMessage: Message) => {
    setMessages((prev) => {
      if (prev.some((m) => m._id === newMessage._id)) return prev;
      return [...prev, newMessage];
    });
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[35%_auto] px-2 py-10">
      <div className="w-[90%] xl:w-[78%] mx-auto">
        <AllUserChart
          chats={chats}
          selectedChatId={selectedChat?._id}
          onChatSelect={handleChatSelect}
        />
      </div>
      <div className="w-[90%] xl:w-full mx-auto px-1">
        <MessageChart
          messages={messages}
          selectedChat={selectedChat}
          loading={loadingMessages}
          onMessageSent={handleMessageSent}
        />
      </div>
    </div>
  );
}
