import InboxContainer from "./InboxContainer";
import { myFetch } from "@/utils/myFetch";
import { Chat } from "@/types/chat";

export default async function Inbox({ adminId }: { adminId: string }) {
  const response = await myFetch("/chats");
  const chats: Chat[] = response.data || [];

  return (
    <div className="2xl:max-w-[1400px] mx-auto w-full">
      <InboxContainer initialChats={chats} adminId={adminId} />
    </div>
  );
}
