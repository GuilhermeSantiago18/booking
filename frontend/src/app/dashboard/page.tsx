'use client'

import CustomInput from '@/components/Inputs/CustomInput';
import DateInput from '@/components/Inputs/DateInput';
import Image from 'next/image';
import { useState } from 'react';

export default function DashboardHome() {
  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');
  return (
    <div className="h-full bg-white md:ml-64 p-4">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
        <CustomInput
          label="Filtrar por"
          placeholder="Nome, CPF ou Email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <DateInput
          label="Filtrar por Data"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="flex justify-center mt-34">
        <Image
          src="/assets/Dashboard.svg"
          alt="Dashboard"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
}
