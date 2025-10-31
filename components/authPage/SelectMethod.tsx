"use client";

import Container from "@/share/Container";
import Image from "next/image";
import React from "react";
import logo from "../../public/auth/logo.png";
import sekker from "../../public/auth/sekker.png";
import employer from "../../public/auth/employer.png";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SelectMethod() {
  const [selected, setSelected] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    if (selected) {
      router.push("/signup");
    }
  }, [selected]);

  return (
    <Container className="flex flex-col md:flex-col lg:flex-row items-center justify-center h-auto lg:h-screen gap-10 px-4 py-10">
      <div className="bg-[#374859] w-[200px] h-[200px] md:w-[300px] md:h-[300px] xl:w-[400px] xl:h-[400px] flex flex-col items-center justify-center rounded-full border border-[#FFFFFF0D]/50 p-5 relative">
        <div
          className="absolute top-0 left-0 bg-[#374859] text-white border border-[#FFFFFF0D] rounded-full p-2 cursor-pointer"
          onClick={() => history.back()}
        >
          <ArrowLeft />
        </div>
        <Image
          src={logo}
          alt="Logo"
          width={150}
          height={24}
          className="w-24 md:w-40"
        />
        <h1 className="mt-2 md:mt-5 text-center text-white text-[9px] xl:text-[17px] capitalize">
          where dream job meets top talent
        </h1>
      </div>
      <div className="w-[50%] border border-[#FFFFFF0D] p-8 rounded-md bg-[#374859]">
        <div
          className={`${
            selected === "sekker"
              ? "custom-btn"
              : "bg-[#425363] py-2 rounded-md text-white"
          } `}
          onClick={() => setSelected("sekker")}
        >
          <div className="flex items-center justify-center mt-5">
            <Image
              src={sekker}
              alt="Logo"
              width={100}
              height={20}
              className=""
            />
          </div>
          <p className="my-4 text-center"> A Job Seeker</p>
        </div>
        <div
          className={`mt-5 ${
            selected === "employer"
              ? "custom-btn"
              : "bg-[#425363] py-2 rounded-md text-white cursor-pointer"
          } `}
          onClick={() => setSelected("employer")}
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
    </Container>
  );
}
