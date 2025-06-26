
export interface IRoom {
  id: number;
  name: string;
  capacity?: number;
  description?: string;
  startTime: string;
  endTime: string;
  slotDurationMinutes: number;
}
