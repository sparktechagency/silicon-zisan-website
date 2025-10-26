import React from "react";
import { Button } from "../ui/button";
import Container from "@/share/Container";
import { id } from "zod/locales";

const packeages = [
  {
    id: 1,
    title: "Basic",
    price: "Free",
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
    title: "Standard",
    price: "€ 2.50 Per Day",
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
    title: "Booster",
    price: "€ 2.50 Per Day",
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

export default function Subscriptions() {
  return (
    <Container className="grid grid-cols-3 gap-7 my-10">
      {packeages?.map((item, index) => (
        <div
          key={index}
          className="bg-card p-3 rounded border border-gray-300/30 flex flex-col"
        >
          <h1 className="text-2xl font-semibold my-2">JobsinApp Plans</h1>
          <button className="custom-btn w-full py-2 rounded-2xl">
            {item.title}
          </button>

          <div className="bg-[#304150] rounded py-3 px-5 my-3 border border-gray-300/30 flex flex-col grow">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-white text-2xl font-semibold">
                  {item.title}
                </h1>
                <p className="text-white text-md">{item.price}</p>
              </div>
              <div className="flex">
                <button className="custom-btn py-2 px-4 rounded-none">
                  Active
                </button>
                <button className="border border-gray-300/50 px-2">
                  Inactive
                </button>
              </div>
            </div>
            {/* list */}
            <div className="py-10 px-5">
              <ul>
                {item?.features.map((feature, index) => (
                  <li key={index} className="text-white text-[12px] list-disc">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-auto">
            <Button className="custom-btn py-2 rounded font-semibold w-full">
              Subscription Now
            </Button>
          </div>
        </div>
      ))}
    </Container>
  );
}
