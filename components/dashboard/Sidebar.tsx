"use client";

import { IconType } from "react-icons";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { data } from "@/demoData/data";
import { useEffect, useState } from "react";

type item =
  | {
      title: string;
      icon: IconType;
    }
  | {
      title: string;
      icon: string;
    };

export default function Sidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialName = searchParams.get("name") || "My Jobs";
  console.log("initialName", initialName);

  const [selectedName, setSelectedName] = useState(initialName);

  // const params = new URLSearchParams(searchParams.toString());
  // const urlName: string = params.get("name") || "My Posted Jobs";

  useEffect(() => {
    setSelectedName(initialName);
  }, [initialName]);

  const handleChangeName = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    name: string,
  ) => {
    e.preventDefault();
    setSelectedName(name);
    const params = new URLSearchParams(searchParams.toString());
    params.set("name", name);

    const srcObject = Object.fromEntries(params);

    delete srcObject.status;

    router.push(`?${new URLSearchParams(srcObject).toString()}`);
  };
  return (
    <div className="basis-[29%] px-4 max-h-[83vh] overflow-y-scroll">
      {data?.map((item: item, index) => {
        const active = selectedName === item.title;
        const icon = item.icon;
        const isFunctionIcon = typeof icon === "function";
        const IconComponent = isFunctionIcon ? (icon as IconType) : null;
        const iconSrc = !isFunctionIcon ? (icon as string) : undefined;

        return (
          <div
            key={index}
            onClick={(e) => handleChangeName(e, item.title)}
            className={` flex items-center pl-5 mx-auto mb-3 gap-3 md:text-[18px] font-medium rounded py-2 w-full xl:w-[80%] 2xl:w-full cursor-pointer ${
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
          </div>
        );
      })}
    </div>
  );
}
