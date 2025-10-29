"use client";
import React, { useEffect, useRef, useState } from "react";
// import image from "../../../public/user.png";
import man from "../../public/inbox/man.png";
import Image from "next/image";
import ChatInput from "./ChartInput";

const initialMessages = [
  {
    id: 1,
    sender: "me",
    text: "Hi How Are You",
    time: "07:00 Pm",
  },
  {
    id: 2,
    sender: "other",
    text: "What About You Today?",
    time: "07:02 Pm",
    avatar: "https://via.placeholder.com/150", // Replace with real avatar URL
  },
  {
    id: 3,
    sender: "me",
    text: "Hi How Are You",
    time: "07:00 Pm",
  },
  {
    id: 4,
    sender: "other",
    text: "What About You Today?",
    time: "07:02 Pm",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    sender: "other",
    text: "What About You Today?",
    time: "07:02 Pm",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    sender: "other",
    text: "What About You Today?",
    time: "07:02 Pm",
    avatar: "https://via.placeholder.com/150",
  },
  {
    id: 7,
    sender: "other",
    text: "What About You Today?",
    time: "07:02 Pm",
    avatar: "https://via.placeholder.com/150",
  },
];

type Message = {
  id: number;
  sender: string;
  text: string;
  time: string;
  avatar?: string;
};

const timeNow = new Date().toLocaleTimeString([], {
  hour: "2-digit",
  minute: "2-digit",
});

const ChatMessages = () => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  console.log(messages);
  const [userTextMessage, setUserTextMessage] = useState("");

  useEffect(() => {
    bottomRef.current?.scrollTo({
      top: bottomRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleMessageSend = () => {
    if (userTextMessage.trim() !== "") {
      const newMessage: Message = {
        id: Date.now(),
        sender: "me",
        text: userTextMessage,
        time: timeNow,
      };

      setMessages((prev) => [...prev, newMessage]);

      setUserTextMessage("");
    }
  };

  return (
    <div
      className="rounded-md flex flex-col "
      style={{ height: "calc(100vh - 150px)" }}
    >
      <div className="flex gap-2 py-4 px-5 border rounded-md border-gray-500/40 bg-card static">
        <Image src={man} className="w-11 h-11 rounded-full" alt="header" />
        <div className="font-medium">
          <h1 className="2xl:text-xl">Kamran Khan</h1>
          <p className="text-xs">Typing...</p>
        </div>
      </div>
      {/* Messages container */}
      <div
        ref={bottomRef}
        className="flex-1 flex flex-col  hide-scrollbar mt-5 bg-card border border-b-0 border-gray-400/30 p-3 overflow-y-auto"
      >
        <div className="space-y-4">
          {messages.map((item) => (
            <div
              key={item.id}
              className={`flex ${
                item.sender === "me" ? "justify-end" : "justify-start"
              }`}
            >
              {item.sender === "other" && (
                <Image
                  src={man}
                  alt="avatar"
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}

              <div>
                <div
                  className={`whitespace-pre-line px-4 py-1.5 rounded-lg text-[14px] ${
                    item.sender === "me"
                      ? "custom-btn rounded-tr-none "
                      : "bg-[#5E6C79] rounded border border-gray-400/30"
                  }`}
                >
                  {item.text}
                </div>
                <div className="text-[#B0B0B0] text-right text-[12px]">
                  {item.time}
                </div>
              </div>
            </div>
          ))}
          {/* <div /> */}
        </div>
      </div>

      {/* Input at bottom */}
      <div className="bg-card  border border-t-0 border-gray-400/30">
        <ChatInput
          message={userTextMessage}
          setMessage={setUserTextMessage}
          onHandle={handleMessageSend}
        />
      </div>
    </div>
  );
};

export default ChatMessages;
