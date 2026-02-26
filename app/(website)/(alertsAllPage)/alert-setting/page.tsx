import AlertsSettingCreate from "@/components/alerts/AlertsSettingCreate";
import { myFetch } from "@/utils/myFetch";

export default async function page() {
  const res = await myFetch("/employers/me");

  return (
    <>
      <AlertsSettingCreate data={res?.data} />
    </>
  );
}
