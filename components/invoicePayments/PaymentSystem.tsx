import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import method from "../../public/invoice-payment/method.png";
import apple from "../../public/invoice-payment/apple.png";
import google from "../../public/invoice-payment/google.png";
import bank from "../../public/invoice-payment/bank.png";
import klarna from "../../public/invoice-payment/karna.png";
import paypal from "../../public/invoice-payment/paypal.png";
import sofort from "../../public/invoice-payment/sofort.png";
import PaymentModal from "./PaymentModal";

const methods = [
  { id: 1, label: "Google Pay", image: google },
  { id: 2, label: "Apple Pay", image: apple },
  { id: 3, label: "Bank Transfers", image: bank },
  { id: 4, label: "Klarna", image: klarna },
  { id: 5, label: "PayPal", image: paypal },
  { id: 6, label: "Sofort", image: sofort },
];

export default function PaymentSystem() {
  const [cardNumber, setCardNumber] = useState("**** **** **** 4256");
  const [activeMethod, setActiveMethod] = useState("Apple Pay");

  const active = methods.find((method) => method.label === activeMethod);

  return (
    <div className="bg-white text-black p-6 mt-10 rounded-lg space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Manage Payments</h2>
        {<Image src={method} alt="method" />}
      </div>

      {active && (
        <div className="bg-[#E6F0F3] p-2 rounded-md flex items-center justify-between">
          <div className="flex gap-3">
            <Image src={active.image} alt="method" />
            <span className="font-medium">{active.label}</span>
          </div>
          <Button className="text-white border-white bg-green-600">
            Active
          </Button>
        </div>
      )}

      <div>
        <label className="block mb-1 font-medium">Card Number</label>
        <div className="relative">
          <Input
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className=" text-black pr-16 bg-white border border-gray-300"
          />
          <span className="absolute right-4 top-2 text-blue-400 font-bold">
            Visa
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {methods.map((method) => (
          <div
            key={method.id}
            className="flex items-center gap-2 cursor-pointer mb-4"
            onClick={() => setActiveMethod(method.label)}
          >
            {method.image && (
              <Image
                src={method.image}
                alt={method.label}
                className="w-6 h-6"
              />
            )}
            <span>{method.label}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <PaymentModal
          trigger={
            <Button className="custom-btn text-white w-[45%] h-10">
              Update
            </Button>
          }
        />

        <Button className="bg-red-600 hover:bg-red-700 text-white w-[45%] h-10">
          Deactive
        </Button>
      </div>
    </div>
  );
}
