import React from "react";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ChatCard } from "./ChartCard";

const chats = [
  {
    name: "Md Kamran Khan",
    message: "Hi Can I Help You Today?",
    time: "09:02 Am",
    unread: "2",
  },
  {
    name: "Md Kamran Khan",
    message: "Hi Can I Help You Today?",
    time: "09:02 Am",
    unread: "2",
  },
  {
    name: "Md Kamran Khan",
    message: "Hi Can I Help You Today?",
    time: "09:02 Am",
    unread: "2",
  },
  {
    name: "Md Kamran Khan",
    message: "Hi Can I Help You Today?",
    time: "09:02 Am",
    unread: "2",
  },
  {
    name: "Md Kamran Khan",
    message: "Hi Can I Help You Today?",
    time: "09:02 Am",
    unread: "2",
  },
  {
    name: "Md Kamran Khan",
    message: "Hi Can I Help You Today?",
    time: "09:02 Am",
    unread: "2",
  },
  {
    name: "Md Kamran Khan",
    message: "Hi Can I Help You Today?",
    time: "09:02 Am",
    unread: "2",
  },
  {
    name: "Md Kamran Khan",
    message: "Hi Can I Help You Today?",
    time: "09:02 Am",
    unread: "2",
  },
  {
    name: "Md Kamran Khan",
    message: "Hi Can I Help You Today?",
    time: "09:02 Am",
    unread: "2",
  },
  {
    name: "Md Kamran Khan",
    message: "Hi Can I Help You Today?",
    time: "09:02 Am",
    unread: "2",
  },
  {
    name: "Md Kamran Khan",
    message: "Hi Can I Help You Today?",
    time: "09:02 Am",
    unread: "2",
  },
  {
    name: "Md Kamran Khan",
    message: "Hi Can I Help You Today?",
    time: "09:02 Am",
    unread: "2",
  },
  {
    name: "Md Kamran Khan",
    message: "Hi Can I Help You Today?",
    time: "09:02 Am",
    unread: "2",
  },
  {
    name: "Md Kamran Khan",
    message: "Hi Can I Help You Today?",
    time: "09:02 Am",
    unread: "2",
  },
];

const AllUserChart = () => {
  return (
    <div
      className="max-w-md mx-auto  pr-2 flex flex-col"
      style={{ height: "calc(100vh - 150px)" }}
    >
      <div>
        <h1 className="text-lg font-semibold">Message</h1>
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
        <div className="mr-4">
          {chats.map((chat, index) => (
            <ChatCard key={index} card={chat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllUserChart;
