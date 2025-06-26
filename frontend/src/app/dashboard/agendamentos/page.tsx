'use client'

import FilterBar from "@/components/shared/Filterbar";
import Table from "@/components/table/Table";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import ModalAgendamento from "@/components/modals/ModalAgendamento";

export default function Agendamentos() {
  const { data: user } = useUser();
  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleActionClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmModal = (data: any) => {
    console.log('Dados do agendamento recebidos:', data);
    setIsModalOpen(false);
  };

  if (!user) return null;

  return (
    <>
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        date={date}
        onDateChange={setDate}
        role={user.role}
        onActionClick={handleActionClick}
      />

      <Table
        headers={[
          { label: 'Data de agendamento', key: 'date' },
          { label: 'Nome', key: 'nome' },
          { label: 'Sala de agendamento', key: 'roomName' },
          { label: 'Status transação', key: 'status' },
        ]}
        renderActions={(row) =>
          row.status === 'PENDENTE' && (
            <button className="text-red-600 hover:underline">
              Cancelar
            </button>
          )
        }
        data={[]}
      />

      <ModalAgendamento
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmModal}
        role={user.role}
      />
    </>
  );
}
