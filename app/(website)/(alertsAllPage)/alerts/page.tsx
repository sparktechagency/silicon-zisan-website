import Alerts from "@/components/alerts/Alerts";
import Pagination from "@/helper/Pagination";
import { myFetch } from "@/utils/myFetch";

export default async function AlertsPage() {
  const res = await myFetch("/notifications/me?page=1&limit=50", {
    tags: ["Notification"],
  });

  console.log("Initial data from server:", {
    dataLength: res?.data?.data?.length,
    pagination: res?.data?.pagination,
  });

  return (
    <>
      <Alerts res={res} />
      <Pagination totalPages={res?.pagination?.totalPage} />
    </>
  );
}
