"use client";

import Image from "next/image";
import logo from "../../../public/dashboard/logo.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const packages = [
  {
    id: 1,
    title: ["Basic", "Standard", "Booster"],
    subTitle: "Basic Free",
    all: "Basic",
    price: "Free",
    info: false,
    active: "Activeded",
    unactive: "Inactive",
    features: [
      "5 Jobs Posting",
      "Limited Candidate Alerts",
      "Limited Candidate Search",
      "Limited Access To AI Tools",
      "Activated For Every Registered Account",
    ],
  },
  {
    id: 2,
    title: ["Basic", "Standard", "Booster"],
    subTitle: "Standard",
    all: "Standard",
    price: "€ 2.50 Per Day",
    info: true,
    active: "Activeded",
    unactive: "Inactive",
    features: [
      "0 € For 30 Days",
      "Activated For 30 Days",
      "Unlimited Jobs Posting",
      "Unlimited Candidate Search",
      "Unlimited Candidate Alerts",
      "Move Up After 7 Days",
      "Full Access AI Tools",
      "Exclusive Features",
      "24/7 Support",
    ],
  },
  {
    id: 3,
    title: ["Basic", "Standard", "Booster"],
    subTitle: "Booster",
    all: "Booster",
    price: "€ 2.50 Per Day",
    info: true,
    active: "Activeded",
    unactive: "Inactive",
    features: [
      "0 € For 30 Days",
      "Activated For 90 Days",
      "Unlimited Jobs Posting",
      "Unlimited Candidate Search",
      "Unlimited Candidate Alerts",
      "Move Up After 7 Days",
      "Full Access AI Tools",
      "Exclusive Features",
      "24/7 Support",
    ],
  },
];

export default function CaruselCard() {
  const swiperRef = useRef<null | any>(null);

  return (
    <div className="relative">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={2}
        spaceBetween={20}
        loop={true}
        pagination={{ clickable: true }}
        navigation={false}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {[packages[0], packages[1], packages[2]].map((item, index) => (
          <SwiperSlide key={index}>
            <div className="bg-card p-3 rounded border border-gray-300/30 flex flex-col h-full px-">
              <h1 className="text-lg sm:text-2xl font-semibold my-2">
                JobsinApp Plans
              </h1>
              <div className="grid grid-cols-3 gap-4">
                {item.title.map((label, i) => (
                  <button
                    key={i}
                    className={`button-unactive ${
                      item.all === label ? "custom-btn" : ""
                    } w-full py-2 rounded-2xl`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <div className="bg-[#304150] h-96 rounded py-3 px-5 my-3 border border-gray-300/30 flex flex-col grow">
                <div className="flex justify-between items-center">
                  <div className="mt-4">
                    <h1 className="text-white text-lg sm:text-2xl font-semibold">
                      {item.subTitle}
                    </h1>
                    <p className="text-white text-sm flex gap-2 mt-2">
                      {item.price}
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-end mb-2">
                      <Image src={logo} className="h-10 w-10" alt="logo" />
                    </div>
                    <div className="flex">
                      <button className="custom-btn py-1 px-4 rounded-none">
                        {item.active}
                      </button>
                      <button className="border border-gray-300/50 px-2">
                        {item.unactive}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="py-10 px-5">
                  <ul className="list-disc list-inside space-y-1">
                    {item.features.map((feature, i) => (
                      <li key={i} className="text-white text-[12px]">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-auto">
                <Link href="/dashboard-payment">
                  <Button className="custom-btn py-2 rounded font-semibold w-full text-lg h-10">
                    Subscription Now
                  </Button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Arrows */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        style={{ boxShadow: "0 0 10px 0 #B1F1FF inset" }}
        className="custom-btn absolute left-2 cursor-pointer top-1/2 -translate-y-1/2 -ml-5 w-10 h-10 rounded-full text-white flex items-center justify-center shadow-lg z-10 transition-colors"
        aria-label="Previous slide"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        style={{ boxShadow: "0 0 10px 0 #B1F1FF inset" }}
        className="custom-btn absolute right-2 cursor-pointer top-1/2 -translate-y-1/2 -mr-5 w-10 h-10 rounded-full text-white flex items-center justify-center shadow-lg z-10 transition-colors"
        aria-label="Next slide"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}
