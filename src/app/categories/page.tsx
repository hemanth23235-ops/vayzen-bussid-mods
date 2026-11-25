import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/data/categories';
import { getAllMods } from '@/lib/mods';
import { slugify } from '@/lib/utils';
import {
  Bus,
  Truck,
  Car,
  MapPin,
  Layers,
  Sun,
  Gamepad2,
  Flame,
  ChevronRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'BUSSID Mod Categories & Collections',
  description:
    'Browse Bus Simulator Indonesia mods by category: Kerala tourist buses, 4K liveries, 4x4 cars, trucks, and offroad hill ghat maps.',
};

const iconMap: Record<string, any> = {
  Bus,
  Truck,
  Car,
  MapPin,
  Layers,
  Sun,
  Gamepad2,
  Flame,
};

export default async function CategoriesPage() {
  const allMods = await getAllMods();

  // Calculate mod count for each category
  const categoryWithCounts = categories.map((cat) => {
    const count = allMods.filter((m) => {
      const modSlug = slugify(m.category);
      return (
        m.category.toLowerCase() === cat.name.toLowerCase() ||
        modSlug === cat.id ||
        (cat.id.includes('liver') && modSlug.includes('liver')) ||
        (cat.id.includes('bus') && modSlug.includes('bus') && !cat.id.includes('liver') && !modSlug.includes('liver'))
      );
    }).length;
    return {
      ...cat,
      modCount: count,
    };
  });

  return (
    <div className="pt-28 pb-20 bg-dark-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-brand-orange uppercase tracking-wider px-2 py-0.5 rounded bg-brand-orange/15 border border-brand-orange/30">
              BUSSID Catalog
            </span>
            <span className="text-xs text-gray-400">• Dedicated Bus Simulator Indonesia Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            BUSSID Categories
          </h1>
          <p className="text-sm text-gray-400 mt-1 max-w-2xl">
            Choose your category below to explore tourist buses, 4K liveries, 4x4 cars, heavy dump trucks, and hill climb maps.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryWithCounts.map((cat) => {
            const Icon = iconMap[cat.iconName] || Bus;
            return (
              <Link
                key={cat.id}
                href={`/mods?category=${cat.id}`}
                className="group relative rounded-2xl overflow-hidden bg-dark-900 border border-dark-750 hover:border-brand-orange/50 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                {/* Background image preview */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={cat.bannerImage}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover opacity-15 group-hover:opacity-25 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/80 to-transparent" />
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-dark-800 border border-dark-700 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition duration-300 shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-dark-800 text-gray-300 border border-dark-700">
                      {cat.modCount} {cat.modCount === 1 ? 'Mod' : 'Mods'}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange">
                        BUSSID
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-brand-orange transition">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-between pt-4 mt-6 border-t border-dark-800 text-xs font-semibold text-gray-300 group-hover:text-brand-orange transition">
                  <span>Browse BUSSID Mods</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
