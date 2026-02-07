import Appointments from "@/components/appointments/Appointments";
import { myFetch } from "@/utils/myFetch";

export default async function page({
  searchParams,
}: {
  searchParams: { status: string; id: string };
}) {
  const { status } = await searchParams;
  const { id } = await searchParams;
  const res = await myFetch(`/appointments/requests/me?status=${status}`, {
    tags: ["status"],
  });

  const response = await myFetch("/chats/create", {
    method: "POST",
    body: {
      participants: [id],
    },
  });

  return (
    <>
      <Appointments res={res?.data} chatId={response?.data?._id} />
    </>
  );
}
