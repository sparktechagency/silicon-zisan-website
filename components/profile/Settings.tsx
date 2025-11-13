import { ChevronRight, Fingerprint, Globe, MapPin } from "lucide-react";
import React from "react";
import PasswordModal from "./modal/PasswordModal";
import { CountryModal } from "./modal/CountryModal";
import Link from "next/link";

const buttons = [];

export default function Setting() {
  return (
    <div className="flex flex-col space-y-4 ">
      <Link href="/factor-authenticaiton">
        <div
          className={`flex justify-between items-center pl-7 cursor-pointer bg-card border border-gray-400  font-semibold py-3 rounded-lg`}
        >
          <button className="flex  items-center capitalize">
            <span className="mr-2 text-nowrap">
              <Fingerprint />
            </span>
            2-fector authentication
          </button>
          <p>
            <ChevronRight />
          </p>
        </div>
      </Link>
      <CountryModal
        title="Select Language"
        trigger={
          <div
            className={`flex justify-between items-center pl-7 cursor-pointer  
              bg-card border border-gray-400  font-semibold py-3 rounded-lg  `}
          >
            <button className="flex  items-center capitalize">
              <span className="mr-2 text-nowrap">
                <Globe />
              </span>
              language
            </button>
            <p>
              <ChevronRight />
            </p>
          </div>
        }
      />
      {/* <CountryModal
        title="Country"
        trigger={
          <div
            className={`flex justify-between items-center pl-7 cursor-pointer  
              bg-card border border-gray-400  font-semibold py-3 rounded-lg  `}
          >
            <button className="flex  items-center capitalize">
              <span className="mr-2 text-nowrap">
                <MapPin size={27} />
              </span>
              country
            </button>
            <p>
              <ChevronRight />
            </p>
          </div>
        }
      /> */}

      <PasswordModal
        trigger={
          <div
            className={`flex justify-between items-center pl-7 cursor-pointer  
    bg-card border border-gray-400 font-semibold py-3 rounded-lg`}
          >
            <button className="flex items-center capitalize">
              <span className="mr-2 text-nowrap">
                <Globe />
              </span>
              Change password
            </button>
            <p>
              <ChevronRight />
            </p>
          </div>
        }
      />
    </div>
  );
}
