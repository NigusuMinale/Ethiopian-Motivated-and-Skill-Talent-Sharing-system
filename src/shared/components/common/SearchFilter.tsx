import { Search, X } from 'lucide-react';
import { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/shared/utils/cn';

export interface FilterOption {
  id: string;
  label: string;
  options: {
    value: string;
    label: string;
    count?: number;
  }[];
  type?: 'select' | 'checkbox' | 'radio';
  defaultValue?: string;
}

export interface SearchFilterProps {
  searchPlaceholder?: string;
  onSearch: (value: string) => void;
  filters?: FilterOption[];
  onFilterChange?: (filterId: string, value: string | string[]) => void;
  loading?: boolean;
  debounceMs?: number;
  showClearButton?: boolean;
  onClear?: () => void;
  className?: string;
}

export function SearchFilter({
  searchPlaceholder = 'Search...',
  onSearch,
  filters = [],
  onFilterChange,
  loading = false,
  debounceMs = 300,
  showClearButton = true,
  onClear,
  className,
}: SearchFilterProps) {
  const [searchValue, setSearchValue] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string | string[]>>({});
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);

  // Debounced search
  const debounceTimer = useMemo(() => ({ id: 0 }), []);

  const handleSearch = useCallback(
    (value: string) => {
      setSearchValue(value);
      clearTimeout(debounceTimer.id);
      debounceTimer.id = window.setTimeout(() => {
        onSearch(value);
      }, debounceMs);
    },
    [debounceMs, onSearch, debounceTimer]
  );

  const handleFilterChange = useCallback(
    (filterId: string, value: string) => {
      setActiveFilters((prev) => ({
        ...prev,
        [filterId]: value,
      }));
      onFilterChange?.(filterId, value);
    },
    [onFilterChange]
  );

  const handleClear = useCallback(() => {
    setSearchValue('');
    setActiveFilters({});
    setExpandedFilter(null);
    onSearch('');
    onClear?.();
  }, [onSearch, onClear]);

  const hasActiveFilters = Object.values(activeFilters).length > 0 || searchValue !== '';

  return (
    <div className={cn('space-y-4', className)}>
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          disabled={loading}
          className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed transition-all"
        />
        {searchValue && (
          <button
            onClick={() => handleSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filters */}
      {filters.length > 0 && (
        <div className="space-y-3">
          {filters.map((filter) => (
            <div key={filter.id}>
              <button
                onClick={() =>
                  setExpandedFilter(expandedFilter === filter.id ? null : filter.id)
                }
                className="w-full text-left px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-lg transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-gray-700">{filter.label}</span>
                  <motion.span
                    animate={{
                      rotate: expandedFilter === filter.id ? 180 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="text-gray-400"
                  >
                    ▼
                  </motion.span>
                </div>
              </button>

              {/* Filter Options */}
              <motion.div
                animate={{
                  height: expandedFilter === filter.id ? 'auto' : 0,
                  opacity: expandedFilter === filter.id ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-2 space-y-2 pl-2">
                  {filter.options.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type={filter.type === 'checkbox' ? 'checkbox' : 'radio'}
                        name={filter.id}
                        value={option.value}
                        checked={activeFilters[filter.id] === option.value}
                        onChange={() => handleFilterChange(filter.id, option.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded cursor-pointer"
                      />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                        {option.label}
                      </span>
                      {option.count !== undefined && (
                        <span className="text-xs text-gray-500 ml-auto">({option.count})</span>
                      )}
                    </label>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      )}

      {/* Active Filters Display & Clear Button */}
      {hasActiveFilters && showClearButton && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg"
        >
          <span className="text-sm text-blue-900 flex-1">
            {Object.keys(activeFilters).length > 0 ||searchValue !== ''
              ? `${Object.keys(activeFilters).length} filter(s) active`
              : 'No filters applied'}
          </span>
          <button
            onClick={handleClear}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
          >
            Clear All
          </button>
        </motion.div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-gray-600">Loading...</span>
        </div>
      )}
    </div>
  );
}

export default SearchFilter;
