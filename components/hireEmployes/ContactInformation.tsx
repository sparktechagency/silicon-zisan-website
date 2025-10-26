import { contractSections } from "@/demoData/data";
import { Arrow } from "@radix-ui/react-select";
import { ArrowLeft } from "lucide-react";
import React from "react";

export default function ContractInformation() {
  return (
    <div className="bg-white text-gray-700 p-6 max-w-3xl mx-auto rounded-md shadow my-10">
      <div className="flex items-center gap-3 font-semibold text-xl mb-4">
        <ArrowLeft /> Contract Information
      </div>

      <div className="space-y-6">
        {/* Static Client Info */}
        <div>
          <h3 className="font-bold text-gray-700">Client</h3>
          <p>Client: Tech Agency</p>
          <p>Brandon Corporation</p>
          <p>+880132345222</p>
        </div>
        <div>
          <h3 className="font-bold text-gray-700">Recruiter</h3>
          <p>JobsinApp</p>
          <p>Dhaka , Bangladesh</p>
          <p>+880132345222</p>
        </div>

        {/* Map Contract Sections */}
        {contractSections?.map((section, index) => (
          <div key={index}>
            <h4 className="font-semibold text-gray-900 mb-1">
              {index !== 0 && index + 1}. {section.title}
            </h4>
            <ul className="list-disc ml-6 space-y-1">
              {section.content.map((point, i) => (
                <li key={i} className="text-sm text-gray-700">
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Job Details */}
        <div className="border border-gray-300 rounded-md p-4 mt-6">
          <h4 className="font-semibold text-gray-900 mb-2">Job Details</h4>
          <p>
            <strong>Client:</strong> California
          </p>
          <p>
            <strong>Position:</strong> Senior Business Analyst
          </p>
          <p>
            <strong>Salary:</strong> $8200–$8300/month
          </p>
          <p>
            <strong>Date:</strong> 10–02–2025
          </p>

          <div className="mt-4">
            <h5 className="font-semibold">Job Description</h5>
            <ul className="list-disc ml-6 text-sm text-gray-700 space-y-1">
              <li>
                Analyze & Synchronize Results To Join Or Manage Engagements.
              </li>
              <li>
                Responsible For Client Data, Requirements, Market Study, & Job
                Description Development.
              </li>
              <li>
                Reports Directly To The Recruiter’s Admin With Regular Such
                Reports.
              </li>
              <li>Maintain Records.</li>
              <li>
                Coordinate With Recruiter Team For The Job Description Posting.
              </li>
            </ul>
          </div>

          <div className="mt-4">
            <h5 className="font-semibold">Qualifications</h5>
            <ul className="list-disc ml-6 text-sm text-gray-700 space-y-1">
              <li>Bachelor’s Degree (Disciplines May Vary).</li>
              <li>Minimum 2+ Years Of Experience In A Related Field.</li>
              <li>
                Strong Communication Skills & Attention To Detail Required.
              </li>
            </ul>
          </div>

          <div className="mt-4 border-t pt-3 text-sm">
            <p>
              <strong>Place:</strong> Dhaka
            </p>
            <p>
              <strong>Date:</strong> 26/10/2025
            </p>
            <p className="mt-2">
              The Contract Was Concluded By Client And The Terms Come Into
              Effect.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
