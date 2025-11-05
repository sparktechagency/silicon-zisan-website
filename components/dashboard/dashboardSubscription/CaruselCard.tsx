"use client";

import Image from "next/image";
import logo from "../../../public/dashboard/logo.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import cancel from "../../../public/dashboard/cancel.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import CancelModal from "./CancelModal";
import CancelModalTwo from "./CancelModalTwo";

const packages = [
  {
    id: 1,
    title: ["Basic", "Standard", "Booster"],
    subTitle: "Basic Free",
    all: "Basic",
    price: "Free",
    info: false,
    active: "Activated",
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
    active: "Activated",
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
    active: "Activated",
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
  const [isModalOneOpen, setIsModalOneOpen] = useState(false);
  const [isModalTwoOpen, setIsModalTwoOpen] = useState(false);

  return (
    <div className="relative">
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        pagination={{ clickable: true }}
        navigation={false}
        modules={[Pagination, Navigation]}
        className="mySwiper"
        breakpoints={{
          // when window width is >= 0px
          0: {
            slidesPerView: 1,
          },
          // when window width is >= 768px (medium devices)
          848: {
            slidesPerView: 1,
          },
          // when window width is >= 1024px (large devices)
          1180: {
            slidesPerView: 1,
          },
        }}
      >
        {/* Slide 1: Basic */}
        <SwiperSlide>
          <div className="bg-card p-3 rounded border border-gray-300/30 flex flex-col h-full">
            <h1 className="text-lg sm:text-2xl font-semibold my-2">
              JobsinApp Plans
            </h1>
            <div className="grid grid-cols-3 gap-4">
              <button className="custom-btn w-full py-2 rounded-2xl">
                Basic
              </button>
              <button className="button-unactive w-full py-2 rounded-2xl">
                Standard
              </button>
              <button className="button-unactive w-full py-2 rounded-2xl">
                Extended
              </button>
            </div>

            <div className="bg-[#304150] h-[450px] rounded py-3 px-5 my-3 border border-gray-300/30 flex flex-col grow">
              <div className="flex justify-between items-center">
                <div className="mt-4">
                  <h1 className="text-white text-lg lg:text-2xl font-semibold text-nowrap">
                    Basic Free
                  </h1>
                  <p className="text-white text-sm mt-2">Free</p>
                </div>
                <div>
                  <div className="flex justify-end mb-2">
                    <Image src={logo} className="h-10 w-10" alt="logo" />
                  </div>
                  <div className="flex flex-col sm:flex-row">
                    <button className="custom-btn py-1 px-4 rounded-none text-sm lg:text-md h-8">
                      Activated
                    </button>
                    <button className="border border-gray-300/50 px-2 text-sm lg:text-md h-8">
                      Inactive
                    </button>
                  </div>
                </div>
              </div>

              <ul className="py-10 px-1 sm:px-5 list-disc list-inside space-y-1 text-white text-[14px] sm:text-[16px]">
                <li>5 Jobs Posting</li>
                <li>Limited Candidate Alerts</li>
                <li>Limited Candidate Search</li>
                <li>Limited Access To AI Tools</li>
                <li>Activated For Every Registered Account</li>
              </ul>
            </div>

            <div className="mt-auto">
              <Link href="/dashboard-payment">
                <Button className="custom-btn py-2 rounded font-semibold w-full text-lg h-10">
                  Subscribe Now
                </Button>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2: Standard */}
        <SwiperSlide>
          <div className="bg-card p-3 rounded border border-gray-300/30 flex flex-col h-full">
            <h1 className="text-lg sm:text-2xl font-semibold my-2">
              JobsinApp Plans
            </h1>
            <div className="grid grid-cols-3 gap-4">
              <button className="button-unactive w-full py-2 rounded-2xl">
                Basic
              </button>
              <button className="custom-btn w-full py-2 rounded-2xl">
                Standard
              </button>
              <button className="button-unactive w-full py-2 rounded-2xl">
                Extended
              </button>
            </div>

            <div className="bg-[#304150] h-[450px] rounded py-6 px-5 my-3 border border-gray-300/30 flex flex-col grow">
              <div className="flex justify-between items-center">
                <div className="mt-4">
                  <h1 className="text-white text-lg lg:text-2xl font-semibold text-nowrap">
                    Standard
                  </h1>
                  <p className="text-white text-sm mt-2">€ 2.50 Per Day</p>
                </div>
                <div>
                  <div className="flex justify-end mb-2">
                    <Image src={logo} className="h-10 w-10" alt="logo" />
                  </div>
                  <div className="flex flex-col sm:flex-row">
                    <button className="custom-btn py-1 px-4 rounded-none text-sm lg:text-md h-8">
                      Activated
                    </button>
                    <button className="border border-gray-300/50 px-2 text-sm lg:text-md h-8">
                      Inactive
                    </button>
                  </div>
                </div>
              </div>

              <ul className="py-10 px-1 sm:px-5 list-disc list-inside space-y-1 text-white text-[14px] sm:text-[16px]">
                <li className="">0 € For 30 Days</li>
                <li className="">Activated For 30 Days</li>
                <li className="">Unlimited Jobs Posting</li>
                <li className="">Unlimited Candidate Search</li>
                <li className="">Unlimited Candidate Alerts</li>
                <li className="">Move Up After 7 Days</li>
                <li className="">Full Access AI Tools</li>
                <li className="">Exclusive Features</li>
                <li className="">24/7 Support</li>
              </ul>
            </div>

            <div className="mt-auto">
              <Link href="/dashboard-payment">
                <Button className="custom-btn py-2 rounded font-semibold w-full text-lg h-10">
                  Subscribe Now
                </Button>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3: Extended */}
        <SwiperSlide>
          <div className="bg-card p-3 rounded border border-gray-300/30 flex flex-col h-full">
            <h1 className="text-lg sm:text-2xl font-semibold my-2">
              JobsinApp Plans
            </h1>
            <div className="grid grid-cols-3 gap-4">
              <button className="button-unactive w-full py-2 rounded-2xl">
                Basic
              </button>
              <button className="button-unactive w-full py-2 rounded-2xl">
                Standard
              </button>
              <button className="button-unactive custom-btn  w-full py-2 rounded-2xl">
                Extended
              </button>
            </div>

            <div className="bg-[#304150] h-[450px] rounded py-3 px-5 my-3 border border-gray-300/30 flex flex-col grow">
              <div className="flex justify-between items-center">
                <div className="mt-4">
                  <h1 className="text-white text-lg lg:text-2xl font-semibold text-nowrap">
                    Extended
                  </h1>
                  <p className="text-white text-sm mt-2">€ 2.50 Per Day</p>
                </div>
                <div>
                  <div className="flex justify-end mb-2">
                    <Image src={logo} className="h-10 w-10" alt="logo" />
                  </div>
                  <div className="flex flex-col sm:flex-row">
                    <button className="custom-btn py-1 px-4 rounded-none text-sm lg:text-md h-8">
                      Activated
                    </button>
                    <button className="border border-gray-300/50 px-2 text-sm lg:text-md h-8">
                      Inactive
                    </button>
                  </div>
                </div>
              </div>

              <ul className="py-10 px-1 sm:px-5 list-disc list-inside space-y-1 text-white text-[14px] sm:text-[16px]">
                <li>0 € For 30 Days</li>
                <li>Activated For 90 Days</li>
                <li>Unlimited Jobs Posting</li>
                <li>Unlimited Candidate Search</li>
                <li>Unlimited Candidate Alerts</li>
                <li>Move Up After 7 Days</li>
                <li>Full Access AI Tools</li>
                <li>Exclusive Features</li>
                <li>24/7 Support</li>
              </ul>
            </div>

            <div className="mt-auto">
              <Link href="/dashboard-payment">
                <Button className="custom-btn py-2 rounded font-semibold w-full text-lg h-10">
                  Subscribe Now
                </Button>
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* cancel */}
        <SwiperSlide>
          <div className="bg-card h-[620px] p-3 rounded border border-gray-300/30 flex flex-col  ">
            <div className="py-10 px-5 mt-20 w-full flex flex-col items-center justify-center">
              <Image
                src={cancel}
                alt="JobsinApp Logo"
                width={150}
                height={24}
                sizes="100vh"
              />
              <h2 className="text-white text-3xl  xl:text-5xl font-semibold my-2">
                JobsinApp
              </h2>
              <p className="text-white text-sm mb-6 text-center"></p>
            </div>
            <div className="mt-auto">
              <>
                <CancelModal
                  isModalOneOpen={isModalOneOpen}
                  setIsModalOneOpen={setIsModalOneOpen}
                  onOpenSecondModal={() => setIsModalTwoOpen(true)}
                  trigger={
                    <Button
                      onClick={() => setIsModalOneOpen(true)}
                      variant="destructive"
                      className="w-full py-2 rounded cursor-pointer text-lg h-10"
                    >
                      Cancel Subscription
                    </Button>
                  }
                />

                <CancelModalTwo
                  isModalTwoOpen={isModalTwoOpen}
                  setIsModalTwoOpen={setIsModalTwoOpen}
                />
              </>
            </div>
          </div>
        </SwiperSlide>
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
