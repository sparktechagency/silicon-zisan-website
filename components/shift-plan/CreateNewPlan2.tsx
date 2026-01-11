"use client";

import { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
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
import ShiftPlanDate from "./ShiftPlanDate";
import Container from "@/share/Container";
import CustomBackButton from "@/share/CustomBackButton";
import { useSearchParams } from "next/navigation";
import DeleteUsersModalOpen from "./DeleteUsersModalOpen";
import DeleteModalUsers from "./DeleteModalUsers";

type FormValues = {
  employee: string;
  timeline: string;
  taskInput: string;
  tasks: { value: string }[];
  remarks: string;
};

export default function CreateNewPlan2() {
  // modal state
  const [isModalOneOpen, setIsModalOneOpen] = useState(false);
  const [isModalTwoOpen, setIsModalTwoOpen] = useState(false);

  // date
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);

  const searchParams = useSearchParams();
  const findName = searchParams.get("name");

  const { control, register, watch, handleSubmit, resetField } =
    useForm<FormValues>({
      defaultValues: {
        employee: "Kamran",
        timeline: "Morning",
        taskInput: "",
        tasks: [
          { value: "Holiday Weekend" },
          { value: "Holiday Weekend" },
          { value: "Holiday Weekend" },
        ],
        remarks:
          "Take Time Off This Holiday Weekend To Rest, Travel, And Spend Moments With Family.",
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks",
  });

  const taskInput = watch("taskInput");

  const handleAddTask = () => {
    if (!taskInput.trim()) return;
    append({ value: taskInput.trim() });
    resetField("taskInput");
  };

  const onSubmit = (data: FormValues) => {
    const payload = {
      employee: data.employee,
      timeline: data.timeline,
      remarks: data.remarks,
      tasks: data.tasks.map((t) => t.value),
      selectedDates,
    };

    console.log("Submit payload:", payload);
    history.back();
  };

  return (
    <Container>
      <div className="flex items-center ml-8 my-8">
        <CustomBackButton />
        <h2 className="text-2xl font-semibold px-5">Create Shift Plan</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 px-4 mb-12">
        {/* Date */}
        <ShiftPlanDate
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
        />

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6 mt-10 sm:mt-0"
        >
          <div className="flex items-center justify-end">
            <AddEmployeeForm
              title={findName || ""}
              trigger={
                <Button className="custom-btn px-5 py-5">
                  {findName ? "Edit Employee" : "Add Employee"}
                </Button>
              }
            />
            {/* 
            {findName && (
              <>
                <DeleteUsersModalOpen
                  isModalOneOpen={isModalOneOpen}
                  setIsModalOneOpen={setIsModalOneOpen}
                  onOpenSecondModal={() => setIsModalTwoOpen(true)}
                  trigger={
                    <Button className="bg-red-600">Delete Employee</Button>
                  }
                />

                <DeleteModalUsers
                  isModalTwoOpen={isModalTwoOpen}
                  setIsModalTwoOpen={setIsModalTwoOpen}
                />
              </>
            )} */}
          </div>

          {/* Employee */}
          <div className="space-y-2">
            <Label>Select Employee</Label>
            <Controller
              name="employee"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="button-unactive text-white w-full">
                    <SelectValue placeholder="Select Employee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Kamran">Kamran</SelectItem>
                    <SelectItem value="Ayesha">Ayesha</SelectItem>
                    <SelectItem value="Juyel">Juyel</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Timeline */}
          <div className="space-y-2">
            <Label>Timeline</Label>
            <Controller
              name="timeline"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="button-unactive text-white w-full">
                    <SelectValue placeholder="Select Timeline" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Morning">Morning</SelectItem>
                    <SelectItem value="Evening">Evening</SelectItem>
                    <SelectItem value="Night">Night</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          {/* Tasks */}
          <div className="space-y-2">
            <Label>Task</Label>

            <div className="flex gap-2">
              <Input
                {...register("taskInput")}
                placeholder="Enter task"
                className=" text-white"
              />
              <Button
                className="custom-btn"
                type="button"
                onClick={handleAddTask}
              >
                Add
              </Button>
            </div>

            <ul className="space-y-1">
              {fields.map((field, index) => (
                <li
                  key={field.id}
                  className="flex justify-between items-center bg-[#2c3e50] p-2 rounded"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-white" />
                    <span>{field.value}</span>
                  </div>

                  <X className="cursor-pointer" onClick={() => remove(index)} />
                </li>
              ))}
            </ul>
          </div>

          {/* Remarks */}
          <div className="space-y-2">
            <Label>Remarks</Label>
            <Controller
              name="remarks"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  rows={3}
                  className="button-unactive text-white"
                />
              )}
            />
          </div>

          <Button type="submit" className="custom-btn w-full text-lg">
            {findName ? "Update Plan" : "Create Now"}
          </Button>
        </form>
      </div>
    </Container>
  );
}
