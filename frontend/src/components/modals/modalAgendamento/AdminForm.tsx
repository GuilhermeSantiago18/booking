import { Dispatch, SetStateAction, useState } from 'react';
import CustomInput from '@/components/Inputs/CustomInput';

interface AdminFormProps {
  onChange: Dispatch<SetStateAction<any>>;
}

export default function AdminForm({ onChange }: AdminFormProps) {
  const [roomName, setRoomName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [slotDuration, setSlotDuration] = useState('15');

  const update = (field: string, value: string) => {
    const data = {
      roomName: field === 'roomName' ? value : roomName,
      startTime: field === 'startTime' ? value : startTime,
      endTime: field === 'endTime' ? value : endTime,
      slotDuration: field === 'slotDuration' ? value : slotDuration,
    };

    if (field === 'roomName') setRoomName(value);
    if (field === 'startTime') setStartTime(value);
    if (field === 'endTime') setEndTime(value);
    if (field === 'slotDuration') setSlotDuration(value);

    onChange(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <CustomInput label="Nome da Sala" value={roomName} onChange={(e) => update('roomName', e.target.value)} />
      <div className="flex gap-2">
        <CustomInput type="time" label="Horário Inicial" value={startTime} onChange={(e) => update('startTime', e.target.value)} />
        <CustomInput type="time" label="Horário Final" value={endTime} onChange={(e) => update('endTime', e.target.value)} />
      </div>
      <label className="text-sm font-medium text-gray-700 mb-1">Bloco de Horários de Agendamento (em minutos)</label>
      <select
        value={slotDuration}
        onChange={(e) => update('slotDuration', e.target.value)}
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
