"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, DownloadIcon, EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import personOne from "../../public/dashboard/person-one.png";
import pdf from "../../public/dashboard/pdf.png";
// import FeedBackModal from "./FeedBackModal";
// import resume from "../../public/dashboard/profile-view/cv.png";
import ResumeView from "./ResumeView";

const data = [
  { title: "Exam/Degree Title", value: "Bachelor Of Science BSC" },
  { title: "Passing Year", value: "2022" },
  { title: "Result Type", value: "CGPA" },
  { title: "Result", value: "4.06" },
];

export default function ViewDetailsPerson() {
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
          src={personOne} // Replace with actual image path
          alt="Office"
          className="rounded-md h-44"
        />

        <div className="mt-4 sm:mt-0">
          <p className="text-xl sm:text-3xl">John Doe</p>
          <p className="tex-xl sm:text-2xl mt-1">Senior Business Analysis</p>

          <div className="flex gap-4 items-center mt-2 text-sm">
            <p className="text-xl sm:text-2xl gap-2">Applied : 01.02.2025</p>
          </div>
          <div className="flex gap-5">
            <Link href="/view-profile">
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
        <p className="mt-4">
          Lorem ipsum dolor sit amet consectetur. Ultrices eu vitae bibendum id
          at. Mattis tortor cursus viverra eget augue condimentum. Facilisi eu
          vel non scelerisque neque. Massa massa egestas morbi odio nunc
          sollicitudin. Vitae in r .
        </p>
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
            {/* <a
              href={`http://10.10.7.54:3000/${resume.src}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="w-8 h-8 border border-white rounded-full flex items-center justify-center cursor-pointer">
                <EyeIcon className="p-0.5 text-white" />
              </button>
            </a> */}
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

        {/* Qualification */}
        <div className=" pt-4 space-y-2">
          <h3 className="text-lg font-semibold">Qualification</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm text-gray-300">
            {data?.map((item, index) => (
              <div
                key={index}
                className={`${
                  index !== data.length - 1 ? "sm:border-r border-l-white" : ""
                }`}
              >
                <p>{item.title}</p>
                <p className="mt-2">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Availability & Salary */}
        <div className="flex space-x-10 text-sm text-gray-300">
          <div>
            <p>Availability</p>
            <p className="text-white">07:00 AM - 08:00 PM</p>
          </div>
          <p className="border-l border-l-white" />
          <div className="">
            <p>Expected Salary</p>
            <p className="text-white">$500</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4  pt-4">
          {/* <FeedBackModal /> */}
          <Link href="/appointment-create-form">
            <button className="cursor-pointer border border-white px-4 py-2 rounded text-white hover:bg-white hover:text-[#0F172A] transition">
              Create Appointment
            </button>
          </Link>
          <button className="cursor-pointer bg-[#149235] px-4 py-2 rounded text-white hover:bg-green-600 transition">
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}
