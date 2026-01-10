import DownloadCenter from "@/components/download-center/DownloadCenter";
import { myFetch } from "@/utils/myFetch";

export default async function DownloadCenterPage() {
  const res = await myFetch("/drives/my-drives");
  return (
    <>
      <DownloadCenter data={res?.data} />
    </>
  );
}
