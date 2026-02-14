"use client";

import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DatePicker } from "@/share/DatePicker";
import CustomTimePicker from "./CustomTimePicker";
import CustomBackButton from "@/share/CustomBackButton";
import dayjs, { Dayjs } from "dayjs";
import { myFetch } from "@/utils/myFetch";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type FormValues = {
  option: "call" | "address";
  address: string;
  message: string;
  scheduledAt: Dayjs | null;
  time: Dayjs | null;
};

export function CreateForm({ res }: any) {
  const router = useRouter();
  const { control, register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      option: "call",
      address: "",
      message: "",
      scheduledAt: null, // IMPORTANT
      time: null,
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!data.scheduledAt || !data.time) {
      return;
    }

    if (!data.scheduledAt || !data.time) return;

    const [hour, minute] = (data.time as unknown as string)
      .split(":")
      .map(Number);

    const localIsoString = dayjs(data.scheduledAt)
      .hour(hour)
      .minute(minute)
      .second(0)
      .millisecond(0)
      .toISOString();

    // if (!data.scheduledAt || !data.time) return;

    // const localIsoString = dayjs(data.scheduledAt)
    //   .hour(data.time.hour())
    //   .minute(data.time.minute())
    //   .second(0)
    //   .millisecond(0)
    //   .toISOString();

    const payload = {
      receiver: res?.user?._id,
      job: res?.job?._id,
      scheduledAt: localIsoString,
      address: data?.address,
      message: data?.message,
    };

    try {
      const res = await myFetch("/appointments/create", {
        method: "POST",
        body: payload,
      });

      if (res.status === 402) {
        router.push("/subscriptions");
      }

      if (res.success) {
        toast.success(res.message);
        router.push(`/appointments`);
      } else {
        toast.error((res as any)?.error[0].message);
      }
    } catch (err) {
      toast.error(err instanceof Error ? res?.message : "something went wrong");
    }
  };

  return (
    <>
      <CustomBackButton />{" "}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-[#334455] text-white rounded-md space-y-6 border border-gray-300/30 p-5 mt-5"
      >
        <h1 className="text-white text-lg">Confirm Appointment</h1>

        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="scheduledAt"
            control={control}
            render={({ field }) => (
              <DatePicker
                value={field.value ? field.value.toDate() : undefined}
                onChange={(date: Date | null | undefined) => {
                  if (!date) {
                    field.onChange(null);
                    return;
                  }

                  const prev = field.value ?? dayjs();

                  const newDate = dayjs(date)
                    .hour(prev.hour())
                    .minute(prev.minute());

                  field.onChange(newDate);
                }}
              />
            )}
          />

          <CustomTimePicker
            name="time"
            control={control}
            rules={{ required: "Time is required" }}
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
                  JobsinApp Account and share your active contact number. We
                  will call you.
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
                  {...register("address")}
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
          <Button
            className="w-60 custom-btn text-white sm:text-lg"
            type="submit"
          >
            Confirm Appointment
          </Button>
        </div>
      </form>
    </>
  );
}
