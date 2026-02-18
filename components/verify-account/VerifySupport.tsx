import { Label } from "../ui/label";
import { Button } from "../ui/button";
import VerifyModal from "./VerifyModal";
import { myFetch } from "@/utils/myFetch";
import { FileText } from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";

export default async function VerifySupport() {
  const res = await myFetch(`/verifications/me`, {
    tags: ["verifications"],
  });

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-center ">
        <div>
          <Label className="text-[22px]">Upload Business Documents</Label>
        </div>

        <div>
          <VerifyModal
            trigger={
              <Button className="custom-btn  px-12 py-2 rounded-md mt-2">
                Add Document
              </Button>
            }
          />
        </div>
      </div>

      {/* data show get  */}

      <div className="mt-10">
        {res?.data
          ?.sort(
            (a: any, b: any) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .map((item: any, index: any) => (
            <div key={index} className="mb-4">
              {/* Transaction Info */}
              <div className="flex items-center justify-between bg-card p-4 rounded border border-gray-300/30 ">
                <div>
                  <div className="text-lg font-semibold">
                    {item?.documents.map((doc: any, index: any) => (
                      <p key={index}>
                        <Link
                          key={index}
                          href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${doc}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline text-sm"
                        >
                          {/* {doc ? `${index + 1} Verified File` : "No File"} */}
                          <div className="flex items-center gap-1 my-2">
                            <FileText className="text-red-300 w-5 h-5" />
                            <span className=" hover:underline">
                              {doc && `PDF File${index + 1}.pdf`}
                            </span>
                          </div>
                        </Link>
                      </p>
                    ))}
                  </div>
                </div>

                <div className="">
                  <p>
                    CreatedAt : {dayjs(item?.createdAt).format("DD-MM-YYYY")}
                  </p>
                  <p className="mt-1">Status : {item?.status}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
