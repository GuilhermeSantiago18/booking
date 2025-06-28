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


export function getPlaceholder(role: string, showButton: boolean, area: 'logs' | 'agendamentos' | 'clientes' | 'salas'): string {

  if (area === 'agendamentos') return "Filtre por nome, sala ou status";
  if (role === 'admin') {
    if (area === 'logs') return "Filtre por nome, atividade ou módulo"
    if (area === 'clientes') return "Filtre por nome, email ou cidade";
  }

  if (role === 'client') {
    if (area === 'logs') return "Filtre por atividade ou módulo";
  }

  return "Filtre por nome";
}
