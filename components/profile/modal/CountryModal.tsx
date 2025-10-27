// components/CountryModal.tsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import uk from "../../../public/profile/country/uk.png";
import german from "../../../public/profile/country/german.png";
import russia from "../../../public/profile/country/russia.png";
import serbain from "../../../public/profile/country/serbain.png";
import Image from "next/image";
import CustomRadio from "@/share/CustomRadio";

const country = [
  { id: "uk", label: "Uk", image: uk },
  { id: "german", label: "German", image: german },
  { id: "russian", label: "Russian", image: russia },
  { id: "serbian", label: "Serbian", image: serbain },
];
const language = [
  { id: "english", label: "English", image: uk },
  { id: "german", label: "German", image: german },
  { id: "russian", label: "Russian", image: russia },
  { id: "serbian", label: "Serbian", image: serbain },
];

export function CountryModal({
  title,
  trigger,
}: {
  title: string;
  trigger: React.ReactNode;
}) {
  const [selectedCountry, setSelectedCountry] = useState("uk");

  const selectData = title === "Select Language" ? language : country;

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-sm bg-[#3C4751] rounded-lg p-6 w-full  shadow-lg opacity-80 border border-gray-400/30">
        <DialogHeader>
          <DialogTitle className="text-center">{title}</DialogTitle>
        </DialogHeader>

        <RadioGroup
          value={selectedCountry}
          onValueChange={setSelectedCountry}
          className="space-y-4"
        >
          {selectData?.map(({ id, label, image }) => (
            <div
              key={id}
              className="flex items-center justify-between bg-white/40 backdrop-blur-md p-2 rounded"
            >
              <div className="flex gap-3">
                <Image src={image} className="h-7 w-8" alt="" />
                <Label htmlFor={id} className="text-base">
                  {label}
                </Label>
              </div>
              <CustomRadio value={id} selected={selectedCountry === id} />
            </div>
          ))}
        </RadioGroup>

        <DialogFooter className="pt-4">
          <Button className="w-full custom-btn">Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
