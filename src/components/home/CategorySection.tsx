import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Bus,
  Truck,
  Car,
  MapPin,
  Layers,
  Sun,
  Gamepad2,
  Flame,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import { categories } from '@/data/categories';

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

export default function CategorySection() {
  return (
    <section className="py-20 bg-dark-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Bus className="w-4 h-4 text-brand-orange" />
              <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">
                BUSSID Mod Categories
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Explore BUSSID Categories
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Find Kerala tourist buses, 4K liveries, 4x4 cars, heavy trucks, and offroad hill maps.
            </p>
          </div>

          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:text-brand-orange-light transition shrink-0 group"
          >
            <span>Explore All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {categories.map((cat) => {
            const Icon = iconMap[cat.iconName] || Bus;
            return (
              <Link
                key={cat.id}
                href={`/mods?category=${encodeURIComponent(cat.name)}`}
                className="group relative rounded-2xl overflow-hidden bg-dark-900 border border-dark-750 hover:border-brand-orange/50 p-5 flex flex-col justify-between h-48 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
              >
                {/* Background image preview with blur and gradient overlay */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={cat.bannerImage}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/80 to-transparent" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-dark-800/90 border border-dark-700 flex items-center justify-center text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition duration-300 shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-orange/20 text-brand-orange border border-brand-orange/40">
                      BUSSID
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-brand-orange transition">
                    {cat.name}
                  </h3>
                </div>

                <div className="relative z-10 flex items-center justify-between pt-2 border-t border-dark-800/70 text-xs text-gray-400 group-hover:text-brand-orange transition">
                  <span className="text-[11px]">Browse collection</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
