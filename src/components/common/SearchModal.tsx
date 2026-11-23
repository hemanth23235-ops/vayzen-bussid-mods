'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X, Download, ExternalLink, Bus } from 'lucide-react';
import { ModItem } from '@/types';
import { formatNumber } from '@/lib/utils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ModItem[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/mods?q=${encodeURIComponent(query)}&limit=8`);
        const data = await res.json();
        if (data.success) {
          setResults(data.mods);
        }
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      <div className="relative w-full max-w-2xl bg-dark-900 border border-dark-700/80 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh]">
        {/* Search Input Bar */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-dark-700 bg-dark-850">
          <Search className="w-5 h-5 text-brand-orange shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search BUSSID mods (e.g. Zedone, Thar, KSRTC, Wayanad, Basuri)..."
            className="w-full bg-transparent text-white placeholder-gray-500 text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-gray-400 hover:text-white rounded-lg hover:bg-dark-750 transition mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs text-gray-400 hover:text-white bg-dark-750 border border-dark-600 rounded-md font-mono"
          >
            ESC
          </button>
        </div>

        {/* Results Body */}
        <div className="overflow-y-auto p-4 space-y-2 flex-1">
          {loading && (
            <div className="flex items-center justify-center py-12 text-gray-400 text-sm">
              <div className="w-5 h-5 border-2 border-brand-orange border-t-transparent rounded-full animate-spin mr-3" />
              Searching BUSSID mods...
            </div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Bus className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-white font-medium">No BUSSID mods found for &quot;{query}&quot;</p>
              <p className="text-xs text-gray-500 mt-1">
                Try searching for &quot;Zedone&quot;, &quot;Thar&quot;, &quot;KSRTC&quot;, &quot;Signa&quot;, or &quot;Wayanad&quot;
              </p>
            </div>
          )}

          {!loading && !query && (
            <div className="py-6 px-2 text-center">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Popular BUSSID Searches
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  'Zedone Vega',
                  'Mahindra Thar',
                  'KSRTC SWIFT',
                  'Prakash Capella',
                  'Tata Signa Tipper',
                  'Wayanad Ghat Map',
                  'Basuri V3 Horn',
                  '4K Liveries',
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-dark-800 hover:bg-dark-750 text-gray-300 hover:text-brand-orange border border-dark-700 transition"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!loading && results.map((mod) => (
            <Link
              key={mod.id}
              href={`/mods/${mod.slug}`}
              onClick={onClose}
              className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-dark-800/90 border border-transparent hover:border-dark-700 transition group"
            >
              <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-dark-800">
                <Image
                  src={mod.thumbnailUrl}
                  alt={mod.name}
                  fill
                  sizes="64px"
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-brand-orange/20 text-brand-orange border border-brand-orange/30">
                    BUSSID
                  </span>
                  <span className="text-xs text-gray-400 truncate">{mod.category}</span>
                </div>
                <h4 className="text-sm font-semibold text-white group-hover:text-brand-orange truncate transition mt-0.5">
                  {mod.name}
                </h4>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-mono text-gray-400 block">{mod.fileSize}</span>
                <span className="text-[11px] text-gray-500 flex items-center justify-end gap-1">
                  <Download className="w-3 h-3 text-brand-orange" />
                  {formatNumber(mod.downloadsCount)}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-dark-950 border-t border-dark-800 text-[11px] text-gray-500 flex justify-between items-center">
          <span>Search VayZenXPlayz verified BUSSID mods</span>
          <Link
            href="/mods"
            onClick={onClose}
            className="text-brand-orange hover:underline flex items-center gap-1 font-medium"
          >
            Browse all BUSSID mods <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
