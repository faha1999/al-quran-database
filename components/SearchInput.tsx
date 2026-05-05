import { Search } from 'lucide-react';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  placeholder?: string;
  loading?: boolean;
}

export default function SearchInput({
  value,
  onChange,
  onSearch,
  placeholder,
  loading,
}: SearchInputProps) {
  return (
    <div className="relative group w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch()}
        placeholder={placeholder || 'Search...'}
        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 px-12 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm"
      />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-blue-500 transition-colors" />
      {loading && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
