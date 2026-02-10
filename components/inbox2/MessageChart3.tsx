"use client";
import React, { useEffect, useRef, useState } from "react";
import defalutImage from "@/public/default-image.png";

import { Message } from "@/types/message";
import { Chat } from "@/types/chat";
import { format } from "date-fns";
// import CustomImage from "@/utils/CustomImage";

import { myFetch } from "@/utils/myFetch";

import { revalidate } from "@/utils/revalidateTag";
import ChatInput from "../inbox/ChartInput";
import CustomImage from "@/utils/CustomImage";
import { toast } from "sonner";

interface MessageChartProps {
  messages: Message[];
  selectedChat?: Chat | null;

  loading?: boolean;
  //   onMessageSent?: (message: Message) => void;
  currentUserId?: string | null;
  singleData: any;
}

const MessageChart3 = ({
  messages,
  selectedChat,
  loading,
  //   onMessageSent,
  currentUserId,
  singleData,
}: MessageChartProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [userTextMessage, setUserTextMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleMessageSend = async () => {
    console.log("click");

    if (!singleData._id) return;
    if (userTextMessage.trim() === "" && !file) return;

    console.log("singleData._id", singleData._id);

    const formData = new FormData();
    formData.append("chat", singleData._id);
    if (userTextMessage.trim()) {
      formData.append("text", userTextMessage);
    }
    if (file) {
      formData.append("image", file);
    }

    try {
      const response = await myFetch("/messages/create", {
        method: "POST",
        body: formData,
      });

      console.log("res", response);

      if (response.success && response.data) {
        revalidate("messageList");

        setUserTextMessage("");
        setFile(null);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleImageUpoad = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/jpeg"];

    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("Only PNG and JPG images are allowed");
      e.target.value = ""; // reset input
      return;
    }

    setFile(selectedFile);
  };

  if (!singleData._id) {
    return (
      <div
        className="rounded-md flex flex-col items-center justify-center bg-card border border-gray-400/30"
        style={{ height: "calc(100vh - 150px)" }}
      >
        <p className="text-gray-500">Select a conversation to start chatting</p>
      </div>
    );
  }

  //   const participant = selectedChat?.anotherParticipant;

  return (
    <div
      className="rounded-md flex flex-col"
      style={{ height: "calc(100vh - 150px)" }}
    >
      <div className="flex gap-2 py-2 px-5 border rounded-md border-gray-500/40 bg-card static items-center">
        <CustomImage
          src={singleData?.anotherParticipant?.image}
          fallback={defalutImage.src}
          title="header"
          width={44}
          height={44}
          className="w-11 h-11 rounded-full object-cover"
        />
        <div className="font-medium">
          <h1 className="2xl:text-xl">
            {singleData?.anotherParticipant?.name || "Unknown User"}
          </h1>
          {/* <p className="text-xs">Typing...</p> */}
        </div>
      </div>
      {/* Messages container */}
      <div
        ref={containerRef}
        className="flex-1 flex flex-col  hide-scrollbar mt-5 bg-card border border-b-0 border-gray-400/30 p-3 overflow-y-auto"
      >
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Loading messages...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages
              ?.sort(
                (a: any, b: any) =>
                  new Date(a.createdAt).getTime() -
                  new Date(b.createdAt).getTime(),
              )
              .map((item) => {
                const isMyMessage =
                  item.isMyMessage ||
                  (typeof item.sender === "string"
                    ? item.sender === currentUserId
                    : item.sender?._id === currentUserId);

                return (
                  <div
                    key={item._id}
                    className={`flex ${
                      isMyMessage ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isMyMessage && (
                      <CustomImage
                        src={singleData?.anotherParticipant?.image}
                        fallback={defalutImage.src}
                        title="avatar"
                        className="w-8 h-8 rounded-full mr-2 object-cover"
                        width={32}
                        height={32}
                      />
                    )}

                    <div>
                      <div
                        className={`whitespace-pre-line px-4 py-1.5 rounded-lg text-[15px] ${
                          isMyMessage
                            ? "custom-btn rounded-tr-none text-white bg-primary"
                            : "bg-[#5E6C79] rounded border border-gray-400/30 text-white"
                        }`}
                      >
                        {item.image && (
                          <div className="mb-2">
                            <CustomImage
                              src={item.image}
                              title="sent image"
                              className="rounded-md max-w-50 h-auto object-cover"
                              width={200}
                              height={200}
                            />
                          </div>
                        )}
                        {item.text && <span>{item.text}</span>}
                      </div>
                      <div className="text-[#B0B0B0] text-right text-[12px] mt-1">
                        {format(new Date(item.createdAt), "hh:mm a")}
                      </div>
                    </div>
                  </div>
                );
              })}
            {messages.length === 0 && (
              <p className="text-center text-gray-500 mt-10">
                No messages yet. Say hi!
              </p>
            )}
          </div>
        )}
      </div>

      {/* Input at bottom */}
      <div className="bg-card  border border-t-0 border-gray-400/30">
        <ChatInput
          onChange={handleImageUpoad}
          message={userTextMessage}
          setMessage={setUserTextMessage}
          onHandle={handleMessageSend}
          file={file}
          onRemoveFile={() => setFile(null)}
        />
      </div>
    </div>
  );
};

export default MessageChart3;
