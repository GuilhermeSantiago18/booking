'use client';

import FilterBar from '@/components/shared/Filterbar';
import Table from '@/components/table/Table';
import Loading from '@/components/Loading';
import { useRooms } from '@/hooks/useRooms';
import { useUser } from '@/hooks/useUser';
import { IRole } from '@/types/User';
import { formatDateWithTime } from '@/utils/functionsUtils';
import { useState } from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react';

export default function Salas() {
  const { rooms, isLoading, error } = useRooms();
  const { user } = useUser();
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);

  if (isLoading) return <Loading />;
  if (error) return <p>Erro ao carregar salas.</p>;
  if (!user) return null;
  if (user.role !== IRole.ADMIN) return null;

  const filteredRooms = (rooms ?? []).filter(room =>
    room.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortedRooms = [...filteredRooms].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const mappedData = sortedRooms.map(room => ({
    id: room.id,
    createdAt: formatDateWithTime(room.createdAt),
    name: room.name,
    capacity: room.capacity,
    description: room.description,
  }));

  const handleSortClick = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <>
      <FilterBar
        screen="salas"
        search={search}
        onSearchChange={setSearch}
        showDateFilter={false}
        role={user?.role}
        showButton={false}
      />

      <Table
        onPageChange={setCurrentPage}
        currentPage={currentPage}
        headers={[
          {
            label: (
              <button onClick={handleSortClick} className="flex items-center cursor-pointer">
                Data de criação
                {sortOrder === 'asc' ? (
                  <ArrowUp size={20} className="ml-2" />
                ) : (
                  <ArrowDown size={20} className="ml-2" />
                )}
              </button>
            ),
            key: 'createdAt',
          },
          { label: 'Nome', key: 'name' },
          { label: 'Capacidade', key: 'capacity' },
          { label: 'Descrição', key: 'description' },
        ]}
        data={mappedData}
      />
    </>
  );
}
