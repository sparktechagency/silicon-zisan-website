import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function AdminContact({ adminId }: any) {
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
      <div className="border rounded p-2 flex justify-between items-center mt-4 custom-btn">
        <div>
          <p className="text-gray-300">WhatsApp Support</p>
          <p className="text-gray-400">+8801859543990</p>
        </div>
        <p>
          <ChevronRight />
        </p>
      </div>
      <Link href={`/inbox?id=${adminId}`}>
        <Button className="custom-btn w-full mt-4">Live Chat</Button>
      </Link>
    </div>
  );
}
