'use client';

import React from 'react';
import { Search, X, ArrowUpDown, Bus, Truck, Car, MapPin, Layers, Sun, Gamepad2 } from 'lucide-react';
import { slugify } from '@/lib/utils';
import { categories } from '@/data/categories';

interface ModFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedSort: string;
  onSortChange: (sort: string) => void;
  totalCount: number;
}

export default function ModFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedSort,
  onSortChange,
  totalCount,
}: ModFiltersProps) {
  const sorts = [
    { id: 'newest', label: 'Latest Uploads' },
    { id: 'most-downloaded', label: 'Most Downloaded' },
    { id: 'rating', label: 'Highest Rated' },
    { id: 'oldest', label: 'Oldest' },
  ];

  return (
    <div className="space-y-4 mb-8">
      {/* Top Bar: Search and Sort */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Instant Search Bar */}
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search BUSSID mods (e.g. Zedone, Thar, Capella, Signa, Wayanad, Basuri)..."
            className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-dark-900 border border-dark-700 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort dropdown & Result Counter */}
        <div className="flex items-center gap-3 justify-between md:justify-end">
          <span className="text-xs text-gray-400 font-medium">
            <strong className="text-white">{totalCount}</strong> BUSSID mods found
          </span>

          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-gray-400" />
            <select
              value={selectedSort}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-dark-900 border border-dark-700 text-xs text-gray-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-brand-orange cursor-pointer"
            >
              {sorts.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        <button
          onClick={() => onCategoryChange('all')}
          className={`px-4 py-2 rounded-xl font-bold whitespace-nowrap transition-all ${
            selectedCategory === 'all'
              ? 'bg-brand-orange text-white shadow-orange-sm'
              : 'bg-dark-850 hover:bg-dark-800 text-gray-400 hover:text-white border border-dark-750'
          }`}
        >
          🚌 All BUSSID Mods
        </button>

        {categories.map((cat) => {
          const isSelected =
            selectedCategory.toLowerCase() === cat.name.toLowerCase() ||
            selectedCategory.toLowerCase() === cat.id.toLowerCase() ||
            slugify(selectedCategory) === slugify(cat.name) ||
            slugify(selectedCategory) === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.name)}
              className={`px-3.5 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-brand-orange text-white shadow-orange-sm font-bold'
                  : 'bg-dark-850 hover:bg-dark-800 text-gray-400 hover:text-white border border-dark-750'
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
