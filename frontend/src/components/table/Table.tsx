'use client'

import Image from "next/image";

interface Column<T> {
  label: string;
  key: keyof T;
}

interface TableProps<T> {
  headers: Column<T>[];
  data: T[];
  renderActions?: (row: T) => React.ReactNode;
  getRowClassName?: (row: T) => string;
}





export default function Table<T>({ headers, data, renderActions, getRowClassName }: TableProps<T>) {
  return (
    <div className="overflow-x-auto bg-white rounded shadow-md font-montserrat">
      <table className="min-w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header) => (
              <th key={String(header.key)} className="text-left px-4 py-2 border-b">{header.label}</th>
            ))}
            {renderActions && <th className="px-4 py-2 border-b">Ações</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={headers.length + (renderActions ? 1 : 0)} className="text-center py-4">
                <div className="flex justify-center mt-34">
                       <Image
                         src="/assets/Dashboard.svg"
                         alt="Dashboard"
                         width={200}
                         height={200}
                       />
                     </div>
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx}   className={getRowClassName ? getRowClassName(row) : 'bg-white'}>
                {headers.map((header) => (
                  <td key={String(header.key)} className="px-4 py-2 border-b">{String(row[header.key])}</td>
                ))}
                {renderActions && (
                  <td className="px-4 py-2 border-b">
                    {renderActions(row)}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
