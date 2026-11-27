import { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronDown, LocateFixed, MapPin, Search } from 'lucide-react';
import { MAJOR_CITIES_CATALOG } from '../data/citiesCatalog';
import type { CityPreset } from '../types/airQuality';
import { sanitizeText } from '../utils/inputValidator';

interface CityGroup {
  region: string;
  keys: string[];
}

interface FilteredCityItem extends CityPreset {
  key: string;
}

const GROUPED_CITIES: CityGroup[] = [
  {
    region: 'India • Metro & Smog Corridors',
    keys: [
      'bengaluru',
      'delhi',
      'mumbai',
      'kolkata',
      'chennai',
      'hyderabad',
      'pune',
      'ahmedabad',
      'lucknow',
      'patna',
      'jaipur',
      'kochi',
      'chandigarh',
      'guwahati'
    ]
  },
  {
    region: 'International Cities',
    keys: ['lahore', 'dhaka', 'london', 'newyork']
  }
];

export interface CitySelectorProps {
  currentCity: string;
  onSelectCity: (cityKey: string) => void;
  onRefreshLocation?: () => void;
  isLoading?: boolean;
  placeholder?: string;
}

/**
 * Searchable, accessible custom city station selector popover replacing plain native select.
 * Supports quick search filtering, region grouping, and one-tap GPS auto-detection.
 */
export function CitySelector({
  currentCity,
  onSelectCity,
  onRefreshLocation,
  isLoading = false,
  placeholder = 'Switch City'
}: CitySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const focusTimer = setTimeout(() => searchInputRef.current?.focus(), 40);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const cleanQuery = sanitizeText(query, 40).toLowerCase();

  const filteredGroups = useMemo(() => {
    return GROUPED_CITIES.map((group) => {
      const items: FilteredCityItem[] = group.keys
        .filter((key) => Boolean(MAJOR_CITIES_CATALOG[key]))
        .map((key) => ({ key, ...MAJOR_CITIES_CATALOG[key] }))
        .filter((item) => {
          if (!cleanQuery) return true;
          return (
            item.city.toLowerCase().includes(cleanQuery) ||
            item.state.toLowerCase().includes(cleanQuery) ||
            item.country.toLowerCase().includes(cleanQuery)
          );
        });
      return { region: group.region, items };
    }).filter((group) => group.items.length > 0);
  }, [cleanQuery]);

  const handleChoose = (cityKey: string) => {
    onSelectCity(cityKey);
    setQuery('');
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative flex-1 sm:flex-initial">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        disabled={isLoading}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Change monitoring city, currently ${currentCity}`}
        className="w-full sm:w-auto flex items-center justify-between space-x-2 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800/90 hover:bg-zinc-200/80 dark:hover:bg-zinc-700/80 text-zinc-900 dark:text-zinc-100 text-xs font-bold border border-zinc-200 dark:border-zinc-700 transition-all cursor-pointer disabled:opacity-60 shadow-xs"
      >
        <span className="flex items-center space-x-1.5 min-w-0">
          <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" aria-hidden="true" />
          <span className="truncate max-w-[130px] sm:max-w-[140px]">
            {isLoading ? 'Loading...' : currentCity || placeholder}
          </span>
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180 text-emerald-500 opacity-100' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Available cities and air quality stations"
          className="fixed sm:absolute left-4 right-4 sm:left-auto sm:right-0 top-32 sm:top-full mt-2 sm:w-72 rounded-2xl bg-white dark:bg-[#18181B] border border-zinc-200 dark:border-zinc-700 shadow-2xl p-2.5 z-[60] animate-fade-in"
        >
          <div className="relative mb-2">
            <Search
              className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
              aria-hidden="true"
            />
            <label htmlFor="city-search-input" className="sr-only">
              Search city
            </label>
            <input
              id="city-search-input"
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search city or state..."
              className="w-full pl-8 pr-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-800/90 text-xs font-medium text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:border-emerald-500"
            />
          </div>

          {onRefreshLocation && (
            <button
              type="button"
              onClick={() => {
                onRefreshLocation();
                setIsOpen(false);
              }}
              className="w-full flex items-center space-x-2 px-3 py-2 mb-2 rounded-xl bg-emerald-500/12 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-bold transition-colors cursor-pointer border border-emerald-500/25"
            >
              <LocateFixed className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>Use My Live GPS Location</span>
            </button>
          )}

          <div className="max-h-60 overflow-y-auto space-y-2 pr-0.5">
            {filteredGroups.length === 0 ? (
              <p className="text-center text-xs text-zinc-500 dark:text-zinc-400 py-4">
                No matching city found.
              </p>
            ) : (
              filteredGroups.map((group) => (
                <div key={group.region}>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 px-2.5 py-1 block">
                    {group.region}
                  </span>
                  <div className="space-y-0.5">
                    {group.items.map((item) => {
                      const isActive =
                        currentCity?.toLowerCase().includes(item.city.toLowerCase()) ||
                        item.city.toLowerCase().includes((currentCity || '').toLowerCase());

                      return (
                        <button
                          key={item.key}
                          type="button"
                          role="option"
                          aria-selected={isActive}
                          onClick={() => handleChoose(item.key)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs transition-colors cursor-pointer ${
                            isActive
                              ? 'bg-emerald-500 text-zinc-950 font-extrabold shadow-xs'
                              : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-semibold'
                          }`}
                        >
                          <div className="min-w-0 pr-2">
                            <span className="block truncate">{item.city}</span>
                            <span
                              className={`text-[10px] block truncate ${
                                isActive ? 'text-zinc-900/75' : 'text-zinc-500 dark:text-zinc-400'
                              }`}
                            >
                              {item.state}, {item.country}
                            </span>
                          </div>
                          {isActive && (
                            <Check className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
