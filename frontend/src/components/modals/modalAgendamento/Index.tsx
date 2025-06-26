'use client';

import { X } from 'lucide-react';
import MainButton from '@/components/buttons/MainButton';
import { useEffect, useState } from 'react';
import { getAllRooms } from '@/services/api';
import ClientForm from './ClientForm';
import AdminForm from './AdminForm';
import { IRoom } from '@/types/Room';

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
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await getAllRooms();
        setRooms(response.data);
      } catch (error) {
        console.error('Erro ao buscar salas:', error);
      }
    };
    if (isOpen) fetchRooms();
  }, [isOpen]);

  const handleSubmit = () => {
    onConfirm(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-6">
          {role === 'client' ? 'Novo Agendamento' : 'Ajustes de Agendamento'}
        </h2>

        {role === 'client' ? (
          <ClientForm rooms={rooms} onChange={setFormData} />
        ) : (
          <AdminForm onChange={setFormData} />
        )}

        <MainButton onClick={handleSubmit} className="mt-6 w-full">
          {role === 'client' ? 'Confirmar Agendamento' : 'Salvar'}
        </MainButton>
      </div>
    </div>
  );
}