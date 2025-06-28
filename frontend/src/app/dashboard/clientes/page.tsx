'use client'

import FilterBar from "@/components/shared/Filterbar";
import Table from "@/components/table/Table";
import Loading from "@/components/Loading";
import { useCLients } from "@/hooks/useClients";
import { useState } from "react";
import { ArrowDown, ArrowUp, CheckCircle, XCircle } from "lucide-react";
import { IClientRow } from "@/types/Client";
import { formatDateWithTime } from "@/utils/functionsUtils";
import { useUser } from "@/hooks/useUser";
import { IRole } from "@/types/User";
import { genericFilter } from "@/utils/genericFilterForInput";


export default function Client() {
  const { clients, isLoading, error, updateClient} = useCLients();
  const {user} = useUser()
  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  if (isLoading) return <Loading />;
  if (error) return <p>Erro ao carregar clientes.</p>;

  if (!user) return null;
  
    const { role } = user;
  
    if (role !== IRole.ADMIN && role !== IRole.CLIENT) return null;

 const filteredClients = genericFilter({
  data: clients ?? [],
  search,
  searchKeys: ['firstName', 'lastName', 'email', 'city', 'state'],
  dateKey: 'createdAt',
  dateValue: date,
});

  const sortedClients = [...filteredClients].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const mappedData: IClientRow[] = sortedClients.map(client => ({
  id: client.id,
  createdAt: formatDateWithTime(client.createdAt),
  nome: `${client.firstName} ${client.lastName}`,
  endereco: `${client.city} - ${client.state}`,
  email: client.email,
  canSchedule: client.canSchedule,
  canViewLogs: client.canViewLogs,
  permissoes: (
    <div className="flex gap-2">
      <button
        className={`px-2 py-1 rounded text-sm cursor-pointer ${
          client.canSchedule ? 'bg-black text-white' : 'bg-gray-200 text-black'
        }`}
        onClick={() => updateClient.mutate({ id: client.id, data: { canSchedule: !client.canSchedule } })}
      >
        Agendamento
      </button>
      <button
        className={`px-2 py-1 rounded text-sm  cursor-pointer ${
          client.canViewLogs ? 'bg-black text-white' : 'bg-gray-200 text-black'
        }`}
        onClick={() => updateClient.mutate({ id: client.id, data: { canViewLogs: !client.canViewLogs } })}
      >
        Logs
      </button>
    </div>
  ),
  status: client.status 
    ? <button className="cursor-pointer" onClick={() => updateClient.mutate({ id: client.id, data: { status: !client.status } })}>
      <CheckCircle size={20} className="text-green-600 ml-4" /> 
      </button>
    : <button onClick={() => updateClient.mutate({ id: client.id, data: { status: !client.status } })}>
      <XCircle size={20} className="text-red-400 ml-4 cursor-pointer" /> 
      </button>
}));



  const handleSortClick = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <>
      <FilterBar
        screen="clientes"
        search={search}
        onSearchChange={setSearch}
        date={date}
        onDateChange={setDate}
        role={user?.role}
        showButton={false}
      />

      <Table<IClientRow>
        onPageChange={setCurrentPage}
        currentPage={currentPage}
        headers={[
          {
            label: (
              <button onClick={handleSortClick} className="flex items-center cursor-pointer">
                Data de cadastro
                {sortOrder === 'asc' ? (
                  <ArrowUp size={20} className="ml-2" />
                ) : (
                  <ArrowDown size={20} className="ml-2" />
                )}
              </button>
            ),
            key: 'createdAt',
          },
          { label: 'Nome', key: 'nome' },
          { label: 'Email', key: 'email' },
          { label: 'Cidade / Estado', key: 'endereco' },
          { label: 'Permissões', key: 'permissoes' },
          { label: 'Status', key: 'status' },
        ]}
        data={mappedData}
      />
    </>
  );
}
