import ViewProfile from "@/components/job-details/ViewProfile";
import { myFetch } from "@/utils/myFetch";

export default async function page({
  searchParams,
}: {
  searchParams: { profieID: string; check: string };
}) {
  const { profieID } = await searchParams;
  const { check } = await searchParams;

  const res = await myFetch(`/job-seekers/single/${profieID}`);

  const employeeId: string = res?.data?.user?._id as string;

  const response = await myFetch("/chats/create", {
    method: "POST",
    body: {
      participants: [employeeId],
    },
  });

  console.log("check-------", check);

  return (
    <>
      <ViewProfile
        data={res?.data}
        chatId={response?.data?._id}
        check={check}
      />
    </>
  );
}
