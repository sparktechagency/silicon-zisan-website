"use client";

import { ArrowLeft, DownloadIcon, EyeIcon } from "lucide-react";
import Image from "next/image";
import pdf from "../../public/dashboard/pdf.png";
import viewOne from "../../public/dashboard/profile-view/one.png";
import ResumeView from "./ResumeView";

export default function ViewProfile({ data }: any) {
  console.log("data", data);

  const personalInfo = [
    { label: "Name", value: data?.user?.name?.trim() || "No Name" },
    { label: "Email", value: data?.user?.email },
    { label: "Contact", value: data?.user?.phone },
    { label: "Location", value: data?.user?.address },
    // { label: "Role", value: "Job Seeker" },
  ];

  const workInfo = [
    { label: "Category", value: "Senior Business Analytics" },
    { label: "Category", value: "Senior Business Analytics" },
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

      {/* Image */}
      <div className="flex gap-4">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${data?.user?.image}`}
          alt="Office"
          className="rounded-full h-28 w-28 object-cover"
          width={10}
          height={10}
          unoptimized
        />

        <div className="t">
          <p className="text-3xl">{data?.user?.name?.trim() || "No Name"}</p>
          <p className="text-2xl mt-1">Senior Business Analysis</p>
        </div>
      </div>

      {/* about details */}
      <div className="profile-container">
        {renderInfoSection("Personal Information", personalInfo)}
        {renderInfoSection("Work Information", workInfo)}
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
              <h2 className="text-xl font-semibold">Jhon Doe Pdf</h2>
              <p className="text-sm text-gray-300">01.02.2025</p>
            </div>
          </div>
          <div className="flex gap-3">
            <ResumeView
              trigger={
                <button className="w-8 h-8 border border-white rounded-full flex items-center justify-center cursor-pointer">
                  <EyeIcon className="p-0.5 text-white" />
                </button>
              }
            />

            <button className="w-8 h-8 border border-white rounded-full flex items-center justify-center cursor-pointer">
              <DownloadIcon className="p-0.5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* images */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="image-wrapper">
            <Image
              src={viewOne}
              alt={`Office ${index + 1}`}
              className="image"
            />
          </div>
        ))}
      </div>

      {/* work overview */}
      <div>
        <h1 className="font-semibold text-2xl">Work Overview</h1>
        <p className="mt-5">
          Lorem ipsum dolor sit amet consectetur. Ultrices eu vitae bibendum id
          at. Mattis tortor cursus viverra eget augue condimentum. Facilisi eu
          vel non scelerisque neque. Massa massa egestas morbi odio nunc
          sollicitudin. Vitae in r .
        </p>
      </div>
    </div>
  );
}
