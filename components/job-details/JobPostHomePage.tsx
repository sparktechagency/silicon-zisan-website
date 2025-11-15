import { postJobsDetails } from "@/demoData/data";
import Image from "next/image";
import logo from "../../public/dashboard/hotel.png";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

export default function JobPostHomePage() {
  return (
    <div className="basis-[70%]">
      <h1 className=" p-3 rounded font-medium mb-4 bg-card text-white text-2xl border border-white/30">
        My Posts Jobs
      </h1>
      {postJobsDetails?.map((item: any, index: number) => (
        <div
          key={index}
          className="bg-card sm:flex justify-between border border-gray-300/30 p-3 rounded-md mb-6"
        >
          <div className="sm:flex gap-5">
            <div>
              {logo ? (
                <Image
                  src={logo}
                  alt="Logo"
                  width={100}
                  height={30}
                  className="h-32 w-32"
                />
              ) : (
                <Skeleton className="h-32 w-32" />
              )}
            </div>
            {/* company details */}
            <div className="text-white">
              <p className="text-xl">{item.company}</p>
              <p className="text-sm my-1">{item.location}</p>
              <p className="text-xl my-2">{item.position}</p>
              <div className="flex items-center gap-4">
                <p className="border p-0.5 rounded bg-[#465565] px-3">
                  {item.jobType}
                </p>
                <p className="text-[18px]">{item.salary}</p>
              </div>
            </div>
          </div>
          {/* view details */}
          <div className="text-white  flex flex-col justify-between mt-5 sm:mt-0">
            <p className="sm:text-right">{item.postedTime}</p>
            <Link href="/view-details-jobs">
              <button className="custom-btn rounded-md py-2 px-2 w-full">
                View Details
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
