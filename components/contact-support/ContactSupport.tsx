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

    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
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

      if (res.success) {
        toast.success(res?.message || "Support request submitted successfully");
        reset();
        setFile(null);
        setImagePreview(null);
      } else {
        toast.error(
          (res as any)?.error[0].message || "Failed to submit support request",
        );
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-card border border-gray-50/30 rounded-md p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full ">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            {/* name */}
            <Input
              className="placeholder:text-white text-white"
              placeholder="Enter Your Name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <span className="text-red-400">{errors.name.message}</span>
            )}
          </div>
          <div>
            {/* email */}
            <Input
              className="placeholder:text-white text-white"
              placeholder="Enter Your Email"
              {...register("email", { required: "Email is required" })}
            />

            {errors.email && (
              <span className="text-red-400">{errors.email.message}</span>
            )}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* phone */}
          <div>
            <Input
              className="placeholder:text-white text-white"
              placeholder="Enter Your Phone Number"
              {...register("phone", { required: "Phone is required" })}
            />
            {errors.phone && (
              <p className="text-red-400"> {errors.phone.message}</p>
            )}
          </div>
          {/* address */}
          <Input
            className="placeholder:text-white text-white"
            placeholder="Enter Your Address"
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && (
            <p className="text-red-400"> {errors.address.message}</p>
          )}
        </div>

        {/* textarea */}
        <div>
          <Textarea
            className="placeholder:text-white text-white"
            placeholder="Enter Your Message"
            {...register("message", { required: "Message is required" })}
          />
          {errors.message && (
            <p className="text-red-400"> {errors.message.message}</p>
          )}
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
