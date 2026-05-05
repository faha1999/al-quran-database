'use client';

import type { FilterGroup, FilterOption } from '@/lib/search-filters';

interface FilterSelectProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  options?: FilterOption[];
  groups?: FilterGroup[];
  onChange: (value: string) => void;
}

export function FilterSelect({
  id,
  label,
  value,
  placeholder,
  options,
  groups,
  onChange,
}: FilterSelectProps) {
  return (
    <label className="space-y-2">
      <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
        {label}
      </span>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full appearance-none rounded-xl border border-zinc-700 bg-black px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
      >
        <option value="">{placeholder}</option>
        {groups
          ? groups.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </optgroup>
            ))
          : options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
      </select>
    </label>
  );
}
