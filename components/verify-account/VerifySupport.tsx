"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import Image from "next/image";
import { Upload, FileText } from "lucide-react";
import { Input } from "../ui/input";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";

export default function VerifyAccount() {
  const [preview1, setPreview1] = useState<string | null>(null);
  const [preview2, setPreview2] = useState<string | null>(null);
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);

  const handleFile1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile1(file);
      if (file.type === "application/pdf") {
        setPreview1("pdf");
      } else {
        setPreview1(URL.createObjectURL(file));
      }
    }
  };

  const handleFile2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile2(file);
      if (file.type === "application/pdf") {
        setPreview2("pdf");
      } else {
        setPreview2(URL.createObjectURL(file));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file1 || !file2) {
      toast.error("Please upload both documents");
      return;
    }

    const formData = new FormData();
    formData.append("doc", file1);
    formData.append("doc", file2);

    try {
      const res = await myFetch("/verifications/create", {
        method: "POST",
        body: formData,
      });
      //console.log("res", res);

      toast.success("Documents uploaded successfully");
      //console.log("res", res);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "An error occurred");
    }
  };

  return (
    <div>
      <Label className="sm:text-xl md:text-2xl">
        Upload Business Documents
      </Label>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mt-3">
          {/* First Upload */}
          <div>
            <label className="border rounded flex items-center justify-center p-4 cursor-pointer mt-2">
              <div className="w-32 h-32 p-2 flex flex-col items-center justify-center rounded bg-[#4B5A69] text-white">
                <Upload className="text-[#69b8ca]" />
                <p>Upload</p>
              </div>
              <Input
                type="file"
                accept="application/pdf"
                onChange={handleFile1Change}
                className="hidden"
              />
            </label>

            {preview1 && (
              <div className="mt-4">
                {preview1 === "pdf" ? (
                  <div className="border rounded p-4 flex items-center gap-3">
                    <FileText className="w-12 h-12 text-red-500" />
                    <div>
                      <p className="font-medium">{file1?.name}</p>
                      <p className="text-sm text-gray-500">PDF Document</p>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={preview1}
                    alt="Preview 1"
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover rounded"
                  />
                )}
              </div>
            )}
          </div>

          {/* Second Upload */}
          <div>
            <label className="border rounded flex items-center justify-center p-4 cursor-pointer mt-2">
              <div className="w-32 h-32 p-2 flex flex-col items-center justify-center rounded bg-[#4B5A69] text-white">
                <Upload className="text-[#69b8ca]" />
                <p>Upload</p>
              </div>
              <Input
                type="file"
                accept="application/pdf"
                onChange={handleFile2Change}
                className="hidden"
              />
            </label>

            {preview2 && (
              <div className="mt-4">
                {preview2 === "pdf" ? (
                  <div className="border rounded p-4 flex items-center gap-3">
                    <FileText className="w-12 h-12 text-red-500" />
                    <div>
                      <p className="font-medium">{file2?.name}</p>
                      <p className="text-sm text-gray-500">PDF Document</p>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={preview2}
                    alt="Preview 2"
                    width={400}
                    height={300}
                    className="w-full h-auto object-cover rounded"
                  />
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end">
          <button className="custom-btn w-[49%] px-12 py-2 rounded-md mt-7">
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
}
