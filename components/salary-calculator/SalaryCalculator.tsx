import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import YesNoToggle, { HeaderYesNoToggle } from "@/share/YesNoToggle";
import CustomSelect from "@/share/CustomSelect";
import { age, child, position } from "@/demoData/data";
import HandleInformationButton from "./HandleInformationButton";

export default function SalaryCalculator() {
  const [form, setForm] = useState({
    grossSalary: "2890.00",
    year: "2025",
    taxExemption: "",
    state: "Berlin",
    taxClass: "1",
    churchTax: "No",
    healthInsurance: "Yes",
    pensionInsurance: "Yes",
    unemploymentInsurance: "Yes",
    children: "No",
    childTaxExemption: "",
    age: "25",
    position: "",
    gender: "Male",
  });

  const [formStatus, setFormStatus] = useState({
    churchTax: "yes",
    healthInsurance: "no",
    pensionInsurance: "no",
    unemploymentInsurance: "yes",
    accidentInsurance: "no",
    gender: "no",
    gross: "yes",
    monthly: "no",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCalculate = () => {
    console.log("Calculating salary with:", form);
    // Add your calculation logic here
  };

  //   handle toogle change
  const handleToggleChange = (name: string, value: string) => {
    setFormStatus((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-card text-white p-6 rounded-xl max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between ">
        <HeaderYesNoToggle
          options={["Monthly", "Yearly"]}
          name="monthly"
          value={formStatus.monthly}
          onChange={handleToggleChange}
        />
        {/* Gender toggle */}
        <HeaderYesNoToggle
          options={["Gross", "Net"]}
          name="gross"
          value={formStatus.gross}
          onChange={handleToggleChange}
        />
      </div>

      <div className="grid grid-cols-2">
        <Label>Gross Salary </Label>
        <div>
          <Input
            type="number"
            name="grossSalary"
            value={form.grossSalary}
            onChange={handleChange}
            className="w-full p-2 rounded  text-white"
          />
        </div>
      </div>
      <div className="grid grid-cols-2">
        <Label>Year</Label>
        <div>
          <Input
            type="number"
            name="year"
            value={form.year}
            onChange={handleChange}
            className="w-full p-2 rounded  text-white"
          />
        </div>
      </div>

      {/* Tax Exemption & State */}

      <div className="grid grid-cols-2">
        <Label>Tax Exemption</Label>
        <div>
          <Input
            type="number"
            name="taxExemption"
            placeholder="Type Here"
            value={form.taxExemption}
            onChange={handleChange}
            className="w-full p-2 rounded  text-white"
          />
        </div>
      </div>
      {/* state */}
      <div className="grid grid-cols-2">
        <Label className="font-semibold">Your State</Label>
        <div>
          <Select>
            <SelectTrigger className="w-full text-white border !h-10">
              <SelectValue placeholder="Select your state" />
            </SelectTrigger>
            <SelectContent className=" text-white">
              <SelectItem value="Berlin">Berlin</SelectItem>
              <SelectItem value="Hamburg">Hamburg</SelectItem>
              <SelectItem value="Munich">Munich</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* all toggle statuw */}
      <div className="space-y-4 ">
        <YesNoToggle
          label="Do You Pay Church Tax"
          name="churchTax"
          value={formStatus.churchTax}
          onChange={handleToggleChange}
        />
        <YesNoToggle
          label="Health Insurance"
          name="healthInsurance"
          value={formStatus.healthInsurance}
          onChange={handleToggleChange}
        />
        <YesNoToggle
          label="Pension Insurance"
          name="pensionInsurance"
          value={formStatus.pensionInsurance}
          onChange={handleToggleChange}
        />
        <YesNoToggle
          label="Unemployment Insurance"
          name="unemploymentInsurance"
          value={formStatus.unemploymentInsurance}
          onChange={handleToggleChange}
        />
        <YesNoToggle
          label="Accident Insurance"
          name="accidentInsurance"
          value={formStatus.accidentInsurance}
          onChange={handleToggleChange}
        />
      </div>

      {/*Select Child*/}
      <div>
        <CustomSelect
          label="Child Tax Exemption"
          placeholder="Select Child"
          options={child}
        />
      </div>
      {/*Your age*/}
      <div>
        <CustomSelect label="Your Age" placeholder="Select Age" options={age} />
      </div>

      {/*Your position*/}
      <div>
        <CustomSelect
          label="Your Position"
          placeholder="Select Position"
          options={position}
        />
      </div>

      {/* Gender toggle */}
      <YesNoToggle
        label="Gender"
        name="gender"
        value={formStatus.gender}
        onChange={handleToggleChange}
      />

      <div className="grid grid-cols-2 gap-5">
        <div className="custom-btn rounded-2xl py-2">Calculate</div>
        <div className="border py-2 text-center">$25622556 (brutto)</div>
      </div>

      <HandleInformationButton />
    </div>
  );
}
