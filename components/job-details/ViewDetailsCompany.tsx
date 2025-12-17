"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import logo from "../../public/dashboard/hotel.png";
import { ArrowLeft, Clock3 } from "lucide-react";
import Link from "next/link";
import dayjs from "dayjs";

export default function ViewDetailsCompany({ data }: any) {
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
        <Image
          src={logo}
          alt="Office"
          width={400}
          height={400}
          className="rounded-md object-cover w-80 h-48"
        />

        <div className="mt-4 sm:mt-0">
          <p className="text-lg font-semibold">{data?.author?.name}</p>
          <p className="text-sm text-gray-300">{data?.author?.address}</p>
          <p className="text-md mt-1">{data?.category}</p>
          <div className="flex gap-4 text-sm mt-2">
            <p className="border p-0.5 rounded bg-[#465565] px-3">
              {data?.jobType}
            </p>
            <p>${data?.salaryAmount}/Month</p>
          </div>
          <div className="flex gap-4 items-center mt-2 text-sm">
            <p className="flex gap-2">
              <Clock3 size={20} /> {dayjs(data?.deadline).format("YYYY-MM-DD")}
            </p>
          </div>
          <div className="space-x-2">
            <Link href={`/applied-jobs/${data?._id}`}>
              <Button className="custom-btn mt-5">Job Applicants</Button>
            </Link>
            <Link href="/alert-setting" className="">
              <Button className="custom-btn mt-5">
                Turn on notification on this job
              </Button>
            </Link>
          </div>
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

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end">
        <Link href="/edit-job-post">
          <Button className="custom-btn">Edit Now</Button>
        </Link>
        <Button className="custom-btn">Withdraw</Button>
      </div>
    </div>
  );
}
