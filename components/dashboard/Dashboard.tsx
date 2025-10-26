"use client";

import Image from "next/image";
import logo from "../../public/dashboard/hotel.png"; // adjust the import path as needed
import Container from "@/share/Container";
import { data, postJobsDetails } from "@/demoData/data";
import Link from "next/link";
import { IconType } from "react-icons";
import { use, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { url } from "inspector";
import { ur } from "zod/locales";
import JobPostHomePage from "../job-details/JobPostHomePage";
import { Edit } from "lucide-react";
import EditJobPost from "../job-details/EditjobPost";
import AITools from "../ai-tools/AI-Tools";
import Appointments from "../appointments/Appointments";
import HireEmployees from "../hireEmployes/HireEmployees";
import ContractInformation from "../hireEmployes/ContactInformation";
import ContractInformationHomePage from "@/app/(website)/contact-information/page";

type item =
  | {
      title: string;
      icon: IconType;
    }
  | {
      title: string;
      icon: string;
    };

export default function JobCard() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams.toString());
  let urlName: string = params.get("name") || "";
  console.log(urlName);

  const handleChangeName = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    name: string
  ) => {
    e.preventDefault();

    params.set("name", name);
    router.push(`?${params.toString()}`);
  };
  return (
    <Container className="flex flex-col lg:flex-row space-x-10 my-10">
      <div className="basis-[30%]">
        {data?.map((item: item, index) => {
          const active = urlName === item.title;
          const IconComponent =
            typeof item.icon === "function" ? (item.icon as IconType) : null;
          return (
            <div
              key={index}
              onClick={(e) => handleChangeName(e, item.title)}
              className={`w-full flex items-center justify-start pl-11 ml-3 gap-2 rounded h-20 mb-7 cursor-pointer ${
                active ? "custom-btn" : "bg-card text-white border"
              }`}
            >
              {IconComponent ? (
                <IconComponent
                  className={`${
                    active
                      ? "rounded-full button-active p-1"
                      : "bg-[#505E6E] button-unactive rounded-full p-1 "
                  } `}
                  size={44}
                />
              ) : (
                ""
                // <p>{item.icon}</p>
              )}
              <p className="">{item.title}</p>
            </div>
          );
        })}
      </div>

      <div className="basis-[70%]">
        {urlName === "My Posted Jobs" && <JobPostHomePage />}
        {urlName === "Post Job" && <EditJobPost />}
        {urlName === "AI Tools" && <AITools />}
        {urlName === "Appointments" && <Appointments />}
        {urlName === "Hire Employees" && <HireEmployees />}
      </div>
    </Container>
  );
}
