import React from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import VerifyModal from "./VerifyModal";
import { myFetch } from "@/utils/myFetch";
import { EyeIcon } from "lucide-react";

export default async function VerifySupport() {
  const res = await myFetch(`/verifications/me`, {
    tags: ["verifications"],
  });
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <Label className="sm:text-xl md:text-2xl">
            Upload Business Documents
          </Label>
        </div>

        <div>
          <VerifyModal
            trigger={
              <Button className="custom-btn  px-12 py-2 rounded-md">
                Confirm
              </Button>
            }
          />
        </div>
      </div>

      {/* data show get  */}

      <div className="mt-10">
        {res?.data?.map((item: any, index: any) => (
          <div key={index} className="mb-4">
            {/* Transaction Info */}
            <div className="flex items-center justify-between bg-card p-4 rounded border border-gray-300/30 ">
              <div>
                <p className="text-lg font-semibold">
                  {item?.documents[0] || "No PDF"}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <a
                  href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item?.documents[0]}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="p-1 rounded hover:bg-gray-500 transition cursor-pointer mt-1">
                    <EyeIcon className="w-5 h-5" />
                  </button>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
