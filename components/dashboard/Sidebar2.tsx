"use client";

import Image from "next/image";
import { IconType } from "react-icons";
import { usePathname, useRouter } from "next/navigation";
import { data } from "@/demoData/data";
import Link from "next/link";

// type Item =
//   | {
//       title: string;
//       icon: IconType;
//       path: string;
//     }
//   | {
//       title: string;
//       icon: string;
//       path: string;
//     };

export default function Sidebar2() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="basis-[29%] px-4 max-h-[83vh] overflow-y-scroll">
      {data?.map((item: any, index: number) => {
        const active = pathname === item.path;

        const icon = item.icon;
        const isFunctionIcon = typeof icon === "function";
        const IconComponent = isFunctionIcon ? (icon as IconType) : null;
        const iconSrc = !isFunctionIcon ? (icon as string) : undefined;

        return (
          <Link
            href={item.path}
            key={index}
            onClick={() => router.push(item.path)}
            className={`flex items-center pl-5 mx-auto mb-3 gap-3 md:text-[18px] font-medium rounded py-2 w-full xl:w-[80%] 2xl:w-full cursor-pointer ${
              active
                ? "custom-btn"
                : "bg-card text-white border border-white/20"
            }`}
          >
            {IconComponent ? (
              <IconComponent
                className={`${
                  active
                    ? "rounded-full button-active p-1 size-10"
                    : "bg-[#505E6E] button-unactive rounded-full p-1 size-10"
                }`}
              />
            ) : (
              <Image
                src={iconSrc!}
                alt={item.title}
                width={40}
                height={40}
                className={`${
                  active
                    ? "rounded-full button-active p-1"
                    : "bg-[#505E6E] button-unactive rounded-full p-1 size-10"
                }`}
              />
            )}
            <span>{item.title}</span>
          </Link>
        );
      })}
    </div>
  );
}
