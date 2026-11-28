'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Download,
  Calendar,
  HardDrive,
  Eye,
  Star,
  Sparkles,
  Flame,
  CheckCircle,
  Zap,
} from 'lucide-react';
import { ModItem } from '@/types';
import { formatNumber, formatDate } from '@/lib/utils';
import DownloadModal from './DownloadModal';

interface ModCardProps {
  mod: ModItem;
  featured?: boolean;
}

export default function ModCard({ mod, featured = false }: ModCardProps) {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case 'HOT':
        return 'bg-gradient-to-r from-red-600 to-rose-600 text-white border-red-500/60 shadow-sm shadow-red-500/40';
      case 'NEW':
        return 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-emerald-400/60 shadow-sm shadow-emerald-500/40';
      case 'UPDATED':
        return 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white border-cyan-400/60 shadow-sm shadow-cyan-500/40';
      case 'FEATURED':
        return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-400/60 shadow-sm shadow-amber-500/40';
      default:
        return 'bg-dark-800 text-gray-300 border-dark-600';
    }
  };

  const getGameBadge = () => {
    return 'bg-brand-cyan/15 text-brand-cyan border-brand-cyan/40 shadow-sm';
  };

  return (
    <>
      <div
        className={`group relative flex flex-col bg-dark-900/90 border border-dark-750/80 rounded-2xl overflow-hidden card-hover-effect transition-all duration-300 hover:border-brand-cyan/50 hover:shadow-cyan-glow/30 ${
          featured ? 'ring-1 ring-brand-cyan/40 shadow-card-studio' : ''
        }`}
      >
        {/* Cover Image & Badges */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-dark-950">
          <Image
            src={mod.thumbnailUrl}
            alt={mod.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Dark gradient overlay for readable text */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-black/40" />

          {/* Badges in Top Corners */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
            <span
              className={`text-[10px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded-full border ${getGameBadge()} backdrop-blur-md`}
            >
              BUSSID
            </span>

            {mod.badge && (
              <span
                className={`text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-full border ${getBadgeColor(
                  mod.badge
                )} flex items-center gap-1 backdrop-blur-md`}
              >
                {mod.badge === 'HOT' && <Flame className="w-3 h-3 fill-white" />}
                {mod.badge}
              </span>
            )}
          </div>

          {/* Version Pill */}
          <div className="absolute top-3 right-3">
            <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-dark-950/85 text-gray-200 border border-white/15 backdrop-blur-md">
              {mod.version}
            </span>
          </div>

          {/* Downloads Counter Bottom Right */}
          <div className="absolute bottom-2.5 right-3 flex items-center gap-1 text-[11px] font-semibold text-gray-200 bg-dark-950/80 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/10">
            <Download className="w-3 h-3 text-brand-cyan" />
            <span>{formatNumber(mod.downloadsCount)}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-4 flex flex-col justify-between space-y-3">
          <div>
            {/* Category tag */}
            <span className="text-[10px] font-bold text-brand-cyan tracking-wider uppercase">
              {mod.category}
            </span>

            {/* Title */}
            <Link href={`/mods/${mod.slug}`} className="block mt-1">
              <h3 className="text-base font-bold text-white group-hover:text-brand-cyan transition-colors line-clamp-1 leading-snug">
                {mod.name}
              </h3>
            </Link>

            {/* Short Description */}
            <p className="mt-1.5 text-xs text-gray-400 line-clamp-2 leading-relaxed">
              {mod.shortDescription}
            </p>
          </div>

          {/* Metadata Row: File Size & Upload Date */}
          <div className="pt-2 border-t border-dark-800/80 flex items-center justify-between text-[11px] text-gray-400">
            <div className="flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-gray-500" />
              <span className="font-mono">{mod.fileSize}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <span>{formatDate(mod.uploadDate)}</span>
            </div>
          </div>

          {/* Action Buttons: View Details & Download */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              href={`/mods/${mod.slug}`}
              className="py-2 px-3 rounded-xl bg-dark-800/90 hover:bg-dark-750 text-gray-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-dark-700/80 hover:border-brand-cyan/40 transition"
            >
              <Eye className="w-3.5 h-3.5 text-brand-cyan" />
              <span>Details</span>
            </Link>

            <button
              onClick={() => setDownloadModalOpen(true)}
              className="py-2 px-3 rounded-xl bg-gradient-to-r from-brand-cyan to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-dark-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-cyan-sm hover:shadow-cyan-glow transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Download className="w-3.5 h-3.5 text-dark-950" />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>

      {/* Download Modal */}
      <DownloadModal
        mod={mod}
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />
    </>
  );
}
