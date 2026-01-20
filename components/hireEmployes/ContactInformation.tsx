"use client";

import { ArrowLeft, Clock3 } from "lucide-react";
import { Button } from "../ui/button";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Image from "next/image";
import agreement from "../../public/hire-employees/agreement.png";
import dayjs from "dayjs";
import { useState } from "react";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";

(pdfMake as any).vfs = pdfFonts.vfs;

const agreementSections = [
  {
    title: "§ 1 Subject of the Agreement",
    items: [
      "The Recruiter undertakes to search for and present suitable candidates to the Employer for a position advertised by the Employer.",
      "The Client undertakes to provide the Recruiter with all relevant information necessary for the search, such as candidate requirements and a detailed job description.",
    ],
  },
  {
    title: "§ 2 Services of the Recruiter",
    items: [
      "The Recruiter will identify suitable candidates for the advertised position and propose them to the Employer for selection.",
      "The Recruiter will conduct a preliminary selection of candidates, verify their qualifications, and, if applicable, conduct interviews.",
      "The Recruiter will provide the Client with a list of suitable candidates.",
      "The Recruiter will advise the Client during the selection process and assist in organizing interviews.",
    ],
  },
  {
    title: "§ 3 Obligations of the Client",
    items: [
      "The Employer shall provide the Recruiter in a timely manner with all necessary information regarding the position to be filled, including qualification requirements, job description, and contact data.",
      "The Client undertakes to review the proposed candidates and to maintain communication with the Recruiter.",
      "The Client conducts interviews and makes the final decision regarding the hiring of a candidate.",
      "The Client undertakes to immediately inform the Recruiter in writing once a candidate has been hired and to allow the agreed fee to be invoiced accordingly.",
    ],
  },
  {
    title: "§ 4 Compensation and Payment Terms",
    items: [
      "Placement Fee: The Client agrees to pay the Recruiter a placement fee amounting to 25% (excluding VAT) of the agreed gross annual salary of the successfully placed candidate.",
      "Payment Term: The placement fee shall be due no later than 14 days after the start of the employment relationship.",
      "Additional Costs: Any additional costs (e.g., travel or application expenses) shall only be borne by the Client if expressly agreed upon in advance.",
    ],
  },
  {
    title: "§ 5 Guarantees and Refunds",
    items: [
      "Should the placed candidate resign from the employment within three (3) months after commencing work, the Client shall be entitled to a refund of fifty percent (50%) of the agreed placement fee.",
      "If the placed candidate resigns after three (3) months but within six (6) months after commencing work, the Client shall be entitled to a refund of thirty percent (30%) of the agreed placement fee.",
      "The right to a refund lapses if the placed candidate is later re-employed by the Client or by an affiliated or partner company.",
      "For the purposes of this agreement, an affiliated or partner company refers to any company: • that is legally or economically connected to the Client (in particular, subsidiary, parent, or sister companies pursuant to §§ 15 et seq. AktG), or • that is contractually or factually cooperating with the Client in a way that involves the joint use or exchange of personnel, services, or projects. This provision shall only take effect upon mutual written consent of both the Client and the Recruiter and shall form part of the respective individual agreement or placement contract.",
    ],
  },
  {
    title: "§ 6 Confidentiality and Data Protection",
    items: [
      "Both parties agree to treat all confidential information received under this contract, particularly personal data of candidates, in accordance with the provisions of the BDSG (Federal Data Protection Act) and the GDPR (General Data Protection Regulation), and to use such data exclusively for the purposes of personnel placement.",
      "The confidentiality obligation remains in effect even after termination of this contract.",
    ],
  },
  {
    title: "§ 7 Liability",
    items: [
      "The Recruiter shall not be liable for the accuracy or completeness of information provided by proposed candidates.",
      "The Client assumes full responsibility for the final selection and decision regarding the hiring of a candidate.",
      "The Recruiter shall not be liable for damages resulting from incomplete or incorrect information provided by the Client.",
    ],
  },
  {
    title: "§ 8 Duration and Termination of the Contract",
    items: [
      "The contract becomes effective upon confirmation (checkmark) by the Client on the JobsinApp platform.",
      "The contract may be terminated by either party with 14 days’ written notice.",
    ],
  },
  {
    title: "§ 9 Final Provisions",
    items: [
      "Any amendments or supplements to this agreement must be made in writing. Oral agreements are only valid if confirmed in writing.",
      "Should individual provisions of this agreement be invalid or unenforceable, the remainder of the agreement shall remain in effect. The invalid provision shall be replaced by a valid one that most closely reflects the economic intent of the invalid provision.",
    ],
  },
];

export default function ContractInformation({ data }: any) {
  console.log("data", data);
  const [loading, setLoading] = useState(false);

  const handleHiring = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await myFetch(`/jobs/send-hiring-post/${data._id}`, {
        method: "POST",
      });

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res?.error || "Failed to send shift plan.");
      }
    } catch {
      toast.error("An error occurred while sending shift plan.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = () => {
    const docDefinition: any = {
      pageMargins: [40, 40, 40, 40],
      content: [
        {
          text: "Personnel Placement Agreement",
          style: "header",
          margin: [0, 0, 0, 20],
        },

        // Client & Recruiter Info
        {
          columns: [
            {
              width: "50%",
              stack: [
                { text: "Between:", style: "subheader" },
                { text: "Client", margin: [0, 2, 0, 0] },
                { text: data?.author?.name || "N/A" },
                { text: data?.author?.address || "N/A" },
                { text: data?.author?.phone || "N/A", margin: [0, 0, 0, 8] },
                { text: "And:", style: "subheader" },
                { text: "Recruiter", margin: [0, 2, 0, 0] },
                { text: "JobsinApp" },
                { text: "Dhaka, Bangladesh" },
                { text: "+880132345222" },
              ],
            },
            { width: "*", text: "" },
          ],
          margin: [0, 0, 0, 20],
        },

        { text: "Contents of the Agreement", style: "sectionHeader" },
        {
          text: "The Client commissions the Recruiter to search for suitable candidates for an open position within the Client’s company. This agreement governs the conditions of the personnel placement process and the mutual rights and obligations of the contracting parties.",
          margin: [0, 5, 0, 15],
        },

        // Agreement sections
        ...agreementSections.flatMap((section) => [
          { text: section.title, style: "sectionTitle" },
          { ul: section.items, margin: [0, 5, 0, 15] },
        ]),

        // Job Details
        { text: "Job Details", style: "sectionHeader", margin: [0, 10, 0, 5] },
        {
          ul: [
            `Job Title: ${data?.category || "N/A"}`,
            `Job Type: ${data?.jobType || "N/A"}`,
            `Salary: $${data?.salaryAmount || "N/A"}`,
            `Deadline: ${dayjs(data?.deadline).format("YYYY-MM-DD")}`,
          ],
          margin: [0, 5, 0, 15],
        },

        // Responsibilities
        { text: "Responsibilities", style: "sectionTitle" },
        {
          ul: data?.responsibilities?.length ? data.responsibilities : ["N/A"],
          margin: [0, 5, 0, 15],
        },

        // Qualifications
        { text: "Qualifications", style: "sectionTitle" },
        {
          ul: data?.qualifications?.length ? data.qualifications : ["N/A"],
          margin: [0, 5, 0, 15],
        },

        // Confirmation Table
        {
          text: "Confirmation",
          style: "sectionHeader",
          margin: [0, 10, 0, 5],
        },
        {
          table: {
            widths: ["*", "*"],
            body: [
              [
                { text: "Place", style: "tableHeader" },
                { text: "Date", style: "tableHeader" },
              ],
              [
                { text: data?.author?.address || "N/A", style: "normalText" },
                { text: dayjs().format("YYYY-MM-DD"), style: "normalText" },
              ],
            ],
          },
          layout: "lightHorizontalLines",
          margin: [0, 5, 0, 10],
        },
        {
          text: "The client confirmed the contract by selecting the checkbox, so no signature was required, and the agreement is now in effect.",
          style: "normalText",
          margin: [0, 0, 0, 10],
        },
      ],

      styles: {
        header: {
          fontSize: 20,
          bold: true,
          alignment: "center",
          color: "#333333",
        },
        subheader: {
          fontSize: 14,
          bold: true,
          color: "#333333",
          margin: [0, 5, 0, 2],
        },
        sectionHeader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
          color: "#333333",
        },
        sectionTitle: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5],
          color: "#333333",
        },
        normalText: { fontSize: 12, color: "#555555" },
        tableHeader: {
          fontSize: 12,
          bold: true,
          fillColor: "#eeeeee",
          color: "#333333",
        },
      },

      defaultStyle: { fontSize: 11, color: "#444444" },
    };

    pdfMake
      .createPdf(docDefinition)
      .download(
        `${data?.title?.replace(/\s+/g, "_") || "agreement"}-${Date.now()}.pdf`,
      );
  };

  return (
    <div className="max-w-3xl mx-auto my-7">
      <div className="bg-white text-gray-700 p-6 rounded-md shadow">
        <div className="gap-3 font-semibold text-lg md:text-3xl mb-4 text-gray-700 flex items-center">
          <ArrowLeft
            onClick={() => history.back()}
            className="cursor-pointer mr-2"
          />
          <p>Personnel Placement Agreement</p>
        </div>

        <div className="space-y-3">
          <div className="flex space-x-72 items-start">
            <div>
              <div>
                <h3 className="font-bold text-gray-700 text-xl">Between :</h3>
                <p>{data?.author?.name}</p>
                <p>{data?.author?.address}</p>
                <p>{data?.author?.phone}</p>
              </div>
              <div className="mt-2">
                <h3 className="font-bold text-gray-700 text-xl">And :</h3>
                <p>Recruiter</p>
                <p>JobsinApp</p>
                <p>Dhaka, Bangladesh</p>
                <p>+880132345222</p>
              </div>
            </div>
            <div>
              <Image src={agreement} alt="agreement" className="w-48" />
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <h3 className="font-bold text-gray-700 text-xl md:text-xl">
              Contents of the Agreement
            </h3>
            <p>
              The Client commissions the Recruiter to search for suitable
              candidates for an open position within the Client’s company. This
              agreement governs the conditions of the personnel placement
              process and the mutual rights and obligations of the contracting
              parties.
            </p>

            {agreementSections.map((section, index) => (
              <div key={index}>
                <h4 className="font-semibold text-gray-700 mb-1 text-xl md:text-xl">
                  {section.title}
                </h4>
                <ul className="list-disc ml-6 space-y-1">
                  {section.items.map((item, i) => (
                    <li key={i} className="text-[12px]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Job Details */}
            <div className="w-[90%] mx-auto bg-white rounded-lg p-3 border border-gray-200">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {data?.category}
                </h2>
                <p className="text-sm text-gray-500">{data?.author?.address}</p>
                <div className="mt-2 text-sm text-gray-600">
                  <p>{data?.jobType}</p>
                  <p>${data?.salaryAmount}</p>
                  <p className="flex gap-1 items-center">
                    <Clock3 size={18} />{" "}
                    {dayjs(data?.deadline).format("YYYY-MM-DD")}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-md font-semibold text-gray-700 mb-1">
                  Job Description
                </h4>
                <p className="text-sm text-gray-600">{data?.description}</p>
              </div>

              <div className="mb-4">
                <h4 className="text-md font-semibold text-gray-700 mb-1">
                  Responsibilities
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {data?.responsibilities?.map((item: any, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-1">
                  Qualifications
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {data?.qualifications?.map((item: any, index: number) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Confirmation */}
            <div className="border rounded p-3">
              <div className="sm:flex sm:justify-around font-bold">
                <p>Place : {data?.author?.address || "No Place"}</p>
                <p>Date : {dayjs(data?.deadline).format("YYYY-MM-DD")}</p>
              </div>
              <p className="mt-3">
                The client confirmed the contract by selecting the checkbox, so
                no signature was required, and the agreement is now in effect.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Download Buttons */}
      <div className="mt-7 flex flex-col sm:flex-row gap-7">
        <Button
          className="w-full sm:w-[48%] custom-btn"
          onClick={handleDownloadPdf}
        >
          Download Pdf
        </Button>
        <Button
          disabled={loading}
          onClick={handleHiring}
          className="w-full sm:w-[48%] custom-btn"
        >
          Send
        </Button>
      </div>
    </div>
  );
}
