'use client'

import FilterBar from "@/components/shared/Filterbar"
import Table from "@/components/table/Table";
import { useState } from "react";

export default function Agendamentos() {
      const [search, setSearch] = useState('');
  const [date, setDate] = useState('');
    return (
        <>
         <FilterBar
        search={search}
        onSearchChange={setSearch}
        date={date}
        onDateChange={setDate}
        />

        <Table
                headers={[
                    { label: 'Data de agendamento', key: 'date' },
                    { label: 'Nome', key: 'nome' },
                    { label: 'Sala de agendamento', key: 'roomName' },
                    { label: 'Status transação', key: 'status' },
                ]}
                renderActions={(row) => (
                    row.status === 'PENDENTE' && (
                        <button className="text-red-600 hover:underline">
                            Cancelar
                        </button>
                    )
                )} data={[]}/>

        </>
    
        
    )
}