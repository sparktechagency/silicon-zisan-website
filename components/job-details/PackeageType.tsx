type Props = {
  value: string;
  onChange: (value: string) => void;
};

const type = [
  {
    label: "Hourly",
    value: "Hour",
  },
  {
    label: "Monthly",
    value: "Month",
  },
  {
    label: "Yearly",
    value: "Year",
  },
];

export default function PackeageType({ value, onChange }: Props) {
  return (
    <div className="flex gap-2 sm:gap-4">
      {type?.map((item: any, index: number) => (
        <button
          key={index}
          type="button"
          className={`${
            value === item.value
              ? "custom-btn rounded px-3 py-1"
              : "border rounded py-1 px-3"
          }`}
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
