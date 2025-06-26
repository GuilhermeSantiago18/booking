'use client';

import { X } from 'lucide-react';
import CustomInput from '@/components/Inputs/CustomInput';
import MainButton from '@/components/buttons/MainButton';
import DateInput from '@/components/Inputs/DateInput';
import { useState } from 'react';

interface ModalAgendamentoProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  role: 'client' | 'admin';
}

export default function ModalAgendamento({
  isOpen,
  onClose,
  onConfirm,
  role,
}: ModalAgendamentoProps) {
  const [clientDate, setClientDate] = useState('');
  const [clientTime, setClientTime] = useState('');
  const [clientRoom, setClientRoom] = useState('');

  const [adminRoomName, setAdminRoomName] = useState('');
  const [adminStart, setAdminStart] = useState('');
  const [adminEnd, setAdminEnd] = useState('');
  const [adminBlock, setAdminBlock] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (role === 'client') {
      onConfirm({
        date: clientDate,
        time: clientTime,
        room: clientRoom,
      });
    } else {
      onConfirm({
        roomName: adminRoomName,
        startTime: adminStart,
        endTime: adminEnd,
        timeBlock: adminBlock,
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-6">
          {role === 'client' ? 'Novo Agendamento' : 'Ajustes de Agendamento'}
        </h2>

        <div className="flex flex-col gap-4">
          {role === 'client' ? (
            <>
              <DateInput value={clientDate} onChange={(e) => setClientDate(e.target.value)} label="Selecione uma data" />
              <CustomInput type="time" label="Selecione um horário" value={clientTime} onChange={(e) => setClientTime(e.target.value)} />
              <CustomInput label="Selecione uma sala" placeholder="Digite ou escolha a sala" value={clientRoom} onChange={(e) => setClientRoom(e.target.value)} />
            </>
          ) : (
            <>
              <CustomInput label="Nome da Sala" value={adminRoomName} onChange={(e) => setAdminRoomName(e.target.value)} />
              <div className="flex gap-2">
                <CustomInput type="time" label="Horário Inicial" value={adminStart} onChange={(e) => setAdminStart(e.target.value)} />
                <CustomInput type="time" label="Horário Final" value={adminEnd} onChange={(e) => setAdminEnd(e.target.value)} />
              </div>
             <label className="text-sm font-medium text-gray-700 mb-1">
            Bloco de Horários de Agendamento (em minutos)
             </label>
            <select
              value={adminBlock}
              onChange={(e) => setAdminBlock(e.target.value)}
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value={15}>15 minutos</option>
              <option value={30}>30 minutos</option>
              <option value={45}>45 minutos</option>
              <option value={60}>60 minutos</option>
            </select>
            </>
          )}
        </div>

        <MainButton onClick={handleSubmit} className="mt-6 w-full">
          {role === 'client' ? 'Confirmar Agendamento' : 'Salvar'}
        </MainButton>
      </div>
    </div>
  );
}
