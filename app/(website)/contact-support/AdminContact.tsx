"use client";
import { myFetch } from "@/utils/myFetch";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function AdminContact({ adminId }: any) {
  const router = useRouter();
  const handleChatWithAdmin = async () => {
    try {
      const res = await myFetch(`/chats/create`, {
        method: "POST",
        body: {
          participants: [adminId],
        },
      });

      if (res.success) {
        router.push(`/inbox`);
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
      <div className="border rounded p-2 flex justify-between items-center mt-4 custom-btn">
        <Link
          href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to=info@jobsinapp.de"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="">
            <p className="text-gray-300">Email Support</p>
            <p className="text-gray-400">info@jobsinapp.de</p>
          </div>
        </Link>

        <p>
          <ChevronRight />
        </p>
      </div>
      <a
        href="https://wa.me/01716752129"
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="border rounded p-2 flex justify-between items-center mt-4 custom-btn cursor-pointer">
          <div>
            <p className="text-gray-300">WhatsApp Support</p>
            <p className="text-gray-400">+8801859543990</p>
          </div>
          <ChevronRight />
        </div>
      </a>

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
