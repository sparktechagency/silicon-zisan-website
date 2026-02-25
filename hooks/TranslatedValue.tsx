/* eslint-disable react/display-name */
"use client";
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

    const getTranslation = async () => {
      if (!text) return;
      const cached = sessionStorage.getItem(`trans_${lang}_${text}`);
      if (cached) {
        setTranslated(cached);
        return;
      }

      const res = await translateText(text, lang);
      if (isMounted) {
        setTranslated(res);
        sessionStorage.setItem(`trans_${lang}_${text}`, res); // cache result
      }
    };

    getTranslation();

    return () => {
      isMounted = false; // prevent state update if unmounted
    };
  }, [text, lang]);

  return <span>{translated}</span>;
});
