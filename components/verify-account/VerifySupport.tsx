"use client";
import React, { useRef, useState } from "react";
import { Label } from "../ui/label";
import Image from "next/image";
import { Upload } from "lucide-react";
import { Input } from "../ui/input";

export default function VerifyAccount() {
  // multiple file inputs & previews
  const [previews, setPreviews] = useState<(string | null)[]>([null, null]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      const updatedPreviews = [...previews];
      updatedPreviews[index] = imageUrl;
      setPreviews(updatedPreviews);
    }
  };

  const handleClick = (index: number) => {
    inputRefs.current[index]?.click();
  };

  return (
    <div>
      <Label className="sm:text-xl md:text-2xl">
        Upload Business Documents
      </Label>

      <div className="grid grid-cols-2 gap-4 mt-3">
        {[0, 1].map((index) => (
          <div key={index}>
            {/* Upload box */}
            <div
              className="border rounded flex items-center justify-center p-4 cursor-pointer mt-2"
              onClick={() => handleClick(index)}
            >
              <div className="w-32 h-32 p-2 flex flex-col items-center justify-center rounded bg-[#4B5A69] text-white">
                <Upload className="text-[#69b8ca]" />
                <p>Upload</p>
              </div>

              <Input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, index)}
                className="hidden"
                ref={(el: HTMLInputElement | null) => {
                  inputRefs.current[index] = el;
                }}
              />
            </div>

            {/* Image preview */}
            {previews[index] && (
              <Image
                src={previews[index] as string}
                alt={`Preview ${index + 1}`}
                width={400}
                height={300}
                className="w-full h-auto object-cover rounded mt-4"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button className="custom-btn w-[49%] px-12 py-2 rounded-md mt-7">
          Confirm
        </button>
      </div>
    </div>
  );
}
