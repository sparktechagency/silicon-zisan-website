import { Eye } from "lucide-react";
import titleIcon from "../../public/hire-employees/title-icon.png";
import Image from "next/image";
import { CiCirclePlus } from "react-icons/ci";
import Link from "next/link";
import { myFetch } from "@/utils/myFetch";

export default async function HireEmployees() {
  const res = await myFetch("/jobs?isHiringRequest=true", {
    tags: ["hire-employee"],
  });

  return (
    <>
      <Link href="?name=HireEmployeeForm" className="flex justify-end">
        <button className="custom-btn px-5 py-2 rounded mb-3 flex items-center gap-2 ">
          <CiCirclePlus size={28} />
          <span className="text-lg"> Hire Now</span>
        </button>
      </Link>

      {res?.data?.map((item: any) => (
        <div
          className="bg-card p-3 rounded border border-gray-500/70 mb-5"
          key={item?._id}
        >
          <div className="sm:flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Image src={titleIcon} height={24} width={24} alt="icon" />
                <h1 className="text-lg sm:text-2xl capitalize">
                  {item.subCategory}
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-3 sm:mt-0">
              <button className="button-unactive p-1 rounded">
                {item?.jobType}
              </button>
              <div className="flex items-center justify-center h-full">
                <Link href="/contact-information">
                  <button className="button-unactive p-1 h-9 w-9 rounded-full flex items-center justify-center">
                    <Eye />
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <p className="my-3 text-sm sm:text-lg">{item?.aboutCompany}</p>
          {/* <p className="flex items-center gap-2">
            <Clock4 size={20} />
            17:00
          </p> */}
        </div>
      ))}
    </>
  );
}
