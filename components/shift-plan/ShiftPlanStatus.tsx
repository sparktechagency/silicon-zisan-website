import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { StartDateModal } from "./StartDateModal";
import { EndDateModal } from "./EndDateModal";
import { Button } from "../ui/button";

export default function ShiftPlanStatus() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleParams = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="mb-7">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div>
          <Select onValueChange={(value) => handleParams("shift", value)}>
            <SelectTrigger className="!w-full lg:w-[180px] button-unactive rounded-3xl px-7">
              <SelectValue placeholder="Select Plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Morning">Morning</SelectItem>
                <SelectItem value="Evening">Evening</SelectItem>
                <SelectItem value="Night">Night</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          {/* <Select onValueChange={(value) => handleParams("endDate", value)}>
            <SelectTrigger className="w-[180px] button-unactive rounded-3xl px-7">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="2026-01-01">January</SelectItem>
                <SelectItem value="2027-04-01">February</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select> */}
          <StartDateModal />
        </div>
        <div>
          {/* <Select onValueChange={(value) => handleParams("startDate", value)}>
            <SelectTrigger className="w-[180px] button-unactive rounded-3xl px-7">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="my-2">
                <SelectItem value="2026-01-01">2026</SelectItem>
                <SelectItem value="2026-04-01">2026</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select> */}
          <EndDateModal />
        </div>
        <div className="">
          <Link href="/create-new-plan">
            <Button className="button-active !w-full lg:w-44 py-3 rounded-3xl">
              Create New Plan
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
