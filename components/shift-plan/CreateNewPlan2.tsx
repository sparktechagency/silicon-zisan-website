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
import dayjs from "dayjs";
import { shiftOptions } from "@/demoData/data";
import { useCookie } from "@/hooks/useCookies";

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
  // remarks: string;
};

// const names = ["Morning", "Evening", "Nigh t"];

export default function CreateNewPlan2({ employee, editData }: any) {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const router = useRouter();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(false);

  const googtrans = useCookie("googtrans");
  // const googtrans = useCookie("googtrans")?.value || "/en/en";
  const currentLang = (googtrans
    .replace(/^\/en\//, "") // remove /en/ at the start
    .replace(/^en\//, "") // remove en/ at the start if no leading slash
    .replace(/\/$/, "") || "en") as keyof (typeof shiftOptions)[0]["label"];

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
    console.log("editData", editData);

    if (editData) {
      reset({
        worker: editData?.worker?._id || "",
        // shift: editData.plans[0].shift,
        taskInput: editData.taskInput || "",
        remarks: editData.plans[0].remarks || "",
        // tasks: editData?.plans[0].tasks.map((t: any) => t) || "",

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

    const convertToLocalISO = (time: string) => {
      const today = dayjs().format("YYYY-MM-DD");
      const [hour, minute] = time.split(":");

      return dayjs(`${today}T${hour}:${minute}:00`).toISOString();
    };

    // const payload = {
    //   startTime: convertToLocalISO(data.startTime),
    //   endTime: convertToLocalISO(data.endTime),
    //   days: selectedDates.map((d) => d.toISOString()),
    //   tasks: data.tasks.map((t) => t.value),
    //   remarks: data.remarks,
    //   shift: data.shift,
    // };

    const updatedPlan = {
      shift: data.shift,
      startTime: convertToLocalISO(data.startTime),
      endTime: convertToLocalISO(data.endTime),
      days: selectedDates.map((d) => d.toISOString()),
      tasks: data.tasks.map((t) => t.value),
      remarks: data.remarks, // ✅ include remarks
    };

    setPlans((prev) => [...prev, updatedPlan]);
    setSelectedDates([]);
    reset({
      worker: data.worker,
      shift: undefined,
      tasks: [],
      taskInput: "",
    });
    // reset();

    toast.success("Shift added");
  };

  const handleRemovePlan = (indexToRemove: number) => {
    setPlans((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const onSubmit = async (data: FormValues) => {
    console.log("data.remarks,", data.remarks);

    if (!plans.length) {
      toast.error("Please add at least one shift plan");
      return;
    }

    setLoading(true);

    const method = editData?._id ? "PATCH" : "POST";
    const url = editData?._id
      ? `/shift-plans/update/${editData._id}` // ✅ Use editData._id, not 'id'
      : "/shift-plans/create";

    // const payload = {
    //   worker: data.worker,
    //   plans,
    // };
    const payload = {
      worker: data.worker,
      plans: plans.map((p) =>
        editData?._id
          ? {
              ...p,
              // tasks: data.tasks.map((t) => t.value),
              remarks: data.remarks, // ✅ merge latest remarks
            }
          : p,
      ),
    };
    try {
      const res = await myFetch(url, {
        method: method,
        body: payload,
      });

      console.log("res", res);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="flex items-center ml-8 my-8">
        <CustomBackButton />
        <h2 className="text-2xl font-semibold px-5">
          {editData?._id ? "Edit Shift Plan" : "Create Shift Plan"}
          {/* Create Shift Plan */}
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
                          <span className="notranslate"> {item?.name}</span>
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
                render={({ field }) => {
                  return (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="button-unactive text-white w-full">
                        <SelectValue>
                          {field.value
                            ? shiftOptions.find(
                                (opt) => opt.value === field.value,
                              )?.label[currentLang]
                            : "Select Timeline"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {shiftOptions?.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label[currentLang]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  );
                }}
              />

              {/* <Controller
                name="shift"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    {" "}
                    <SelectTrigger className="button-unactive text-white w-full">
                      {" "}
                      <SelectValue placeholder="" />{" "}
                    </SelectTrigger>{" "}
                    <SelectContent>
                      {" "}
                      {names.map((name) => (
                        <SelectItem key={name} value={name}>
                          {" "}
                          <span className="">{name}</span>{" "}
                        </SelectItem>
                      ))}{" "}
                    </SelectContent>{" "}
                  </Select>
                )}
              /> */}

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
              disabled={plans.length === 0 || loading}
              type="submit"
              className="custom-btn w-full text-lg"
            >
              {editData?._id ? "Update Now" : "Create Now"}
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
