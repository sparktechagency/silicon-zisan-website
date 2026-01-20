"use client";

import Image from "next/image";
import logo from "../../../public/dashboard/logo.png";
import { Button } from "@/components/ui/button";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import cancel from "../../../public/dashboard/cancel.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import CancelModal from "./CancelModal";
import CancelModalTwo from "./CancelModalTwo";
import { Info } from "lucide-react";
import { myFetch } from "@/utils/myFetch";
import SubscriptionDetails from "./SubscriptionDetails";
import { toast } from "sonner";

type PackageType = {
  benefits?: string[];
  dailyPrice: string;
  _id: string;
  description: string;
};

export default function SubscriptionPlan() {
  const swiperRef = useRef<null | any>(null);
  const [isModalOneOpen, setIsModalOneOpen] = useState(false);
  const [isModalTwoOpen, setIsModalTwoOpen] = useState(false);
  const [data, setData] = useState<PackageType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await myFetch("/packages");
      setData(res?.data || []);
    };

    fetchData();
  }, []);

  const handleSubscribe = async (id: string) => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  const two = data?.[2]?._id;
  const one = data?.[1]?._id;

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
                  {/* <div className="flex flex-col sm:flex-row">
                    <button className="custom-btn py-1 px-4 rounded-none text-sm lg:text-md h-8">
                      Activated
                    </button>
                    <button className="border border-gray-300/50 px-2 text-sm lg:text-md h-8">
                      Inactive
                    </button>
                  </div> */}
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
              disabled={loading || !one}
              className={`custom-btn py-2 rounded font-semibold w-full text-lg h-10 ${
                loading && "cursor-not-allowed"
              }`}
              onClick={() => handleSubscribe(data[0]?._id)}
            >
              Subscribe Now
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
                  {/* <div className="flex flex-col sm:flex-row">
                    <button className="custom-btn py-1 px-4 rounded-none text-sm lg:text-md h-8">
                      Activated
                    </button>
                    <button className="border border-gray-300/50 px-2 text-sm lg:text-md h-8">
                      Inactive
                    </button>
                  </div> */}
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
                disabled={loading || !one}
                className={`custom-btn py-2 rounded font-semibold w-full text-lg h-10 ${
                  loading && "cursor-not-allowed"
                }`}
                onClick={() => handleSubscribe(data[1]?._id)}
              >
                Subscribe Now
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
                        € {data[1]?.dailyPrice} Per Day
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
                    {/* <div className="flex flex-col sm:flex-row">
                      <button className="custom-btn py-1 px-4 rounded-none text-sm lg:text-md h-8">
                        Activated
                      </button>
                      <button className="border border-gray-300/50 px-2 text-sm lg:text-md h-8">
                        Inactive
                      </button>
                    </div> */}
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
                  disabled={loading || !two}
                  className={`custom-btn py-2 rounded font-semibold w-full text-lg h-10 ${
                    loading && "cursor-not-allowed"
                  }`}
                  onClick={() => handleSubscribe(data[2]?._id)}
                >
                  Subscribe Now
                </Button>
              </div>
            </div>
          </SwiperSlide>
        )}

        {/* cancel */}
        <SwiperSlide>
          <div className="bg-card  p-3 rounded border border-gray-300/30 flex flex-col  h-[630px] md:w-[50%] mx-auto">
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
