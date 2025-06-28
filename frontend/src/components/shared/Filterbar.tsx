import CustomInput from '@/components/Inputs/CustomInput';
import DateInput from '@/components/Inputs/DateInput';
import MainButton from '@/components/buttons/MainButton';
import { IRole } from '@/types/User';
import { getPlaceholder } from '@/utils/functionsUtils';

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  date: string;
  onDateChange: (value: string) => void;
  role: IRole;
  showButton: boolean
  onActionClick?: () => void;
  screen: "logs" | "agendamentos" | "clientes"
}




export default function FilterBar({
  search,
  onSearchChange,
  date,
  onDateChange,
  role,
  onActionClick,
  showButton,
  screen
}: FilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row items-start gap-4 mb-6">
      <CustomInput
        placeholder={getPlaceholder(role, showButton, screen)}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <DateInput
        value={date}
        onChange={(e) => onDateChange(e.target.value)}
        className="w-full md:w-xs"
      />
    {showButton && 
      <MainButton
        className="md:ml-auto w-full md:max-w-3xs font-montserrat text-base"
        onClick={onActionClick}
      >
        {role === 'admin' ? 'Ajustes de agendamento' : 'Novo agendamento'}
      </MainButton>
      }
    </div>

  );
}
