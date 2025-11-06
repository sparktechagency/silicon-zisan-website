"use client";

import { ArrowLeft, Clock3 } from "lucide-react";
import { Button } from "../ui/button";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Image from "next/image";
import agreement from "../../public/hire-employees/agreement.png";

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

export default function ContractInformation() {
  // const handleDownloadPdf = () => {
  //   const docDefinition: any = {
  //     pageMargins: [40, 40, 40, 40],
  //     content: [
  //       {
  //         text: "Personnel Placement Agreement",
  //         style: "header",
  //         margin: [0, 0, 0, 20],
  //       },

  //       {
  //         columns: [
  //           {
  //             width: "50%",
  //             stack: [
  //               { text: "Between:", style: "subheader" },
  //               { text: "Client", margin: [0, 2, 0, 0] },
  //               { text: "Tech Agency" },
  //               { text: "Brandon Corporation" },
  //               { text: "+880132345222", margin: [0, 0, 0, 8] },

  //               { text: "And:", style: "subheader" },
  //               { text: "Recruiter", margin: [0, 2, 0, 0] },
  //               { text: "JobsinApp" },
  //               { text: "Dhaka, Bangladesh" },
  //               { text: "+880132345222" },
  //             ],
  //           },
  //           { width: "*", text: "" },
  //         ],
  //         margin: [0, 0, 0, 20],
  //       },

  //       {
  //         text: "Contents of the Agreement",
  //         style: "sectionHeader",
  //       },
  //       {
  //         text: `The Client commissions the Recruiter to search for suitable candidates for an open position within the Client’s company. This agreement governs the conditions of the personnel placement process and the mutual rights and obligations of the contracting parties.`,
  //         margin: [0, 5, 0, 15],
  //       },

  //       {
  //         text: "§ 1 Subject of the Agreement",
  //         style: "sectionTitle",
  //       },
  //       {
  //         ul: [
  //           "The Recruiter undertakes to search for and present suitable candidates to the Employer for a position advertised by the Employer.",
  //           "The Client undertakes to provide the Recruiter with all relevant information necessary for the search, such as candidate requirements and a detailed job description.",
  //         ],
  //         margin: [0, 5, 0, 15],
  //       },

  //       {
  //         text: "§ 2 Services of the Recruiter",
  //         style: "sectionTitle",
  //       },
  //       {
  //         ul: [
  //           "The Recruiter will identify suitable candidates for the advertised position and propose them to the Employer for selection.",
  //           "The Recruiter will conduct a preliminary selection of candidates, verify their qualifications, and, if applicable, conduct interviews.",
  //           "The Recruiter will provide the Client with a list of suitable candidates.",
  //           "The Recruiter will advise the Client during the selection process and assist in organizing interviews.",
  //         ],
  //         margin: [0, 5, 0, 15],
  //       },

  //       {
  //         text: "§ 3 Obligations of the Client",
  //         style: "sectionTitle",
  //       },
  //       {
  //         ul: [
  //           "The Employer shall provide the Recruiter in a timely manner with all necessary information regarding the position to be filled, including qualification requirements, job description, and contact data.",
  //           "The Client undertakes to review the proposed candidates and to maintain communication with the Recruiter.",
  //           "The Client conducts interviews and makes the final decision regarding the hiring of a candidate.",
  //           "The Client undertakes to immediately inform the Recruiter in writing once a candidate has been hired and to allow the agreed fee to be invoiced accordingly.",
  //         ],
  //         margin: [0, 5, 0, 15],
  //       },
  //     ],

  //     styles: {
  //       header: {
  //         fontSize: 20,
  //         bold: true,
  //         alignment: "center",
  //         color: "#333333",
  //       },
  //       subheader: {
  //         fontSize: 14,
  //         bold: true,
  //         color: "#333333",
  //         margin: [0, 5, 0, 2],
  //       },
  //       sectionHeader: {
  //         fontSize: 16,
  //         bold: true,
  //         margin: [0, 10, 0, 5],
  //         color: "#333333",
  //       },
  //       sectionTitle: {
  //         fontSize: 14,
  //         bold: true,
  //         margin: [0, 10, 0, 5],
  //         color: "#333333",
  //       },
  //       normalText: {
  //         fontSize: 12,
  //         color: "#555555",
  //       },
  //     },

  //     defaultStyle: {
  //       fontSize: 11,
  //       color: "#444444",
  //     },
  //   };

  //   pdfMake.createPdf(docDefinition).download("agreement.pdf");
  // };

  const handleDownloadPdf = () => {
    const docDefinition: any = {
      pageMargins: [40, 40, 40, 40],
      content: [
        {
          text: "Personnel Placement Agreement",
          style: "header",
          margin: [0, 0, 0, 20],
        },
        {
          columns: [
            {
              width: "50%",
              stack: [
                { text: "Between:", style: "subheader" },
                { text: "Client", margin: [0, 2, 0, 0] },
                { text: "Tech Agency" },
                { text: "Brandon Corporation" },
                { text: "+880132345222", margin: [0, 0, 0, 8] },
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
        {
          text: "Contents of the Agreement",
          style: "sectionHeader",
        },
        {
          text: "The Client commissions the Recruiter to search for suitable candidates for an open position within the Client’s company. This agreement governs the conditions of the personnel placement process and the mutual rights and obligations of the contracting parties.",
          margin: [0, 5, 0, 15],
        },
        ...agreementSections.flatMap((section) => [
          { text: section.title, style: "sectionTitle" },
          { ul: section.items, margin: [0, 5, 0, 15] },
        ]),
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
                { text: "Dhaka", style: "normalText" },
                { text: new Date().toLocaleDateString(), style: "normalText" },
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
        normalText: {
          fontSize: 12,
          color: "#555555",
        },
        tableHeader: {
          fontSize: 12,
          bold: true,
          fillColor: "#eeeeee",
          color: "#333333",
        },
      },

      defaultStyle: {
        fontSize: 11,
        color: "#444444",
      },
    };

    pdfMake.createPdf(docDefinition).download("agreement.pdf");
  };
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white text-gray-700 p-6 rounded-md shadow">
        <div className="gap-3 font-semibold text-lg md:text-3xl mb-4 text-gray-700">
          <ArrowLeft onClick={() => history.back()} />{" "}
          <p>Personnel Placement Agreement</p>
        </div>

        {/* Display same content visually in UI */}
        <div className="space-y-3">
          <div className="flex space-x-72 items-start">
            <div>
              <div>
                <h3 className="font-bold text-gray-700 text-xl">Between :</h3>
                <p>Client</p>
                <p>Tech Agency</p>
                <p>Brandon Corporation</p>
                <p>+880132345222</p>
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
            {/* all ul list */}
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

            {/* submit information */}

            <div className="w-[90%] mx-auto bg-white  rounded-lg p-3 border border-gray-200">
              {/* Header */}
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Job Details
                </h2>
                <p className="text-sm text-gray-500">California, USA</p>
                <h3 className="text-lg font-bold  mt-2">
                  Senior Business Analys
                </h3>
                <div className=" mt-2 text-sm text-gray-600">
                  <p>Full Time</p>
                  <p>$200–$300/Month</p>
                  <p className="flex gap-1">
                    <span>
                      <Clock3 size={18} />
                    </span>
                    20 Jan 2025
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-4">
                <h4 className="text-md font-semibold text-gray-700 mb-1">
                  Job Description
                </h4>
                <p className="text-sm text-gray-600">
                  We Are Seeking A Compassionate Nurse To Join Our Emergency
                  Department, Providing Quality Care To Patients In A Fast-Paced
                  Environment.
                </p>
              </div>

              {/* Responsibilities */}
              <div className="mb-4">
                <h4 className="text-md font-semibold text-gray-700 mb-1">
                  Responsibilities
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>
                    Patient Care: Provide Direct Care To Patients, Monitor Vital
                    Signs, Administer Medications, Etc.
                  </li>
                  <li>
                    Documentation: Maintain Patient Records And Ensure They Are
                    Up To Date.
                  </li>
                  <li>
                    Collaboration: Work Closely With Doctors, Nurses, And
                    Healthcare Teams.
                  </li>
                  <li>
                    Emergency Response: Respond Quickly To Patient Needs And
                    Emergencies.
                  </li>
                </ul>
              </div>

              {/* Qualifications */}
              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-1">
                  Qualifications
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>
                    Education: Bachelor's Degree In Nursing (BSN)* Or "Medical
                    Degree (MD) Required."
                  </li>
                  <li>
                    Certifications: Certified Nursing Assistant (CNA)* Or
                    "Board-Certified In Pediatrics."
                  </li>
                  <li>
                    Experience: "2+ Years Of Experience In A Hospital Setting
                    Preferred."
                  </li>
                  <li>
                    Skills: Strong Communication Skills, Attention To Detail,
                    Critical Thinking."
                  </li>
                </ul>
              </div>
            </div>

            {/* last section */}
            <div className="border rounded p-3">
              <div className="flex items-center justify-between lg:space-x-80 font-bold ">
                <p>Place</p>
                <p>Date</p>
              </div>
              <p className="mt-3 ">
                The client confirmed the contract by selecting the checkbox, so
                no signature was required, and the agreement is now in effect.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* download */}
      <div className="mt-7 flex flex-col sm:flex-row gap-7">
        <Button
          className="w-full sm:w-[48%] custom-btn"
          onClick={handleDownloadPdf}
        >
          Download Pdf
        </Button>
        <Button className="w-full sm:w-[48%] custom-btn">Send</Button>
      </div>
    </div>
  );
}
