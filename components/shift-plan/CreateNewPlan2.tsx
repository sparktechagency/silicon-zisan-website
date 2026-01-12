"use client";

import { useEffect, useState } from "react";
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
import CustomTimePicker from "../appointments/CustomTimePicker";
import { toast } from "sonner";
import { myFetch } from "@/utils/myFetch";
import dayjs from "dayjs";

type FormValues = {
  worker: string;
  shift: string;
  taskInput: string;
  tasks: { value: string }[];
  remarks: string;
  startTime: any;
  endTime: any;
};

export default function CreateNewPlan2({ employee, editData }: any) {
  console.log("edit", editData?.worker?._id);

  // date
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const searchParams = useSearchParams();
  const findName = searchParams.get("name");

  console.log("edit data", editData);

  const { control, register, watch, handleSubmit, resetField, reset } =
    useForm<FormValues>({
      defaultValues: {
        worker: "",
        shift: "",
        taskInput: "",
        tasks: [{ value: "" }],
        remarks: "",
        startTime: null, // Changed from "" to null
        endTime: null, // Changed from "" to null
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

  useEffect(() => {
    if (editData) {
      reset({
        worker: editData?.worker?._id || "",
        shift: editData.shift || "",
        taskInput: editData.taskInput || "",
        tasks:
          Array.isArray(editData.tasks) && editData.tasks.length
            ? editData.tasks.map((t: string) => ({ value: t }))
            : [{ value: "" }],
        remarks: editData.remarks || "",
        startTime: editData.startTime
          ? dayjs(editData.startTime, "hh:mm A")
          : null, // Remove .format() here - keep as dayjs object
        endTime: editData.endTime ? dayjs(editData.endTime, "hh:mm A") : null,
      });

      setSelectedDates(
        Array.isArray(editData.days)
          ? editData.days.map((d: string) => new Date(d))
          : []
      );
    }
  }, [editData, reset]);

  const onSubmit = async (data: FormValues) => {
    const payload = {
      startTime: data.startTime?.format("hh:mm A"),
      endTime: data.endTime?.format("hh:mm A"),
      days: selectedDates.map((d) => d.toISOString()),
      tasks: data.tasks.map((t) => t.value),
      remarks: data.remarks,
      worker: data?.worker,
      shift: data?.shift,
    };

    const method = editData?._id ? "PATCH" : "POST";
    const url = editData?._id
      ? `/shift-plans/update/${editData._id}` // ✅ Use editData._id, not 'id'
      : "/shift-plans/create";

    try {
      const res = await myFetch(url, {
        method: method,
        body: payload,
      });

      console.log("res", res);

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error((res as any)?.error[0].message);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "something went wrong");
    }

    console.log("Backend payload:", payload);
    // history.back();
  };

  return (
    <Container>
      <div className="flex items-center ml-8 my-8">
        <CustomBackButton />
        <h2 className="text-2xl font-semibold px-5">Create Shift Plan</h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 px-4 mb-12">
        {/* Date */}
        <div>
          <ShiftPlanDate
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
          />

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <Label className="block mb-2">From</Label>
              <CustomTimePicker
                name="startTime"
                control={control}
                rules={{ required: "Start time is required" }}
              />
            </div>
            <div>
              <Label className="block mb-2">To</Label>
              <CustomTimePicker
                name="endTime"
                control={control}
                rules={{ required: "End time is required" }}
              />
            </div>
          </div>
        </div>

        {/* Form */}
        <div>
          <AddEmployeeForm
            trigger={
              <Button className="custom-btn px-5 py-5">Add Employee</Button>
            }
          />

          {/* form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 mt-10 sm:mt-0"
          >
            <div className="flex items-center justify-end">
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
                name="worker"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="button-unactive text-white w-full">
                      <SelectValue placeholder="Select Employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {employee?.map((item: any) => (
                        <SelectItem key={item?._id} value={item?._id}>
                          {item?.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* Timeline */}
            <div className="space-y-2">
              <Label>Timeline</Label>
              <Controller
                name="shift"
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

                    <X
                      className="cursor-pointer"
                      onClick={() => remove(index)}
                    />
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
      </div>
    </Container>
  );
}
