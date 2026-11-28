import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Flame, Zap } from 'lucide-react';
import { ModItem } from '@/types';
import ModCard from '@/components/mods/ModCard';

interface FeaturedModsSectionProps {
  mods: ModItem[];
}

export default function FeaturedModsSection({ mods }: FeaturedModsSectionProps) {
  if (!mods || mods.length === 0) return null;

  return (
    <section className="py-16 bg-dark-900/60 border-y border-dark-800/80 relative overflow-hidden">
      {/* Background Studio Accent Glow */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-brand-cyan/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-brand-cyan" />
              <span className="text-[11px] font-black text-brand-cyan uppercase tracking-widest">
                VERIFIED ARCHIVES
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              Featured BUSSID Mods
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Top-tier releases with custom animations, multi-axle steering, realistic engine sounds & 4K liveries.
            </p>
          </div>

          <Link
            href="/mods?filter=featured"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-cyan hover:text-cyan-300 transition shrink-0 group px-3.5 py-2 rounded-xl bg-dark-850/90 border border-dark-750 hover:border-brand-cyan/40"
          >
            <span>View All Featured</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </Link>
        </div>

        {/* Grid of Featured Mods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mods.slice(0, 6).map((mod) => (
            <ModCard key={mod.id} mod={mod} featured />
          ))}
        </div>
      </div>
    </section>
  );
}
