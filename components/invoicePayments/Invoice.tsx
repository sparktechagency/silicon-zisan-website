import dayjs from "dayjs";
import { EyeIcon, Link } from "lucide-react";

export default function Invoice({ data }: any) {
  return (
    <>
      {data?.map((item: any, index: any) => (
        <div key={index} className="mb-4 mt-6">
          {/* Transaction Info */}
          <div className="flex items-center justify-between bg-card p-4 rounded border border-gray-300/30 ">
            <div>
              <p className="text-lg font-semibold">{item?.invoiceNumber}</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-sm ">
                  {dayjs(item?.createdAt).format("YYYY-MM-DD")}
                </p>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    item?.status === "paid"
                      ? "bg-green-100 text-green-700"
                      : item?.status === "Refunded"
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {item?.status === "paid"
                    ? "Paid"
                    : item?.status === "Refunded"
                      ? "Refunded"
                      : item?.status}
                </span>
              </div>
            </div>

            <div className="flex space-x-2">
              <a
                href={`${item?.hostedInvoiceUrl}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  className="p-1 rounded hover:bg-gray-500 transition cursor-pointer"
                  title="View Invoice"
                >
                  <EyeIcon className="w-6 h-6" />
                </button>
              </a>

              {item?.status === "Refunded" && item?.refundReceiptUrl && (
                <a
                  href={`${item?.refundReceiptUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button
                    className="p-1 rounded hover:bg-gray-500 transition cursor-pointer"
                    title="View Refund Receipt"
                  >
                    <Link className="w-5 h-5" />
                  </button>
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
