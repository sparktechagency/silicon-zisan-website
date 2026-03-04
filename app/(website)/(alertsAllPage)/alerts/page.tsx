import Alerts from "@/components/alerts/Alerts";
import Pagination from "@/helper/Pagination";
import { myFetch } from "@/utils/myFetch";

export default async function AlertsPage() {
  const res = await myFetch("/notifications/me?page=1&limit=50", {
    tags: ["Notification"],
  });

  return (
    <>
      <Alerts res={res} />
      {res?.data?.length > 10 && (
        <Pagination totalPages={res?.pagination?.totalPage} />
      )}
    </>
  );
}
