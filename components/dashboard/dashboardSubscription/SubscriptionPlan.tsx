"use client";

import Image from "next/image";
import logo from "../../../public/dashboard/logo.png";
import { Button } from "@/components/ui/button";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Info } from "lucide-react";
import { myFetch } from "@/utils/myFetch";
import SubscriptionDetails from "./SubscriptionDetails";
import { toast } from "sonner";

export default function SubscriptionPlan({ data, name }: any) {
  const swiperRef = useRef<null | any>(null);

  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleSubscribe = async (id: string) => {
    setLoadingId(id);

    try {
      const res = await myFetch(`/subscriptions/create`, {
        method: "POST",
        body: {
          package: id,
        },
      });

      if (res.success) {
        window.open(res.data, "_blank");
      } else {
        toast.error(res?.message);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  const activeSubscription = data?.find((item: any) => item?.name === name);

  const activePlan = activeSubscription?.name || "Basic";

  return (
    <div className="relative px-2 md:px-0">
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
          <div className="bg-card p-3 rounded border border-gray-300/30 flex flex-col h-[630px] md:w-[60%] lg:w-[50%] mx-auto">
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
                Booster
              </button>
            </div>

            <div className="bg-[#304150] h-[450px] rounded py-3 px-5 my-3 border border-gray-300/30 flex flex-col grow">
              <div className="flex justify-between items-center">
                <div className="mt-4">
                  <h1 className="text-white text-lg lg:text-2xl font-semibold w-40">
                    Basic Free
                  </h1>
                  <div className="flex gap-3 items-center mt-1">
                    <p className="text-white text-sm ">Free</p>

                    <SubscriptionDetails
                      bio={data[0]?.description}
                      trigger={
                        <p>
                          <Info />
                        </p>
                      }
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-end mb-2">
                    <Image src={logo} className="h-10 w-10" alt="logo" />
                  </div>
                </div>
              </div>

              <ul className="py-10 px-1 sm:px-5 list-disc list-inside space-y-1 text-white text-[14px] sm:text-[16px]">
                {data[0]?.benefits?.map((item: any, index: number) => (
                  <li className="" key={index}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <Button
              disabled={activePlan === "Basic"}
              className={`custom-btn py-2 rounded font-semibold w-full text-lg h-10 ${
                loadingId === data[0]?._id && "cursor-not-allowed"
              }`}
              onClick={() => handleSubscribe(data[0]?._id)}
            >
              {activePlan === "Basic"
                ? "Already Actived"
                : loadingId === data[0]?._id
                  ? "Processing..."
                  : "Subscribe Now"}
            </Button>
          </div>
        </SwiperSlide>

        {/* Slide 2: Standard */}
        <SwiperSlide>
          <div className="bg-card p-3 rounded border border-gray-300/30 flex flex-col h-[630px] md:w-[60%] lg:w-[50%] mx-auto">
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
                Booster
              </button>
            </div>

            <div className="bg-[#304150] h-[450px] rounded py-6 px-5 my-3 border border-gray-300/30 flex flex-col grow">
              <div className="flex justify-between items-center">
                <div className="mt-4">
                  <h1 className="text-white text-lg lg:text-2xl font-semibold text-nowrap">
                    Standard
                  </h1>
                  <div className="flex gap-3 items-center mt-1">
                    <p className="text-white text-sm ">
                      € {data[1]?.dailyPrice} Per Day
                    </p>
                    <SubscriptionDetails
                      bio={data[1]?.description}
                      trigger={
                        <p>
                          <Info />
                        </p>
                      }
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-end mb-2">
                    <Image src={logo} className="h-10 w-10" alt="logo" />
                  </div>
                </div>
              </div>

              <ul className="py-10 px-1 sm:px-5 list-disc list-inside space-y-1 text-white text-[14px] sm:text-[16px]">
                {data[1]?.benefits?.map((item: any, index: number) => (
                  <li className="" key={index}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-auto">
              <Button
                disabled={activePlan === "Standard"}
                className={`custom-btn py-2 rounded font-semibold w-full text-lg h-10 ${
                  loadingId === data[1]?._id && "cursor-not-allowed"
                }`}
                onClick={() => handleSubscribe(data[1]?._id)}
              >
                {activePlan === "Standard"
                  ? "Actived"
                  : loadingId === data[1]?._id
                    ? "Processing..."
                    : "Subscribe Now"}
              </Button>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3: Booster */}
        {data[2] && (
          <SwiperSlide>
            <div className="bg-card p-3 rounded border border-gray-300/30 flex flex-col h-[630px] md:w-[60%] lg:w-[50%] mx-auto">
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
                  Booster
                </button>
              </div>

              <div className="bg-[#304150] h-[450px] rounded py-3 px-5 my-3 border border-gray-300/30 flex flex-col grow">
                <div className="flex justify-between items-center">
                  <div className="mt-4">
                    <h1 className="text-white text-lg lg:text-2xl font-semibold text-nowrap">
                      Booster
                    </h1>
                    <div className="flex gap-3 items-center mt-1">
                      <p className="text-white text-sm ">
                        € {data[2]?.dailyPrice} Per Day
                      </p>
                      <SubscriptionDetails
                        bio={data[2]?.description}
                        trigger={
                          <p>
                            <Info />
                          </p>
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-end mb-2">
                      <Image src={logo} className="h-10 w-10" alt="logo" />
                    </div>
                  </div>
                </div>

                <ul className="py-10 px-1 sm:px-5 list-disc list-inside space-y-1 text-white text-[14px] sm:text-[16px]">
                  {data[2]?.benefits?.map((item: any, index: number) => (
                    <li className="" key={index}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <Button
                  disabled={activePlan === "Booster"}
                  className={`custom-btn py-2 rounded font-semibold w-full text-lg h-10 ${
                    loadingId === data[2]?._id && "cursor-not-allowed"
                  }`}
                  onClick={() => handleSubscribe(data[2]?._id)}
                >
                  {activePlan === "Booster"
                    ? "Actived"
                    : loadingId === data[2]?._id
                      ? "Processing..."
                      : "Subscribe Now"}
                </Button>
              </div>
            </div>
          </SwiperSlide>
        )}
      </Swiper>

      {/* Navigation Arrows */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        style={{ boxShadow: "0 0 10px 0 #B1F1FF inset" }}
        className="custom-btn absolute md:left-[20%] lg:left-[25%] cursor-pointer top-1/2 -translate-y-1/2 -ml-5 w-10 h-10 rounded-full text-white flex items-center justify-center shadow-lg z-10 transition-colors"
        aria-label="Previous slide"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        style={{ boxShadow: "0 0 10px 0 #B1F1FF inset" }}
        className="custom-btn absolute right-2 md:right-[20%] lg:right-[25%] cursor-pointer top-1/2 -translate-y-1/2 -mr-5 w-10 h-10 rounded-full text-white flex items-center justify-center shadow-lg z-10 transition-colors"
        aria-label="Next slide"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}
