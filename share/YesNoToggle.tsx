import { Label } from "@/components/ui/label";

type Option = string;

/* ---------------- Header Toggle ---------------- */
export function HeaderYesNoToggle({
  label,
  value,
  onChange,
  options,
}: {
  label?: string;
  value: string;
  onChange: (val: string) => void;
  options: Option[];
}) {
  return (
    <div>
      {label && <Label>{label}</Label>}
      <div className="border p-2 rounded-3xl flex gap-2">
        {options.map((status) => (
          <button
            type="button"
            key={status}
            onClick={() => onChange(status)}
            className={`py-1 px-3 rounded-2xl transition ${
              value === status ? "custom-btn" : "bg-transparent"
            }`}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Yes / No Toggle ---------------- */
export default function YesNoToggle({
  label,
  value,
  onChange,
}: {
  label?: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 items-center gap-2">
      <Label>{label}</Label>

      <div className="flex justify-end">
        <div className="border p-2 rounded-3xl flex gap-2 w-28 sm:w-40">
          {["yes", "no"].map((status) => (
            <button
              type="button"
              key={status}
              onClick={() => onChange(status)}
              className={`sm:w-16 py-1 px-2 rounded-2xl transition ${
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

/* ---------------- Gender Toggle ---------------- */
export function YesNoToggleMaleFemale({
  label,
  value,
  onChange,
}: {
  label?: string;
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 items-center gap-4">
      <Label>{label}</Label>

      <div className="flex justify-end">
        <div className="border p-2 rounded-3xl flex gap-2">
          {["Male", "Female"].map((status) => (
            <button
              type="button"
              key={status}
              onClick={() => onChange(status)}
              className={`py-1 px-3 rounded-2xl transition ${
                value === status ? "custom-btn" : "bg-transparent"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
