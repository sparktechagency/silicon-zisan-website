import Image from "next/image";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import one from "../../public/appartments/oen.png";
import { Clock4, Eye } from "lucide-react";
import DeleteButton from "./DeleteButton";

export default function AppointmentCards() {
  return (
    <div className="bg-card text-white p-4 rounded-xl  shadow-lg flex items-center gap-4 mt-5">
      {/* Profile Image */}
      <Image
        src={one}
        alt="Md Kamran Khan"
        className="w-28 h-28 rounded-full object-cover border-2 border-gray-700"
      />

      {/* Info Section */}
      <div className="flex-1">
        <h3 className="text-xl font-semibold">Md Kamran Khan (01333327633)</h3>

        <div className=" mt-2 text-sm text-gray-300">
          <div className="flex items-center gap-1">
            <FaCalendarAlt />
            <span className="text-xl">01.02.2025</span>
          </div>
          <div className="flex items-center gap-1 mt-2">
            <Clock4 size={18} />
            <span className="text-xl">17:30</span>
          </div>
        </div>
      </div>

      {/* Cancel Button */}
      <div className="flex flex-col items-end justify-between my-4 space-y-6">
        <button>
          <Eye />
        </button>
        <DeleteButton />
      </div>
    </div>
  );
}
