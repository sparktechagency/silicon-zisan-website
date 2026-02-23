"use client";

import { ArrowLeft, Clock3 } from "lucide-react";
import { Button } from "../ui/button";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import Image from "next/image";
import agreement from "../../public/hire-employees/agreement.png";
import dayjs from "dayjs";
import { toast } from "sonner";
import HireEmployeeButton from "./HireEmployeeButton";

import { useCookie } from "@/hooks/useCookies";
import { agreementTranslations } from "@/hooks/translate";
import { agreementSections } from "@/demoData/data";
import { useState } from "react";

(pdfMake as any).vfs = pdfFonts.vfs;

export default function ContractInformation({
  data,
  getProfile,
  getAdmin,
}: any) {
  const [loading, setLoading] = useState(false);
  const googtrans = useCookie("googtrans");
  const currentLang = googtrans?.split("/")[2] || "en";
  const t = agreementTranslations[currentLang] ?? agreementTranslations["en"];

  const place = "Place";
  const date = "Date";

  // const handleDownloadPdf = async () => {
  //   // Convert logo to base64 properly
  //   const response = await fetch(agreement.src);
  //   const blob = await response.blob();

  //   const logoBase64: string = await new Promise((resolve) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => resolve(reader.result as string);
  //     reader.readAsDataURL(blob);
  //   });
  //   // Validation
  //   if (!data || !getProfile || !getAdmin) {
  //     toast.error("Required data is missing");
  //     return;
  //   }

  //   try {
  //     const docDefinition: any = {
  //       pageMargins: [40, 40, 40, 40],
  //       images: {
  //         companyLogo: logoBase64,
  //       },
  //       content: [
  //         {
  //           text: "Personnel Placement Agreement",
  //           style: "header",
  //           margin: [0, 0, 0, 20],
  //         },

  //         {
  //           columns: [
  //             {
  //               width: "70%",
  //               stack: [
  //                 { text: "Between:", style: "subheader" },
  //                 { text: getProfile?.user?.name || "N/A" },
  //                 { text: getProfile?.user?.email || "N/A" },
  //                 {
  //                   text: getProfile?.user?.address || "N/A",
  //                   margin: [0, 0, 0, 8],
  //                 },
  //                 { text: "And:", style: "subheader" },
  //                 { text: "Recruiter", margin: [0, 2, 0, 0] },
  //                 { text: getAdmin?.address },
  //               ],
  //             },
  //             {
  //               width: "30%", // ✅ 70% column width
  //               stack: [
  //                 {
  //                   image: "companyLogo",
  //                   width: 100, // control actual visual size here
  //                   alignment: "right",
  //                 },
  //               ],
  //             },
  //           ],
  //           margin: [0, 0, 0, 20],
  //         },

  //         { text: "Contents of the Agreement", style: "sectionHeader" },
  //         {
  //           text: "The Client commissions the Recruiter to search for suitable candidates for an open position within the Client’s company. This agreement governs the conditions of the personnel placement process and the mutual rights and obligations of the contracting parties.",
  //           margin: [0, 5, 0, 15],
  //         },

  //         // Agreement sections
  //         ...agreementSections.flatMap((section) => [
  //           { text: section?.title, style: "sectionTitle" },
  //           {
  //             ul: section?.items.map((item) => ({
  //               text: item,
  //               style: "normalText",
  //             })),
  //             margin: [0, 5, 0, 15],
  //           },
  //         ]),

  //         // Job Details
  //         {
  //           text: "Job Details",
  //           style: "sectionHeader",
  //           margin: [0, 10, 0, 5],
  //         },
  //         {
  //           ul: [
  //             `Job Title: ${data?.category || "N/A"}`,
  //             `Job Type: ${data?.jobType || "N/A"}`,
  //             `Salary: $${data?.salaryAmount || "N/A"}`,
  //             `Deadline: ${dayjs(data?.deadline).format("DD-MM-YYYY")}`,
  //           ],
  //           margin: [0, 5, 0, 15],
  //         },

  //         // Responsibilities
  //         { text: "Responsibilities", style: "sectionTitle" },
  //         {
  //           ul: data?.responsibilities?.length
  //             ? data?.responsibilities
  //             : ["N/A"],
  //           margin: [0, 5, 0, 15],
  //         },

  //         // Qualifications
  //         { text: "Qualifications", style: "sectionTitle" },
  //         {
  //           ul: data?.qualifications?.length ? data?.qualifications : ["N/A"],
  //           margin: [0, 5, 0, 15],
  //         },

  //         // Confirmation Table
  //         {
  //           text: "Confirmation",
  //           style: "sectionHeader",
  //           margin: [0, 10, 0, 5],
  //         },
  //         {
  //           table: {
  //             widths: ["*", "*"],
  //             body: [
  //               [
  //                 { text: "Place", style: "tableHeader" },
  //                 { text: "Date", style: "tableHeader" },
  //               ],
  //               [
  //                 {
  //                   text: getProfile?.user?.address.split(",")[0] || "N/A",
  //                   style: "normalText",
  //                 },
  //                 {
  //                   text: dayjs(data?.createdAt).format("DD-MM-YYYY"),
  //                   style: "normalText",
  //                 },
  //               ],
  //             ],
  //           },
  //           layout: "lightHorizontalLines",
  //           margin: [0, 5, 0, 10],
  //         },
  //         {
  //           text: "The client confirmed the contract by selecting the checkbox, so no signature was required, and the agreement is now in effect.",
  //           style: "normalText",
  //           margin: [0, 0, 0, 10],
  //         },
  //       ],

  //       styles: {
  //         header: {
  //           fontSize: 20,
  //           bold: true,
  //           alignment: "center",
  //           color: "#333333",
  //         },
  //         subheader: {
  //           fontSize: 14,
  //           bold: true,
  //           color: "#333333",
  //           margin: [0, 5, 0, 2],
  //         },
  //         sectionHeader: {
  //           fontSize: 16,
  //           bold: true,
  //           margin: [0, 10, 0, 5],
  //           color: "#333333",
  //         },
  //         sectionTitle: {
  //           fontSize: 14,
  //           bold: true,
  //           margin: [0, 10, 0, 5],
  //           color: "#333333",
  //         },
  //         normalText: { fontSize: 12, color: "#555555" },
  //         tableHeader: {
  //           fontSize: 12,
  //           bold: true,
  //           fillColor: "#eeeeee",
  //           color: "#333333",
  //         },
  //       },

  //       defaultStyle: { fontSize: 11, color: "#444444" },
  //     };

  //     pdfMake
  //       .createPdf(docDefinition)
  //       .download(
  //         `${data?.title?.replace(/\s+/g, "_") || "agreement"}-${Date.now()}.pdf`,
  //       );
  //   } catch (error) {
  //     toast.error(
  //       error instanceof Error
  //         ? error.message
  //         : "An error occurred while generating the PDF.",
  //     );
  //   }
  // };

  const handleDownloadPdf2 = async () => {
    const response = await fetch(agreement.src);
    const blob = await response.blob();

    const logoBase64: string = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });

    // Validation
    if (!data || !getProfile || !getAdmin) {
      toast.error("Required data is missing");
      return;
    }

    try {
      const docDefinition: any = {
        pageMargins: [40, 40, 40, 40],
        images: {
          companyLogo: logoBase64,
        },
        content: [
          // ✅ Title - translated
          {
            text: "Personnel Placement Agreement",
            style: "header",
            margin: [0, 0, 0, 20],
          },

          // ✅ Between / And section - translated
          // not translate
          {
            columns: [
              {
                width: "70%",
                stack: [
                  { text: "Between:", style: "subheader" },
                  { text: getProfile?.user?.name || "N/A" },
                  { text: getProfile?.user?.email || "N/A" },
                  {
                    text: getProfile?.user?.address || "N/A",
                    margin: [0, 0, 0, 8],
                  },
                  { text: "And:", style: "subheader" },
                  { text: "Recruiter", margin: [0, 2, 0, 0] },
                  { text: getAdmin?.address },
                ],
              },
              {
                width: "30%",
                stack: [
                  {
                    image: "companyLogo",
                    width: 100,
                    alignment: "right",
                  },
                ],
              },
            ],
            margin: [0, 0, 0, 20],
          },

          // not translate up data

          // ✅ Contents - translated
          { text: t.contentsTitle, style: "sectionHeader" },
          {
            text: t.contentsText,
            margin: [0, 5, 0, 15],
          },

          // Agreement sections (dynamic content - same as before)
          ...agreementSections.flatMap((section) => [
            { text: section?.title, style: "sectionTitle" },
            {
              ul: section?.items?.map((item) => ({
                text: item,
                style: "normalText",
              })),
              margin: [0, 5, 0, 15],
            },
          ]),

          // ✅ Job Details - translated
          {
            text: data?.category,

            style: "sectionHeader",
            margin: [0, 10, 0, 5],
          },
          {
            text: data?.author?.address,
            style: "normalText",
            margin: [0, 0, 0, 0],
          },

          {
            stack: [
              `${data?.jobType || "N/A"}`,
              `€${data?.salaryAmount || "N/A"}`,
              `🕐 ${dayjs(data?.deadline).format("DD-MM-YYYY")}`,
            ].map((text) => ({
              text: `${text}`,
              style: "normalText",
              margin: [0, 2, 0, 2],
            })),
            margin: [0, 5, 0, 15],
          },

          {
            text: t.jobDescription,
            style: "sectionTitle",
          },
          {
            text: data?.description || "N/A",
            style: "normalText",
            margin: [0, 5, 0, 15],
          },

          // ✅ Responsibilities - translated
          { text: t.responsibilities, style: "sectionTitle" },
          {
            ul:
              data?.responsibilities?.length > 0
                ? data?.responsibilities?.map((item: string) => item)
                : ["N/A"],
            margin: [0, 5, 0, 15],
          },

          // ✅ Qualifications - translated
          { text: t.qualifications, style: "sectionTitle" },
          {
            ul:
              data?.qualifications?.length > 0
                ? data?.qualifications?.map((item: string) => item)
                : ["N/A"],
            margin: [0, 5, 0, 15],
          },

          {
            table: {
              widths: ["*"],
              body: [
                // ✅ Place & Date row
                [
                  {
                    border: [true, true, true, false], // bottom border নেই
                    margin: [5, 5, 5, 5],
                    columns: [
                      {
                        text: `${place} : ${getProfile?.user?.address.split(",")[0] || "N/A"}`,
                        bold: true,
                        alignment: "center",
                        width: "50%",
                      },
                      {
                        text: `${date} : ${dayjs(data?.createdAt).format("DD-MM-YYYY")}`,
                        bold: true,
                        alignment: "center",
                        width: "50%",
                      },
                    ],
                  },
                ],

                [
                  {
                    border: [true, false, true, true], // top border নেই
                    text: t.confirmationText,
                    style: "normalText",
                    margin: [5, 8, 5, 8],
                  },
                ],
              ],
            },
            layout: {
              hLineWidth: (i: number, node: any) =>
                i === 0 || i === node.table.body.length ? 1 : 0, // শুধু top ও bottom
              vLineWidth: () => 1,
              hLineColor: () => "#cccccc",
              vLineColor: () => "#cccccc",
            },
            margin: [0, 5, 0, 10],
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
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "An error occurred while generating the PDF.",
      );
    }
  };

  const handleDownloadPdf4 = async () => {
    setLoading(true);
    if (!data || !getProfile || !getAdmin) {
      toast.error("Required data is missing");
      return;
    }

    const currentLang = googtrans?.split("/")[2] || "en";
    const t = agreementTranslations[currentLang] ?? agreementTranslations["en"];

    try {
      // ✅ Logo convert
      const response = await fetch(agreement.src);
      const blob = await response.blob();

      const logoBase64: string = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });

      // ✅ Translate helper
      const translateText = async (text: string) => {
        if (!text || currentLang === "en") return text;

        try {
          const res = await fetch(
            `https://translation.googleapis.com/language/translate/v2?key=AIzaSyARXva7qI4_CvSGbZkNdanQnYFpXwX9Rwg`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                q: text,
                target: currentLang,
                format: "text",
              }),
            },
          );

          const json = await res.json();
          return json?.data?.translations?.[0]?.translatedText || text;
        } catch (err) {
          console.error("Translate error:", err);
          return text;
        }
      };

      // ================================
      // ✅ TRANSLATE ALL DYNAMIC DATA
      // ================================

      const translatedName = await translateText(
        getProfile?.user?.name || "N/A",
      );
      const translatedEmail = await translateText(
        getProfile?.user?.email || "N/A",
      );
      const translatedAddress = await translateText(
        getProfile?.user?.address || "N/A",
      );

      const translatedCategory = await translateText(data?.category || "N/A");
      const translatedAuthorAddress = await translateText(
        data?.author?.address || "N/A",
      );
      const translatedJobType = await translateText(data?.jobType || "N/A");
      const translatedDescription = await translateText(
        data?.description || "N/A",
      );

      const translatedResponsibilities = await Promise.all(
        (data?.responsibilities || []).map((r: string) => translateText(r)),
      );

      const translatedQualifications = await Promise.all(
        (data?.qualifications || []).map((q: string) => translateText(q)),
      );

      const translatedPlace = await translateText("Place");
      const translatedDateLabel = await translateText("Date");

      // Agreement Sections
      const translatedSections = await Promise.all(
        agreementSections.flatMap(async (section: any) => [
          {
            text: await translateText(section?.title || ""),
            style: "sectionTitle",
          },
          {
            ul: await Promise.all(
              (section?.items || []).map((item: string) => translateText(item)),
            ),
            margin: [0, 5, 0, 15],
          },
        ]),
      );

      // ================================
      // ✅ CONFIRMATION TABLE
      // ================================

      const shortAddress = translatedAddress?.split(",")?.[0] || "N/A";

      const formattedDate = dayjs(data?.createdAt).format("DD-MM-YYYY");

      const confirmationTable = {
        table: {
          widths: ["*"],
          body: [
            [
              {
                border: [true, true, true, false],
                margin: [5, 5, 5, 5],
                columns: [
                  {
                    text: `${translatedPlace} : ${shortAddress}`,
                    bold: true,
                    alignment: "center",
                    width: "50%",
                  },
                  {
                    text: `${translatedDateLabel} : ${formattedDate}`,
                    bold: true,
                    alignment: "center",
                    width: "50%",
                  },
                ],
              },
            ],
            [
              {
                border: [true, false, true, true],
                text: t.confirmationText,
                style: "normalText",
                margin: [5, 8, 5, 8],
              },
            ],
          ],
        },
        layout: {
          hLineWidth: (i: number, node: any) =>
            i === 0 || i === node.table.body.length ? 1 : 0,
          vLineWidth: () => 1,
          hLineColor: () => "#cccccc",
          vLineColor: () => "#cccccc",
        },
        margin: [0, 10, 0, 10],
      };

      // ================================
      // ✅ PDF DOCUMENT
      // ================================

      const docDefinition: any = {
        pageMargins: [40, 40, 40, 40],
        images: { companyLogo: logoBase64 },

        content: [
          {
            text: t.personnelAgreement,
            style: "header",
            margin: [0, 0, 0, 20],
          },

          {
            columns: [
              {
                width: "70%",
                stack: [
                  { text: t.between, style: "subheader" },
                  { text: translatedName },
                  { text: translatedEmail },
                  { text: translatedAddress, margin: [0, 0, 0, 8] },
                  { text: t.and, style: "subheader" },
                  { text: "Recruiter" },
                  { text: getAdmin?.address || "N/A" },
                ],
              },
              {
                width: "30%",
                stack: [
                  {
                    image: "companyLogo",
                    width: 100,
                    alignment: "right",
                  },
                ],
              },
            ],
            margin: [0, 0, 0, 20],
          },

          { text: t.contentsTitle, style: "sectionHeader" },
          { text: t.contentsText, margin: [0, 5, 0, 15] },

          ...translatedSections.flat(),

          {
            text: translatedCategory,
            style: "sectionHeader",
            margin: [0, 10, 0, 5],
          },

          {
            text: translatedAuthorAddress,
            style: "normalText",
          },

          {
            stack: [
              translatedJobType,
              `€${data?.salaryAmount || "N/A"}`,
              `🕐 ${dayjs(data?.deadline).format("DD-MM-YYYY")}`,
            ].map((text) => ({
              text,
              style: "normalText",
              margin: [0, 2, 0, 2],
            })),
            margin: [0, 5, 0, 15],
          },

          { text: t.jobDescription, style: "sectionTitle" },
          {
            text: translatedDescription,
            style: "normalText",
            margin: [0, 5, 0, 15],
          },

          { text: t.responsibilities, style: "sectionTitle" },
          { ul: translatedResponsibilities, margin: [0, 5, 0, 15] },

          { text: t.qualifications, style: "sectionTitle" },
          { ul: translatedQualifications, margin: [0, 5, 0, 15] },

          confirmationTable,
        ],

        styles: {
          header: {
            fontSize: 20,
            bold: true,
            alignment: "center",
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 5, 0, 2],
          },
          sectionHeader: {
            fontSize: 16,
            bold: true,
            margin: [0, 10, 0, 5],
          },
          sectionTitle: {
            fontSize: 14,
            bold: true,
            margin: [0, 10, 0, 5],
          },
          normalText: { fontSize: 12 },
        },
      };

      pdfMake
        .createPdf(docDefinition)
        .download(
          `${data?.title?.replace(/\s+/g, "_") || "agreement"}-${Date.now()}.pdf`,
        );
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "PDF generation failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-7">
      <div className="bg-white text-gray-700 p-6 rounded-md shadow">
        <div className="gap-3 font-semibold text-lg md:text-3xl mb-4 text-gray-700 flex items-center">
          <ArrowLeft
            onClick={() => history.back()}
            className="cursor-pointer mr-2"
          />
          <p className="notranslate">Personnel Placement Agreement</p>
        </div>

        <div className="space-y-3">
          <div className="flex space-x-72 items-start">
            <div>
              <div>
                <h3 className="font-bold text-gray-700 text-xl notranslate">
                  Between :
                </h3>
                <p className="notranslate">{getProfile?.user?.name}</p>
                <p className="notranslate">{getProfile?.user?.email}</p>
                <p>{getProfile?.user?.address}</p>
              </div>
              <div className="mt-2">
                <h3 className="font-bold text-gray-700 text-xl notranslate">
                  And :
                </h3>
                <p>Recruiter</p>
                <p>JobsInApp</p>
                <p>{getAdmin?.address}</p>
                {/* <p>{adminInformation?.whatsApp}</p> */}
                {/* <p>{getAdmin?.phone}</p> */}
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
                    <li key={i} className="text-[13px]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Job Details */}
            <div className="w-[90%] mx-auto bg-white rounded-lg p-3 border border-gray-200">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 ">
                  {data?.category}
                </h2>
                <p className="text-sm text-gray-500 ">
                  {data?.author?.address}
                </p>
                <div className="mt-2 text-sm text-gray-600">
                  <p className="">{data?.jobType}</p>
                  <p className="">€{data?.salaryAmount}</p>
                  <p className="flex gap-1 items-center">
                    <Clock3 size={18} />{" "}
                    {dayjs(data?.deadline).format("DD-MM-YYYY")}
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
                    <li key={index} className="">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-md font-semibold text-gray-700 mb-1">
                  Qualifications
                </h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {data?.qualifications?.map((item: any, index: number) => (
                    <li key={index} className="">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Confirmation */}
            <div className="border rounded p-3">
              <div className="sm:flex sm:justify-around font-bold">
                <p className="">
                  Place :{" "}
                  {getProfile?.user?.address.split(",")[0] || "No Place"}
                </p>
                <p className="">
                  Date : {dayjs(data?.createdAt).format("DD-MM-YYYY")}
                </p>
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
          disabled={loading}
          className="w-full sm:w-[48%] custom-btn"
          onClick={handleDownloadPdf4}
        >
          Download Pdf
        </Button>
        {/* <Button
          disabled={loading}
          onClick={handleHiring}
          className="w-full sm:w-[48%] custom-btn"
        >
          Send
        </Button> */}
        <HireEmployeeButton data={data} />
      </div>
    </div>
  );
}
