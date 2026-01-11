"use client";

import Image from "next/image";
import logo from "../../public/dashboard/logo.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import cancel from "../../public/dashboard/cancel.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Container from "@/share/Container";
import CancelModal from "../dashboard/dashboardSubscription/CancelModal";
import CancelModalTwo from "../dashboard/dashboardSubscription/CancelModalTwo";
import FreeSubscriptionModal from "../dashboard/dashboardSubscription/FreeSubscriptionModal";
import { useRouter } from "next/navigation";

export default function Subscriptions({ res }: any) {
  const swiperRef = useRef<null | any>(null);
  const [isModalOneOpen, setIsModalOneOpen] = useState(false);
  const [isModalTwoOpen, setIsModalTwoOpen] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    try {
      router.push("/dashboard-payment");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="px-5">
      <div className="relative max-w-7xl mx-auto">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          slidesPerView={2}
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
            1024: {
              slidesPerView: 2,
            },
            // when window width is >= 1024px (large devices)
            1180: {
              slidesPerView: 2,
            },
          }}
        >
          {/* Slide 1: Basic */}
          <SwiperSlide>
            <div className="bg-card md:w-[50%] lg:w-[90%] mx-auto p-3 rounded border border-gray-300/30 flex flex-col h-full">
              <h1 className="text-lg sm:text-2xl font-semibold my-2">
                JobsinApp Plans
              </h1>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                <button className="custom-btn w-full py-2 rounded-2xl ">
                  Basic
                </button>
                <button className="button-unactive w-full py-2 rounded-2xl ">
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
                  {res[0]?.benefits?.map((list: any, index: number) => (
                    <li key={index}>{list}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <FreeSubscriptionModal
                  trigger={
                    <Button className="custom-btn py-2 rounded font-semibold w-full text-lg h-10">
                      Subscribe Now
                    </Button>
                  }
                />
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2: Standard */}
          <SwiperSlide>
            <div className="bg-card md:w-[50%] lg:w-[90%] mx-auto p-3 rounded border border-gray-300/30 flex flex-col h-full">
              <h1 className="text-lg sm:text-2xl font-semibold my-2">
                JobsinApp Plans
              </h1>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
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
                    <p className="text-white text-sm mt-2">
                      € {res[1]?.dailyPrice} Per Day
                    </p>
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
                  {res[1]?.benefits?.map((list: any, index: number) => (
                    <li key={index}>{list}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto">
                <Button
                  className={`custom-btn py-2 rounded font-semibold w-full text-lg h-10 ${
                    loading && "cursor-not-allowed"
                  }`}
                  disabled={loading}
                  onClick={handleClick}
                >
                  Subscribe Now
                </Button>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3: Booster */}
          {res[2] && (
            <SwiperSlide>
              <div className="bg-card md:w-[50%] lg:w-[90%] mx-auto p-3 rounded border border-gray-300/30 flex flex-col h-full">
                <h1 className="text-lg sm:text-2xl font-semibold my-2">
                  JobsinApp Plans
                </h1>
                <div className="grid grid-cols-3 gap-2 sm:gap-4">
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
                      <p className="text-white text-sm mt-2">
                        € {res[2]?.dailyPrice} Per Day
                      </p>
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
                    {res[2]?.benefits?.map((list: any, index: number) => (
                      <li key={index}>{list}</li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <Button
                    className={`custom-btn py-2 rounded font-semibold w-full text-lg h-10 ${
                      loading && "cursor-not-allowed"
                    }`}
                    disabled={loading}
                    onClick={handleClick}
                  >
                    Subscribe Now
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          )}

          {/* cancel */}
          <SwiperSlide>
            <div className="bg-card md:w-[50%] lg:w-[90%] mx-auto p-3 rounded border border-gray-300/30 flex flex-col h-[630px]">
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
          className="custom-btn absolute md:left-[25%] lg:left-[3%] cursor-pointer top-1/2 -translate-y-1/2 -ml-5 w-10 h-10 rounded-full text-white flex items-center justify-center shadow-lg z-10 transition-colors"
          aria-label="Previous slide"
        >
          <FaChevronLeft />
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          style={{ boxShadow: "0 0 10px 0 #B1F1FF inset" }}
          className="custom-btn absolute right-0 md:right-[25%] lg:right-[3%] cursor-pointer top-1/2 -translate-y-1/2 -mr-5 w-10 h-10 rounded-full text-white flex items-center justify-center shadow-lg z-10 transition-colors"
          aria-label="Next slide"
        >
          <FaChevronRight />
        </button>
      </div>
    </Container>
  );
}
