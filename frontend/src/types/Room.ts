
export interface IRoom {
  createdAt: string | Date;
  startDate: Date;
  endDate: Date;
  roomId: number;
  id: number;
  name: string;
  capacity?: number;
  description?: string;
  startTime: string;
  endTime: string;
  slotDurationMinutes: number;
}
