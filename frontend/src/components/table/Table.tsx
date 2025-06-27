'use client'

import Image from "next/image";
import React from "react";

interface Column<T> {
  label: string | React.ReactNode;
  key: keyof T | string;
}

interface TableProps<T> {
  headers: Column<T>[]; 
  data: T[];
  renderActions?: (row: T) => React.ReactNode;
  getRowClassName?: (row: T) => string;
}

export default function Table<T>({
  headers,
  data,
  renderActions,
  getRowClassName,
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

  return (
    <div className="overflow-x-auto bg-white rounded shadow-md font-montserrat">
      <table className="min-w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header, index) => (
              <th
                key={String(index)}
                className="text-left px-4 py-2 border-b"
              >
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className={getRowClassName ? getRowClassName(row) : "bg-white"}
            >
              {headers.map((header) => {
                const cellContent = row[header.key as keyof T];
                if (header.key === 'actions') {
                  return (
                    <td key="actions" className="px-4 py-2 border-b text-center">
                      {renderActions?.(row)}
                    </td>
                  );
                }

                return (
                <td key={String(header.key) } className="px-4 py-2 border-b">
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
  );
}
