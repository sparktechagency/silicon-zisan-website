/* eslint-disable react/display-name */
// /* eslint-disable react/display-name */
"use client";
import { getCookie, setCookie } from "cookies-next/client";
import { memo, useEffect, useState } from "react";

async function translateText(text: string, target: string) {
  const res = await fetch("/api/translate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, target }),
  });

  const data = await res.json();
  return data.translatedText;
}
export const TranslatedValue = memo(({ text, lang }: any) => {
  const [translated, setTranslated] = useState(text);

  useEffect(() => {
    let isMounted = true; // Cleanup flag

    const getTranslation = async () => {
      if (!text) return;

      const key = `trans_${lang}_${encodeURIComponent(text)}`;

      // 2️⃣ Check cookie
      const cachedCookie = getCookie(key);
      if (cachedCookie) {
        const value = cachedCookie.toString();
        setTranslated(value);
        sessionStorage.setItem(key, value);
        return;
      }

      // 3️⃣ Call API
      const res = await translateText(text, lang);

      if (isMounted) {
        setTranslated(res);

        setCookie(key, res, {
          maxAge: 60 * 60 * 24 * 7,
        });
      }
    };
    getTranslation();

    return () => {
      isMounted = false; // prevent state update if unmounted
    };
  }, [text, lang]);

  return <span>{translated}</span>;
});

// "use client";

// import { getCookie, setCookie } from "cookies-next/client";
// import { memo, useEffect, useState } from "react";

// async function translateText(text: string, target: string) {
//   try {
//     const res = await fetch("/api/translate", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ text, target }),
//     });

//     if (!res.ok) throw new Error("Translation API failed");

//     const data = await res.json();
//     return data.translatedText;
//   } catch (err) {
//     console.error("Translate API error:", err);
//     return text; // fallback to original
//   }
// }

// interface TranslatedValueProps {
//   text: string;
//   lang: string;
// }

// export const TranslatedValue = memo(({ text, lang }: TranslatedValueProps) => {
//   const [translated, setTranslated] = useState(text);

//   useEffect(() => {
//     console.log("text", text);
//     console.log("lang", lang);

//     if (!text) return;

//     let isMounted = true;

//     // Short, safe cookie key
//     const key = `trans_${lang}_${btoa(text).slice(0, 20)}`;

//     const getTranslation = async () => {
//       // 1️⃣ Check cookie
//       const cached = getCookie(key);
//       if (cached) {
//         if (isMounted) {
//           setTranslated(cached.toString());
//           sessionStorage.setItem(key, cached.toString());
//         }
//         return;
//       }

//       // 2️⃣ Check sessionStorage
//       const cachedSession = sessionStorage.getItem(key);
//       if (cachedSession) {
//         if (isMounted) setTranslated(cachedSession);
//         return;
//       }

//       // 3️⃣ Call API route
//       const result = await translateText(text, lang);

//       if (isMounted) {
//         setTranslated(result);

//         console.log("key", key);
//         console.log("result", result);

//         // Save to cookie (7 days)
//         setCookie(key, result);
//         sessionStorage.setItem(key, result);
//       }
//     };

//     getTranslation();

//     return () => {
//       isMounted = false;
//     };
//   }, [text, lang]);

//   return <span>{translated}</span>;
// });
