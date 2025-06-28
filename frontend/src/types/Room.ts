
export interface IRoom {
  createdAt: string | Date;
  startDate: any;
  endDate: any;
  roomId: number;
  id: number;
  name: string;
  capacity?: number;
  description?: string;
  startTime: string;
  endTime: string;
  slotDurationMinutes: number;
}
