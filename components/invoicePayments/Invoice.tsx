import { ArrowDown, EyeIcon } from "lucide-react";
import payment from "../../public/invoice-payment/payment.png";

export default function Invoice() {
  return (
    <>
      {" "}
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="mb-4 mt-6">
          {/* Transaction Info */}
          <div className="flex items-center justify-between bg-card p-4 rounded border border-gray-300/30 ">
            <div>
              <p className="text-lg font-semibold">25635556</p>
              <p className="text-sm ">05.01.2022</p>
            </div>

            <div className="flex space-x-2">
              <a
                href={`http://10.10.7.54:3000/${payment.src}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="p-1 rounded hover:bg-gray-500 transition cursor-pointer">
                  <EyeIcon className="w-5 h-5" />
                </button>
              </a>
              <button className="p-1 rounded hover:bg-gray-500 transition cursor-pointer">
                <ArrowDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
