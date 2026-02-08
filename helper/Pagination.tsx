"use client";
import { Suspense } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const MAX_PAGE_WINDOW = 6;

const CustomPaginationSuspense = ({ totalPages = 1 }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentPage = parseInt(searchParams.get("page") || "1");

  const startPage = Math.max(1, currentPage - MAX_PAGE_WINDOW + 1);
  const endPage = Math.min(totalPages, startPage + MAX_PAGE_WINDOW - 1);

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (newPage: any) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`, { scroll: false });
  };

  console.log("page numbers", pageNumbers);

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        className="p-2 border border-gray-300 rounded  disabled:opacity-50"
      >
        <ChevronLeft size={20} />
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          className={`px-4 py-2 rounded font-semibold ${
            currentPage === page ? "bg-[#04667c] text-white" : "border h-9.5"
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        className="p-2 border border-gray-300 rounded  disabled:opacity-50"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default function Pagination({ totalPages = 5 }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustomPaginationSuspense totalPages={totalPages} />
    </Suspense>
  );
}
