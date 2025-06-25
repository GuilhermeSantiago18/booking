'use client';

import CustomInput from '@/components/Inputs/CustomInput';
import DateInput from '@/components/Inputs/DateInput';

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  date: string;
  onDateChange: (value: string) => void;
}

export default function FilterBar({
  search,
  onSearchChange,
  date,
  onDateChange,
}: FilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 max-w-4xl">
      <CustomInput
        placeholder="Nome, CPF ou Email"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <DateInput
        value={date}
        onChange={(e) => onDateChange(e.target.value)}
        className="w-xs"
      />
    </div>
  );
}
