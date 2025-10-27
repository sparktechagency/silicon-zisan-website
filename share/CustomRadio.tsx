import { RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export default function CustomRadio({
  value,
  selected,
}: {
  value: string;
  selected: boolean;
}) {
  return (
    <div className="relative">
      <RadioGroupItem
        value={value}
        className={cn(
          "w-6 h-6 rounded-full border-2 transition-colors",
          selected
            ? "bg-white text-white" // selected style
            : "bg-transparent border-white" // unselected style
        )}
      />

      {selected && (
        <Check
          className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 text-black pointer-events-none"
          strokeWidth={3}
        />
      )}
    </div>
  );
}
