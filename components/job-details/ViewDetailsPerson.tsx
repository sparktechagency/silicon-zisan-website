"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, DownloadIcon, EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import pdf from "../../public/dashboard/pdf.png";

import dayjs from "dayjs";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import { revalidate } from "@/utils/revalidateTag";

export default function ViewDetailsPerson({ data }: any) {
  const handleApproved = async (id: string) => {
    try {
      const res = await myFetch(`/applications/update/${id}`, {
        method: "PATCH",
        body: {
          status: "Accepted",
        },
      });

      if (res.success) {
        toast.success(res.message);
        await revalidate("job-seeker-details");
      } else {
        toast.error((res as any).error[0].message);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "something went wrong");
    }
  };

  return (
    <div className="bg-card text-white p-6 rounded-lg max-w-4xl mx-auto space-y-6 my-12">
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
        <Image
          src={
            data?.user?.image
              ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${data?.user?.image}`
              : "No Image"
          }
          alt="Office"
          className="rounded-md w-44 h-44 object-cover"
          width={10}
          height={10}
          unoptimized
        />

        <div className="mt-4 sm:mt-0">
          <p className="text-xl sm:text-3xl">
            {data?.user?.name?.trim() ? data?.user?.name : "No Name"}
          </p>
          <p className="tex-xl sm:text-2xl mt-1">{data?.job?.subCategory}</p>

          <div className="flex gap-4 items-center mt-2 text-sm">
            <p className="text-xl sm:text-2xl gap-2">
              Applied : {dayjs(data?.createdAt).format("YYYY-MM-DD")}
            </p>
          </div>
          <div className="flex gap-5">
            <Link href={`/view-profile?profieID=${data?.user?._id}`}>
              <Button className="border border-[#90D7E8] bg-card mt-5 h-10">
                View Profile
              </Button>
            </Link>
            <Link href="/inbox">
              <Button className="custom-btn mt-5 h-10 ">Contact</Button>
            </Link>
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-3xl">About Me</h1>
        <p className="mt-4">{data?.about}</p>
      </div>

      {/* resume and others */}
      <div className=" text-white   space-y-6 ">
        {/* Header */}
        <div className="flex justify-between items-center border border-[#A6B6C7] rounded-md p-4">
          <div className="flex items-center gap-6">
            <div>
              <Image src={pdf} alt="Office" width={60} height={50} />
            </div>
            <div>
              <h2 className="text-xl font-semibold">
                {data?.resumeUrl ? `Pdf File` : "No Pdf"}
              </h2>
              {/* <p className="text-sm text-gray-300">
                {dayjs(data?.createdAt).format("YYYY-MM-DD")}
              </p> */}
            </div>
          </div>
          <div className="flex gap-3">
            <a
              href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data?.resumeUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="w-8 h-8 border border-white rounded-full flex items-center justify-center cursor-pointer">
                <EyeIcon className="p-0.5 text-white" />
              </button>
            </a>
            <button className="w-8 h-8 border border-white rounded-full flex items-center justify-center cursor-pointer">
              <DownloadIcon className="p-0.5 text-white" />
            </button>
          </div>
        </div>

        {/* Qualification */}
        <div className=" pt-4 space-y-2">
          <h3 className="text-lg font-semibold">Qualification</h3>
          <div className=" gap-4 text-sm text-gray-300 list-disc">
            <ul className="list-disc pl-5 text-sm text-gray-300 space-y-2">
              {data?.job?.qualifications?.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* // <div
              //   key={index}
              //   className={`${
              //     index !== data.length - 1 ? "sm:border-r border-l-white" : ""
              //   }`}
              // >
              //   <p>{item}</p>
              // </div> */}

        {/* Availability & Salary */}
        <div className="flex space-x-10 text-sm text-gray-300">
          <div>
            <p>Availability</p>
            <p className="text-white">07:00 AM - 08:00 PM</p>
          </div>
          <p className="border-l border-l-white" />
          <div className="">
            <p>Expected Salary</p>
            {data?.expectedSalary ? (
              <p className="text-white">${data?.expectedSalary}</p>
            ) : (
              "No Amount"
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4  pt-4">
          {/* <FeedBackModal /> */}
          <Link href={`/appointment-create-form?id=${data?._id}`}>
            <button className="cursor-pointer border border-white px-4 py-2 rounded text-white hover:bg-white hover:text-[#0F172A] transition">
              Create Appointment
            </button>
          </Link>
          {data?.status !== "Accepted" && (
            <button
              className="cursor-pointer bg-[#149235] px-4 py-2 rounded text-white hover:bg-green-600 transition"
              onClick={() => handleApproved(data?._id)}
            >
              Approve
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
