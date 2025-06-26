import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import DateInput from '@/components/Inputs/DateInput';
import { IRoom } from '@/types/Room';
import { generateTimeSlots } from '@/utils/generateTimeSlots'; // ou onde estiver
import { TODAY } from '@/constants';

interface ClientFormProps {
  rooms: IRoom[];
  onChange: Dispatch<SetStateAction<any>>;
}

export default function ClientForm({ rooms, onChange }: ClientFormProps) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [roomId, setRoomId] = useState<number | ''>('');
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  useEffect(() => {
    if (roomId === '') {
      setAvailableTimes([]);
      setTime('');
      return;
    }
    const selectedRoom = rooms.find(r => r.id === roomId);
    if (!selectedRoom) {
      setAvailableTimes([]);
      setTime('');
      return;
    }
    const times = generateTimeSlots(
      selectedRoom.startTime,
      selectedRoom.endTime,
      selectedRoom.slotDurationMinutes,
    );
    setAvailableTimes(times);
    setTime('');
  }, [roomId, rooms]);


  const update = (field: string, value: string | number) => {
    let newDate = date;
    let newTime = time;
    let newRoom = roomId;

    if (field === 'date' && typeof value === 'string') newDate = value;
    if (field === 'time' && typeof value === 'string') newTime = value;
    if (field === 'room' && (typeof value === 'string' || typeof value === 'number')) {
      newRoom = typeof value === 'string' ? Number(value) : value;
    }

    setDate(newDate);
    setTime(newTime);
    setRoomId(newRoom);

    onChange({ date: newDate, time: newTime, room: newRoom });
  };

  return (
    <div className="flex flex-col gap-4">
      <DateInput value={date} min={TODAY} onChange={e => update('date', e.target.value)} label="Selecione uma data" />

      <select
        value={roomId}
        onChange={e => update('room', e.target.value)}
        className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black"
      >
        <option value="">Selecione uma sala</option>
        {rooms.map(room => (
          <option key={room.id} value={room.id}>
            {room.name}
          </option>
        ))}
      </select>

      <select
        value={time}
        onChange={e => update('time', e.target.value)}
        disabled={availableTimes.length === 0}
        className="border rounded px-3 py-2"
      >
        <option value="" disabled>
          {availableTimes.length === 0 ? 'Selecione uma sala primeiro' : 'Selecione um horário'}
        </option>
        {availableTimes.map(slot => (
          <option key={slot} value={slot}>
            {slot}
          </option>
        ))}
      </select>
    </div>
  );
}
