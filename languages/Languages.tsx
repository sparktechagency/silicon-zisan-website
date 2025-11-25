"use client";

import Script from "next/script";
import { useEffect } from "react";

declare global {
  interface Window {
    gtranslateSettings?: {
      default_language: string;
      languages: string[];
      wrapper_selector: string;
    };
  }
}

export default function Languages() {
  useEffect(() => {
    // Set GTranslate settings on client-side
    window.gtranslateSettings = {
      default_language: "en",
      languages: ["de", "en", "fr", "nl", "ro", "pl", "uk", "it"],
      wrapper_selector: ".gtranslate_wrapper",
    };
  }, []);

  // Keep wrapper outside React updates
  return (
    <>
      <div className="gtranslate_wrapper"></div>
      <Script src="https://cdn.gtranslate.net/widgets/latest/float.js" />
    </>
  );
}
