/* eslint-disable react/display-name */
"use client";
import { getCookie, setCookie } from "cookies-next/client";
import { memo, useEffect, useState } from "react";

async function translateText(text: string, target: string) {
  const res = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=${process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ q: text, target, format: "text" }),
    },
  );
  const data = await res.json();
  console.log(
    "data.data.translations[0].translatedText",
    data.data.translations[0].translatedText,
  );

  return data.data.translations[0].translatedText;
}

export const TranslatedValue = memo(({ text, lang }: any) => {
  const [translated, setTranslated] = useState(text);

  useEffect(() => {
    let isMounted = true; // Cleanup flag
    // const key = `trans_${lang}_${text}`;

    // const getTranslation = async () => {
    //   if (!text) return;
    //   // const cached = sessionStorage.getItem(`trans_${lang}_${text}`);
    //   const cached = getCookie(key);
    //   if (cached) {
    //     setTranslated(cached);
    //     return;
    //   }

    //   const res = await translateText(text, lang);
    //   if (isMounted) {
    //     setTranslated(res);
    //     // sessionStorage.setItem(`trans_${lang}_${text}`, res); // cache result
    //     console.log(key, res);

    //     setCookie(key, res);
    //   }
    // };

    const getTranslation = async () => {
      if (!text) return;

      // const key = `trans_${lang}_${text}`;
      // const key = `trans_${lang}_${btoa(text)}`;
      const key = `trans_${lang}_${encodeURIComponent(text)}`;

      // 1️⃣ Check sessionStorage
      // const cachedSession = sessionStorage.getItem(key);
      // if (cachedSession) {
      //   setTranslated(cachedSession);
      //   return;
      // }

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

        // Save to session
        // sessionStorage.setItem(key, res);

        // Save to cookie (7 days)
        setCookie(key, res, {
          maxAge: 60 * 60 * 24 * 7, // 7 days
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
