export function formatDateWithTime(date: string | Date): string {
  const d = new Date(date);
  
  const formattedDate = d.toISOString().split('T')[0];
  const formattedTime = d.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Sao_Paulo', 
  });

  return `${formattedDate} às ${formattedTime}`;
}
