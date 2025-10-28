"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

export default function ShiftPlanStatus() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams.toString());

  const handleChangeName = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    name: string
  ) => {
    e.preventDefault();

    params.set("name", name);
    router.push(`?${params.toString()}`);
  };
  return (
    <div className="flex justify-between mb-7">
      <div className="grid grid-cols-3 gap-4">
        <Select>
          <SelectTrigger className="w-[180px] button-unactive rounded-3xl">
            <SelectValue placeholder="Select Plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Evenning">Evenning</SelectItem>
              <SelectItem value="Morning">Morning</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px] button-unactive rounded-3xl">
            <SelectValue placeholder="Select Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="january">January</SelectItem>
              <SelectItem value="february">February</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px] button-unactive rounded-3xl ">
            <SelectValue placeholder="Select Plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <button
          className="button-active w-40 py-2 rounded-3xl"
          onClick={(e) => handleChangeName(e, "Create New Plan")}
        >
          Create New Plan
        </button>
      </div>
    </div>
  );
}
