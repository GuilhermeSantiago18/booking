export function generateTimeSlots(start: string, end: string, step: number): string[] {
  console.log(start,end,step)
  const [startHour, startMin] = start.split(':').slice(0, 2).map(Number);
  const [endHour, endMin] = end.split(':').slice(0, 2).map(Number);

  console.log('startHour, startMin:', startHour, startMin);
  console.log('endHour, endMin:', endHour, endMin);

  const startTotal = startHour * 60 + startMin;
  const endTotal = endHour * 60 + endMin;

  const times: string[] = [];

  for (let mins = startTotal; mins < endTotal; mins += step) {
    const hour = String(Math.floor(mins / 60)).padStart(2, '0');
    const min = String(mins % 60).padStart(2, '0');
    times.push(`${hour}:${min}`);
  }

  console.log('generated times:', times);
  return times;
}
