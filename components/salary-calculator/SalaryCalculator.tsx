"use client";

import { useForm, Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import YesNoToggle, {
  HeaderYesNoToggle,
  YesNoToggleMaleFemale,
} from "@/share/YesNoToggle";

import CustomSelect from "@/share/CustomSelect";
import { age, child, position } from "@/demoData/data";
import HandleInformationButton from "./HandleInformationButton";

type FormValues = {
  grossSalary: string;
  year: string;
  taxExemption: string;
  state: string;
  taxClass: number;
  churchTax: string;
  healthInsurance: string;
  pensionInsurance: string;
  unemploymentInsurance: string;
  haveChildren: string;
  childTaxExemption: string;
  age: string;
  position: string;
  gender: string;
  monthly: string;
  gross: string;
};

export default function SalaryCalculator() {
  const { control, register, handleSubmit, watch, setValue } =
    useForm<FormValues>({
      defaultValues: {
        grossSalary: "2890.00",
        year: "2025",
        taxExemption: "",
        state: "Berlin",
        taxClass: 1,
        churchTax: "yes",
        healthInsurance: "no",
        pensionInsurance: "no",
        unemploymentInsurance: "yes",
        haveChildren: "no",
        childTaxExemption: "",
        age: "25",
        position: "",
        gender: "Male",
        monthly: "Monthly",
        gross: "Gross",
      },
    });

  const taxClass = watch("taxClass");

  const onSubmit = (data: FormValues) => {};

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-card text-white p-6 rounded-xl max-w-3xl mx-auto space-y-6"
    >
      {/* Header Toggles */}
      <div className="flex justify-between gap-2">
        <Controller
          name="monthly"
          control={control}
          render={({ field }) => (
            <HeaderYesNoToggle
              options={["Monthly", "Yearly"]}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name="gross"
          control={control}
          render={({ field }) => (
            <HeaderYesNoToggle
              options={["Gross", "Net"]}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-2">
        <Label>Gross Salary</Label>
        <Input type="number" {...register("grossSalary")} />
      </div>

      <div className="grid grid-cols-2">
        <Label>Year</Label>
        <Input type="number" {...register("year")} />
      </div>

      <div className="grid grid-cols-2">
        <Label>Tax Exemption</Label>
        <Input type="number" {...register("taxExemption")} />
      </div>

      {/* State */}
      <div className="grid grid-cols-2">
        <Label>Your State</Label>
        <Controller
          name="state"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select your state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Berlin">Berlin</SelectItem>
                <SelectItem value="Hamburg">Hamburg</SelectItem>
                <SelectItem value="Munich">Munich</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      {/* Tax Class */}
      <div className="grid grid-cols-2">
        <Label>Tax Class</Label>
        <div className="flex">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <p
              key={item}
              onClick={() => setValue("taxClass", item)}
              className={`border px-4 py-2 cursor-pointer ${
                taxClass === item ? "custom-btn" : ""
              }`}
            >
              {item}
            </p>
          ))}
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-4">
        <Controller
          name="churchTax"
          control={control}
          render={({ field }) => (
            <YesNoToggle label="Do You Pay Church Tax" {...field} />
          )}
        />

        <Controller
          name="healthInsurance"
          control={control}
          render={({ field }) => (
            <YesNoToggle label="Health Insurance" {...field} />
          )}
        />

        <Controller
          name="pensionInsurance"
          control={control}
          render={({ field }) => (
            <YesNoToggle label="Pension Insurance" {...field} />
          )}
        />

        <Controller
          name="unemploymentInsurance"
          control={control}
          render={({ field }) => (
            <YesNoToggle label="Unemployment Insurance" {...field} />
          )}
        />

        <Controller
          name="haveChildren"
          control={control}
          render={({ field }) => (
            <YesNoToggle label="Do you have children" {...field} />
          )}
        />
      </div>

      {/* Custom Selects */}
      <Controller
        name="childTaxExemption"
        control={control}
        render={({ field }) => (
          <CustomSelect
            label="Child Tax Exemption"
            placeholder="Select Child"
            options={child}
            {...field}
          />
        )}
      />

      <Controller
        name="age"
        control={control}
        render={({ field }) => (
          <CustomSelect
            label="Your Age"
            placeholder="Select Age"
            options={age}
            {...field}
          />
        )}
      />

      <Controller
        name="position"
        control={control}
        render={({ field }) => (
          <CustomSelect
            label="Your Position"
            placeholder="Select position"
            options={position}
            {...field}
          />
        )}
      />

      {/* Gender */}
      <Controller
        name="gender"
        control={control}
        render={({ field }) => (
          <YesNoToggleMaleFemale label="Gender" {...field} />
        )}
      />

      {/* Actions */}
      <div className="grid sm:grid-cols-2 gap-5">
        <button type="submit" className="custom-btn rounded-2xl py-2">
          Calculate
        </button>
        <div className="border py-2 text-center">$25622556 (brutto)</div>
      </div>

      <HandleInformationButton />
    </form>
  );
}
