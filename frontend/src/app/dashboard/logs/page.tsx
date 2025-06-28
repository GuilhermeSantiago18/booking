'use client';

import { useState } from "react";
import FilterBar from "@/components/shared/Filterbar";
import Table from "@/components/table/Table";
import Loading from "@/components/Loading";
import { useUser } from "@/hooks/useUser";
import { useLogs } from "@/hooks/useLogs";
import { IRole } from "@/types/User";
import { ILogRowTable } from "@/types/Logs";
import { ArrowDown, ArrowUp } from "lucide-react";
import { formatDateWithTime } from "@/utils/functionsUtils";
import { genericFilter } from "@/utils/genericFilterForInput";

export default function Logs() {
  const { user } = useUser();
  const { logs, isLoading, error } = useLogs();

  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  if (!user || !user.canViewLogs) return <p className="font-montserrat">Não é possível carregar Logs.</p>

  const isAdmin = user.role === IRole.ADMIN;

      const filteredLogs = genericFilter({
      data: logs ?? [],
      search,
      searchKeys: isAdmin
        ? ['user.firstName', 'user.lastName', 'type', 'module']
        : ['type', 'module'],
      dateKey: 'createdAt',
      dateValue: date,
    });


  const mappedData: ILogRowTable[] = filteredLogs.map(log => ({
    id: log.id,
   client: (
    <>
      {log.user.firstName} {log.user.lastName}{' '}
      <span className="text-xs text-gray-400">({log.user.role})</span>
    </>
  ),
    type: log.type,
    module: log.module,
    dateTime: formatDateWithTime(log.createdAt),
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
        Data de registro
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
              screen="logs"
              search={search}
              onSearchChange={setSearch}
              date={date}
              onDateChange={setDate}
              role={user.role} 
              showButton={false}
     />

      {isLoading && <Loading />}
      {error && <p>Erro ao carregar logs.</p>}

   <Table<ILogRowTable>
        onPageChange={setCurrentPage}
        currentPage={currentPage}
        headers={headers}
        data={sortedData}
        />
    </>
  );
}
