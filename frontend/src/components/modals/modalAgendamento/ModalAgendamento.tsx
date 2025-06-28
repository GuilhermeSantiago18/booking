import { useRooms } from '@/hooks/useRooms';
import ClientForm from './ClientForm';
import AdminForm from './AdminForm';
import MainButton from '@/components/buttons/MainButton';
import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { IRole } from '@/types/User';

interface ModalAgendamentoProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: unknown) => void;
  role: IRole;
}

export default function ModalAgendamento({ isOpen, onClose, onConfirm, role }: ModalAgendamentoProps) {
  const { rooms, isLoading, error } = useRooms();
  const [formData, setFormData] = useState<unknown>();

  useEffect(() => {
    if (isOpen) {
      setFormData({});
    }
  }, [isOpen]);

  if (!isOpen || !rooms) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-black">
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold mb-6">
          {role === 'client' ? 'Novo Agendamento' : 'Ajustes de Agendamento'}
        </h2>

        {isLoading && <p>Carregando salas...</p>}
        {error && <p>Erro ao carregar salas.</p>}

        {!isLoading && !error && (
          role === 'client' ? (
            <ClientForm rooms={rooms || []} onChange={setFormData} />
          ) : (
            <AdminForm onChange={setFormData} rooms={rooms || []} />
          )
        )}

        <MainButton
          className="mt-6 w-full"
          onClick={() => {
            onConfirm(formData);
            onClose();
          }}
        >
          {role === 'client' ? 'Confirmar Agendamento' : 'Salvar'}
        </MainButton>
      </div>
    </div>
  );
}
