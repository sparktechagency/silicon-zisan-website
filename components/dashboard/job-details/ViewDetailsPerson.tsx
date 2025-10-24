"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock3 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import personOne from "../../../public/dashboard/person-one.png";

export default function ViewDetailsPerson() {
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
      <div className="flex gap-4">
        <Image
          src={personOne} // Replace with actual image path
          alt="Office"
          className="rounded-md h-44"
        />

        <div className="t">
          <p className="text-3xl">John Doe</p>
          <p className="text-2xl mt-1">Senior Business Analysis</p>

          <div className="flex gap-4 items-center mt-2 text-sm">
            <p className="text-2xl gap-2">Applied : 01.02.2025</p>
          </div>
          <div className="flex gap-5">
            <Link href="/applied-jobs">
              <Button className="border border-[#90D7E8] bg-card mt-5 h-10">
                View Profile
              </Button>
            </Link>
            <Link href="/">
              <Button className="custom-btn mt-5 h-10">Contact Us</Button>
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
    </div>
  );
}
