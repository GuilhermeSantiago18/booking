'use client';

import Image from 'next/image';
import React from 'react';
import Pagination from './Pagination';

export interface Column<T> {
  label: string | React.ReactNode;
  key: keyof T | string;
}

interface TableProps<T> {
  headers: Column<T>[];
  data: T[];
  renderActions?: (row: T) => React.ReactNode;
  getRowClassName?: (row: T) => string;
  currentPage?: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
}

export default function Table<T>({
  headers,
  data,
  renderActions,
  getRowClassName,
  currentPage = 1,
  itemsPerPage = 10,
  onPageChange,
}: TableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center md:h-[calc(70vh)] p-4">
        <Image
          src="/assets/Dashboard.svg"
          alt="Dashboard"
          width={200}
          height={200}
          className="mb-4"
        />
        <p className="font-medium text-center text-lg font-montserrat">
          Nada por aqui ainda...
        </p>
      </div>
    );
  }

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="overflow-x-auto bg-white rounded shadow-md font-montserrat text-sm md:min-h-[calc(100vh-300px)] flex flex-col justify-between">
      <div className="flex-grow">
        <table className="min-w-full table-auto mt-4">
          <thead className="bg-white">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={String(index)}
                  className="text-left px-4 py-2 border-b border-gray-300"
                >
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, idx) => (
              <tr
                key={idx}
                className={getRowClassName ? getRowClassName(row) : 'bg-white'}
              >
                {headers.map((header) => {
                  const cellContent = row[header.key as keyof T];
                  if (header.key === 'actions') {
                    return (
                      <td
                        key="actions"
                        className="px-4 py-3 text-center border-b border-gray-300"
                      >
                        {renderActions?.(row)}
                      </td>
                    );
                  }

                  return (
                    <td
                      key={String(header.key)}
                      className="px-4 py-3 border-b border-gray-300"
                    >
                      {React.isValidElement(cellContent)
                        ? cellContent
                        : String(cellContent ?? '')}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
