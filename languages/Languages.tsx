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
    // Store original methods with proper typing
    const originalRemoveChild = Node.prototype.removeChild;
    const originalInsertBefore = Node.prototype.insertBefore;

    // Override removeChild with proper TypeScript typing
    Node.prototype.removeChild = function <T extends Node>(child: T): T {
      try {
        return originalRemoveChild.call(this, child) as T;
      } catch (e) {
        const error = e as Error;
        if (error.name === "NotFoundError" || error.message.includes("removeChild")) {
          // Silently fail on translation-related errors; return child as if removed
          return child;
        }
        throw e; // Re-throw other errors
      }
    };

    // Override insertBefore with proper TypeScript typing
    Node.prototype.insertBefore = function <T extends Node>(
      newNode: T, 
      referenceNode?: Node | null
    ): T {
      try {
        return originalInsertBefore.call(this, newNode, referenceNode ?? null) as T;
      } catch (e) {
        const error = e as Error;
        if (
          error.name === "NotFoundError" || 
          error.message.includes("removeChild") || 
          error.message.includes("insertBefore")
        ) {
          // Silently fail on translation-related errors; return newNode as if inserted
          return newNode;
        }
        throw e; // Re-throw other errors
      }
    };

    // Set GTranslate settings on client-side
    window.gtranslateSettings = {
      default_language: "en",
      languages: ["de", "en", "fr", "nl", "ro", "pl", "uk", "it"],
      wrapper_selector: ".gtranslate_wrapper",
    };

    // Cleanup function to restore original methods
    return () => {
      Node.prototype.removeChild = originalRemoveChild;
      Node.prototype.insertBefore = originalInsertBefore;
    };
  }, []);

  return (
    <>
      <div className="gtranslate_wrapper"></div>
      <Script src="https://cdn.gtranslate.net/widgets/latest/float.js" strategy="afterInteractive" />
    </>
  );
}