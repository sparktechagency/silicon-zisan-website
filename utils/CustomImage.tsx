import Image, { StaticImageData } from "next/image";

interface CustomImageProps {
  src?: string | null;
  title?: string;
  width?: number;
  height?: number;
  className?: string;
  fallback?: string | StaticImageData;
}

export default function CustomImage({
  src = "",
  title = "",
  width = 100,
  height = 100,
  className = "",
  fallback = "/default.jpg", // optional fallback image
}: CustomImageProps) {
  // Return fallback if no SRC

  if (!src) {
    return (
      <Image
        src={fallback}
        alt={title || "image"}
        width={width}
        height={height}
        className={`object-cover ${className}`}
        loading="lazy"
        sizes="100vh"
      />
    );
  }

  // Build image URL safely
  const baseUrl = process.env.NEXT_PUBLIC_IMAGE_URL || "";
  const image = src.startsWith("http") ? src : new URL(src, baseUrl).toString();

  return (
    <Image
      src={image}
      alt={title || "image"}
      width={width}
      height={height}
      className={`object-cover ${className}`}
      loading="lazy"
      sizes="100vh"
      unoptimized
    />
  );
}
