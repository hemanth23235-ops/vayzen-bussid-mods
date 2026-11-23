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
        return 'bg-red-600/90 text-white border-red-500 shadow-sm shadow-red-500/40';
      case 'NEW':
        return 'bg-emerald-600/90 text-white border-emerald-400 shadow-sm shadow-emerald-500/40';
      case 'UPDATED':
        return 'bg-cyan-600/90 text-white border-cyan-400 shadow-sm shadow-cyan-500/40';
      case 'FEATURED':
        return 'bg-brand-orange text-white border-orange-400 shadow-sm shadow-brand-orange/40';
      default:
        return 'bg-dark-800 text-gray-300 border-dark-600';
    }
  };

  const getGameBadge = () => {
    return 'bg-brand-orange/20 text-brand-orange border-brand-orange/40';
  };

  return (
    <>
      <div
        className={`group relative flex flex-col bg-dark-900/90 border border-dark-700/80 rounded-2xl overflow-hidden card-hover-effect transition-all duration-300 ${
          featured ? 'ring-1 ring-brand-orange/30' : ''
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
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-black/40" />

          {/* Badges in Top Corners */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
            <span
              className={`text-[11px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-md border ${getGameBadge()} backdrop-blur-md`}
            >
              BUSSID
            </span>

            {mod.badge && (
              <span
                className={`text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-md border ${getBadgeColor(
                  mod.badge
                )} flex items-center gap-1`}
              >
                {mod.badge === 'HOT' && <Flame className="w-3 h-3 fill-white" />}
                {mod.badge}
              </span>
            )}
          </div>

          {/* Version Pill */}
          <div className="absolute top-3 right-3">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-dark-950/80 text-gray-300 border border-white/10 backdrop-blur-md">
              {mod.version}
            </span>
          </div>

          {/* Downloads Counter Bottom Right */}
          <div className="absolute bottom-2.5 right-3 flex items-center gap-1 text-[11px] font-semibold text-gray-300 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/10">
            <Download className="w-3 h-3 text-brand-orange" />
            <span>{formatNumber(mod.downloadsCount)}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-4 flex flex-col justify-between space-y-3">
          <div>
            {/* Category tag */}
            <span className="text-[11px] font-medium text-brand-orange tracking-wide uppercase">
              {mod.category}
            </span>

            {/* Title */}
            <Link href={`/mods/${mod.slug}`} className="block mt-1">
              <h3 className="text-base font-bold text-white group-hover:text-brand-orange transition-colors line-clamp-1 leading-snug">
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
            <div className="flex items-center gap-1">
              <HardDrive className="w-3.5 h-3.5 text-gray-500" />
              <span>{mod.fileSize}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-gray-500" />
              <span>{formatDate(mod.uploadDate)}</span>
            </div>
          </div>

          {/* Action Buttons: View Details & Download */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <Link
              href={`/mods/${mod.slug}`}
              className="py-2 px-3 rounded-xl bg-dark-800 hover:bg-dark-750 text-gray-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-dark-700 transition"
            >
              <Eye className="w-3.5 h-3.5 text-gray-400" />
              <span>Details</span>
            </Link>

            <button
              onClick={() => setDownloadModalOpen(true)}
              className="py-2 px-3 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-orange-sm transition transform hover:-translate-y-0.5"
            >
              <Download className="w-3.5 h-3.5" />
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
