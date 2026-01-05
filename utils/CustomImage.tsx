import Image from "next/image";

export default function CustomImage({
  src = "",
  title = "",
  width = 100,
  height = 100,
  className = "",
  fallback = "/default.png", // optional fallback image
}) {
  // Return fallback if no SRC
  console.log("src------", src);

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
  const image = src.startsWith("https")
    ? src
    : new URL(src, baseUrl).toString();

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
