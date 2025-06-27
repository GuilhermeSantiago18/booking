'use client'

interface Column {
  label: string;
  key: string;
}

interface TableProps {
  headers: Column[];
  data: Record<string, any>[];
  renderActions?: (row: Record<string, any>) => React.ReactNode;
  emptyMessage?: string;
}

export default function Table({ headers, data, renderActions, emptyMessage = 'Nenhum dado encontrado.' }: TableProps) {
  return (
    <div className="overflow-x-auto bg-white rounded shadow-md font-montserrat">
      <table className="min-w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header) => (
              <th key={header.key} className="text-left px-4 py-2 border-b">{header.label}</th>
            ))}
            {renderActions && <th className="px-4 py-2 border-b">Ações</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={headers.length + (renderActions ? 1 : 0)} className="text-center py-4">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx}   className={`${
                  row.status === 'CONFIRMADO'
                    ? 'bg-[#F2FFFD]'
                    : row.status === 'RECUSADO'
                    ? 'bg-[#FFF3F3]'
                    : 'bg-white'
                }`}>
                {headers.map((header) => (
                  <td key={header.key} className="px-4 py-2 border-b">{row[header.key]}</td>
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
