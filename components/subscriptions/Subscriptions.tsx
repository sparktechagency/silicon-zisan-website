"use client";

import Image from "next/image";
import logo from "../../public/dashboard/logo.png";
import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import cancel from "../../public/dashboard/cancel.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Container from "@/share/Container";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import SubscriptionDetails from "../dashboard/dashboardSubscription/SubscriptionDetails";
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Subscriptions({ res, giftSubscription }: any) {
  const swiperRef = useRef<null | any>(null);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const router = useRouter();

  const handleSubscribe = async (id: string) => {
    setLoadingId(id);

    try {
      const res = await myFetch(`/subscriptions/create`, {
        method: "POST",
        body: {
          package: id,
        },
      });

      if (res.status === 403) {
        router.push("/profile/edit-profile");
      }

      if (res.success) {
        window.open(res.data, "_blank");
      } else {
        toast.error((res as any)?.error[0].message);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "something went wrong");
    } finally {
      setLoadingId(null);
    }
  };

  const activeSubscription = res?.find(
    (item: any) => item?.name === giftSubscription?.package?.name,
  );

  const activePlan = activeSubscription?.name || "Basic";

  const basicPlan = res?.find((item: any) => item?.name === "Basic");
  const standardPlan = res?.find((item: any) => item?.name === "Standard");
  const boosterPlan = res?.find((item: any) => item?.name === "Booster");

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
          {basicPlan && (
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

                <div className="bg-[#304150] h-[420px] sm:h-[420px] rounded py-3 px-5 my-3 border border-gray-300/30 flex flex-col grow">
                  <div className="flex justify-between items-center">
                    <div className="mt-4">
                      <h1 className="text-white text-lg lg:text-2xl font-semibold w-40">
                        Basic Free
                      </h1>
                      <div className="text-white text-sm mt-2 flex items-center gap-2.5">
                        <p> € {basicPlan?.dailyPrice} Per Day</p>
                        <SubscriptionDetails
                          bio={basicPlan?.description}
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

                  <ul className="py-10 px-5 sm:px-5 list-disc list-outside ml-4 space-y-1 text-white text-[14px] sm:text-[16px]">
                    {basicPlan?.benefits?.map((list: any, index: number) => (
                      <li key={index} className="pl-1">
                        {list}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <Button
                    disabled={
                      activePlan === "Basic" ||
                      activePlan === "Standard" ||
                      activePlan === "Booster"
                    }
                    className={`custom-btn py-2 rounded font-semibold w-full text-lg h-10 ${
                      loadingId === basicPlan?._id && "cursor-not-allowed"
                    }`}
                    // onClick={() => handleSubscribe(basicPlan?._id)}
                  >
                    {activePlan === "Basic"
                      ? "Activated"
                      : loadingId === basicPlan?._id
                        ? "Processing..."
                        : "Subscribe Now"}
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          )}

          {/* Slide 2: Standard */}
          {standardPlan && (
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

                <div className="bg-[#304150] h-[420px] sm:h-[420px] rounded py-6 px-5 my-3 border border-gray-300/30 flex flex-col grow">
                  <div className="flex justify-between items-center">
                    <div className="mt-4">
                      <h1 className="text-white text-lg lg:text-2xl font-semibold text-nowrap">
                        Standard
                      </h1>
                      <div className="text-white text-sm mt-2 flex items-center gap-2.5">
                        <p> € {standardPlan?.dailyPrice} Per Day</p>
                        <SubscriptionDetails
                          bio={standardPlan?.description}
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

                  <ul className="py-10 px-5 sm:px-5 list-disc list-outside ml-4 space-y-1 text-white text-[14px] sm:text-[16px]">
                    {standardPlan?.benefits?.map((list: any, index: number) => (
                      <li key={index} className="pl-1">
                        {list}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <Button
                    disabled={activePlan === "Standard"}
                    className={`custom-btn py-2 rounded font-semibold w-full text-lg h-10 `}
                    onClick={() => handleSubscribe(standardPlan?._id)}
                  >
                    {loadingId === standardPlan?._id
                      ? "Processing..."
                      : activePlan === "Standard"
                        ? "Activated"
                        : "Subscribe Now"}
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          )}

          {/* Slide 3: Booster */}
          {boosterPlan && (
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

                <div className="bg-[#304150] h-[420px] sm:h-[420px] rounded py-3 px-5 my-3 border border-gray-300/30 flex flex-col grow">
                  <div className="flex justify-between items-center">
                    <div className="mt-4">
                      <h1 className="text-white text-lg lg:text-2xl font-semibold text-nowrap">
                        Booster
                      </h1>
                      <div className="text-white text-sm mt-2 flex items-center gap-2.5">
                        <p> € {boosterPlan?.dailyPrice} Per Day</p>
                        <SubscriptionDetails
                          bio={boosterPlan?.description}
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

                  <ul className="py-10 px-5 sm:px-5 list-disc list-outside ml-4 space-y-1 text-white text-[14px] sm:text-[16px]">
                    {boosterPlan?.benefits?.map((list: any, index: number) => (
                      <li key={index} className="pl-1">
                        {list}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <Button
                    disabled={
                      activePlan === "Booster" || loadingId === boosterPlan?._id
                    }
                    className={`custom-btn py-2 rounded font-semibold w-full text-lg h-10 ${
                      loadingId === boosterPlan?._id && "cursor-not-allowed"
                    }`}
                    onClick={() => handleSubscribe(boosterPlan?._id)}
                  >
                    {loadingId === boosterPlan?._id
                      ? "Processing..."
                      : activePlan === "Booster"
                        ? "Activated"
                        : "Subscribe Now"}
                  </Button>
                </div>
              </div>
            </SwiperSlide>
          )}

          {/* cancel */}
          {/* <SwiperSlide>
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
          </SwiperSlide> */}
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
