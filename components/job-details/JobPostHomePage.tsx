import { postJobsDetails } from "@/demoData/data";
import Image from "next/image";
import logo from "../../public/dashboard/hotel.png";
import Link from "next/link";

export default function JobPostHomePage() {
  return (
    <div className="basis-[70%]">
      <h1 className=" p-3 rounded mb-4 bg-card text-white text-2xl">
        My Posts Jobs
      </h1>
      {postJobsDetails?.map((item: any, index: number) => (
        <div
          key={index}
          className="bg-card flex justify-between border p-3 rounded-md mb-6"
        >
          <div className="flex gap-5">
            <div>
              <Image
                src={logo}
                alt="Logo"
                width={100}
                height={30}
                className="h-32 w-32"
              />
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
          <div className="text-white text-right flex flex-col justify-between">
            <p className="text-right">{item.postedTime}</p>
            <Link href="/view-details-jobs">
              <button className="custom-btn rounded-md py-2 px-2">
                View Details
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
