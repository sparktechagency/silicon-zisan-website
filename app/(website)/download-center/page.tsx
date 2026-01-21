import DownloadCenter from "@/components/download-center/DownloadCenter";
import { myFetch } from "@/utils/myFetch";

export default async function DownloadCenterPage() {
  const res = await myFetch("/drives/my-drives");

  return (
    <>
      {res?.data?.length > 0 ? (
        <DownloadCenter data={res?.data} />
      ) : (
        <p className="text-center mt-10 text-gray-500">
          No downloads available.
        </p>
      )}
    </>
  );
}
