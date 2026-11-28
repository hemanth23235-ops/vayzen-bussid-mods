'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ModItem } from '@/types';
import ModCard from '@/components/mods/ModCard';
import ModFilters from '@/components/mods/ModFilters';
import { Bus, FilterX } from 'lucide-react';
import { slugify } from '@/lib/utils';

interface ModsClientProps {
  initialMods: ModItem[];
}

export default function ModsClient({ initialMods }: ModsClientProps) {
  const searchParams = useSearchParams();

  // Initialize filters from query params if present
  const initialCategory = searchParams.get('category') || 'all';
  const initialSort = searchParams.get('sort') || 'newest';
  const initialQuery = searchParams.get('q') || '';
  const filterParam = searchParams.get('filter');

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSort, setSelectedSort] = useState(
    initialSort === 'latest' ? 'newest' : initialSort
  );

  // Filtered and sorted mods calculation
  const filteredMods = useMemo(() => {
    let list = [...initialMods];

    // Filter featured if requested
    if (filterParam === 'featured') {
      list = list.filter((m) => m.isFeatured);
    }

    // Filter by category
    if (selectedCategory && selectedCategory.toLowerCase() !== 'all') {
      const targetSlug = slugify(selectedCategory);
      list = list.filter((m) => {
        const modCatSlug = slugify(m.category);
        return (
          m.category.toLowerCase() === selectedCategory.toLowerCase() ||
          modCatSlug === targetSlug ||
          (targetSlug.includes('liver') && modCatSlug.includes('liver')) ||
          (targetSlug.includes('bus') && modCatSlug.includes('bus') && !targetSlug.includes('liver') && !modCatSlug.includes('liver')) ||
          (targetSlug.includes('car') && modCatSlug.includes('car')) ||
          (targetSlug.includes('truck') && modCatSlug.includes('truck')) ||
          (targetSlug.includes('map') && modCatSlug.includes('map'))
        );
      });
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.category.toLowerCase().includes(q) ||
          m.shortDescription.toLowerCase().includes(q) ||
          (m.tags && m.tags.some((t) => t.toLowerCase().includes(q)))
      );
    }

    // Sorting
    if (selectedSort === 'most-downloaded') {
      list.sort((a, b) => b.downloadsCount - a.downloadsCount);
    } else if (selectedSort === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (selectedSort === 'oldest') {
      list.sort((a, b) => new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime());
    } else {
      // newest
      list.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
    }

    return list;
  }, [initialMods, searchQuery, selectedCategory, selectedSort, filterParam]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedSort('newest');
  };

  return (
    <div className="pt-28 pb-20 bg-dark-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Intro */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black text-brand-cyan uppercase tracking-widest px-2.5 py-1 rounded-full bg-brand-cyan/15 border border-brand-cyan/35 shadow-sm">
              BUSSID ARCHIVE
            </span>
            <span className="text-xs text-gray-400">• High Speed Direct .bussidmod Mirrors</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            VayZenXPlays Mods
          </h1>
          <p className="text-sm text-gray-400 mt-1 max-w-2xl">
            Download verified Kerala buses, KSRTC, 4K liveries, Mahindra Thar 4x4, heavy trucks, and offroad hill maps for Bus Simulator Indonesia.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <ModFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
          totalCount={filteredMods.length}
        />

        {/* Empty State */}
        {filteredMods.length === 0 && (
          <div className="text-center py-24 bg-dark-900/60 border border-dark-800 rounded-3xl p-8">
            <Bus className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No BUSSID mods found</h3>
            <p className="text-sm text-gray-400 max-w-md mx-auto mb-6">
              We couldn&apos;t find any mods matching &quot;{searchQuery}&quot;. Try searching for &quot;Zedone&quot;, &quot;Thar&quot;, &quot;KSRTC&quot;, &quot;Capella&quot;, or &quot;Wayanad&quot;.
            </p>
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-cyan to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-dark-950 text-xs font-black shadow-cyan-sm transition"
            >
              <FilterX className="w-4 h-4 text-dark-950" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

        {/* Mods Grid */}
        {filteredMods.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMods.map((mod) => (
              <ModCard key={mod.id} mod={mod} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
