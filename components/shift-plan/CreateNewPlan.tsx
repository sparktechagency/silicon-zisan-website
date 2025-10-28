"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { X } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import AddEmployeeForm from "./AddEmployeeModal";

export default function CreateNewPlan({ title }: { title?: string }) {
  const [employee, setEmployee] = useState("Kamran");
  const [timeline, setTimeline] = useState("Morning");
  const [fromTime, setFromTime] = useState("09:10");
  const [toTime, setToTime] = useState("23:00");
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([
    "Holiday Weekend",
    "Holiday Weekend",
    "Holiday Weekend",
  ]);
  const [remarks, setRemarks] = useState(
    "Take Time Off This Holiday Weekend To Rest, Travel, And Spend Moments With Family."
  );

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
    <div className=" text-white p-6 rounded-xl max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">
          {title ? "Edit Plan" : "Add Plan"}
        </h1>
        <AddEmployeeForm
          trigger={
            <div className="flex justify-end">
              <Button className="custom-btn text-md px-5 py-5">
                Add Employee
              </Button>
            </div>
          }
        />
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

      {/* Shift Time */}

      <div className="space-y-2">
        <Label className="block font-semibold">Shift Time</Label>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Label className="block mb-2">From</Label>
            <Input
              type="time"
              value={fromTime}
              onChange={(e) => setFromTime(e.target.value)}
              className="button-unactive text-white p-2 rounded-lg w-full border-none [&::-webkit-calendar-picker-indicator]:invert"
            />
          </div>

          <div className="flex-1">
            <Label className="block mb-2">To</Label>
            <Input
              type="time"
              value={toTime}
              onChange={(e) => setToTime(e.target.value)}
              className="button-unactive text-white p-2 rounded-lg w-full border-none [&::-webkit-calendar-picker-indicator]:invert"
            />
          </div>
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
        <Button className="custom-btn w-full text-lg">Create Now</Button>
      </div>
    </div>
  );
}
