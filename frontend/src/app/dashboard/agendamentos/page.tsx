'use client'

import FilterBar from "@/components/shared/Filterbar";
import Table from "@/components/table/Table";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import ModalAgendamento from "@/components/modals/ModalAgendamento";
import { useAppointments } from "@/hooks/useAppointments";
import Loading from "@/components/Loading";
import { ICreateAppointmentData } from "@/types/Appointment";
import { Check, X } from "lucide-react";

export default function Agendamentos() {
  const { appointments, isLoading, error, cancelAppointment, createAppointment, updateStatusAppointment  } = useAppointments();
  const { user } = useUser();
  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleActionClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmModal = async (data: ICreateAppointmentData) => {
    try {
    await createAppointment.mutateAsync(data)
    setIsModalOpen(false);
    }
    catch(error) {
    }
  };

  if (!user) return null;

const filteredAppointments = (appointments ?? []).filter((appointment) => {
  const fullName = `${appointment.User.firstName} ${appointment.User.lastName}`.toLowerCase();
  const searchMatch = fullName.includes(search.toLowerCase());
  const dateMatch = date ? appointment.date === date : true;

  return searchMatch && dateMatch;
});
console.log("filteredAppointments", filteredAppointments)

const mappedData = filteredAppointments.map(appointment => ({
  date: `${appointment.date} às ${appointment.time.slice(0,5)}`,
  nome: `${appointment.User.firstName} ${appointment.User.lastName}`,
  roomName: appointment.Room.name,
  status: appointment.status,
  id: appointment.id,
  time: appointment.time,
  room_id: appointment.room_id,
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

      {isLoading && <Loading />}
      {error && <p>Erro ao carregar agendamentos.</p>}

      <Table
        headers={[
          { label: 'Data de agendamento', key: 'date' },
          { label: 'Nome', key: 'nome' },
          { label: 'Sala de agendamento', key: 'roomName' },
          { label: 'Status transação', key: 'status' },
        ]}
        data={mappedData}
        renderActions={(row) => {
  if (user.role === 'admin') {
    return (
      <div className="flex gap-2 justify-center">
        {row.status === 'PENDENTE' && row.status === 'RECUSADO' && (
          <button onClick={() => updateStatusAppointment.mutate({id: row.id, status: 'RECUSADO'})}>
            <Check className="hover:text-green-600" />
          </button>
        )}
        <button onClick={() => updateStatusAppointment.mutate({ id: row.id, status: 'RECUSADO' })}>
          <X className="hover:text-red-600" />
        </button>
      </div>
    );
  }

  if (user.role === 'client' && row.status === 'PENDENTE') {    
    return (
      <button className="cursor-pointer ml-4 md:ml-8" onClick={() => updateStatusAppointment.mutate({ id: row.id, status: 'RECUSADO' })}>
        <X />
      </button>
    );
  }

  return null;
}}

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
