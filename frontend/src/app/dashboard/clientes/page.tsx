'use client'

import FilterBar from "@/components/shared/Filterbar";
import Table from "@/components/table/Table";
import Loading from "@/components/Loading";
import { useCLients } from "@/hooks/useClients";
import { useState } from "react";
import { IRole } from "@/types/User";
import { ArrowDown, ArrowUp, Check, X } from "lucide-react";
import { IClientRow } from "@/types/Client";


export default function Client() {
  const { clients, isLoading, error, updateClient} = useCLients();
  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  if (isLoading) return <Loading />;
  if (error) return <p>Erro ao carregar clientes.</p>;

  const filteredClients = (clients ?? []).filter((client) => {
    const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
    const searchMatch = fullName.includes(search.toLowerCase());
    const dateMatch = date ? client.createdAt.startsWith(date) : true;
    return searchMatch && dateMatch;
  });

  const sortedClients = [...filteredClients].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const mappedData: IClientRow[] = sortedClients.map(client => ({
  id: client.id,
  createdAt: new Date(client.createdAt).toLocaleDateString('pt-BR'),
  nome: `${client.firstName} ${client.lastName}`,
  endereco: `${client.street}, ${client.number || 'S/N'} - ${client.district}, ${client.city} - ${client.state}`,
  canSchedule: client.canSchedule,
  canViewLogs: client.canViewLogs,
  status: client.status,
}));


  const handleSortClick = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <>
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        date={date}
        onDateChange={setDate}
        role={IRole.ADMIN}
        showButton={false}
      />

      <Table<IClientRow>
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
          { label: 'Endereço', key: 'endereco' },
          { label: 'Permissões', key: 'permissoes' },
          { label: 'Status', key: 'status' },
        ]}
        data={mappedData}
        renderActions={(row) => (
  <div className="flex gap-2">
    <button
      className={`px-2 py-1 rounded text-sm ${
        row.canSchedule ? 'bg-black text-white' : 'bg-gray-200 text-black'
      }`}
      onClick={() => updateClient.mutate({ id: row.id, data: { canSchedule: !row.canSchedule } })}
    >
      Agendamento
    </button>

    <button
      className={`px-2 py-1 rounded text-sm ${
        row.canViewLogs ? 'bg-black text-white' : 'bg-gray-200 text-black'
      }`}
      onClick={() => updateClient.mutate({ id: row.id, data: { canViewLogs: !row.canViewLogs } })}
    >
      Logs
    </button>

    <button
      className="text-gray-600 hover:text-black"
      onClick={() => updateClient.mutate({ id: row.id, data: { status: !row.status } })}
    >
      {row.status ? <Check size={18} className="text-green-600" /> : <X size={18} className="text-red-600" />}
    </button>
  </div>
)}
      />
    </>
  );
}
