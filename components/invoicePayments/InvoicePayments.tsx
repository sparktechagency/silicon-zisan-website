import { ArrowDown, EyeIcon } from "lucide-react";
import payment from "../../public/invoice-payment/payment.png";

export default function InvoicePayments() {
  return (
    <div>
      {/* Buttons */}
      <div className="flex gap-4">
        <button className="flex-1 py-2 px-4 custom-btn text-white rounded hover:bg-blue-700 transition">
          Invoice
        </button>
        <button className="flex-1 py-2 px-4 bg-card rounded hover:bg-gray-200 transition">
          Card Information
        </button>
      </div>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="mb-4 mt-6">
          {/* Transaction Info */}
          <div className="flex items-center justify-between bg-card p-4 rounded border border-gray-300/30 ">
            <div>
              <p className="text-lg font-semibold">25635556</p>
              <p className="text-sm text-gray-500">05.01.2022</p>
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
              <button className="p-1 rounded hover:bg-gray-100 transition">
                <ArrowDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
