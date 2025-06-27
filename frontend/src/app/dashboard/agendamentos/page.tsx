'use client'

import FilterBar from "@/components/shared/Filterbar";
import Table from "@/components/table/Table";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import ModalAgendamento from "@/components/modals/ModalAgendamento";
import { useAppointments } from "@/hooks/useAppointments";
import Loading from "@/components/Loading";
import { AppointmentStatus, ICreateAppointmentData } from "@/types/Appointment";
import { Check, X } from "lucide-react";
import { useRooms } from "@/hooks/useRooms";
import { IRoom } from "@/types/Room";

export default function Agendamentos() {
  const { appointments, isLoading, error, createAppointment, updateStatusAppointment  } = useAppointments();
  const {updateRoom } = useRooms()
  const { user } = useUser();
  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAdmin = user?.role === 'admin';
  const isClient = user?.role === 'client';


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

  const handleUpdateRoom = async (data: IRoom) => {
    console.log("data", data)
    await updateRoom.mutateAsync(data)
    setIsModalOpen(false);
  }

  if (!user) return null;

const filteredAppointments = (appointments ?? []).filter((appointment) => {
  const fullName = `${appointment.User.firstName} ${appointment.User.lastName}`.toLowerCase();
  const searchMatch = fullName.includes(search.toLowerCase());
  const dateMatch = date ? appointment.date === date : true;

  return searchMatch && dateMatch;
});

const mappedData = filteredAppointments.map(appointment => ({
  date: `${appointment.date} às ${appointment.time.slice(0,5)}`,
  nome: `${appointment.User.firstName} ${appointment.User.lastName}`,
  roomName: appointment.Room.name,
  status: appointment.status,
  id: appointment.id,
  time: appointment.time,
  room_id: appointment.room_id,
}));

function renderAppointmentActions({ row, userRole, updateStatus }: ActionProps) {
  const handleClick = (status: AppointmentStatus) => {
    updateStatus.mutate({ id: row.id, status });
  };

  if (userRole === "admin") {
    if (row.status === AppointmentStatus.PENDENTE) {
      return (
        <div className="flex gap-2 justify-center">
          <button onClick={() => handleClick(AppointmentStatus.CONFIRMADO)}>
            <Check className="hover:text-green-600" />
          </button>
          <button onClick={() => handleClick(AppointmentStatus.RECUSADO)}>
            <X className="hover:text-red-600" />
          </button>
        </div>
      );
    }

    if (row.status === AppointmentStatus.CONFIRMADO) {
      return (
        <div className="flex gap-2 justify-center">
          <button onClick={() => handleClick(AppointmentStatus.RECUSADO)}>
            <X className="hover:text-red-600" />
          </button>
        </div>
      );
    }

    return null;
  }

  if (userRole === "client" && row.status === AppointmentStatus.PENDENTE) {
    return (
      <button className="cursor-pointer ml-4 md:ml-8" onClick={() => handleClick(AppointmentStatus.RECUSADO)}>
        <X />
      </button>
    );
  }

  return null;
}




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
         renderActions={(row) =>
    renderAppointmentActions({
      row,
      userRole: user.role,
      updateStatus: updateStatusAppointment,
    })}

      />

      <ModalAgendamento
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={isClient ? handleConfirmModal : handleUpdateRoom}
        role={user.role}
      />
    </>
  );
}
