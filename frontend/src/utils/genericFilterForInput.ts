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
          const rawValue = String(key).includes('.') ? getNestedValue(item, String(key)) : (item as any)[key];

          const value = String(rawValue ?? '').toLowerCase();

          const searchLower = search.toLowerCase();

          return value.includes(searchLower);
        })
      : true;

    const matchesDate = dateKey && dateValue
  ? normalizeDate((item as any)[dateKey]) === dateValue
  : true;


    return matchesSearch && matchesDate;
  });
}

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((acc, key) => acc?.[key], obj);
}


function normalizeDate(date: any): string {
  if (!date) return '';
  const d = new Date(date);
  if (!isNaN(d.getTime())) {
    return d.toISOString().slice(0, 10);
  }
  return String(date).slice(0, 10);
}
