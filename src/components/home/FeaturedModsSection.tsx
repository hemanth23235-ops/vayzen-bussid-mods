import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, Flame } from 'lucide-react';
import { ModItem } from '@/types';
import ModCard from '@/components/mods/ModCard';

interface FeaturedModsSectionProps {
  mods: ModItem[];
}

export default function FeaturedModsSection({ mods }: FeaturedModsSectionProps) {
  if (!mods || mods.length === 0) return null;

  return (
    <section className="py-16 bg-dark-900/60 border-y border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-brand-orange" />
              <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">
                Hand-Picked By VayZenXPlayz
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Featured Gaming Mods
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Top-tier mods with custom animations, 4K liveries, and verified stability.
            </p>
          </div>

          <Link
            href="/mods?filter=featured"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:text-brand-orange-light transition shrink-0 group"
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
