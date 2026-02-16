"use client";

import { ArrowLeft, DownloadIcon, EyeIcon } from "lucide-react";
import Image from "next/image";
import pdf from "../../public/dashboard/pdf.png";
import CustomImage from "@/utils/CustomImage";
import { Button } from "../ui/button";
import { myFetch } from "@/utils/myFetch";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ViewProfile({ data, chatId }: any) {
  const router = useRouter();
  const handleChat = async (id: string) => {
    try {
      const res = await myFetch(`/chats/create`, {
        method: "POST",
        body: {
          participants: [id],
        },
      });

      if (res.success) {
        router.push(`/inbox?id=${chatId}`);
      } else {
        toast.error((res as any)?.error[0]?.message);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "something went wrong",
      );
    }
  };

  const personalInfo = [
    { label: "Name", value: data?.user?.name?.trim() || "No Name" },
    { label: "Email", value: data?.user?.email || "No" },
    { label: "Contact", value: data?.user?.phone || "No" },
    { label: "Location", value: data?.user?.address || "No" },
    // { label: "Role", value: "Job Seeker" },
  ];

  const workInfo = [
    { label: "Category", value: data?.experiences[0]?.category || "N/A" },
    {
      label: "Sub Category",
      value: data?.experiences[0]?.subCategory || "N/A",
    },
  ];

  const renderInfoSection = (title: string, data: any) => (
    <div className="section mt-9">
      <h2 className="text-2xl">{title}</h2>
      {data.map((item: any, index: number) => (
        <div className="grid grid-cols-2 mb-3 mt-3" key={index}>
          <div className="label">{item.label}</div>
          <div className="value">: {item.value}</div>
        </div>
      ))}
    </div>
  );
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
      {/* Image */}{" "}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-4">
          <CustomImage
            src={data?.user?.image}
            title="Office"
            className="rounded-full h-28 w-28 object-cover"
            width={10}
            height={10}
          />

          <div className="">
            <p className="text-3xl">{data?.user?.name?.trim() || "No Name"}</p>
            <p className="text-2xl mt-1">Senior Business Analysis</p>
          </div>
        </div>
        <div>
          <Button
            onClick={() => handleChat(chatId)}
            className="custom-btn mt-5 h-10 "
          >
            Contact
          </Button>
        </div>
      </div>
      {/* {data?.isProfileVisible === true && ( */}
      <>
        {/* about details */}
        <div className="profile-container">
          {data.isProfileVisible === true &&
            renderInfoSection("Personal Information", personalInfo)}
          {renderInfoSection("Work Information", workInfo)}
        </div>
        {/* resume and others */}
        {data.isProfileVisible === true && data?.resumeUrl && (
          <div className=" text-white   space-y-6 ">
            {/* Header */}
            <div className="flex justify-between items-center border border-[#A6B6C7] rounded-md p-4">
              <div className="flex items-center gap-6">
                <div>
                  <Image src={pdf} alt="Office" width={60} height={50} />
                </div>
                <p>{data?.resumeUrl ? "Resume.Pdf" : "No Pdf"}</p>
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
          </div>
        )}
        {/* images */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {data.isProfileVisible === true &&
            data?.attachments?.map((item: any, index: number) => {
              return (
                <div key={index} className="image-wrapper">
                  <CustomImage
                    src={item}
                    title={`Office ${index + 1}`}
                    className="object-cover w-80 h-80"
                    width={100}
                    height={100}
                  />
                </div>
              );
            })}
        </div>
        {/* work overview */}
        {data.isProfileVisible === true && (
          <div>
            <h1 className="font-semibold text-2xl">Work Overview</h1>
            <p className="mt-3">{data?.overview}</p>
          </div>
        )}
        {data.isProfileVisible === true && (
          <div>
            <h1 className="font-semibold text-2xl">Experiences</h1>
            <p className="mt-3">
              Experience : {data?.experiences[0]?.experience} Years
            </p>
            <p className="mt-1">
              Salary : {data?.experiences[0]?.salaryAmount && <span>€</span>}{" "}
              {data?.experiences[0]?.salaryAmount || "No Amount"}
            </p>
          </div>
        )}
      </>
      {/* )} */}
    </div>
  );
}
