"use client";

import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import HourMinutePicker from "./CustomTimePicker";
import { DatePicker } from "@/share/DatePicker";
import dayjs from "dayjs";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";

type FormValues = {
  appointment: dayjs.Dayjs | null;
  option: "call" | "address";
  meetingAddress: string;
  message: string;
};

export function CreateForm({ res }: any) {
  const { register, handleSubmit, control } = useForm<FormValues>({
    defaultValues: {
      appointment: dayjs(),
      option: "call",
      meetingAddress: "",
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    const payload = {
      receiver: res?.job?.author?._id,
      job: res?.job?._id,
      scheduledAt: data.appointment?.toISOString() ?? null,
      address: res?.user?.address,
      message: data?.message,
    };

    try {
      const res = await myFetch("/appointments/create", {
        method: "POST",
        body: payload,
      });

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error((res as any)?.error[0].message);
      }
    } catch (err) {
      toast.error(err instanceof Error ? res?.message : "something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[#334455] text-white rounded-md space-y-6 border border-gray-300/30 p-5 mt-5"
    >
      <h1 className="text-white text-lg">Confirm Appointment</h1>

      <div className="grid grid-cols-2 gap-4">
        <Controller
          name="appointment"
          control={control}
          render={({ field }) => (
            <>
              <DatePicker
                value={field.value?.toDate()}
                onChange={(date) => {
                  if (!date) return field.onChange(null);
                  const newDate = dayjs(date)
                    .hour(field.value?.hour() ?? 0)
                    .minute(field.value?.minute() ?? 0);
                  field.onChange(newDate);
                }}
              />

              {/* <HourMinutePicker
                value={field.value ?? null}
                onChange={(time) => field.onChange(time)}
              /> */}
            </>
          )}
        />
      </div>

      <Controller
        name="option"
        control={control}
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="call" id="call" />
              <Label
                htmlFor="call"
                className="text-[12px] sm:text-sm leading-relaxed"
              >
                An appointment is available for you. Kindly confirm it in your
                JobsinApp Account and share your active contact number. We will
                call you.
              </Label>
            </div>

            <div className="flex items-center gap-3">
              <RadioGroupItem value="address" id="address" />
              <Label
                htmlFor="address"
                className="text-[12px] sm:text-sm leading-relaxed"
              >
                An Appointment Is Available For You. Kindly Confirm It In Your
                JobsinApp Account. Please Come To This Address.
              </Label>
            </div>

            {field.value === "address" && (
              <Input
                placeholder="Type Here Meeting Address"
                {...register("meetingAddress")}
                className="bg-card text-white border-white/20"
              />
            )}
          </RadioGroup>
        )}
      />

      <Textarea
        placeholder="Type Here Message"
        {...register("message")}
        className="bg-card text-white border-white/20 text-sm sm:text-md"
      />

      <div className="flex justify-end">
        <Button className="w-60 custom-btn text-white sm:text-lg" type="submit">
          Confirm Appointment
        </Button>
      </div>
    </form>
  );
}
