'use client'

import FilterBar from "@/components/shared/Filterbar";
import Table from "@/components/table/Table";
import Loading from "@/components/Loading";
import { useCLients } from "@/hooks/useClients";
import { useState } from "react";
import { IRole } from "@/types/User";
import { ArrowDown, ArrowUp } from "lucide-react";
import { IClient, IClientRow } from "@/types/Client";


export default function Client() {
  const { clients, isLoading, error } = useCLients();
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
    permissoes: [
      client.canSchedule ? 'Agendamento' : '',
      client.canViewLogs ? 'Logs' : ''
    ].filter(Boolean).join(', '),
    status: client.status ? 'Ativo' : 'Inativo',
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
        getRowClassName={(row) => (row.status === 'Ativo' ? 'bg-[#F2FFFD]' : 'bg-[#FFF3F3]')}
      />
    </>
  );
}
