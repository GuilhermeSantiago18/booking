'use client'

import Image from "next/image";

interface Column<T> {
  label: string | React.ReactNode;
  key: keyof T;
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
      <div className="flex flex-col items-center justify-center  md:h-[calc(70vh)] p-4">
        <Image
          src="/assets/Dashboard.svg"
          alt="Dashboard"
          width={200}
          height={200}
          className="mb-4"
        />
        <p className="font-medium text-center text-lg font-montserrat">Nada por aqui ainda...</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white rounded shadow-md font-montserrat">
      <table className="min-w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header) => (
              <th
                key={String(header.key)}
                className="text-left px-4 py-2 border-b"
              >
                {header.label}
              </th>
            ))}
            {renderActions && (
              <th className="px-4 py-2 border-b">
                Ação
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className={getRowClassName ? getRowClassName(row) : "bg-white"}
            >
              {headers.map((header) => (
                <td key={String(header.key)} className="px-4 py-2 border-b">
                  {String(row[header.key])}
                </td>
              ))}
              {renderActions && (
                <td className="px-4 py-2 border-b">{renderActions(row)}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
