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
    <div className="mb-7">
      <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4">
        <div>
          <Select>
            <SelectTrigger className="w-[180px] button-unactive rounded-3xl px-7">
              <SelectValue placeholder="Select Plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem className="pl-14" value="Evenning">
                  Evenning
                </SelectItem>
                <SelectItem className="pl-14" value="Morning">
                  Morning
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select>
            <SelectTrigger className="w-[180px] button-unactive rounded-3xl px-7">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem className="pl-14" value="january">
                  January
                </SelectItem>
                <SelectItem className="pl-14" value="february">
                  February
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Select>
            <SelectTrigger className="w-[180px] button-unactive rounded-3xl px-7">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className=" my-2">
                <SelectItem className="pl-14" value="2025">
                  2025
                </SelectItem>
                <SelectItem className="pl-14" value="2026">
                  2026
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <button
            className="button-active w-44 py-3 rounded-3xl"
            onClick={(e) => handleChangeName(e, "Create New Plan")}
          >
            Create New Plan
          </button>
        </div>
      </div>
    </div>
  );
}
