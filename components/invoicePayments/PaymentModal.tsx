"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import method from "../../public/invoice-payment/method.png";
import visa from "../../public/invoice-payment/visa.png";

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export default function PaymentModal({
  trigger,
}: {
  trigger: React.ReactNode;
}) {
  const [cardNumber, setCardNumber] = useState("**** **** **** 4256");

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="bg-white text-black sm:max-w-2xl">
        <div className="bg-white  p-3 rounded-lg space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Manage Payment</h2>
            {<Image src={method} alt="method" />}
          </div>

          <div>
            <label className="block mb-1 font-medium">Card Number</label>
            <div className="relative">
              <Input
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="text-black pr-16 bg-white border border-gray-300 w-full"
                placeholder="Card number"
              />
              <Image
                src={visa}
                alt="visa"
                className="absolute right-3 top-1/2 w-8 -translate-y-1/2"
              />
            </div>
          </div>

          <Input
            type="text"
            placeholder="Enter Your Name"
            className=" text-black pr-16 bg-white border border-gray-300 placeholder:text-black"
          />

          <div className="grid grid-cols-2 gap-5">
            <div>
              <h1>Expiration Date</h1>
              <div className="border border-gray-700 flex items-center px-2 justify-between p-1 mt-1 ">
                <p>12/25</p>
                <Image src={visa} className="w-10" alt="visa" />
              </div>
            </div>
            <div>
              <h1>Security Code</h1>
              <p className="border border-gray-700 flex justify-between p-1 mt-1">
                563256323+6+333
              </p>
            </div>
          </div>

          <div className="">
            <div className="flex items-start gap-3">
              <Checkbox className="mt-1 border-white/30 bg-[#1E293B] text-white" />
              <p className="text-sm leading-relaxed">
                Save Payment Information To My Account For Future Purchases
              </p>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox className="mt-1 border-white/30 bg-[#1E293B] text-white" />
              <p className="text-sm leading-relaxed flex flex-wrap">
                By continue with{" "}
                <span className="underline text-gray-800  font-bold mx-1">
                  Terms & Conditions
                </span>
                and
                <span className="underline text-gray-800  font-bold mx-1">
                  Privacy Policy
                </span>
                of JobsinApp.
              </p>
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <Button className="custom-btn text-white w-[45%] h-10">
              Confirm
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
