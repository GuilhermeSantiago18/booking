import CustomInput from '@/components/Inputs/CustomInput';
import DateInput from '@/components/Inputs/DateInput';
import MainButton from '@/components/buttons/MainButton';

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  date: string;
  onDateChange: (value: string) => void;
  role: 'admin' | 'client';
  onActionClick?: () => void;
}

export default function FilterBar({
  search,
  onSearchChange,
  date,
  onDateChange,
  role,
  onActionClick,
}: FilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row items-start gap-4 mb-6">
      <CustomInput
        placeholder="Filtre por nome"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <DateInput
        value={date}
        onChange={(e) => onDateChange(e.target.value)}
        className="w-full md:w-xs"
      />

      <MainButton
        className="md:ml-auto w-full md:max-w-xs font-montserrat"
        onClick={onActionClick}
      >
        {role === 'admin' ? 'Ajustes de agendamento' : 'Novo agendamento'}
      </MainButton>
    </div>
  );
}
