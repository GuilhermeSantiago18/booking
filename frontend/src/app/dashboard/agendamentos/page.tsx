'use client'

import FilterBar from "@/components/shared/Filterbar";
import Table, { Column } from "@/components/table/Table";
import { useState } from "react";
import { useUser } from "@/hooks/useUser";
import ModalAgendamento from "@/components/modals/modalAgendamento/ModalAgendamento";
import { useAppointments } from "@/hooks/useAppointments";
import Loading from "@/components/Loading";
import { AppointmentStatus, IAppointmentRow, ICreateAppointmentData } from "@/types/Appointment";
import { ArrowDown, ArrowUp, CircleCheck, CircleX, X, XCircle } from "lucide-react";
import { useRooms } from "@/hooks/useRooms";
import { IRoom } from "@/types/Room";
import { IRole } from "@/types/User";
import { genericFilter } from "@/utils/genericFilterForInput";

export default function Agendamentos() {
  const { appointments, isLoading, error, createAppointment, updateStatusAppointment  } = useAppointments();
  const {updateRoom } = useRooms()
  const { user } = useUser();
  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  if (!user) return null;

  const { role } = user;

  if (role !== IRole.ADMIN && role !== IRole.CLIENT) return null;

  const isClient = role === IRole.CLIENT;

  interface ActionProps {
  row: {
    id: number;
    status: AppointmentStatus;
  };
  userRole: IRole;
  updateStatus: ReturnType<typeof useAppointments>['updateStatusAppointment'];
}



  const handleActionClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmModal = async (data: ICreateAppointmentData) => {
    try {
    await createAppointment.mutateAsync(data)
    setIsModalOpen(false);
    }
    catch(error) {
        console.error(error, 'confirm appointment')
    }
  };

  const handleUpdateRoom = async (data: IRoom) => {
    try {
    await updateRoom.mutateAsync(data)
    setIsModalOpen(false);
    }catch(error) {
      console.error(error, 'update room')
    }
    
  }



const filteredAppointments = genericFilter({
  data: appointments ?? [],
  search,
  searchKeys: ['User.firstName', 'User.lastName', 'status', 'Room.name'],
  dateKey: 'date',
  dateValue: date,
});


const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    const dateTimeA = new Date(`${a.date}T${a.time}`).getTime();
    const dateTimeB = new Date(`${b.date}T${b.time}`).getTime();
    return sortOrder === 'asc' ? dateTimeA - dateTimeB : dateTimeB - dateTimeA;
  });

const mappedData: IAppointmentRow[] = sortedAppointments.map(appointment => ({
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
        <div className="flex gap-2 justify-start">
          <button onClick={() => handleClick(AppointmentStatus.CONFIRMADO)}>
            <CircleCheck className="hover:text-green-600 cursor-pointer" />
          </button>
          <button onClick={() => handleClick(AppointmentStatus.RECUSADO)}>
            <CircleX className="hover:text-red-600 cursor-pointer" />
          </button>
        </div>
      );
    }
     if (row.status === AppointmentStatus.CONFIRMADO) {
    return (
      <button className="cursor-pointer flex hover:text-red-600 ml-3" onClick={() => handleClick(AppointmentStatus.RECUSADO)}>
        <XCircle />
      </button>
    );
  }
  }

  if (user?.canSchedule && (row.status === AppointmentStatus.PENDENTE || row.status === AppointmentStatus.CONFIRMADO)) {
    return (
      <button className="cursor-pointer flex justify-start hover:text-red-600" onClick={() => handleClick(AppointmentStatus.RECUSADO)}>
        <XCircle />
      </button>
    );
  }

  return null;
}


  const handleSortClick = () => {
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

const headers: Column<IAppointmentRow>[] = [
  {
    label: (
      <button onClick={handleSortClick} className="flex items-center cursor-pointer">
        Data de agendamento
        {sortOrder === 'asc' ? (
          <ArrowUp size={20} className="ml-2" />
        ) : (
          <ArrowDown size={20} className="ml-2" />
        )}
      </button>
    ),
    key: 'date',
  },
  { label: 'Nome', key: 'nome' },
  { label: 'Sala de agendamento', key: 'roomName' },
  { label: 'Status transação', key: 'status' },
  { label: 'Ação', key: 'actions' },
];

const getRowClassName = (row: IAppointmentRow) => {
  if (row.status === 'CONFIRMADO') return 'bg-[#F2FFFD]';
  if (row.status === 'RECUSADO') return 'bg-[#FFF3F3]';
  return 'bg-white';
};

const renderActions = (row: IAppointmentRow) =>
  renderAppointmentActions({
    row,
    userRole: user.role,
    updateStatus: updateStatusAppointment,
  });


  return (
    <>
      <FilterBar
        screen="agendamentos"
        showButton={true}
        search={search}
        onSearchChange={setSearch}
        date={date}
        onDateChange={setDate}
        role={user.role}
        onActionClick={handleActionClick}
      />

      {isLoading && <Loading />}
      {error && <p>Erro ao carregar agendamentos.</p>}
     <Table<IAppointmentRow>
        headers={headers}
        data={mappedData}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        getRowClassName={getRowClassName}
        renderActions={renderActions}
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
