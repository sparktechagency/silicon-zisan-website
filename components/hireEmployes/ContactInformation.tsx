"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRef } from "react";

export default function ContractInformation() {
  const pdfRef = useRef<HTMLDivElement>(null);

  // const handleDownloadPdf = () => {
  //   if (pdfRef.current) {
  //     html2pdf()
  //       .set({
  //         margin: 0.5,
  //         filename: "Personnel_Placement_Agreement.pdf",
  //         image: { type: "jpeg", quality: 0.98 },
  //         html2canvas: { scale: 2 },
  //         jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  //       })
  //       .from(pdfRef.current)
  //       .save();
  //   }
  // };
  return (
    <div className="max-w-3xl mx-auto">
      <div
        ref={pdfRef}
        className="bg-white text-gray-700 p-6  rounded-md shadow"
      >
        <div className="flex items-center gap-3 font-semibold text-lg md:text-3xl mb-4 text-gray-700">
          <ArrowLeft onClick={() => history.back()} /> Personnel Placement
          Agreement
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <div>
                <h3 className="font-bold text-gray-700 text-xl">Between : </h3>
                <p>Client</p>
                <p> Tech Agency</p>
                <p>Brandon Corporation</p>
                <p>+880132345222</p>
              </div>
              <div className="mt-1">
                <h3 className="font-bold text-gray-700 text-xl">And : </h3>
                <p>Recruiter</p>
                <p>JobsinApp</p>
                <p>Dhaka, Bangladesh</p>
                <p>+880132345222</p>
              </div>
            </div>

            {/* image part */}
            {/* <div>
            <Image src={logo} alt="logo" className="w-52" />
          </div> */}
          </div>

          {/* Agreement Content */}
          <div className="mt-4 space-y-4">
            <h3 className="font-bold text-gray-700 text-xl md:text-2xl">
              Contents of the Agreement
            </h3>
            <p>
              The Client commissions the Recruiter to search for suitable
              candidates for an open position within the Client’s company. This
              agreement governs the conditions of the personnel placement
              process and the mutual rights and obligations of the contracting
              parties.
            </p>

            <div>
              <h4 className="font-semibold text-gray-700 mb-1 text-xl md:text-2xl">
                § 1 Subject of the Agreement
              </h4>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  The Recruiter undertakes to search for and present suitable
                  candidates to the Employer for a position advertised by the
                  Employer.
                </li>
                <li>
                  The Client undertakes to provide the Recruiter with all
                  relevant information necessary for the search, such as
                  candidate requirements and a detailed job description.
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-1 text-xl md:text-2xl">
                § 2 Services of the Recruiter
              </h4>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  The Recruiter will identify suitable candidates for the
                  advertised position and propose them to the Employer for
                  selection.
                </li>
                <li>
                  The Recruiter will conduct a preliminary selection of
                  candidates, verify their qualifications, and, if applicable,
                  conduct interviews.
                </li>
                <li>
                  The Recruiter will provide the Client with a list of suitable
                  candidates.
                </li>
                <li>
                  The Recruiter will advise the Client during the selection
                  process and assist in organizing interviews.
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-700 mb-1 text-xl md:text-2xl">
                § 3 Obligations of the Client
              </h4>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  The Employer shall provide the Recruiter in a timely manner
                  with all necessary information regarding the position to be
                  filled, including qualification requirements, job description,
                  and contact data.
                </li>
                <li>
                  The Client undertakes to review the proposed candidates and to
                  maintain communication with the Recruiter.
                </li>
                <li>
                  The Client conducts interviews and makes the final decision
                  regarding the hiring of a candidate.
                </li>
                <li>
                  The Client undertakes to immediately inform the Recruiter in
                  writing once a candidate has been hired and to allow the
                  agreed fee to be invoiced accordingly.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* download */}
      <div className="mt-4 flex gap-7">
        <Button className="w-[48%] custom-btn">Download Pdf</Button>
        <Button className="w-[48%] custom-btn">Send</Button>
      </div>
    </div>
  );
}
