import { CalendarRange, Logs, User } from 'lucide-react';

export interface IMenuItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  roles: ('client' | 'admin')[];
}


export const menuItems: IMenuItem[] = [
  {
    href: '/dashboard/agendamentos',
    label: 'Agendamentos',
    icon: <CalendarRange size={18} />,
    roles: ['client', 'admin'],
  },
  {
    href: '/dashboard/logs',
    label: 'Logs',
    icon: <Logs size={18} />,
    roles: ['client', 'admin'],
  },
  {
    href: '/dashboard/perfil',
    label: 'Minha Conta',
    icon: <User size={18} />,
    roles: ['client'],
  },
  {
    href: '/dashboard/clientes',
    label: 'Clientes',
    icon: <User size={18} />,
    roles: ['admin'],
  },
];
