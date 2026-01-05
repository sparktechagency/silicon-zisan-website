"use client";

import { Input } from "../ui/input";
import { Eye, Pencil, Search, Trash2 } from "lucide-react";
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

const tableData = [
  {
    name: "Kamran",
    date: "20.25.2025",
    time: "Morning",
  },
  {
    name: "Kamran",
    date: "20.25.2025",
    time: "Morning",
  },
  {
    name: "Kamran",
    date: "20.25.2025",
    time: "Morning",
  },
  {
    name: "Kamran",
    date: "20.25.2025",
    time: "Morning",
  },
];

export default function ShiftPlan() {
  const router = useRouter();

  return (
    <div>
      {/* header status */}
      <ShiftPlanStatus />

      {/* search bar */}
      <div className="relative w-full">
        <Input
          className="border border-gray-400/70 rounded-full pl-9 pr-4 py-2 w-full"
          placeholder="Search here"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2">
          <Search size={20} />
        </span>
      </div>

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
            {tableData?.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell>
                  <div className="flex space-x-3">
                    <button
                      className="custom-btn rounded p-1.5"
                      onClick={() => router.push("/create-new-plan?name=edit")}
                    >
                      <Pencil />
                    </button>

                    <button
                      className="custom-btn rounded p-1.5 flex items-center justify-center"
                      onClick={() => router.push("/shift-plan-view-details")}
                    >
                      <Eye />
                    </button>

                    <DeleteModal
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
