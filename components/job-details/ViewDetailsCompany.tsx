"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import logo from "../../public/dashboard/hotel.png";
import { ArrowLeft, Clock3 } from "lucide-react";
import Link from "next/link";

export default function ViewDetailsCompany() {
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
          src={logo} // Replace with actual image path
          alt="Office"
          width={400}
          height={400}
          className="rounded-md object-cover w-80 h-48"
        />

        <div className="mt-4 sm:mt-0">
          <p className="text-lg font-semibold">Sparktech Agency</p>
          <p className="text-sm text-gray-300">California, USA</p>
          <p className="text-md mt-1">Senior Business Analysis</p>
          <div className="flex gap-4 text-sm mt-2">
            <p className="border p-0.5 rounded bg-[#465565] px-3">Full Time</p>
            <p>$200–$300/Month</p>
          </div>
          <div className="flex gap-4 items-center mt-2 text-sm">
            <p className="flex gap-2">
              <Clock3 size={20} /> 20 Jun 2025
            </p>
          </div>
          <Link href="/applied-jobs">
            <Button className="custom-btn mt-5">8 Applied</Button>
          </Link>
        </div>
      </div>

      {/* Job Description */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Job Description</h3>
        <p className="text-sm text-gray-300">
          We are seeking a compassionate nurse to join our Emergency Department,
          providing quality care to patients in a fast-paced environment.
        </p>
      </div>

      {/* Responsibilities */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
        <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
          <li>
            Provide direct care to patients, monitor vital signs, administer
            medications
          </li>
          <li>Maintain patient records and ensure they are up to date</li>
          <li>
            Collaborate with doctors, nurses, and other healthcare team members
          </li>
          <li>Respond quickly to patient needs and emergencies</li>
        </ul>
      </div>

      {/* Qualifications */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Qualifications</h3>
        <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
          <li>Bachelor's Degree in Nursing (BSN) or Medical Degree required</li>
          <li>
            Certified Nursing Assistant (CNA) or Board-Certified in Pediatrics
          </li>
          <li>2+ years of experience in a hospital setting preferred</li>
          <li>
            Strong communication skills, attention to detail, and critical
            thinking
          </li>
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
