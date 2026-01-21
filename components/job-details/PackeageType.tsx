type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function PackeageType({ value, onChange }: Props) {
  return (
    <div className="flex gap-4">
      {["Hour", "Month", "Year"].map((item) => (
        <button
          key={item}
          type="button"
          className={`${
            value === item
              ? "custom-btn rounded px-3 py-1"
              : "border rounded py-1 px-3"
          }`}
          onClick={() => onChange(item)}
        >
          {item.charAt(0).toUpperCase() + item.slice(1)}
        </button>
      ))}
    </div>
  );
}
