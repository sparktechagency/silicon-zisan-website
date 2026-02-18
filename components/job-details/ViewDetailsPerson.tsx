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
import { useRouter } from "next/navigation";
import CustomImage from "@/utils/CustomImage";

export default function ViewDetailsPerson({ data, chatId }: any) {
  const router = useRouter();

  console.log(
    "data?.user?.jobSeeker?.about",
    data?.resume?.personalInfo?.aboutMe,
  );

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

  const handleChat = async (id: string) => {
    try {
      const res = await myFetch(`/chats/create`, {
        method: "POST",
        body: {
          participants: [id],
        },
      });

      if (res.success) {
        router.push(`/inbox?id=${id}`);
      } else {
        toast.error((res as any)?.error[0]?.message);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "something went wrong",
      );
    }
  };

  console.log("data get", data);

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
        {/* <Image
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
        /> */}

        <CustomImage
          src={data?.user?.image}
          title={data?.user?.name || "User Image"}
          className="rounded-md w-44 h-44 object-cover"
        />

        <div className="mt-4 sm:mt-0">
          <p className="text-xl sm:text-3xl notranslate">
            {data?.user?.name?.trim() ? data?.user?.name : "No Name"}
          </p>
          <p className="tex-xl sm:text-2xl mt-1">{data?.job?.subCategory}</p>

          <div className=" text-sm">
            <p className="text-xl sm:text-2xl gap-2">
              Applied : {dayjs(data?.createdAt).format("DD-MM-YYYY")}
            </p>
            {/* <p className="text-2xl mt-2">Job Type : {data?.job?.jobType}</p> */}
          </div>
          <div className="flex gap-5">
            <Link href={`/view-profile?profieID=${data?.user?._id}`}>
              <Button className="border border-[#90D7E8] bg-card mt-5 h-10">
                View Profile
              </Button>
            </Link>

            <Button
              onClick={() => handleChat(chatId)}
              className="custom-btn mt-5 h-10 "
            >
              Contact
            </Button>
          </div>
        </div>
      </div>

      {/* <div className="space-y-2">
        <div className="grid grid-cols-[150px_10px_1fr] items-center">
          <h1 className="">Category</h1>
          <span>:</span>
          <h1 className="capitalize">{data?.job?.category || "N/A"}</h1>
        </div>

        <div className="grid grid-cols-[150px_10px_1fr] items-center">
          <h1 className="">Sub Category</h1>
          <span>:</span>
          <h1 className="capitalize">{data?.job?.subCategory || "N/A"}</h1>
        </div>
      </div> */}

      <div>
        <h1 className="text-xl">About Me</h1>
        <p className="mt-4 text-gray-300 w-[80%]">
          {data?.resume?.personalInfo?.aboutMe || "No information provided"}
        </p>
      </div>

      {/* resume and others */}
      <div className=" text-white   space-y-6 ">
        {/* Header */}
        {data?.resumeUrl && (
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

              <a
                href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data?.resumeUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="w-8 h-8 border border-white rounded-full flex items-center justify-center cursor-pointer">
                  <DownloadIcon className="p-0.5 text-white" />
                </button>
              </a>
            </div>
          </div>
        )}

        {/* Qualification */}
        {/* <div className=" pt-4 space-y-2">
          <h3 className="text-lg font-semibold">Qualification</h3>
          <div className=" gap-4 text-sm text-gray-300 list-disc">
            <ul className="list-disc pl-5 text-sm text-gray-300 space-y-2">
              {data?.job?.qualifications?.map((item: string, index: number) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div> */}

        {/* resposibilites */}
        {/* <div className=" pt-4 space-y-2">
          <h3 className="text-lg font-semibold">Responsibilities</h3>
          <div className=" gap-4 text-sm text-gray-300 list-disc">
            <ul className="list-disc pl-5 text-sm text-gray-300 space-y-2">
              {data?.job?.responsibilities?.map(
                (item: string, index: number) => (
                  <li key={index}>{item}</li>
                ),
              )}
            </ul>
          </div>
        </div> */}

        {data?.resume?.educations && (
          <div className=" pt-4 space-y-2">
            <h3 className="text-lg font-semibold">Qualification</h3>
            <div className=" gap-4 text-sm text-gray-300 list-disc">
              {data?.resume?.educations?.map((item: any, index: number) => (
                <div key={index} className="">
                  <p className="py-1">Degree : {item.degree}</p>
                  <p className="py-1">Institution : {item.institute}</p>
                  <p className="py-1">Grade : {item.grade}</p>
                  <p className="py-1">Year : {item.year}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Availability & Salary */}
        <div className="">
          <div className="">
            <h1 className="text-lg font-semibold">Expected Salary</h1>
            {data?.expectedSalary && (
              <p className="text-gray-300">
                €{data?.expectedSalary || "N/A"} {data?.salaryType}ly
              </p>
            )}
          </div>

          {/* <div className="mt-4">
            <h1 className="text-lg font-semibold">Experience</h1>
            {<p className="text-gray-300">{data?.job?.experience}</p>}
          </div> */}
        </div>

        {/* about company */}
        {/* <div>
          <h1 className="text-lg font-semibold">About Company</h1>
          <p className="mt-2 text-gray-300">{data?.job?.aboutCompany}</p>
        </div> */}

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
