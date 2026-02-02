import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type LocationFeature = {
  properties: {
    name: string;
    city?: string;
    country?: string;
  };
  geometry: {
    coordinates: [number, number];
  };
};

export default function AddressInput({ setValue, register, errors }: any) {
  const [input, setInput] = useState("");

  const [suggestions, setSuggestions] = useState<LocationFeature[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const isSelectingRef = useRef(false);

  useEffect(() => {
    if (isSelectingRef.current) {
      isSelectingRef.current = false;
      return; // ⛔ skip API + setOpen
    }

    if (!input || input.trim() === "") {
      setSuggestions([]);
      setOpen(false);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://photon.komoot.io/api/?lang=en&q=${input}&limit=5`,
        );
        const data = await res.json();

        setSuggestions(data.features || []);
        setOpen(true);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [input]);

  const handleSelect = ({
    label,
    coordinates,
  }: {
    label: string;
    coordinates: [number, number];
  }) => {
    isSelectingRef.current = true;
    setValue("address", label, { shouldDirty: true });
    setValue("location", coordinates);

    console.log("coordinates", coordinates);

    setOpen(false);
    setSuggestions([]);
  };

  return (
    <div className="relative">
      {/* INPUT */}
      <Label>Address</Label>
      <Input
        placeholder="Address"
        className="placeholder:text-gray-400 mt-2"
        {...register("address", { required: "Address is required" })}
        onChange={(val) => setInput(val.target.value)}
      />

      {errors.name && (
        <span className="text-red-400 text-sm">{errors.address.message}</span>
      )}

      {/* DROPDOWN */}
      {open && suggestions.length > 0 && (
        <ul className="absolute z-50 mt-1 w-full rounded-md border bg-white text-black shadow">
          {suggestions.map((item, index) => {
            const label = [
              item.properties.name,
              item.properties.city,
              item.properties.country,
            ]
              .filter(Boolean)
              .join(", ");

            return (
              <li
                key={index}
                className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100"
                onMouseDown={(e) => {
                  e.preventDefault(); // ✅ Prevents input blur and modal close
                  e.stopPropagation(); // ✅ Stops event from bubbling to modal
                  handleSelect({
                    label,
                    coordinates: item.geometry.coordinates,
                  });
                }}
              >
                {label}
              </li>
            );
          })}
        </ul>
      )}

      {loading && <p className="mt-1 text-xs text-gray-400">Searching...</p>}
    </div>
  );
}
