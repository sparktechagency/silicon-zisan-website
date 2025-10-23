import Container from "@/share/Container";
import React from "react";
import { sections } from "../impressum/page";

export default function page() {
  return (
    <>
      <div className="flex items-center justify-center bg-linear-to-br from-[#0f4c5c] to-[#2c7a7b] py-10">
        <h1 className="text-white text-4xl font-semibold">Terms Condition</h1>
      </div>

      <Container>
        <div className="bg-[#2D3E4F] text-white p-6 md:p-10 space-y-8 font-sans">
          {sections?.map((section, i) => (
            <div key={i}>
              <h2 className="text-xl font-bold mb-4">{section.title}</h2>

              {/* Regular content */}
              {section.content?.map((paragraph, j) => (
                <p key={j} className="leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}

              {/* Subsections */}
              {section.subsections?.map((sub, k) => (
                <div key={k} className={`space-y-2 ${k > 0 ? "mt-6" : ""}`}>
                  <h3 className="text-lg font-semibold">{sub.subtitle}</h3>
                  <p className="leading-relaxed">{sub.text}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
