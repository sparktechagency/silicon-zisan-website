import Image, { StaticImageData } from "next/image";
import fallbackImage from "../public/footer/play.png";

export default function CustomImage({
  item,
  width = 100,
  height = 100,
  name = "logo",
}: {
  item: string | StaticImageData;
  width?: number;
  height?: number;
  name?: string;
}) {
  let logoSrc: string | StaticImageData = fallbackImage;

  if (typeof item === "string" && item.trim() !== "") {
    logoSrc = item?.startsWith("http")
      ? item
      : `${process.env.NEXT_PUBLIC_BASE_URL}${item}`;
  } else if (item) {
    logoSrc = item;
  }
  return <Image src={item} width={width} height={height} alt={name} />;
}
