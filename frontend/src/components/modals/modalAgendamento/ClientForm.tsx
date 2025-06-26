import { Dispatch, SetStateAction, useState } from 'react';
import DateInput from '@/components/Inputs/DateInput';
import { IRoom } from '@/types/Room';

interface ClientFormProps {
  rooms: IRoom[];
  onChange: Dispatch<SetStateAction<any>>;
}

export default function ClientForm({ rooms, onChange }: ClientFormProps) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [room, setRoom] = useState('');

  const update = (field: string, value: string) => {
    const data = { date, time, room, [field]: value };
    if (field === 'date') setDate(value);
    if (field === 'time') setTime(value);
    if (field === 'room') setRoom(value);
    onChange(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <DateInput value={date} onChange={(e) => update('date', e.target.value)} label="Selecione uma data" />
      <input
        type="time"
        className="border rounded px-3 py-2"
        value={time}
        onChange={(e) => update('time', e.target.value)}
      />
      <select
        value={room}
        onChange={(e) => update('room', e.target.value)}
        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
      >
        <option value="">Selecione uma sala</option>
        {rooms.map((room) => (
          <option key={room.id} value={room.id}>{room.name}</option>
        ))}
      </select>
    </div>
  );
}