import AlertsSettingCreate from "@/components/alerts/AlertsSettingCreate";
import { myFetch } from "@/utils/myFetch";

export default async function page() {
  const res = await myFetch("/employers/me");
  console.log("res", res);

  return (
    <>
      <AlertsSettingCreate data={res?.data} />
    </>
  );
}
