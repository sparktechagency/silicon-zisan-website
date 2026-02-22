// hooks/useCookie.ts
"use client";

import { useState, useEffect, useRef } from "react";
import { getCookie } from "cookies-next/client";

export function useCookie(key: string) {
  const [value, setValue] = useState(() => getCookie(key) || "");
  const valueRef = useRef(value); // track latest value

  useEffect(() => {
    const interval = setInterval(() => {
      const newValue = getCookie(key) || "";
      if (newValue !== valueRef.current) {
        valueRef.current = newValue;
        setValue(newValue);
      }
    }, 500); // poll every 500ms

    return () => clearInterval(interval);
  }, [key]);

  return value;
}
