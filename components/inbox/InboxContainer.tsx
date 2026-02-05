/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useRef } from "react";
import AllUserChart from "./AllUserChart";
import MessageChart from "./MessageChart";
import { Chat } from "@/types/chat";
import { Message } from "@/types/message";
import { myFetch } from "@/utils/myFetch";
import { getToken } from "@/utils/getToken";
import { initializeSocket, disconnectSocket, getSocket } from "@/utils/socket";
import getProfile from "@/utils/getProfile";
import { revalidate } from "@/utils/revalidateTag";
import { setCookie } from "cookies-next/client";
import { useRouter, useSearchParams } from "next/navigation";

interface InboxContainerProps {
  initialChats: Chat[];
}

export default function InboxContainer({ initialChats }: InboxContainerProps) {
  const [, setChats] = useState<Chat[]>(initialChats);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const selectedChatRef = useRef<Chat | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const chatId = searchParams.get("id");

  // single get chat id
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await myFetch(`/chats/${chatId}`);
  //     setSelectedChat(res?.data);
  //   };
  //   fetchData();
  // }, [chatId]);

  // set global count
  useEffect(() => {
    const total = initialChats?.reduce(
      (sum, chat) => sum + (chat.unreadCount || 0),
      0,
    );

    setCookie("list", total); // Set cookie
  }, [initialChats]);

  // Keep ref in sync for socket callback
  useEffect(() => {
    selectedChatRef.current = selectedChat;
  }, [selectedChat]);

  // Fetch Current User ID
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const profile = await getProfile();

        // Try to get the User ID (it might be nested in 'user' for employers)
        const userId = profile?.user?._id || profile?._id;

        if (userId) {
          setCurrentUserId(userId);
        }
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    };
    fetchUser();
  }, []);

  // Helper to update chat list
  const updateChatList = (newMessage: Message) => {
    setChats((prevChats) => {
      const chatIndex = prevChats.findIndex(
        (c) =>
          c._id ===
          (typeof newMessage.chat === "object"
            ? (newMessage.chat as any)._id
            : newMessage.chat),
      );

      if (chatIndex === -1) return prevChats;

      const updatedChats = [...prevChats];
      // Update lastMessage and move to top
      const updatedChat = {
        ...updatedChats[chatIndex],
        lastMessage: {
          _id: newMessage._id,
          sender: newMessage.sender._id,
          text: newMessage.text,
          image: newMessage.image,
          createdAt: newMessage.createdAt,
        },
      };

      updatedChats.splice(chatIndex, 1);
      updatedChats.unshift(updatedChat);

      return updatedChats;
    });
  };

  // Initial Socket Connection
  useEffect(() => {
    const setupSocket = async () => {
      const token = await getToken();
      if (token) {
        const socket = initializeSocket(token);

        // Listener for getMessage (standard)
        socket.on("getMessage", (newMessage: Message) => {
          console.log("Socket received getMessage:", newMessage);
          revalidate("chat");
          // Update chat list
          updateChatList(newMessage);

          const currentChatId = selectedChatRef.current?._id;
          const messageChatId =
            typeof newMessage.chat === "object"
              ? (newMessage.chat as any)._id
              : newMessage.chat;

          if (currentChatId && messageChatId === currentChatId) {
            setMessages((prev) => {
              if (prev.some((m) => m._id === newMessage._id)) return prev;
              return [...prev, newMessage];
            });
          }
        });

        // Listener for getChatList (fallback/alternative based on screenshot)

        socket.on("getChatList", (data: Message) => {
          if (!data || (!data.text && !data.image)) return;
          revalidate("chatlist");
          updateChatList(data);

          const currentChatId = selectedChatRef.current?._id;
          const messageChatId =
            typeof data.chat === "object" ? (data.chat as any)._id : data.chat;

          if (currentChatId === messageChatId) {
            setMessages((prev) => {
              if (prev.some((m) => m._id === data._id)) return prev;
              return [...prev, data];
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
      socket.emit("joinChat", selectedChat._id);
    }

    return () => {
      if (socket && selectedChat) {
        socket.emit("leaveChat", selectedChat._id);
      }
    };
  }, [selectedChat]);

  const handleChatSelect2 = async (chat: string) => {
    // setSelectedChat(chat);
    // setLoadingMessages(true);
    try {
      const response = await myFetch(`/messages/chat/${chat}`, {
        method: "GET",
        cache: "no-cache",
        tags: ["chat"],
      });

      if (response.success && response.data) {
        // API returns newest first, so we reverse it to show oldest first (standard chat order)
        setMessages([...response.data].reverse());
        revalidate("chat");
        revalidate("chatlist");
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

  useEffect(() => {
    if (chatId) {
      handleChatSelect2(chatId);
    }

    const fetchData = async () => {
      const res = await myFetch(`/chats/${chatId}`);
      setSelectedChat(res?.data);
    };
    fetchData();
  }, [chatId]);

  // dublicate function
  const handleChatSelect = async (chat: Chat) => {
    // 1. Update URL
    console.log("call this f");

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("id", chat._id);
    router.push(`?${searchParams.toString()}`, { scroll: false });
  };

  // admin chat select
  // useEffect(() => {
  //   if (!selectedChat && adminId) {
  //     const adminChat = chats.find((chat) => chat._id === adminId || adminId);

  //     if (adminChat) {
  //       handleChatSelect(adminChat);
  //     }
  //   }
  // }, [adminId, selectedChat, chats]);

  const handleMessageSent = (newMessage: Message) => {
    // Also update chat list for sent messages
    updateChatList(newMessage);

    setMessages((prev) => {
      if (prev.some((m) => m._id === newMessage._id)) return prev;
      return [...prev, newMessage];
    });
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[35%_auto] py-10">
      <div className="w-[90%] xl:w-[90%] mx-auto">
        <AllUserChart
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
          currentUserId={currentUserId}
        />
      </div>
    </div>
  );
}
