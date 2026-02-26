/* eslint-disable react/display-name */
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
