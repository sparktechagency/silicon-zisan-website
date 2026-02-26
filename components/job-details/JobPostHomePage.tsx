import Link from "next/link";
import { myFetch } from "@/utils/myFetch";
// import Default from "../../public/default.jpg";
import CustomImage from "@/utils/CustomImage";
import { UserSearch } from "lucide-react";

export default async function JobPostHomePage() {
  const res = await myFetch("/jobs/me?isHiringRequest=false");

  const getAppliedJob = async (id: string) => {
    const length = await myFetch(`/applications/job/${id}`);
    return length?.data?.data?.length;
  };

  const profileData = await myFetch("/employers/me", {
    tags: ["profile"],
  });

  console.log("get profile", profileData.data?.user.image);

  return (
    <div className="basis-[70%]">
      <h1 className=" p-3 rounded font-medium mb-4 bg-card text-white text-2xl border border-white/30">
        My Jobs
      </h1>
      {res?.data?.map((item: any, index: number) => {
        return (
          <div
            key={index}
            className=" bg-card border border-gray-300/30 p-3 rounded-md mb-6"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Image / Logo */}
              <div className="shrink-0 w-32 sm:w-36 md:w-40">
                <CustomImage
                  src={profileData?.data?.user?.image}
                  title="Logo"
                  width={160}
                  height={160}
                  className="w-full h-[200px] object-contain"
                />
              </div>

              {/* Company Details */}
              <div className="text-white flex-1 items-end">
                <div className="">
                  <p className="text-xl my-2 ">{item.category}</p>
                  <p className="text-xl my-2 ">{item.subCategory}</p>

                  <div className="flex flex-wrap items-center gap-3">
                    <p className="border rounded bg-[#465565] px-3 py-0.5">
                      {item.jobType}
                    </p>

                    <p className="text-[18px]">
                      €{item.salaryAmount}/{item.salaryType}ly
                    </p>
                  </div>

                  <p className="mt-3 line-clamp-3">
                    Job Description:{" "}
                    {item.description.length > 80
                      ? item.description.slice(0, 80) + "..."
                      : item.description}
                  </p>
                </div>

                {/* view details */}
                <div className="text-white flex flex-col sm:flex-row justify-between mt-5 sm:mb-0 w-full  shrink-0 ">
                  <div className="flex">
                    <p>
                      <UserSearch />
                    </p>
                    <p>{getAppliedJob(item?._id)} Applicant</p>
                  </div>
                  <div>
                    <div className="">
                      <Link
                        href={`/view-details-jobs/${item._id}`}
                        className="w-full"
                      >
                        <button className="custom-btn rounded-md py-2 px-2 w-full whitespace-nowrap">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
