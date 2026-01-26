import Link from "next/link";
import { myFetch } from "@/utils/myFetch";
import Default from "../../public/default.jpg";
import CustomImage from "@/utils/CustomImage";
import Image from "next/image";
import { UserSearch } from "lucide-react";

export default async function JobPostHomePage() {
  const res = await myFetch("/jobs/me");

  const getAppliedJob = async (id: string) => {
    const length = await myFetch(`/applications/job/${id}`);
    return length?.data?.data?.length;
  };

  return (
    <div className="basis-[70%]">
      <h1 className=" p-3 rounded font-medium mb-4 bg-card text-white text-2xl border border-white/30">
        My Jobs
      </h1>
      {res?.data?.map((item: any, index: number) => {
        return (
          <div
            key={index}
            className="bg-card sm:flex justify-between space-x-4 border border-gray-300/30 p-3 rounded-md mb-6"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Image / Logo */}
              <div className="shrink-0 w-32 sm:w-36 md:w-40">
                {/* <CustomImage
                  src={item?.author?.image}
                  title="Logo"
                  width={160}
                  height={160}
                  className="w-full h-full object-contain"
                /> */}
                {item?.author?.image ? (
                  <CustomImage
                    src={item?.author?.image || "No Image"}
                    title="Logo"
                    width={160}
                    height={160}
                    className="w-full h-[200px] object-contain"
                  />
                ) : (
                  // <Skeleton className="w-full h-32" />
                  <Image
                    src={Default}
                    alt="Logo"
                    width={160}
                    height={160}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              {/* Company Details */}
              <div className="text-white flex-1 min-w-0">
                <p className="text-xl my-2">{item.subCategory}</p>

                <div className="flex flex-wrap items-center gap-3">
                  <p className="border rounded bg-[#465565] px-3 py-0.5">
                    {item.jobType}
                  </p>

                  <p className="text-[18px]">
                    ${item.salaryAmount}/{item.salaryType}
                  </p>
                </div>

                <p className="mt-3 line-clamp-3">
                  Company Details : {item.description}
                </p>
              </div>
            </div>

            {/* view details */}
            <div className="text-white flex flex-col justify-between mt-5 sm:mt-0 w-full sm:w-40 shrink-0">
              <p className="sm:text-right text-sm text-gray-300">
                {item.postedTime}
              </p>

              <div>
                <div className="flex gap-1">
                  <p>
                    <UserSearch />
                  </p>
                  <p>{getAppliedJob(item?._id)} Applied</p>
                </div>
                <div className="mt-1">
                  <Link
                    href={`/view-details-jobs/${item._id}`}
                    className="w-full"
                  >
                    <button className="custom-btn rounded-md py-2 w-full whitespace-nowrap">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
