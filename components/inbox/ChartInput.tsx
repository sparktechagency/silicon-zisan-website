import { Textarea } from "@/components/ui/textarea";
import { Image as Movie, SendHorizonal } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

interface Props {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  onHandle: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ChatInput = ({ message, setMessage, onHandle, onChange }: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (inputRef?.current) {
      inputRef.current.click();
    }
  };
  return (
    <div className="flex items-center p-2 space-x-2 ">
      {/* Text Input */}
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 items-center shadow-sm rounded-2xl text-sm resize-none break-all"
        placeholder="Type ……"
      />

      {/* Image Button */}
      <button
        onClick={handleClick}
        className="p-2  rounded-full shadow hover:bg-gray-500 text-[#0288A6] cursor-pointer"
      >
        <Movie />

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={inputRef}
          onChange={onChange}
        />
      </button>

      {/* Send Button */}
      <button
        className="p-2  rounded-full shadow hover:bg-gray-500 text-[#0288A6] cursor-pointer"
        onClick={onHandle}
      >
        <SendHorizonal />
      </button>
    </div>
  );
};

export default ChatInput;
