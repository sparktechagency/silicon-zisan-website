import { ChevronRight, Fingerprint, Globe } from "lucide-react";
import Link from "next/link";
import { ChangePasswordOtp } from "@/app/(website)/profile/my-settings/ChangePasswordOtp";
import { myFetch } from "@/utils/myFetch";

export default async function Setting() {
  const getProfile = await myFetch(`/users/profile`);
  // const handleOtp = async () => {
  //   try {
  //     const res = await myFetch("/auth/forget-password", {
  //       method: "POST",
  //       body: {
  //         email: "juyelrana7752@gmail.com",
  //       },
  //     });
  //   } catch (error) {
  //     const message =
  //       error instanceof Error ? error.message : "An error occurred";
  //     toast.error(message);
  //   }
  // };
  return (
    <div className="flex flex-col space-y-4 ">
      <Link href="/factor-authenticaiton">
        <div
          className={`flex justify-between items-center pl-7 cursor-pointer bg-card border border-gray-400  font-semibold py-3 rounded-lg`}
        >
          <button className="flex  items-center capitalize">
            <span className="mr-2 text-nowrap">
              <Fingerprint />
            </span>
            2-fector authentication
          </button>
          <p>
            <ChevronRight />
          </p>
        </div>
      </Link>

      <ChangePasswordOtp
        email={getProfile?.data?.email}
        trigger={
          <div
            className={`flex justify-between items-center pl-7 cursor-pointer  
    bg-card border border-gray-400 font-semibold py-3 rounded-lg`}
          >
            <button className="flex items-center capitalize cursor-pointer">
              <span className="mr-2 text-nowrap">
                <Globe />
              </span>
              Change password
            </button>
            <p>
              <ChevronRight />
            </p>
          </div>
        }
        // onOtpRequest={handleOtp}
      />
    </div>
  );
}
