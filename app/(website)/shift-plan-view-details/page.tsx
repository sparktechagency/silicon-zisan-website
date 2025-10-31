"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";

const schedule = [
  {
    date: "01.02.2025",
    day: "Monday",
    from: "12:00",
    until: "22:00",
    timeline: "Morning",
  },
  ...Array(7).fill({
    date: "01.02.2025",
    day: "Monday",
    from: "12:00",
    until: "22:00",
    timeline: "Morning",
  }),
];

export default function ShiftPlanDetailsPage() {
  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleDownload = async () => {
    const element = contentRef.current;
    if (!element) return;
    // Capture the content area as an image
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    // Create PDF
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("shift-plan.pdf");
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* PDF content area */}
      <div
        ref={contentRef}
        className="bg-white p-6 rounded-md shadow-md border border-gray-200 text-gray-900 my-10"
      >
        <div className="mb-6 flex items-center gap-3">
          <button
            className="bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
            onClick={() => history.back()}
          >
            <ArrowLeft />
          </button>
          <p className="text-xl capitalize">shift plan view</p>
        </div>

        {/* Personal Info */}
        <div className="grid grid-cols-2 gap-1">
          <p>Name: Kamran Khan</p>
          <p>Email: Kk4038423@Gmail.Com</p>
          <p>Address: Dhaka Bangladesh</p>
          <p>Contact: 01333327633</p>
        </div>

        {/* Plan Info */}
        <div className="mt-5">
          <h1 className="capitalize text-xl font-medium">
            plan for January 2025
          </h1>
          <p>holiday weekend</p>
        </div>

        {/* Schedule Table */}
        <div className="overflow-x-auto mt-5">
          <table className="w-full text-sm text-left">
            <thead className="text-gray-700 border-b border-gray-300">
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Day</th>
                <th className="px-4 py-2">From</th>
                <th className="px-4 py-2">Until</th>
                <th className="px-4 py-2">Timeline</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((entry, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="px-4 py-2">{entry.date}</td>
                  <td className="px-4 py-2">{entry.day}</td>
                  <td className="px-4 py-2">{entry.from}</td>
                  <td className="px-4 py-2">{entry.until}</td>
                  <td className="px-4 py-2">{entry.timeline}</td>
                </tr>
              ))}
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
        <Button className="custom-btn">Download Pdf</Button>
        <Button className="custom-btn">Send</Button>
      </div>
    </div>
  );
}
