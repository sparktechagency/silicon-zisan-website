import dayjs from "dayjs";
import { ArrowDown, EyeIcon } from "lucide-react";

export default function Invoice({ data }: any) {
  return (
    <>
      {data?.map((item: any, index: any) => (
        <div key={index} className="mb-4 mt-6">
          {/* Transaction Info */}
          <div className="flex items-center justify-between bg-card p-4 rounded border border-gray-300/30 ">
            <div>
              <p className="text-lg font-semibold">
                {item?.stripeInvoiceId.slice(0, 10)}
              </p>
              <p className="text-sm ">
                {dayjs(item?.createdAt).format("YYYY-MM-DD")}
              </p>
            </div>

            <div className="flex space-x-2">
              <a
                href={`${item?.hostedInvoiceUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="p-1 rounded hover:bg-gray-500 transition cursor-pointer">
                  <EyeIcon className="w-5 h-5" />
                </button>
              </a>
              <a
                href={`${item?.hostedInvoiceUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="p-1 rounded hover:bg-gray-500 transition cursor-pointer">
                  <ArrowDown className="w-5 h-5" />
                </button>
              </a>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
