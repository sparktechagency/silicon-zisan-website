import Appointments from "@/components/appointments/Appointments";
import { myFetch } from "@/utils/myFetch";
import React from "react";

export default async function page({
  searchParams,
}: {
  searchParams: { status: string };
}) {
  const { status } = await searchParams;
  const res = await myFetch(`/appointments/requests/me?status=${status}`);

  const employeeId: string = res?.data?.receiver?._id as string;

  const response = await myFetch("/chats/create", {
    method: "POST",
    body: {
      participants: [employeeId],
    },
  });

  console.log(" chatId={response}", response);

  return (
    <>
      <Appointments res={res?.data} chatId={response?.data?._id} />
    </>
  );
}
