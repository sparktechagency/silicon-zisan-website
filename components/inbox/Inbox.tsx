// import InboxContainer from "./InboxContainer";
// import { myFetch } from "@/utils/myFetch";

// export default async function Inbox({
//   name,
//   id,
// }: {
//   name?: string;
//   id?: string;
// }) {
//   const chatRes = await myFetch(`/chats?searchTerm=${name || ""}`, {
//     tags: ["chatlist"],
//   });

//   const messageRes = await myFetch(`/messages/chat/${id || ""}`, {
//     method: "GET",
//     cache: "no-cache",
//     tags: ["chatMessages"],
//   });

//   return (
//     <div className="2xl:max-w-350 mx-auto w-full">
//       <InboxContainer initialChats={chatRes?.data || []} />
//     </div>
//   );
// }
