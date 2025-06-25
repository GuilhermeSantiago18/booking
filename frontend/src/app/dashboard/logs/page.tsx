'use client'

import FilterBar from "@/components/shared/Filterbar"
import { useState } from "react";

export default function Logs() {
      const [search, setSearch] = useState('');
  const [date, setDate] = useState('');
    return (
     <FilterBar
        search={search}
        onSearchChange={setSearch}
        date={date}
        onDateChange={setDate}
        />
    )
}