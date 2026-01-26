"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteModal from "./DeleteModal";
import ShiftPlanStatus from "./ShiftPlanStatus";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import Link from "next/link";

export default function ShiftPlan({ data }: any) {
  const router = useRouter();

  return (
    <div>
      {/* header status */}
      <ShiftPlanStatus />

      {/* search bar */}
      {/* <div className="relative w-full">
        <Input
          className="border border-gray-400/70 rounded-full pl-9 pr-4 py-2 w-full"
          placeholder="Search here"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2">
          <Search size={20} />
        </span>
      </div> */}

      {/* header div */}
      <div className="mt-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="capitalize rounded">
                employee name
              </TableHead>
              <TableHead className="capitalize rounded">Date Range</TableHead>
              <TableHead className="capitalize rounded">Timeline</TableHead>
              <TableHead className="capitalize rounded pl-20">Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.map((item: any, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {item?.worker?.name}
                </TableCell>
                <TableCell>
                  {dayjs(item?.plans[0]?.days[0]).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell>{item?.plans[0]?.shift}</TableCell>
                <TableCell>
                  <div className="flex space-x-3">
                    <Link href={`/create-new-plan?id=${item?._id}`}>
                      <button className="custom-btn rounded p-1.5">
                        <Pencil />
                      </button>
                    </Link>

                    <button
                      className="custom-btn rounded p-1.5 flex items-center justify-center"
                      onClick={() =>
                        router.push(
                          `/shift-plan-view-details?details=${item?._id}`,
                        )
                      }
                    >
                      <Eye />
                    </button>

                    <DeleteModal
                      id={item?._id}
                      trigger={
                        <div className="custom-btn rounded p-1.5">
                          <Trash2 />
                        </div>
                      }
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
