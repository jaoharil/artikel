import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, setPage }: PaginationProps) {
  return (
    <div className="flex gap-2 items-center">
      <button onClick={() => setPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="p-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
        <ChevronLeft size={16} />
      </button>

      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>

      <button onClick={() => setPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="p-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50">
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
