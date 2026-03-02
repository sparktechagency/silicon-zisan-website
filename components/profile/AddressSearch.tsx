import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type LocationFeature = {
  properties: {
    name: string;
    city?: string;
    country?: string;
    labe: string;
  };
  geometry: {
    coordinates: [number, number];
  };
  label?: string;
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

        // const formatted = (data.features || []).map((item: any) => {
        //   const p = item.properties;

        //   const road = [p.housenumber, p.street].filter(Boolean).join(" ");

        //   const location = [p.city, p.postcode, p.street, p.country]

        //     .filter(Boolean)
        //     .join(", ");
        //   console.log("location", location);

        //   return {
        //     ...item,
        //     label: [road, location].filter(Boolean).join(", "),
        //   };
        // });

        const formatted = (data.features || []).map((item: any) => {
          const p = item.properties;

          // Street + House Number
          const streetLine = [p.street, p.housenumber]
            .filter(Boolean)
            .join(" ");

          // Postcode + City
          const cityLine = [p.postcode, p.city].filter(Boolean).join(" ");

          // Final label
          const label = [streetLine, cityLine, p.country]
            .filter(Boolean)
            .join(", ");

          console.log("location", label);

          return {
            ...item,
            label,
          };
        });

        setSuggestions(formatted);
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

      {errors.address && (
        <span className="text-red-400 text-sm">{errors.address.message}</span>
      )}

      {/* DROPDOWN */}
      {/* {open && suggestions.length > 0 && (
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
      )} */}
      {open && suggestions.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-md border bg-white text-black shadow">
          {suggestions.map((item, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();

                handleSelect({
                  label: item.label || "",
                  coordinates: item.geometry.coordinates,
                });
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}

      {loading && <p className="mt-1 text-xs text-gray-400">Searching...</p>}
    </div>
  );
}
