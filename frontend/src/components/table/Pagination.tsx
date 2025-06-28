'use client';

import { MoveLeft, MoveRight } from 'lucide-react';
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 py-4 font-montserrat">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 text-sm rounded border border-gray-300 disabled:opacity-50 cursor-pointer"
      >
        <MoveLeft size={16} />
      </button>

      <span className="px-4 py-1 text-sm rounded border border-black bg-black text-white">
      {currentPage}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 text-sm rounded border border-gray-300 disabled:opacity-50 cursor-pointer"
      >
      <MoveRight size={16} />
      </button>
    </div>
  );
}
