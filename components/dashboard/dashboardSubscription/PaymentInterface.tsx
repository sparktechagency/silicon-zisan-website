"use client";

import { useState } from "react";
const packageInfo = [
  { label: "Package:", value: "Basic" },
  { label: "Per Day:", value: "€ 2.50" },
  { label: "For:", value: "30 Days" },
];
import apple from "../../../public/invoice-payment/apple.png";
import google from "../../../public/invoice-payment/google.png";
import bank from "../../../public/invoice-payment/bank.png";
import karna from "../../../public/invoice-payment/karna.png";
import paypal from "../../../public/invoice-payment/paypal.png";
import sofort from "../../../public/invoice-payment/sofort.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import logo from "../../../public/subscription/logo.png";
import Container from "@/share/Container";
import CustomBackButton from "@/share/CustomBackButton";

const paymentMethods = [
  { label: "Apple Pay", image: apple, id: 1 },
  { label: "Google Pay", image: google, id: 2 },
  { label: "Bank Transfers", image: bank, id: 3 },
  { label: "Klarna", image: karna, id: 4 },
  { label: "Pay Pal", image: paypal, id: 5 },
  { label: "Sofort", image: sofort, id: 6 },
];

const packages = [
  {
    id: 1,
    title: ["Basic", "Standard", "Booster"],
    subTitle: "Basic Free",
    price: "Free",
    info: false,
    active: "Active",
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
    price: "€ 2.50 Per Day",
    info: true,
    active: "Active",
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
    price: "€ 2.50 Per Day",
    info: true,
    active: "Active",
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
];

export default function PaymentInterface() {
  const [selectedMethod, setSelectedMethod] = useState("Apple Pay");

  return (
    <Container className="grid lg:grid-cols-[35%_auto] my-16 gap-20 px-10">
      <div>
        <div className="flex gap-2 mb-3">
          <CustomBackButton />
          <h1 className="text-2xl font-semibold">Subscribe Details</h1>
        </div>

        {/* card */}
        {[packages[0]].map((item, index) => (
          <div
            key={index}
            className="bg-card p-3 rounded border border-gray-300/30 flex flex-col"
          >
            <h1 className="text-2xl font-semibold my-2">JobsinApp Plans</h1>

            <div className="grid grid-cols-3 gap-4">
              <button
                className={`button-unactive ${
                  item.title[0] && "custom-btn"
                } w-full py-2 rounded-2xl`}
              >
                Basic
              </button>
              <button className="button-unactive w-full py-2 rounded-2xl">
                Standard
              </button>
              <button className="button-unactive w-full py-2 rounded-2xl">
                Extended
              </button>
            </div>

            <div className="bg-[#304150] rounded py-3 px-5 my-3 border border-gray-300/30 flex flex-col grow">
              <div className="flex justify-between items-center">
                <div className="mt-4">
                  <h1 className="text-white text-2xl font-semibold">
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

            {/* <div className="mt-auto">
            <Link href="/dashboard-payment">
              <Button className="custom-btn py-2 rounded font-semibold w-full">
                Subscription Now
              </Button>
            </Link>
          </div> */}
          </div>
        ))}
      </div>
      {/* payment */}
      <div className=" text-white p-6 rounded-xl space-y-6 border border-gray-400/30 lg:mt-10">
        {/* Package Info */}
        <div className="space-y-2">
          {/* <h2 className="text-xl font-semibold">Package Information</h2> */}
          <div className="grid grid-cols-1 gap-2 text-sm">
            {packageInfo?.map((item, index) => (
              <div
                key={index}
                className="border-b border-white flex items-center justify-between py-2"
              >
                <p>{item.label}</p>
                <p className=""> {item.value}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between border-b border-white py-2">
            <p>Total</p>
            <p>€ 2500</p>
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-4 bg-card rounded p-2">
          <h2 className="text-xl font-semibold">Payment Method</h2>
          <div className="space-y-3 ">
            {paymentMethods.map((method) => (
              <label
                key={method.id}
                className={`flex items-center gap-4  cursor-pointer `}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method.label}
                  checked={selectedMethod === method.label}
                  onChange={() => setSelectedMethod(method.label)}
                  className="accent-[#67B87D] appearance-none w-3 h-3 rounded-full border border-[#67B87D] checked:bg-[#67B87D] checked:ring-2 checked:ring-[#67B87D] "
                />
                <Image src={method.image} alt="method" className="w-5" />
                <span>{method.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Pay Button */}
        <button className="w-full py-2 rounded-lg custom-btn text-white font-semibold text-lg">
          Pay
        </button>
      </div>
    </Container>
  );
}
