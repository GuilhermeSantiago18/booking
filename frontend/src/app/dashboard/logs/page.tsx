'use client';

import { useState } from "react";
import FilterBar from "@/components/shared/Filterbar";
import Table from "@/components/table/Table";
import Loading from "@/components/Loading";
import { useUser } from "@/hooks/useUser";
import { useLogs } from "@/hooks/useLogs";
import { IRole } from "@/types/User";
import { ILogRowTable } from "@/types/Logs";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

export default function Logs() {
  const { user } = useUser();
  const { logs, isLoading, error } = useLogs();

  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  if (!user) return null;

  const isAdmin = user.role === IRole.ADMIN;

  const filteredLogs = (logs ?? []).filter(log => {
  if (isAdmin) {
    const fullName = `${log.user.firstName} ${log.user.lastName}`.toLowerCase();
    const searchMatch = fullName.includes(search.toLowerCase());
    const dateMatch = date
      ? new Date(log.createdAt).toISOString().slice(0, 10) === date
      : true;
    return searchMatch && dateMatch;
  } else {
    const searchLower = search.toLowerCase();
    const searchMatch =
      log.type.toLowerCase().includes(searchLower) ||
      log.module.toLowerCase().includes(searchLower);
    const dateMatch = date
      ? new Date(log.createdAt).toISOString().slice(0, 10) === date
      : true;
    return searchMatch && dateMatch;
  }
});


  const mappedData: ILogRowTable[] = filteredLogs.map(log => ({
    id: log.id,
    client: `${log.user.firstName} ${log.user.lastName}`,
    type: log.type,
    module: log.module,
    dateTime: `${new Date(log.createdAt).toLocaleDateString()} às ${new Date(log.createdAt).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`,
  }));

  const sortedData = [...mappedData].sort((a, b) => {
    const dateA = new Date(filteredLogs.find(log => log.id === a.id)!.createdAt).getTime();
    const dateB = new Date(filteredLogs.find(log => log.id === b.id)!.createdAt).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const handleSortClick = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const baseHeaders = [
  { label: 'Tipo de atividade', key: 'type' as keyof ILogRowTable },
  { label: 'Módulo', key: 'module' as keyof ILogRowTable },
  {
    label: (
      <button onClick={handleSortClick} className="flex items-center cursor-pointer">
        Data
        {sortOrder === 'asc' ? (
          <ArrowUp size={20} className="ml-2" />
        ) : (
          <ArrowDown size={20} className="ml-2" />
        )}
      </button>
    ),
    key: 'dateTime' as keyof ILogRowTable,
  },
];

const headers = isAdmin
  ? [{ label: 'Cliente', key: 'client' as keyof ILogRowTable }, ...baseHeaders]
  : baseHeaders;

  return (
    <>
      <FilterBar
              search={search}
              onSearchChange={setSearch}
              date={date}
              onDateChange={setDate}
              role={user.role} 
              showButton={false}      />

      {isLoading && <Loading />}
      {error && <p>Erro ao carregar logs.</p>}

   <Table<ILogRowTable>
        headers={headers}
        data={sortedData}
        />
    </>
  );
}
