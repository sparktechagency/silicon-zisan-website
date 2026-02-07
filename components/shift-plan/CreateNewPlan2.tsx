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
import { useRouter } from "next/navigation";
import CustomTimePicker from "../appointments/CustomTimePicker";
import { toast } from "sonner";
import { myFetch } from "@/utils/myFetch";
import { revalidate } from "@/utils/revalidateTag";

type FormValues = {
  worker: string;
  shift: string;
  taskInput: string;
  tasks: { value: string }[];
  remarks: string;
  startTime: any;
  endTime: any;
};

type Plan = {
  shift: string;
  startTime: string;
  endTime: string;
  days: string[];
  tasks: string[];
  remarks: string;
};

export default function CreateNewPlan2({ employee, editData }: any) {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>([]);

  const {
    control,
    register,
    watch,
    handleSubmit,
    resetField,
    reset,
    formState: {},
  } = useForm<FormValues>({
    defaultValues: {
      worker: editData?.worker?._id || "",
      shift: "",
      taskInput: "",
      tasks: [],
      remarks: "",
      startTime: null, // Changed from "" to null
      endTime: null, // Changed from "" to null
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tasks",
  });

  useEffect(() => {
    if (Array.isArray(editData?.plans)) {
      setPlans(editData.plans);
    }
  }, [editData]);

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
        // shift: editData.plans[0].shift,
        taskInput: editData.taskInput || "",

        // tasks:
        //   Array.isArray(editData.plans[0].tasks) &&
        //   editData.plans[0].tasks.length
        //     ? editData.plans[0].tasks.map((t: string) => ({ value: t }))
        //     : [{ value: "" }],
        // remarks: editData.plans[0].remarks || "",
        // startTime: editData.plans[0].startTime
        //   ? dayjs(editData.plans[0].startTime, "hh:mm A")
        //   : null,
        // endTime: editData.plans[0].endTime
        //   ? dayjs(editData.plans[0].endTime, "hh:mm A")
        //   : null,
      });

      setSelectedDates(
        Array.isArray(editData?.plans[0]?.days)
          ? editData?.plans[0]?.days?.map((d: string) => new Date(d))
          : [],
      );
    }
  }, [editData, reset]);

  // single shift plan hanlder
  const handleAddShiftPlan = (data: FormValues) => {
    if (!data.startTime && !data.endTime) {
      toast.error("Please select time");
      return;
    }

    if (selectedDates.length === 0) {
      toast.error("Please select date");
      return;
    }

    if (!data.shift) {
      toast.error("Please select timeline");
      return;
    }

    if (!data.tasks.length) {
      toast.error("Please add at least one task");
      return;
    }

    const payload = {
      startTime: data.startTime,
      endTime: data.endTime,
      days: selectedDates.map((d) => d.toISOString()),
      tasks: data.tasks.map((t) => t.value),
      remarks: data.remarks,
      shift: data.shift,
    };

    setPlans((prev) => [...prev, payload]);
    setSelectedDates([]);
    reset({
      worker: data.worker,
      shift: "",
      tasks: [],
      taskInput: "",
    });

    toast.success("Shift added");
  };

  const handleRemovePlan = (indexToRemove: number) => {
    setPlans((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const onSubmit = async (data: FormValues) => {
    if (!plans.length) {
      toast.error("Please add at least one shift plan");
      return;
    }

    // const method = editData?._id ? "PATCH" : "POST";
    // const url = editData?._id
    //   ? `/shift-plans/update/${editData._id}` // ✅ Use editData._id, not 'id'
    //   : "/shift-plans/create";

    const payload = {
      worker: data.worker,
      plans,
    };

    try {
      const res = await myFetch("/shift-plans/create", {
        method: "POST",
        body: payload,
      });

      if (res.status === 402) {
        router.push("/subscriptions");
      }

      if (res.success) {
        toast.success(res.message);
        await revalidate("shift-plan");

        router.push("/shift-plan");
      } else {
        toast.error((res as any)?.error[0].message);
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "something went wrong");
    }
  };

  return (
    <Container>
      <div className="flex items-center ml-8 my-8">
        <CustomBackButton />
        <h2 className="text-2xl font-semibold px-5">
          {/* {editData?._id ? "Edit Shift Plan" : "Create Shift Plan"} */}
          Create Shift Plan
        </h2>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 px-4 mb-12">
        {/* Form */}
        <div className="">
          <div className="flex justify-end">
            <AddEmployeeForm
              workerData={editData?.worker}
              trigger={
                <Button className="custom-btn px-5 py-5">
                  {editData?.worker ? "Edit Employee" : "Add Employee"}
                </Button>
              }
            />
          </div>
          {/* form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 mt-10 sm:mt-0"
          >
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
                        <SelectItem
                          className={`${field.value === "cursor-not-allowed"}`}
                          key={item?._id}
                          value={item?._id}
                          disabled={!!field.value}
                        >
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
                // rules={{ required: "Please select an option" }}
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

              {/* {errors.shift && (
                <span className="text-red-400">{errors.shift.message}</span>
              )} */}
            </div>

            {/* Tasks */}
            <div className="space-y-2">
              <Label>Task</Label>

              <div className="grid grid-cols-[80%_20%] gap-2">
                <div className="flex-col">
                  <div className="">
                    <Input
                      {...register("taskInput")}
                      placeholder="Enter task"
                      className=" text-white w-full"
                    />
                  </div>
                  {/* <p>
                    {errors.taskInput && (
                      <span className="text-red-400">
                        {errors.taskInput.message}
                      </span>
                    )}
                  </p> */}
                </div>
                <Button
                  className="custom-btn"
                  type="button"
                  onClick={handleAddTask}
                >
                  Add
                </Button>
              </div>

              <ul className="space-y-1">
                {fields?.map((field, index) => (
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

            <Button
              disabled={plans.length === 0}
              type="submit"
              className="custom-btn w-full text-lg"
            >
              Create Now
            </Button>
          </form>
        </div>

        {/* Date */}
        <div>
          <ShiftPlanDate
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
            onHanldeShift={handleSubmit(handleAddShiftPlan)}
            plans={plans}
            onHandleRemove={handleRemovePlan}
          />

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <Label className="block mb-2">From</Label>
              <CustomTimePicker
                name="startTime"
                control={control}
                // rules={{ required: "Start time is required" }}
              />
            </div>
            <div>
              <Label className="block mb-2">To</Label>
              <CustomTimePicker
                name="endTime"
                control={control}
                // rules={{ required: "End time is required" }}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
