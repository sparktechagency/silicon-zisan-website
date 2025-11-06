"use client";

import { use, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Trash, Trash2, X } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import AddEmployeeForm from "./AddEmployeeModal";
import CustomDatePicker from "../appointments/CustomDatePicker";
import ShiftPlanDate from "./ShiftPlanDate";
import Container from "@/share/Container";
import CustomBackButton from "@/share/CustomBackButton";
import { useSearchParams } from "next/navigation";
import DeleteModal from "./DeleteModal";
import DeleteModalUsers from "./DeleteModalUsers";

export default function CreateNewPlan({ title }: { title?: string }) {
  console.log(title);
  const [employee, setEmployee] = useState("Kamran");
  const [timeline, setTimeline] = useState("Morning");
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([
    "Holiday Weekend",
    "Holiday Weekend",
    "Holiday Weekend",
  ]);
  const [remarks, setRemarks] = useState(
    "Take Time Off This Holiday Weekend To Rest, Travel, And Spend Moments With Family."
  );

  // date
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const searchParams = useSearchParams();
  const findName = searchParams.get("name");

  const handleAddTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, taskInput.trim()]);
      setTaskInput("");
    }
  };

  const handleDeleteTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <Container>
      <div className="flex items-center ml-8 my-8">
        <CustomBackButton />
        <h2 className="text-2xl font-semibold px-5">Create Shift Plan</h2>
      </div>
      <div className="grid lg:grid-cols-2 gap-6 px-4 mb-12 ">
        {/* date */}
        <div className="">
          <ShiftPlanDate
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
          />
        </div>

        {/* form details */}
        <div className=" text-white rounded-xl  space-y-6 mt-10 sm:mt-0">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">
              {title ? "Edit Plan" : ""}
            </h1>
            <AddEmployeeForm
              trigger={
                <div className="flex justify-end">
                  <Button className="custom-btn text-md px-5 py-5">
                    {findName ? "Edit Employee" : "Add Employee"}
                  </Button>
                </div>
              }
            />

            {findName && (
              <div>
                <DeleteModalUsers
                  trigger={
                    <Button className="bg-red-600">Delete Employee</Button>
                  }
                />
              </div>
            )}
          </div>

          {/* Employee Selection */}
          <div className="space-y-4">
            {/* Employee Selection */}
            <div className="space-y-2">
              <label className="block font-semibold">Select Employee</label>
              <Select
                value={employee}
                onValueChange={(value) => setEmployee(value)}
              >
                <SelectTrigger className="w-full button-unactive text-white">
                  <SelectValue placeholder="Select Employee" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Kamran">Kamran</SelectItem>
                  <SelectItem value="Ayesha">Ayesha</SelectItem>
                  <SelectItem value="Juyel">Juyel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Timeline Selection */}
            <div className="space-y-2">
              <label className="block font-semibold">Timeline</label>
              <Select
                value={timeline}
                onValueChange={(value) => setTimeline(value)}
              >
                <SelectTrigger className="w-full button-unactive text-white">
                  <SelectValue placeholder="Select Timeline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Morning">Morning</SelectItem>
                  <SelectItem value="Evening">Evening</SelectItem>
                  <SelectItem value="Night">Night</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Task Section */}
          <div className="space-y-2">
            <label className="block font-semibold">Task</label>
            <div className="flex gap-2">
              <Input
                type="text"
                value={taskInput}
                onChange={(e) => setTaskInput(e.target.value)}
                placeholder="Enter task"
                className="button-unactive text-white p-2  w-full border-none rounded-lg"
              />
              <button
                onClick={handleAddTask}
                className="button-active text-white px-4 rounded"
              >
                Add
              </button>
            </div>
            <ul className="space-y-1">
              {tasks.map((task, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-[#2c3e50] p-2 rounded"
                >
                  <div className="flex items-center justify-center gap-3">
                    <span className="inline-block w-2 h-2 rounded-full bg-white"></span>

                    <span>{task}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteTask(index)}
                    className="cursor-pointer font-bold"
                  >
                    <X />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Remarks */}
          <div className="space-y-2">
            <Label className="block font-semibold">Remarks</Label>
            <Textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={3}
              className="button-unactive text-white p-2  w-full border-none"
            />
          </div>

          <div>
            <Button
              className="custom-btn w-full text-lg"
              onClick={() => history.back()}
            >
              {findName ? "Update Plan" : "Create Now"}
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
}
