import ViewDetailsPerson from "@/components/job-details/ViewDetailsPerson";
import { myFetch } from "@/utils/myFetch";
import { User } from "lucide-react";

export default async function page({ params }: { params: { id: string } }) {
  const id = (await params)?.id;
  const res = await myFetch(`/applications/single/${id}`, {
    tags: ["job-seeker-details"],
  });

  const employeeId: string = res?.data?.user?._id as string;

  const response = await myFetch("/chats/create", {
    method: "POST",
    body: {
      participants: [employeeId],
    },
  });

  console.log("res", res);

  return (
    <>
      {res?.data ? (
        <ViewDetailsPerson data={res.data} chatId={response?.data?._id} />
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-3 rounded-full bg-gray-200 p-4">
            <User className="h-6 w-6 text-gray-500" />
          </div>

          <p className="text-lg font-medium text-gray-200">No data found</p>
          <p className=" text-gray-400 mt-1">
            There is no information available to display.
          </p>
        </div>
      )}
    </>
  );
}
