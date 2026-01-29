// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { Input } from "../ui/input";

// type LocationFeature = {
//   properties: {
//     name: string;
//     city?: string;
//     country?: string;
//   };
// };

// export default function AddressInput() {
//   const { register, setValue, watch } = useForm();
//   const address = watch("address");

//   const [suggestions, setSuggestions] = useState<LocationFeature[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     if (!address || address.length < 2) {
//       setSuggestions([]);
//       setOpen(false);
//       return;
//     }

//     const timeout = setTimeout(async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(
//           `https://photon.komoot.io/api/?lang=en&q=${address}&limit=6`,
//         );
//         const data = await res.json();
//         setSuggestions(data.features || []);
//         setOpen(true);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }, 400);

//     return () => clearTimeout(timeout);
//   }, [address]);

//   const handleSelect = (label: string) => {
//     setValue("address", label, { shouldDirty: true });
//     setSuggestions([]);
//     setOpen(false);
//   };

//   return (
//     <div className="relative">
//       {/* INPUT */}
//       <Input
//         placeholder="Address"
//         className="placeholder:text-gray-400"
//         {...register("address")}
//         onFocus={() => {
//           if (suggestions.length > 0) {
//             setOpen(true);
//           }
//         }}
//       />

//       {/* DROPDOWN */}
//       {open && suggestions.length > 0 && (
//         <ul className="absolute z-50 mt-1 w-full rounded-md border bg-white text-black shadow">
//           {suggestions.map((item, index) => {
//             const label = [
//               item.properties.name,
//               item.properties.city,
//               item.properties.country,
//             ]
//               .filter(Boolean)
//               .join(", ");

//             return (
//               <li
//                 key={index}
//                 className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100"
//                 onMouseDown={(e) => {
//                   e.preventDefault(); // ✅ Prevents input blur and modal close
//                   e.stopPropagation(); // ✅ Stops event from bubbling to modal
//                   handleSelect(label);
//                 }}
//               >
//                 {label}
//               </li>
//             );
//           })}
//         </ul>
//       )}

//       {loading && <p className="mt-1 text-xs text-gray-400">Searching...</p>}
//     </div>
//   );
// }
