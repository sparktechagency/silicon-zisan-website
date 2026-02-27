// import Image, { StaticImageData } from "next/image";
// import defaultImage from "@/public/logo.png";

// interface CustomImageProps {
//   src?: string | null;
//   title?: string;
//   width?: number;
//   height?: number;
//   className?: string;
//   fallback?: string | StaticImageData;
// }

// export default function CustomImage({
//   src = "",
//   title = "",
//   width = 100,
//   height = 100,
//   className = "",
// }: CustomImageProps) {
//   // Return fallback if no SRC

//   if (!src) {
//     return (
//       <Image
//         src={defaultImage}
//         alt={title || "image"}
//         width={width}
//         height={height}
//         className={`object-contain ${className}`}
//         loading="lazy"
//         sizes="100vw"
//       />
//     );
//   }

//   // Build image URL safely
//   const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "";
//   const image = src.startsWith("http") ? src : new URL(src, baseUrl).toString();

//   return (
//     <Image
//       src={image}
//       alt={title || "image"}
//       width={width}
//       height={height}
//       className={`object-cover ${className}`}
//       loading="lazy"
//       sizes="100vh"
//       unoptimized
//     />
//   );
// }
"use client";

import Image, { StaticImageData } from "next/image";
import { useState } from "react";

interface CustomImageProps {
  src?: string | null;
  title?: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function CustomImage({
  src,
  title = "",
  width = 100,
  height = 100,
  className = "",
}: CustomImageProps) {
  const [imgSrc] = useState<string | StaticImageData>(src || "");

  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "";

  const finalSrc =
    typeof imgSrc === "string"
      ? imgSrc.startsWith("http")
        ? imgSrc
        : new URL(imgSrc, baseUrl).toString()
      : imgSrc;

  return (
    <Image
      src={finalSrc}
      alt={title || "image"}
      width={width}
      height={height}
      className={`object-cover ${className}`}
      loading="lazy"
      sizes="100vw"
      unoptimized
      // onError={() => setImgSrc(defaultImage)}
    />
  );
}
