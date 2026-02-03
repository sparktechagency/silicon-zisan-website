import Alerts from "@/components/alerts/Alerts";
import { myFetch } from "@/utils/myFetch";

export default async function AlertsPage() {
  const res = await myFetch("/notifications/me", {
    tags: ["allRead"],
  });
  return (
    <>
      <Alerts res={res} />
    </>
  );
}
