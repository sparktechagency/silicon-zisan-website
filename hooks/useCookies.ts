// hooks/useCookie.ts
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next/client";

export function useCookie(key: string) {
  const [value, setValue] = useState(() => getCookie(key) || "");

  useEffect(() => {
    // Poll for cookie changes every 500ms
    const interval = setInterval(() => {
      const newValue = getCookie(key) || "";
      if (newValue !== value) {
        setValue(newValue);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [key, value]);

  return value;
}
