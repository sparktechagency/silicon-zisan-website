import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = { id: string | number; label: string };

export default function CustomSelect({
  label,
  placeholder,
  options = [],
}: {
  label: string;
  placeholder?: string;
  options?: Option[] | undefined;
}) {
  return (
    <div className="grid grid-cols-2 items-center gap-4">
      <Label className="font-semibold">{label}</Label>
      <Select>
        <SelectTrigger className="w-full text-white border  !h-10">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className=" text-white">
          {options.map((option, index) => (
            <SelectItem key={index} value={option.id.toString()}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
