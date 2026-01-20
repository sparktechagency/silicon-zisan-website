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

(pdfMake as any).vfs = pdfFonts.vfs;

type TDocumentDefinitions = any;

export default function ShiftPlanDetails({ details }: any) {
  const { name, email, phone, address } = details?.worker;
  const [loading, setLoading] = useState(false);

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

  const handleDownload = () => {
    // const { name, email, phone, address } = details.worker;

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
          [
            {
              text: dayjs(details.days[0]).format("YYYY-MM-DD"),
              style: "normalText",
            },
            {
              text: dayjs(details?.startTime).format("hh:mm A"),
              style: "normalText",
            },
            {
              text: dayjs(details.endTime).format("hh:mm A"),
              style: "normalText",
            },
            {
              text: details.shift,
              style: "normalText",
            },
          ],
        ],
      },
      layout: "lightHorizontalLines",
      margin: [0, 10, 0, 15],
    };

    const docDefinition: TDocumentDefinitions = {
      pageMargins: [40, 40, 40, 40],
      content: [
        {
          text: "Personal Information",
          style: "sectionHeader",
          margin: [0, 10, 0, 5],
        },
        {
          stack: [
            { text: `Name: ${name}` },
            { text: `Email: ${email}` },
            { text: `Address: ${address}` },
            { text: `Contact: ${phone}` },
          ],
          style: "normalText",
          margin: [0, 0, 0, 15],
        },
        {
          text: "Schedule",
          style: "sectionHeader",
          margin: [0, 10, 0, 5],
        },
        scheduleTable,
      ],
      styles: {
        sectionHeader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        sectionTitle: {
          fontSize: 14,
          bold: true,
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

  return (
    <div className="max-w-3xl mx-auto">
      {/* PDF content area */}
      <div
        // ref={contentRef}
        className="bg-white p-6 rounded-md shadow-md border border-gray-200 text-gray-900 my-10"
      >
        <div className="flex justify-between items-center">
          <div className="mb-6 flex items-center gap-3">
            <button
              className="bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
              onClick={() => history.back()}
            >
              <ArrowLeft />
            </button>
            <p className="text-xl capitalize">shift plan view</p>
          </div>
          <div>
            <Image src={logo} alt="logo" />
          </div>
        </div>
        {/* Personal Info */}
        <div className="grid sm:grid-cols-2 gap-1 mt-7 ">
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <p>Address:{address}</p>
          <p>Contact: {phone}</p>
        </div>

        {/* Plan Info */}
        <div className="mt-5">
          <h1 className="capitalize text-xl font-medium">
            plan for January {dayjs(details?.days[0]).format("YYYY")}
          </h1>
          {/* <p>holiday weekend</p> */}
        </div>

        {/* Schedule Table */}
        <div className="overflow-x-auto mt-5">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-700 border-b border-gray-300">
              <tr>
                <th className="px-4 py-2">Date</th>
                {/* <th className="px-4 py-2">Day</th> */}
                <th className="px-4 py-2">To</th>
                <th className="px-4 py-2">Form</th>
                <th className="px-4 py-2">Timeline</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="px-4 py-2">
                  {dayjs(details?.days[0]).format("YYYY-MM-DD")}
                </td>
                {/* <td className="px-4 py-2">{entry.day}</td> */}
                <td className="px-4 py-2">
                  {dayjs(details?.startTime).format("hh:mm A")}
                </td>
                <td className="px-4 py-2">
                  {details?.endTime && dayjs(details.endTime).format("hh:mm A")}
                </td>
                <td className="px-4 py-2">{details?.shift}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Remarks */}
        <div className="mt-6 ml-4">
          <p className="text-sm">
            <strong>Remarks</strong>
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mb-6 gap-4">
        <Button className="custom-btn" onClick={handleDownload}>
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
