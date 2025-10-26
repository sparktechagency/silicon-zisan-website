import { ArrowDown, EyeIcon } from "lucide-react";
import payment from "../../public/invoice-payment/payment.png";

export default function DownloadCenter() {
  return (
    <div>
      {/* Buttons */}

      {Array.from({ length: 9 }).map((_, index) => (
        <div key={index} className="mb-4">
          {/* Transaction Info */}
          <div className="flex items-center justify-between bg-card p-4 rounded border border-gray-300/30 ">
            <div>
              <p className="text-lg font-semibold">{index + 1} From</p>
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
    </div>
  );
}
