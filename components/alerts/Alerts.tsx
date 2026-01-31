import Container from "@/share/Container";
import { myFetch } from "@/utils/myFetch";
import { Bell } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default async function Alerts() {
  const res = await myFetch("/notifications/me");

  return (
    <Container className="my-16">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">All Alerts</h1>
        <Link href={`/alert-setting`} className="">
          <Button className="custom-btn mt-5">
            {/* Turn on notification on this job */}
            Settings
          </Button>
        </Link>
        {/* <Link href="/alert-setting">
          <button className="flex items-center gap-3 custom-btn rounded px-5 py-3 ">
            <Settings
              size={22}
              className="button-active w-8 h-8 rounded-full p-1"
            />
            Settings
          </button>
        </Link> */}
      </div>
      {res?.data?.data.length > 0 ? (
        res?.data?.data?.map((item: any) => (
          <div key={item?._id} className="mb-4">
            {/* Transaction Info */}
            <div className="flex items-center justify-between bg-card p-4 rounded border border-gray-300/30 ">
              <div>
                <p className="text-lg flex gap-3 items-center font">
                  <Bell />
                  {item.message}
                </p>
              </div>

              <div className="flex space-x-2">
                <button className="p-1 rounded hover:bg-gray-500 transition cursor-pointer">
                  {item?.timeAgo}
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-lg">Notifications Not Found</p>
      )}
    </Container>
  );
}
