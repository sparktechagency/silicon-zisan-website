"use client";
import { myFetch } from "@/utils/myFetch";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import EmailChoiceModal from "./EmailChoiceModal";

export default function AdminContact({ chatId, adminContact }: any) {
  const router = useRouter();

  const handleChatWithAdmin = async () => {
    try {
      const res = await myFetch(`/chats/create`, {
        method: "POST",
        body: {
          participants: [chatId],
        },
      });

      if (res.success) {
        router.push(`/inbox?id=${chatId}`);
      } else {
        toast.error((res as any)?.error[0]?.message);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "something went wrong",
      );
    }
  };
  return (
    <div className="">
      <EmailChoiceModal
        email={adminContact?.email}
        trigger={
          <div className="w-full border rounded p-2 flex justify-between items-center mt-4 custom-btn">
            <div className="">
              <p className="text-gray-300">Email Support</p>
              <p className="text-gray-400">{adminContact?.email}</p>
            </div>

            <p>
              <ChevronRight />
            </p>
          </div>
        }
      />
      <Link
        href={`https://wa.me/${adminContact?.whatsApp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="border rounded p-2 flex justify-between items-center mt-4 custom-btn cursor-pointer">
          <div>
            <p className="text-gray-300">WhatsApp Support</p>
            <p className="text-gray-400">{adminContact?.whatsApp}</p>
          </div>
          <ChevronRight />
        </div>
      </Link>

      <div
        className="custom-btn flex items-center py-5 px-3 mt-4 rounded"
        onClick={handleChatWithAdmin}
      >
        <p className="w-full">Live Chat</p>
        <p>
          <ChevronRight />
        </p>
      </div>
    </div>
  );
}
