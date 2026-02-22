"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import logo from "../../public/shift-plan/logo.png";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import dayjs from "dayjs";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import { useState } from "react";
import i18n from "i18next";
import { translations } from "@/hooks/translate";
import { useCookie } from "@/hooks/useCookies";

(pdfMake as any).vfs = pdfFonts.vfs;

type TDocumentDefinitions = any;

export default function ShiftPlanDetails({ details }: any) {
  const { name, email, phone, address } = details?.worker;
  const [loading, setLoading] = useState(false);
  const googtrans = useCookie("googtrans");
  console.log("lang", googtrans);

  /* ================= SEND SHIFT ================= */
  const handleSendShift = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await myFetch(`/shift-plans/send-worker/${details._id}`, {
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

  /* ================= CONVERT IMAGE TO BASE64 ================= */
  // const getBase64ImageFromUrl = async (imageUrl: string) => {
  //   const res = await fetch(imageUrl);
  //   const blob = await res.blob();

  //   return new Promise<string>((resolve) => {
  //     const reader = new FileReader();
  //     reader.onloadend = () => resolve(reader.result as string);
  //     reader.readAsDataURL(blob);
  //   });
  // };

  /* ================= DOWNLOAD PDF ================= */
  const handleDownload = async () => {
    if (!details) return;

    // Convert logo to base64 properly
    const response = await fetch(logo.src);
    const blob = await response.blob();

    const logoBase64: string = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });

    const scheduleTable = {
      table: {
        headerRows: 1,
        widths: ["*", "*", "*", "*"],
        body: [
          [
            { text: "Date", style: "tableHeader" },
            { text: "From", style: "tableHeader" },
            { text: "Until", style: "tableHeader" },
            { text: "Shift", style: "tableHeader" },
          ],
          ...details.plans.flatMap((plan: any) =>
            plan.days.map((d: any) => [
              dayjs(d).format("DD-MM-YYYY"),
              plan?.startTime.slice(11, 16),
              plan?.endTime.slice(11, 16),
              plan?.shift || "—",
            ]),
          ),
        ],
      },
      layout: "lightHorizontalLines",
      margin: [0, 10, 0, 15],
    };

    const remarksSection =
      details?.plans?.length > 0
        ? {
            margin: [0, 10, 0, 0],
            stack: [
              { text: "Remarks", style: "sectionHeader" },
              {
                ul: details.plans
                  .map((plan: any) =>
                    plan?.remarks ? { text: plan.remarks } : null,
                  )
                  .filter(Boolean), // ✅ null remove করবে
                style: "normalText",
              },
            ],
          }
        : null;

    const docDefinition: TDocumentDefinitions = {
      pageMargins: [40, 40, 40, 40],

      // ✅ Proper image dictionary
      images: {
        companyLogo: logoBase64,
      },

      content: [
        {
          columns: [
            {
              width: "*",
              stack: [
                { text: "Personal Information", style: "sectionHeader" },
                { text: `Name: ${name || "—"}`, style: "normalText" },
                { text: `Email: ${email || "—"}`, style: "normalText" },
                { text: `Address: ${address || "—"}`, style: "normalText" },
                { text: `Contact: ${phone || "—"}`, style: "normalText" },
              ],
            },
            {
              // width: "auto",
              image: "companyLogo", // reference by name
              width: 120,
              alignment: "right",
            },
          ],
        },

        {
          text: `Shift Plan for ${dayjs(details?.plans[0]?.days[0]).format(
            "MMMM YYYY",
          )}`,
          style: "sectionHeader",
        },

        scheduleTable,

        ...(remarksSection ? [remarksSection] : []),
      ],

      styles: {
        sectionHeader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        normalText: {
          fontSize: 11,
        },
        tableHeader: {
          bold: true,
          fillColor: "#eeeeee",
        },
      },
    };

    pdfMake
      .createPdf(docDefinition)
      .download(`shift-plan-${dayjs().format("YYYY-MM-DD")}.pdf`);
  };

  const handleDownload3 = async () => {
    if (!details) return;

    const currentLang = googtrans?.split("/")[2] || "en";
    console.log("currentLang", currentLang);

    // ✅ Step 2: Translation array থেকে texts নিন
    const translated = translations[currentLang] ?? translations["en"];

    const [
      t_personalInfo, // [0]
      t_name, // [1]
      t_email, // [2]
      t_address, // [3]
      t_contact, // [4]
      // t_shiftPlan, // [5]
      // t_remarks, // [6]
      t_date, // [7]
      t_from, // [8]
      t_until, // [9]
      t_shift, // [10]
    ] = translated;

    // ✅ Step 3: Logo fetch (same as before)
    const response = await fetch(logo.src);
    const blob = await response.blob();

    const logoBase64: string = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });

    // ✅ Step 4: Schedule table - translated headers
    const scheduleTable = {
      table: {
        headerRows: 1,
        widths: ["*", "*", "*", "*"],
        body: [
          [
            { text: t_date, style: "tableHeader" },
            { text: t_from, style: "tableHeader" },
            { text: t_until, style: "tableHeader" },
            { text: t_shift, style: "tableHeader" },
          ],
          ...details.plans.flatMap((plan: any) =>
            plan.days.map((d: any) => [
              dayjs(d).format("DD-MM-YYYY"),
              plan?.startTime.slice(11, 16),
              plan?.endTime.slice(11, 16),
              plan?.shift || "—",
            ]),
          ),
        ],
      },
      layout: "lightHorizontalLines",
      margin: [0, 10, 0, 15],
    };

    // ✅ Step 5: Remarks section - translated header
    const remarksSection =
      details?.plans?.length > 0
        ? {
            margin: [0, 10, 0, 0],
            stack: [
              { text: "Remarks", style: "sectionHeader" },
              {
                ul: details.plans
                  .map((plan: any) =>
                    plan?.remarks ? { text: plan.remarks } : null,
                  )
                  .filter(Boolean),
                style: "normalText",
              },
            ],
          }
        : null;

    // ✅ Step 6: PDF definition - translated texts দিয়ে
    const docDefinition: TDocumentDefinitions = {
      pageMargins: [40, 40, 40, 40],
      images: {
        companyLogo: logoBase64,
      },
      content: [
        {
          columns: [
            {
              width: "*",
              stack: [
                { text: t_personalInfo, style: "sectionHeader" },
                { text: `${t_name}: ${name || "—"}`, style: "normalText" },
                { text: `${t_email}: ${email || "—"}`, style: "normalText" },
                {
                  text: `${t_address}: ${address || "—"}`,
                  style: "normalText",
                },
                { text: `${t_contact}: ${phone || "—"}`, style: "normalText" },
              ],
            },
            {
              image: "companyLogo",
              width: 120,
              alignment: "right",
            },
          ],
        },
        {
          text: ` Plan For ${dayjs(details?.plans[0]?.days[0]).format("MMMM YYYY")}`,
          style: "sectionHeader",
        },
        scheduleTable,
        ...(remarksSection ? [remarksSection] : []),
      ],
      styles: {
        sectionHeader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        normalText: {
          fontSize: 11,
        },
        tableHeader: {
          bold: true,
          fillColor: "#eeeeee",
        },
      },
    };

    // ✅ Step 7: PDF download
    pdfMake
      .createPdf(docDefinition)
      .download(`shift-plan-${dayjs().format("YYYY-MM-DD")}.pdf`);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* PDF Preview Content */}
      <div className="bg-white p-6 rounded-md shadow-md border border-gray-200 text-gray-900 my-10">
        <div className="flex justify-between items-center">
          <div className="mb-6 flex items-center gap-3">
            <button
              className="bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
              onClick={() => history.back()}
            >
              <ArrowLeft />
            </button>
            <p className="text-xl capitalize notranslate">shift plan view</p>
          </div>
          <div>
            <Image src={logo} alt="logo" className="w-36" />
          </div>
        </div>

        {/* Personal Info */}
        <div className="grid sm:grid-cols-2 gap-1 mt-7">
          <p className="notranslate">Name: {name}</p>
          <p className="notranslate">Email: {email}</p>
          <p>Address: {address}</p>
          <p>Contact: {phone}</p>
        </div>

        {/* Plan Info */}
        <div className="mt-5">
          <h1 className="capitalize text-xl font-medium notranslate">
            plan for {dayjs(details?.plans[0]?.days[0]).format("MMMM YYYY")}
          </h1>
        </div>

        {/* Schedule Table */}
        <div className="overflow-x-auto mt-5">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-700 border-b border-gray-300">
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">To</th>
                <th className="px-4 py-2">Form</th>
                <th className="px-4 py-2">Timeline</th>
              </tr>
            </thead>
            <tbody>
              {details?.plans?.map((plan: any, planIndex: number) =>
                plan?.days?.map((d: any, dayIndex: number) => (
                  <tr
                    key={`${planIndex}-${dayIndex}`}
                    className="border-b border-gray-100"
                  >
                    <td className="px-4 py-2">
                      {dayjs(d).format("DD-MM-YYYY")}
                    </td>
                    <td className="px-4 py-2">
                      {plan?.startTime.slice(11, 16)}
                    </td>
                    <td className="px-4 py-2">{plan?.endTime.slice(11, 16)}</td>
                    <td className="px-4 py-2 notranslate">
                      {plan?.shift || "—"}
                    </td>
                  </tr>
                )),
              )}
            </tbody>
          </table>
        </div>

        {/* Remarks */}
        <div className="mt-6 ml-4">
          <strong className="notranslate">Remarks</strong>
          {details?.plans?.map((item: any, index: number) => (
            <p key={index} className="notranslate">
              {item.remarks}
            </p>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mb-6 gap-4">
        <Button className="custom-btn" onClick={handleDownload3}>
          Download Pdf
        </Button>
        <Button
          onClick={handleSendShift}
          className="custom-btn"
          disabled={loading}
        >
          Send
        </Button>
      </div>
    </div>
  );
}
