import { Button } from "@/components/ui/button";
import Container from "@/share/Container";
import Link from "next/link";
import CustomBackButton from "@/share/CustomBackButton";
import dayjs from "dayjs";
import CustomImage from "@/utils/CustomImage";

export default function AppliedJobs({ data }: any) {
  return (
    <Container className="my-10">
      <CustomBackButton />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-3">
        {data?.map((item: any) => (
          <div
            key={item?._id}
            className="bg-card text-white rounded-lg w-full max-w-sm mx-auto shadow-lg p-3 border"
          >
            {/* Profile Image */}
            <div className=" relative">
              <CustomImage
                src={item?.user?.image}
                title="Alex Gender"
                className="rounded-t-lg h-40 w-full"
              />
            </div>

            {/* Info Section */}
            <div className="">
              <h2 className="text-xl font-semibold">
                {item?.user?.name?.trim() ? item.user.name : "No Name"}
              </h2>
              <p className="text-sm text-gray-300">Senior Business Analytics</p>
              <p className="text-sm text-gray-400">
                Applied : {dayjs(item?.createdAt).format("DD-MM-YYYY")}
              </p>

              {/* Action Button */}
              <Link href={`/view-details-person/${item?._id}`}>
                <Button className="custom-btn w-full mt-4">View Profile</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
