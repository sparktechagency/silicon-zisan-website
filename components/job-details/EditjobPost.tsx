/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Textarea } from "@/components/ui/textarea";
import Container from "@/share/Container";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import PackeageType from "./PackeageType";
import { Minus, Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import CustomBackButton from "@/share/CustomBackButton";

export const jobRoles = [
  "Senior Business Analytics",
  "It & Development",
  "Photo Editing",
  "Cleaning",
  "Plumber",
  "Electrician",
  "Driver",
];

export const jobTypes = [
  "Full Time",
  "Part Time",
  "Mini Job",
  "Ausbildung",
  "Temporary Work",
  "Career Changer",
];

const EditJobPost = ({ title }: { title?: string }) => {
  const searchParams = useSearchParams();
  const [type, setType] = useState("day");
  const [addInput, setAddInput] = useState([{ id: 1, value: "" }]);
  const [addInput2, setAddInput2] = useState([{ id: 1, value: "" }]);
  const params = new URLSearchParams(searchParams.toString());
  const router = useRouter();

  const handleAddInput = () => {
    const newId = addInput.length + 1;
    setAddInput((prev) => [...prev, { id: newId, value: "" }]);
  };

  const handleRemoveInput = () => {
    setAddInput((prev) => prev.slice(0, -1));
  };

  // input add two
  const handleAddInput2 = () => {
    const newId = addInput2.length + 1;
    setAddInput2((prev) => [...prev, { id: newId, value: "" }]);
  };

  const handleRemoveInput2 = () => {
    setAddInput2((prev) => prev.slice(0, -1));
  };

  const urlName = new URLSearchParams(searchParams.toString());
  const name = urlName.get("name");
  const hire = urlName.get("type");
  console.log(hire);

  const handleParamsSet = (name: string) => {
    params.set("name", name);
    router.push(`?${params.toString()}`);
  };

  return (
    <Container
      className={`bg-card ${
        name === "Post Job" ? "w-full" : "w-[50%] mx-auto"
      } p-5 border rounded-md`}
    >
      <div className=" text-gray-100 w-full  rounded-xl">
        <div className="text-xl font-semibold mb-4 flex items-center gap-2">
          <CustomBackButton />
          {hire ? hire : title}
          {/* Hire Employee */}
        </div>

        {/* Category & Subcategory */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <Label className="block text-sm mb-1">Category</Label>
            <Select>
              <SelectTrigger className="w-full border">
                <SelectValue placeholder="Select Item" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {jobRoles.map((item, index) => (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <div>
              <Label className="block text-sm mb-1">Sub Category</Label>
              <Select>
                <SelectTrigger className="w-full border">
                  <SelectValue placeholder="Select Item" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="apple">
                      senior business analytics
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Job Type & Deadline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm mb-1">Job Type</label>
            <Select>
              <SelectTrigger className="w-full border">
                <SelectValue placeholder="Select Item" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {jobTypes.map((item, index) => (
                    <SelectItem key={index} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm mb-1">Deadline</label>
            <Input
              type="text"
              placeholder="Type Here"
              className="w-full px-3 py-2 text-gray-200"
            />
          </div>
        </div>

        {/* Salary */}
        <div className="mb-4">
          <div className="flex items-center space-x-5 my-5">
            <Label className="block text-sm mb-1">Salary</Label>
            <PackeageType type={type} setType={setType} />
          </div>
          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Type here"
              className="  px-3 py-2 text-gray-200 placeholder:text-white"
            />
          </div>
        </div>

        {/* Job Description */}
        <div className="mb-4">
          <label className="block text-sm mb-1">Job Description</label>
          <Textarea
            rows={3}
            placeholder="Type here"
            className="w-full h-32  px-3 py-2 text-gray-200"
          />
        </div>

        {/* Key Responsibilities */}
        <div className="mb-4">
          <div className="flex justify-between mb-3">
            <Label className="block text-sm mb-1">Key Responsibilities</Label>
            <div className="text-white" onClick={handleAddInput}>
              <Plus className="border p-1 rounded-full cursor-pointer" />
            </div>
          </div>
          {addInput?.map((item: any, index: number) => (
            <div className="flex items-center gap-3" key={index}>
              <Textarea
                key={index}
                rows={3}
                placeholder="Type here"
                className="w-full px-3 py-3 text-gray-200 my-2 min-h-10"
              />
              <Minus
                className="text-red-500 cursor-pointer"
                onClick={handleRemoveInput}
              />
            </div>
          ))}
        </div>

        {/* Required Qualification */}

        <div className="mb-4">
          <div className="flex justify-between mb-3">
            <Label className="block text-sm mb-1">Required Qualification</Label>
            <div className="text-white" onClick={handleAddInput2}>
              <Plus className="border p-1 rounded-full cursor-pointer" />
            </div>
          </div>
          {addInput2?.map((item: any, index: number) => (
            <div className="flex items-center gap-3" key={index}>
              <Textarea
                key={index}
                rows={3}
                placeholder="Type here"
                className="w-full px-3 py-3 text-gray-200 my-2 min-h-10"
              />
              <Minus
                className="text-red-500 cursor-pointer"
                onClick={handleRemoveInput2}
              />
            </div>
          ))}
        </div>

        {/* About Yourself */}
        <div className="mb-6">
          <label className="block text-sm mb-1">About Yourself</label>
          <Textarea
            placeholder="Type here"
            className="h-32 px-3 py-2 text-gray-200"
          ></Textarea>
        </div>

        {/* privacy and policy */}
        {hire === "hire" && (
          <div className=" space-y-4">
            {/* Privacy Policy & Terms */}
            <label className="flex items-start space-x-2">
              <Input type="checkbox" className="mt-1 h-5 w-5 accent-card" />
              <span className="text-sm leading-6">
                By continuing, you accept the{" "}
                <a href="#" className=" font-semibold underline">
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a href="#" className=" font-semibold underline">
                  Terms & Conditions
                </a>{" "}
                of JobsinApp.
              </span>
            </label>

            {/* Contract Consent */}
            <label className="flex items-start space-x-2">
              <Input type="checkbox" className="mt-1 h-5 w-5 accent-card" />
              <span className="text-sm leading-6">
                By ticking the checkbox, the client declares their consent; the
                contract thereby comes into effect.
              </span>
            </label>
          </div>
        )}

        {/* Confirm Button */}
        <div className="flex justify-end mt-6">
          <button
            className="custom-btn text-white font-medium px-6 py-2 rounded-md hover:opacity-90 transition w-[30%]"
            // onClick={(e) => handleParamsSet("hire-employee-details")}
            onClick={(e) => {
              e.preventDefault();
              if (title === "Hire Employee") {
                handleParamsSet("hire-employee-details");
              }
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </Container>
  );
};

export default EditJobPost;
