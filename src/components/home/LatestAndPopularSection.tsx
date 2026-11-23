'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TrendingUp, Clock, ArrowRight, Flame, Download } from 'lucide-react';
import { ModItem } from '@/types';
import ModCard from '@/components/mods/ModCard';

interface Props {
  latestMods: ModItem[];
  mostDownloadedMods: ModItem[];
}

export default function LatestAndPopularSection({ latestMods, mostDownloadedMods }: Props) {
  const [activeTab, setActiveTab] = useState<'latest' | 'popular'>('latest');

  const currentMods = activeTab === 'latest' ? latestMods : mostDownloadedMods;

  return (
    <section className="py-20 bg-dark-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Tab Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-brand-orange" />
              <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">
                Trending Content
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {activeTab === 'latest' ? 'Freshly Added Mods' : 'Most Downloaded Mods'}
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Updated daily with new liveries, sound fixes, and performance updates.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center bg-dark-850 p-1 rounded-xl border border-dark-700/80 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('latest')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
                activeTab === 'latest'
                  ? 'bg-brand-orange text-white shadow-orange-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Latest Mods</span>
            </button>
            <button
              onClick={() => setActiveTab('popular')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
                activeTab === 'popular'
                  ? 'bg-brand-orange text-white shadow-orange-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Most Downloaded</span>
            </button>
          </div>
        </div>

        {/* Mods Grid or Clean Empty State */}
        {currentMods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentMods.slice(0, 6).map((mod) => (
              <ModCard key={mod.id} mod={mod} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-dark-900/60 border border-dark-800 rounded-3xl max-w-xl mx-auto space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-orange/15 border border-brand-orange/30 text-brand-orange flex items-center justify-center mx-auto">
              <TrendingUp className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">No BUSSID Mods Published Yet</h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto leading-relaxed">
              Your platform is clean and ready. Open your Admin Portal to upload and publish your first BUSSID mod!
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold shadow-orange-sm transition"
            >
              <span>Go to Admin Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href={`/mods?sort=${activeTab === 'latest' ? 'newest' : 'most-downloaded'}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-dark-850 hover:bg-dark-800 text-white font-semibold text-sm border border-dark-700 hover:border-brand-orange/50 transition group"
          >
            <span>View All {activeTab === 'latest' ? 'Latest Mods' : 'Most Downloaded'}</span>
            <ArrowRight className="w-4 h-4 text-brand-orange group-hover:translate-x-1 transition" />
          </Link>
        </div>
      </div>
    </section>
  );
}
