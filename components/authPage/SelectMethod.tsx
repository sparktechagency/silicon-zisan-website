"use client";

import Image from "next/image";
import React from "react";
import sekker from "../../public/auth/sekker.png";
import employer from "../../public/auth/employer.png";
import { useRouter } from "next/navigation";

export default function SelectMethod() {
  const [selected, setSelected] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    if (selected) {
      router.push(`/signup?method=${selected}`);
    }
  }, [selected, router]);

  return (
    <div className="w-[90%] sm:w-[50%] border border-[#FFFFFF0D] p-8 rounded-md bg-[#374859]">
      <div
        className={`${
          selected === "Job Seeker"
            ? "custom-btn"
            : "bg-[#425363] py-2 rounded-md text-white"
        } `}
        onClick={() => setSelected("Job Seeker")}
      >
        <div className="flex items-center justify-center mt-5">
          <Image src={sekker} alt="Logo" width={100} height={20} className="" />
        </div>
        <p className="my-4 text-center"> A Job Seeker</p>
      </div>
      <div
        className={`mt-5 ${
          selected === "Employer"
            ? "custom-btn"
            : "bg-[#425363] py-2 rounded-md text-white cursor-pointer"
        } `}
        onClick={() => setSelected("Employer")}
      >
        <div className="flex items-center justify-center mt-5 cursor-pointer">
          <Image
            src={employer}
            alt="Logo"
            width={100}
            height={20}
            className=""
          />
        </div>
        <p className="my-4 text-center">An Employer</p>
      </div>
    </div>
  );
}
