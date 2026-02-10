// import Inbox2 from "@/components/inbox2/Inbox2";

import Inbox2 from "@/components/inbox2/Inbox2";
import { myFetch } from "@/utils/myFetch";

// export default async function InboxPage({
//   searchParams,
// }: {
//   searchParams: { name: string; id: string };
// }) {
//   const { name, id } = await searchParams;

//   return (
//     <>
//       <Inbox2 name={name} id={id} />
//     </>
//   );
// }

export default async function Page({
  searchParams,
}: {
  searchParams: { name?: string; id?: string };
}) {
  const { name, id } = await searchParams;

  const messageRes = await myFetch(`/messages/chat/${id}`, {
    cache: "no-store",
    tags: ["messageList"],
  });

  const chatRes = await myFetch(`/chats?searchTerm=${name || ""}`, {
    cache: "no-store",
    tags: ["chatlist"],
  });

  const singleData = await myFetch(`/chats/${id}`, {
    cache: "no-store",
    tags: ["messages"],
  });

  return (
    <>
      <Inbox2
        chats={chatRes?.data}
        allMessages={messageRes?.data}
        chatId={id}
        singleData={singleData?.data}
      />
    </>
  );
}
