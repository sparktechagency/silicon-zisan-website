import { Button } from "@/components/ui/button";
import Container from "@/share/Container";
import Link from "next/link";
import CustomBackButton from "@/share/CustomBackButton";
import dayjs from "dayjs";
import CustomImage from "@/utils/CustomImage";

export default function AppliedJobs({ data, limit }: any) {
  return (
    <Container className="my-10">
      <CustomBackButton />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
        {data?.map((item: any, index: number) => {
          const isLocked = limit && index >= 2;
          return (
            <div
              key={item?._id}
              className="bg-card text-white rounded-lg w-full max-w-sm mx-auto shadow-lg p-3 border relative"
            >
              {/* Overlay for Locked Card */}
              {isLocked && (
                <div className="absolute inset-0 bg-black/60 rounded-lg flex items-center justify-center z-20">
                  <Link href="/subscriptions">
                    <Button className="custom-btn">Upgrade Now</Button>
                  </Link>
                </div>
              )}

              {/* Card Content */}
              <div className={isLocked ? "opacity-20 pointer-events-none" : ""}>
                {/* Profile Image */}
                <div className="relative">
                  <CustomImage
                    src={item?.user?.image}
                    title="Alex Gender"
                    className="rounded-t-lg h-40 w-full"
                  />
                </div>

                {/* Info Section */}
                <div>
                  <h2 className="text-xl font-semibold">
                    {item?.user?.name?.trim() ? item.user.name : "No Name"}
                  </h2>

                  <p className="text-sm text-gray-300">
                    Senior Business Analytics
                  </p>

                  <p className="text-sm text-gray-400">
                    Applied : {dayjs(item?.createdAt).format("DD-MM-YYYY")}
                  </p>

                  {!isLocked && (
                    <Link href={`/view-details-person/${item?._id}`}>
                      <Button className="custom-btn w-full mt-4">
                        View Profile
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
