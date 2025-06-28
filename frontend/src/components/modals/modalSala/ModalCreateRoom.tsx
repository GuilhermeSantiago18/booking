'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import MainButton from '@/components/buttons/MainButton';
import CustomInput from '@/components/Inputs/CustomInput';
import { IRoom } from '@/types/Room';

interface ModalCreateRoomProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: IRoom) => void;
}

export default function ModalCreateRoom({
  isOpen,
  onClose,
  onConfirm,
}: ModalCreateRoomProps) {
  const [formData, setFormData] = useState<Partial<IRoom>>({});

  useEffect(() => {
    if (isOpen) {
      setFormData({
        name: '',
        description: '',
        capacity: 10,
        startTime: '08:00',
        endTime: '18:00',
        slotDurationMinutes: 30,
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirm = () => {
      onConfirm(formData as IRoom);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-6">Nova Sala</h2>

        <div className="space-y-2">
          <CustomInput
            label="Nome da Sala"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ex: Sala 01"
          />

          <CustomInput
            label="Descrição"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Ex: Sala com projetor"
          />
        </div>

        <p className="text-xs text-gray-500 mt-4 font-montserrat mb-2">
         Esses campos podem ser editados depois via “Ajustes de Agendamento” na tela de Agendamentos.
        </p>
        <ul className="text-xs text-gray-700 font-montserrat list-disc ml-4">
          <li>Capacidade: 10 pessoas</li>
          <li>Horário: 08:00 às 18:00</li>
          <li>Duração por slot: 30 minutos</li>
        </ul>

        <MainButton className="mt-6 w-full" onClick={handleConfirm}>
          Criar Sala
        </MainButton>
      </div>
    </div>
  );
}
