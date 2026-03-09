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

      async function translateText(text: string) {
        if (!text || currentLang === "en") return text;
        const res = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, target: currentLang, format: "text" }),
        });

        const data = await res.json();
        return data.translatedText;
      }

      // ================================
      // ✅ TRANSLATE ALL DYNAMIC DATA
      // ================================

      const personnelAgreement = await translateText(
        "Personnel Placement Agreement",
      );

      // const translatedEmail = await translateText(
      //   getProfile?.user?.email || "N/A",
      // );

      const translatedName = getProfile?.user?.name || "N/A";

      const translatedAddressRaw = getProfile?.user?.address || "N/A";
      const translatedAddress =
        translatedAddressRaw !== "N/A"
          ? translatedAddressRaw
              .split(",")
              .map((p: string) => p.trim())
              .join(",\n")
          : "N/A";

      const hireEmployeHeader = await translateText("Job Details");
      const translatedCategory = await translateText(data?.category || "N/A");
      const translatedSubCategory = await translateText(
        data?.subCategory || "N/A",
      );
      const translatedAuthorAddress = data?.author?.address || "N/A";

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

      const shortAddress = getProfile?.user?.address
        ? getProfile.user.address
            .split(",")
            .map((p: string) => p.trim())
            .join(",\n")
        : "N/A";

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
                    text: `${translatedPlace} :\n${shortAddress}`,
                    bold: true,
                    alignment: "left",
                    width: "70%",
                  },
                  {
                    text: `${translatedDateLabel} :\n${formattedDate}`,
                    bold: true,
                    alignment: "left",
                    width: "30%",
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
            text: personnelAgreement,
            style: "header",
            margin: [0, 0, 0, 20],
          },

          {
            columns: [
              {
                width: "80%",
                stack: [
                  { text: t.between, style: "subheader" },
                  { text: translatedName },
                  // { text: translatedEmail },
                  { text: translatedAddress, margin: [0, 0, 0, 8] },
                  { text: t.and, style: "subheader" },

                  { text: "Recruiter" },
                  { text: "JobsInApp" },
                  {
                    text: getAdmin?.address
                      ? getAdmin.address
                          .split(",")
                          .map((p: string) => p.trim())
                          .join(",\n")
                      : "N/A",
                  },
                ],
              },
              {
                width: "20%",
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
            text: hireEmployeHeader,
            style: "sectionHeader",
            margin: [0, 10, 0, 5],
          },
          {
            text: translatedCategory,
            style: "sectionHeader",
            margin: [0, 10, 0, 5],
          },
          {
            text: translatedSubCategory,
            style: "normalText",
            margin: [0, 0, 0, 10],
          },

          {
            text: translatedAuthorAddress,
            style: "normalText",
          },

          {
            stack: [
              translatedJobType,
              `€${data?.salaryAmount || "N/A"} ${data?.salaryType}ly`,
              ` ${dayjs(data?.deadline).format("DD-MM-YYYY")}`,
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

  // console.log("data?.author?.address", data?.author?.address);

  return (
    <div className="max-w-3xl mx-auto my-7">
      <div className="bg-white text-gray-700 p-6 rounded-md shadow">
        <div className="gap-3 font-semibold text-lg md:text-3xl mb-4 text-gray-700 flex items-center">
          <ArrowLeft
            onClick={() => history.back()}
            className="cursor-pointer mr-2"
          />
          <p className="">Personnel Placement Agreement</p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-start w-full gap-4">
            <div>
              <div>
                <h3 className="font-bold text-gray-700 text-xl">Between :</h3>
                <p className="notranslate">{getProfile?.user?.name}</p>
                {/* <p className="notranslate">{getProfile?.user?.email}</p> */}
                <p>
                  {getProfile?.user?.address
                    ? getProfile.user.address
                        .split(",")
                        .map((part: string, index: number, arr: string[]) => (
                          <span key={index}>
                            {index > 0 && <br />}
                            {part.trim()}
                            {index < arr.length - 1 ? "," : ""}
                          </span>
                        ))
                    : ""}
                </p>
              </div>
              <div className="mt-2">
                <h3 className="font-bold text-gray-700 text-xl">And :</h3>
                <p>Recruiter</p>
                <p className="notranslate">JobsInApp</p>
                <p>
                  {getAdmin?.address
                    ? getAdmin.address
                        .split(",")
                        .map((part: string, index: number, arr: string[]) => (
                          <span key={index}>
                            {index > 0 && <br />}
                            {part.trim()}
                            {index < arr.length - 1 ? "," : ""}
                          </span>
                        ))
                    : ""}
                </p>
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
                <h1>{data?.subCategory}</h1>
                <p className="text-sm text-gray-500 "></p>
                <div className="mt-2 text-sm text-gray-600">
                  <p> {data?.author?.address}</p>
                  <p className="">{data?.jobType}</p>
                  <p className="">
                    €{data?.salaryAmount} {data?.salaryType}ly
                  </p>
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
              <div className="grid sm:grid-cols-[70%_auto] gap-4 font-bold">
                <div className="">
                  <p>
                    Place: <br />
                    {getProfile?.user?.address
                      ? getProfile.user.address
                          .split(",")
                          .map((part: string, index: number, arr: string[]) => (
                            <span key={index}>
                              {index > 0 && <br />}
                              {part.trim()}
                              {index < arr.length - 1 ? "," : ""}
                            </span>
                          ))
                      : "N/A"}
                  </p>
                </div>

                <div className="">
                  Date : <br /> {dayjs(data?.createdAt).format("DD-MM-YYYY")}
                </div>
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
        <HireEmployeeButton data={data} currentLang={currentLang} />
      </div>
    </div>
  );
}
