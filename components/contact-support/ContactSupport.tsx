"use client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { useRef, useState } from "react";
import Image from "next/image";
import { FileImage } from "lucide-react";
import { toast } from "sonner";
import { myFetch } from "@/utils/myFetch";

type Inputs = {
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
};

export default function ContactSupport() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      alert("Only image files allowed");
      return;
    }

    if (selectedFile.size > 2 * 1024 * 1024) {
      alert("Image must be under 2MB");
      return;
    }

    setFile(selectedFile);
    setImagePreview(URL.createObjectURL(selectedFile));
    e.target.value = ""; // reset input
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("data", data);
    console.log("file", file);

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (file) {
      formData.append("image", file);
    }

    try {
      const res = await myFetch("/supports/create", {
        method: "POST",
        body: formData,
      });
      if (!res.success && Array.isArray(res.error) && res.error?.length) {
        res.error.forEach((err: { path: keyof Inputs; message: string }) => {
          setError(err.path, {
            type: "server",
            message: err.message,
          });
        });
      }

      if (res.success) {
        toast.success(res?.message || "Support request submitted successfully");
        reset();
        setFile(null);
        setImagePreview(null);
      } else {
        toast.error(res?.message || "Failed to submit support request");
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div className="bg-card border border-gray-50/30 rounded-md p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full ">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* name */}
          <Input
            className="placeholder:text-white text-white"
            placeholder="Enter Your Name"
            {...register("name")}
          />
          {/* email */}
          <Input
            className="placeholder:text-white text-white"
            placeholder="Enter Your Name"
            {...register("email")}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* phone */}
          <div>
            <Input
              className="placeholder:text-white text-white"
              placeholder="Enter Your Phone Number"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-red-400"> {errors.phone.message}</p>
            )}
          </div>
          {/* address */}
          <Input
            className="placeholder:text-white text-white"
            placeholder="Enter Your Address"
            {...register("address")}
          />
        </div>

        {/* textarea */}
        <div>
          <Textarea
            className="placeholder:text-white text-white"
            placeholder="Enter Your Message"
            {...register("message")}
          />
        </div>

        {/* upload image */}
        <div>
          {/* <FormLabel className="mb-2">Upload Image</FormLabel> */}
          <div
            className="border flex items-center justify-center p-4"
            onClick={handleClick}
          >
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Preview"
                width={20}
                height={20}
                className="w-32 h-32 object-cover rounded"
              />
            ) : (
              <div className="w-auto h-32 p-2 flex flex-col items-center justify-center border border-gray-300 rounded bg-[#4B5A69]">
                <p>
                  <FileImage className="text-[#69b8ca]" />
                </p>
                <p> Upload Attachment</p>
              </div>
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              ref={inputRef}
            />
          </div>
        </div>

        {/* submit */}
        <div className="flex justify-end">
          <Button className="custom-btn sm:w-[20%]" type="submit">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
