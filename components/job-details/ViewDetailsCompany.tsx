"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock3 } from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import { revalidate } from "@/utils/revalidateTag";
import CustomImage from "@/utils/CustomImage";
import { useRouter } from "next/navigation";

export default function ViewDetailsCompany({ data, length }: any) {
  const router = useRouter();
  const handleWithdraw = async (id: string) => {
    try {
      const res = await myFetch(`/jobs/delete/${id}`, {
        method: "DELETE",
      });

      if (res.success) {
        toast.success(res.message);
        await revalidate("single-job");
        router.push("/my-jobs");
      } else {
        toast.error((res as any)?.error[0].message);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-card text-white p-6 rounded-lg max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <div
          className=" bg-[#374859] text-white border border-[#FFFFFF0D] rounded-full p-2 cursor-pointer w-10 h-10 "
          onClick={() => history.back()}
        >
          <ArrowLeft />
        </div>
        <p>View Details</p>
      </div>

      {/* Image */}
      <div className="sm:flex gap-4">
        <div className="shrink-0 w-32 sm:w-36 md:w-40">
          <CustomImage
            src={data?.author?.image}
            title={data?.author?.name}
            width={160}
            height={160}
            className="rounded-md object-contain w-80 h-44"
          />
        </div>

        <div className="mt-4 sm:mt-0">
          <p className="text-lg font-semibold notranslate">
            {data?.author?.name}
          </p>
          <p className="text-sm text-gray-300">{data?.author?.address}</p>
          <p className="text-md mt-1 notranslate">{data?.category}</p>
          <p className="text-md mt-1 notranslate">{data?.subCategory}</p>
          <div className="flex gap-4 text-sm mt-2">
            <p className="border p-0.5 rounded bg-[#465565] px-3">
              {data?.jobType}
            </p>
            <p>
              €{data?.salaryAmount}/ {data?.salaryType}ly
            </p>
          </div>
          <div className="flex gap-4 items-center mt-2 text-sm">
            <p className="flex gap-2">
              <Clock3 size={20} /> {dayjs(data?.deadline).format("DD-MM-YYYY")}
            </p>
          </div>
          {length > 0 && (
            <div className="space-x-2">
              <Link href={`/applied-jobs/${data?._id}`}>
                <Button className="custom-btn mt-3 h-10">
                  {length} Applied
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Job Description */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Job Description</h3>
        <p className="text-sm text-gray-300">{data?.description}</p>
      </div>

      {/* Responsibilities */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
        <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
          {data?.responsibilities?.map((item: any, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Qualifications */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Qualifications</h3>
        <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
          {data?.qualifications?.map((item: any, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">About </h3>
        <p className="whitespace-break-spaces">{data?.aboutCompany}</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end">
        <Link href={`/edit-job-post/${data?._id}`}>
          <Button className="custom-btn">Edit Now</Button>
        </Link>

        <Button
          onClick={() => handleWithdraw(data?._id)}
          className="bg-red-500"
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
