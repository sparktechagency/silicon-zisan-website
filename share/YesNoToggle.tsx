import { Label } from "@/components/ui/label";
type Option = string;

export function HeaderYesNoToggle({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label?: string;
  name: string;
  value: string;
  onChange: (name: string, val: string) => void;
  options: Option[];
}) {
  return (
    <div className="flex justify-between gap-4">
      <div className="border p-2 w-auto rounded-3xl  gap-2">
        {options?.map((status: any) => (
          <button
            key={status}
            onClick={() => onChange(name, status)}
            className={`w-auto py-1 px-3 rounded-2xl transition cursor-pointer ${
              value === status ? "custom-btn" : "bg-transparent"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function YesNoToggle({
  label,
  name,
  value,
  onChange,
}: {
  label?: string;
  name: string;
  value: string;
  onChange: (name: string, val: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 items-center gap-4">
      <Label>{label}</Label>
      <div className="flex justify-end">
        <div className="border p-2 w-40 rounded-3xl  gap-2">
          {["yes", "no"].map((status) => (
            <button
              key={status}
              onClick={() => onChange(name, status)}
              className={`w-16 py-1 px-3 rounded-2xl transition cursor-pointer ${
                value === status ? "custom-btn" : "bg-transparent"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
