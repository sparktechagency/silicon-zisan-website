import { Textarea } from "@/components/ui/textarea";
import { Image as Movie, SendHorizonal, X } from "lucide-react";
import React, { Dispatch, SetStateAction, useMemo } from "react";
import Image from "next/image";

interface Props {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  onHandle: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  file: File | null;
  onRemoveFile: () => void;
}

const ChatInput = ({
  message,
  setMessage,
  onHandle,
  onChange,
  file,
  onRemoveFile,
}: Props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const imageUrl = useMemo(() => {
    return file ? URL.createObjectURL(file) : null;
  }, [file]);

  const handleClick = () => {
    if (inputRef?.current) {
      inputRef.current.click();
    }
  };
  return (
    <div className="flex items-end p-2 space-x-2">
      <div className="flex-1 flex flex-col rounded-2xl border bg-background shadow-sm overflow-hidden">
        {/* Image Preview */}
        {imageUrl && (
          <div className="relative w-fit p-2">
            <Image
              src={imageUrl}
              alt="preview"
              width={100}
              height={100}
              className="rounded-lg object-cover max-h-37.5 w-auto border border-gray-300"
            />
            <button
              onClick={onRemoveFile}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600 shadow-md transform translate-x-1/4 -translate-y-1/4"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* Text Input */}
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 w-full border-none shadow-none focus-visible:ring-0 resize-none break-all min-h-[44px] px-4 py-3"
          placeholder="Type ……"
        />
      </div>

      {/* Image Button */}
      <button
        onClick={handleClick}
        className="p-3 mb-1 rounded-full shadow hover:bg-gray-200 dark:hover:bg-gray-800 text-[#0288A6] cursor-pointer bg-card border"
      >
        <Movie size={20} />

        <input
          type="file"
          accept=".png, .jpg, .jpeg, image/png, image/jpeg"
          className="hidden"
          ref={inputRef}
          onChange={onChange}
        />
      </button>

      {/* Send Button */}
      <button
        className="p-3 mb-1 rounded-full shadow hover:bg-gray-200 dark:hover:bg-gray-800 text-[#0288A6] cursor-pointer bg-card border"
        onClick={onHandle}
      >
        <SendHorizonal size={20} />
      </button>
    </div>
  );
};

export default ChatInput;
