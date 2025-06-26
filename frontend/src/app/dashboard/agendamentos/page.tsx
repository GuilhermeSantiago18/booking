'use client'

import FilterBar from "@/components/shared/Filterbar";
import Table from "@/components/table/Table";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import ModalAgendamento from "@/components/modals/ModalAgendamento";
import { useAppointments } from "@/hooks/useAppointments";

export default function Agendamentos() {
  const { appointments, isLoading, error } = useAppointments();
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
  console.log("appointments", appointments)

  const mappedData = (appointments ?? []).map(appointment => ({
    dateAppointment: appointment.date,
    nome: `${'Gui'} ${'test'}`,
    roomName: appointment.room_id,
    statusAppointment: appointment.status,
    ...appointment,
  }));


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

      {isLoading && <p>Carregando agendamentos...</p>}
      {error && <p>Erro ao carregar agendamentos.</p>}

      <Table
        headers={[
          { label: 'Data de agendamento', key: 'date' },
          { label: 'Nome', key: 'nome' },
          { label: 'Sala de agendamento', key: 'roomName' },
          { label: 'Status transação', key: 'status' },
        ]}
        data={mappedData}
        renderActions={(row) =>
          row.status === 'PENDENTE' && (
            <button className="text-red-600 hover:underline">
              Cancelar
            </button>
          )
        }
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
