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
  Layers3,
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
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-cyan/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-crimson/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 mb-2">
              <Layers3 className="w-3.5 h-3.5 text-brand-cyan" />
              <span className="text-[11px] font-black text-brand-cyan uppercase tracking-widest">
                SIMULATION ARCHIVES
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
              Explore BUSSID Categories
            </h2>
            <p className="text-sm text-gray-400 mt-1 max-w-xl">
              Kerala tourist buses, 4K liveries, 4x4 cars, heavy tipper lorries, and offroad hill ghat maps.
            </p>
          </div>

          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-cyan hover:text-cyan-300 transition shrink-0 group px-3.5 py-2 rounded-xl bg-dark-900 border border-dark-750 hover:border-brand-cyan/40"
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
                href={`/mods?category=${cat.id}`}
                className="group relative rounded-2xl overflow-hidden bg-dark-900/90 border border-dark-750/80 hover:border-brand-cyan/50 p-5 flex flex-col justify-between h-52 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-cyan-glow/20"
              >
                {/* Background image preview with blur and gradient overlay */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={cat.bannerImage}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className="object-cover opacity-25 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/85 to-transparent" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-11 h-11 rounded-xl bg-dark-850/90 border border-dark-700/80 flex items-center justify-center text-brand-cyan group-hover:bg-gradient-to-r group-hover:from-brand-cyan group-hover:to-blue-600 group-hover:text-dark-950 transition-all duration-300 shadow-md">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/40">
                      BUSSID
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-brand-cyan transition">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">
                    {cat.shortDescription || 'High quality simulation mods'}
                  </p>
                </div>

                <div className="relative z-10 flex items-center justify-between pt-2.5 border-t border-dark-800/80 text-xs text-gray-400 group-hover:text-brand-cyan transition">
                  <span className="text-[11px] font-medium">Browse Archive</span>
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
