type FilterOptions<T> = {
  data: T[];
  search?: string;
  searchKeys?: (keyof T | string)[];
  dateKey?: keyof T;
  dateValue?: string;
};

export function genericFilter<T>({
  data,
  search,
  searchKeys = [],
  dateKey,
  dateValue,
}: FilterOptions<T>): T[] {
  return data.filter((item) => {
    const matchesSearch = search
      ? searchKeys.some((key) => {
          const rawValue = typeof key === 'string' && key.includes('.')
            ? getNestedValue(item, key)
            : item[key as keyof T];

          const value = String(rawValue ?? '').toLowerCase();
          return value.includes(search.toLowerCase());
        })
      : true;

    const matchesDate =
      dateKey && dateValue
        ? normalizeDate(item[dateKey]) === dateValue
        : true;

    return matchesSearch && matchesDate;
  });
}

function getNestedValue(obj: unknown, path: string): unknown {
  return path.split('.').reduce((acc: unknown, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}


function normalizeDate(date: unknown): string {
  if (!date) return '';
  const d = new Date(date as string | number | Date);
  if (!isNaN(d.getTime())) {
    return d.toISOString().slice(0, 10);
  }
  return String(date).slice(0, 10);
}
