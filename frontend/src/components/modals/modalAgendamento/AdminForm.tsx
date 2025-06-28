import { Dispatch, SetStateAction, useState } from 'react';
import CustomInput from '@/components/Inputs/CustomInput';
import { IRoom } from '@/types/Room';

interface AdminFormProps {
  rooms: IRoom[];
  onChange: Dispatch<SetStateAction<any>>;
}

export default function AdminForm({ rooms, onChange }: AdminFormProps) {
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [slotDuration, setSlotDuration] = useState('15');
  const [roomName, setRoomName] = useState('');

  const handleRoomChange = (roomIdStr: string) => {
    const roomId = Number(roomIdStr);
    setSelectedRoomId(roomId);

    const room = rooms.find((r) => r.id === roomId);
    if (room) {
      setStartTime(room.startTime);
      setEndTime(room.endTime);
      setSlotDuration(String(room.slotDurationMinutes));
      setRoomName(room.name);

      onChange({
        roomId: room.id,
        startTime: room.startTime,
        endTime: room.endTime,
        slotDuration: String(room.slotDurationMinutes),
        name: room.name,
      });
    }
  };

  const update = (field: string, value: string) => {
    if (field === 'startTime') setStartTime(value);
    if (field === 'endTime') setEndTime(value);
    if (field === 'slotDuration') setSlotDuration(value);
    if (field === 'name') setRoomName(value);

    onChange({
      roomId: selectedRoomId,
      startTime,
      endTime,
      slotDuration,
      name: field === 'name' ? value : roomName,
      [field]: value,
    });
  };

  const isDisabled = selectedRoomId === null;

  return (
    <div className="flex flex-col gap-4 font-montserrat">
      <label className="text-sm font-medium text-gray-700 mb-1">Selecione a Sala</label>
      <select
        value={selectedRoomId ?? ''}
        onChange={(e) => handleRoomChange(e.target.value)}
        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
      >
        <option value="">Selecione uma sala</option>
        {rooms.map((room) => (
          <option key={room.id} value={room.id}>
            {room.name}
          </option>
        ))}
      </select>

      {selectedRoomId !== null && (
        <CustomInput
          label="Novo nome da sala"
          value={roomName}
          onChange={(e) => update('name', e.target.value)}
        />
      )}

      <div className="flex gap-2">
        <CustomInput
          type="time"
          label="Horário Inicial"
          value={startTime}
          onChange={(e) => update('startTime', e.target.value)}
          disabled={isDisabled}
        />
        <CustomInput
          type="time"
          label="Horário Final"
          value={endTime}
          onChange={(e) => update('endTime', e.target.value)}
          disabled={isDisabled}
        />
      </div>

      <label className="text-sm font-medium text-gray-700 mb-1">
        Bloco de Horários de Agendamento (em minutos)
      </label>
      <select
        value={slotDuration}
        onChange={(e) => update('slotDuration', e.target.value)}
        disabled={isDisabled}
        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
      >
        <option value="15">15 minutos</option>
        <option value="30">30 minutos</option>
        <option value="45">45 minutos</option>
        <option value="60">60 minutos</option>
      </select>
    </div>
  );
}
