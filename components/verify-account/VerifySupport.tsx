"use client";
import React, { useRef, useState } from "react";
import { Label } from "../ui/label";
import Image from "next/image";
import { FileImage, Upload } from "lucide-react";
import { Input } from "../ui/input";

export default function VerifyAccount() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  console.log(imagePreview);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div>
      {/* upload image */}
      <div>
        <Label className="sm:text-xl md:text-2xl">
          Upload Bussiness Documents
        </Label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div
              className="border rounded flex items-center justify-center p-4 mt-2"
              onClick={handleClick}
            >
              <div className="w-32 h-32 p-2 flex flex-col items-center justify-center  rounded bg-[#4B5A69]">
                <p>
                  <Upload className="text-[#69b8ca]" />
                </p>
                <p> Upload</p>
              </div>

              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                ref={inputRef}
              />
            </div>
            {/* image show */}
            {imagePreview && (
              <Image
                src={imagePreview}
                alt="Preview"
                width={20}
                height={20}
                className="w-full h-auto object-cover rounded mt-4"
              />
            )}
          </div>
          <div>
            <div
              className="border rounded flex items-center justify-center p-4 mt-2"
              onClick={handleClick}
            >
              <div className="w-32 h-32 p-2 flex flex-col items-center justify-center  rounded bg-[#4B5A69]">
                <p>
                  <Upload className="text-[#69b8ca]" />
                </p>
                <p> Upload</p>
              </div>

              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                ref={inputRef}
              />
            </div>
            {/* image show */}
            {imagePreview && (
              <Image
                src={imagePreview}
                alt="Preview"
                width={400}
                height={300}
                className="w-full h-auto  object-cover rounded mt-4"
              />
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button className="custom-btn w-[49%] px-12 py-2 rounded-md mt-7 ">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
