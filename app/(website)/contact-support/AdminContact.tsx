import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function AdminContact({ adminId }: any) {
  return (
    <div className="">
      <div className="border rounded p-2 flex justify-between">
        <div>
          <p className="text-gray-300">Chat with support team</p>
          <p className="text-gray-400">Please click now send message</p>
        </div>
        <p>
          <ChevronRight />
        </p>
      </div>
      <div className="border rounded p-2 flex justify-between items-center mt-4 ">
        <div>
          <p className="text-gray-300">Support Email</p>
          <p className="text-gray-400">info@jobsinapp.de</p>
        </div>
        <p>
          <ChevronRight />
        </p>
      </div>
      <div className="border rounded p-2 flex justify-between items-center mt-4">
        <div>
          <p className="text-gray-300">Contact Number</p>
          <p className="text-gray-400">+8801859543990</p>
        </div>
        <p>
          <ChevronRight />
        </p>
      </div>
      <Link href={`/inbox?id=${adminId}`}>
        <Button className="custom-btn w-full mt-4">Send Message</Button>
      </Link>
    </div>
  );
}
