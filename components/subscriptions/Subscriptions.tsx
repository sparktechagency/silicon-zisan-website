import { Button } from "../ui/button";
import Container from "@/share/Container";
import { Info } from "lucide-react";
import Image from "next/image";
import logo from "../../public/dashboard/logo.png";

const packeages = [
  {
    id: 1,
    title: "Basic",
    subTitle: ["Basic", "Standard", "Booster"],
    price: "Free",
    info: false,
    active: " Active",
    unactive: " inactive",
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
    subTitle: ["Basic", "Standard", "Booster"],
    price: "€ 2.50 Per Day",
    info: true,
    active: " Active",
    unactive: " inactive",
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
    subTitle: ["Basic", "Standard", "Booster"],
    price: "€ 2.50 Per Day",
    info: true,
    active: " Active",
    unactive: " inactive",
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
    <Container
      className={`grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-7`}
    >
      {packeages?.map((item, index) => (
        <div
          key={index}
          className="bg-card p-3 rounded border border-gray-300/30 flex flex-col"
        >
          <h1 className="text-2xl font-semibold my-2">JobsinApp Plans</h1>

          <div className="grid grid-cols-3 gap-4 my-4">
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
                  {item.title}
                </h1>
                <p className="text-white text-sm flex gap-2 mt-2">
                  {item.price}
                  {item.info && (
                    <Info className="h-4 w-4 text-white" size={18} />
                  )}
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
            {/* list */}
            <div className="py-10 px-5">
              <ul>
                {item?.features?.map((feature, index) => (
                  <li key={index} className="text-white text-[12px] list-disc">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-auto">
            <Button className="custom-btn h-10 rounded font-bold w-full text-md">
              Subscription Now
            </Button>
          </div>
        </div>
      ))}
    </Container>
  );
}
