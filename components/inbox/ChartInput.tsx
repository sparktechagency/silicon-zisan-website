import { Textarea } from "@/components/ui/textarea";
import { Image as Movie, SendHorizonal } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  onHandle: () => void;
}

const ChatInput = ({ message, setMessage, onHandle }: Props) => {
  return (
    <div className="flex items-center p-2 space-x-2 ">
      {/* Text Input */}
      <Textarea
        // type="text"

        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm w-10 resize-none"
        placeholder="Type ……"
      />

      {/* Image Button */}
      <button className="p-2  rounded-full shadow hover:bg-gray-500">
        <Movie />
      </button>

      {/* Send Button */}
      <button
        className="p-2  rounded-full shadow hover:bg-gray-500"
        onClick={onHandle}
      >
        <SendHorizonal />
      </button>
    </div>
  );
};

export default ChatInput;
