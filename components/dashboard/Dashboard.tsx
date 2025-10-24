import Image from "next/image";
import logo from "../../public/dashboard/hotel.png"; // adjust the import path as needed
import Container from "@/share/Container";
import { data, postJobsDetails } from "@/demoData/data";
import Link from "next/link";

export default function JobCard() {
  return (
    <Container className="flex flex-col lg:flex-row space-x-10 my-10">
      <div>
        {data?.map((item, index) => (
          <div
            key={index}
            className="basis-[35%] flex items-center justify-center gap-2 custom-btn rounded h-20 mb-7"
          >
            <p>icon</p>
            <p className="">{item.title}</p>
          </div>
        ))}
      </div>

      <div className="basis-[65%]">
        <h1 className=" p-3 rounded mb-4 bg-card">My Posts Jobs</h1>
        {postJobsDetails?.map((item, index) => (
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
    </Container>
  );
}
