import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";

export const SearchableCountrySelect = ({
  value,
  onChange,
  error,
  countryList,
}: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCountries = countryList.filter(
    (item: any) =>
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.dial_code.includes(searchTerm),
  );

  const selectedCountry = countryList.find(
    (item: any) => item.dial_code === value,
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`text-white rounded px-2 min-w-[100px] border h-12 flex items-center justify-between bg-transparent ${
          error ? "border-red-400" : "border-gray-400/30"
        }`}
      >
        <span className="text-sm">
          {selectedCountry
            ? `${selectedCountry.flag} ${selectedCountry.dial_code}`
            : "Code"}
        </span>
        <ChevronDown
          className={`w-4 h-4 ml-1 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-72 mt-1 bg-[#3C4751] border border-gray-400/30 rounded-lg shadow-xl">
          <div className="p-2 border-b border-gray-600">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search country..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-3 text-white text-sm bg-[#2A3339] border border-gray-600 rounded focus:outline-none focus:border-blue-500"
                autoFocus
              />
            </div>
          </div>

          <div className="max-h-60 overflow-y-auto">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((item: any, index: number) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    onChange(item.dial_code);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                  className={`w-full px-3 py-2 text-left text-sm hover:bg-[#4A5662] transition-colors ${
                    value === item.dial_code ? "bg-[#4A5662]" : ""
                  }`}
                >
                  <span className="text-white">
                    {item.flag} {item.name || item.code} ({item.dial_code})
                  </span>
                </button>
              ))
            ) : (
              <div className="px-3 py-4 text-gray-400 text-sm text-center">
                No countries found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
