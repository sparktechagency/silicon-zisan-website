import { ArrowDown, EyeIcon } from "lucide-react";

export default function DownloadCenter({ data }: any) {
  return (
    <div>
      {/* Buttons */}

      {data?.map((item: any, index: any) => (
        <div key={index} className="mb-4">
          {/* Transaction Info */}
          <div className="flex items-center justify-between bg-card p-4 rounded border border-gray-300/30 ">
            <div>
              <p className="text-lg font-semibold">{item?.name}</p>
            </div>

            <div className="flex items-center space-x-2">
              <a
                href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.url}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="p-1 rounded hover:bg-gray-500 transition cursor-pointer mt-1">
                  <EyeIcon className="w-5 h-5" />
                </button>
              </a>
              <a
                href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${item.url}`}
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
    </div>
  );
}
