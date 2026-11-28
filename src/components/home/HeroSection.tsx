'use client';

import React from 'react';
import Link from 'next/link';
import {
  Download,
  Flame,
  ShieldCheck,
  Bus,
  Users,
  ChevronRight,
  TrendingUp,
  Sparkles,
  Zap,
  Gauge,
  Palette,
} from 'lucide-react';
import YouTubeIcon from '@/components/common/YouTubeIcon';
import { siteConfig } from '@/config/site';

export default function HeroSection() {
  const stats = [
    { label: 'Official Channel', value: `${siteConfig.channelName}`, icon: Bus },
    { label: 'YouTube Videos', value: siteConfig.videosCountText, icon: Download },
    { label: 'YouTube Subscribers', value: siteConfig.subscribersCountText, icon: Users },
    { label: 'Clean .bussidmod Files', value: '100% Safe', icon: ShieldCheck },
  ];

  const studioHighlights = [
    { label: 'Realistic Physics & Suspensions', icon: Gauge },
    { label: 'Full Moving Animations', icon: Zap },
    { label: '4K Ultra-HD Liveries', icon: Palette },
    { label: '100% VirusTotal Clean', icon: ShieldCheck },
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-hero-glow bg-cover">
      {/* Background Studio Decorative Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

      {/* Studio Ambient Neon Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-brand-cyan/12 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-8 w-[350px] h-[280px] bg-brand-crimson/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 left-8 w-[350px] h-[280px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Creator Studio Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark-900/90 border border-brand-cyan/40 shadow-cyan-sm mb-6 animate-pulse-slow backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-brand-cyan" />
          <span className="text-xs font-bold text-gray-200 tracking-wide">
            OFFICIAL BUSSID STUDIO FOR <strong className="text-brand-cyan">{siteConfig.channelName}</strong>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </div>

        {/* Main Hero Title with Automotive Studio Styling */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-[1.08]">
          UPGRADE YOUR{' '}
          <span className="bg-gradient-to-r from-brand-cyan via-sky-300 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(0,229,255,0.45)]">
            BUSSID
          </span>{' '}
          SIMULATION
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Premium Kerala tourist buses, multi-axle Scania coaches, Mahindra Thar 4x4, tipper trucks & hill ghat maps.
          <span className="block text-gray-400 text-sm sm:text-base mt-1.5">
            Hand-tested for high FPS, realistic diesel engine audio, animated wipers & safe direct mirrors.
          </span>
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          {/* Explore Mods */}
          <Link
            href="/mods"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-cyan via-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-dark-950 font-black text-base flex items-center justify-center gap-2 shadow-cyan-glow transition transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Bus className="w-5 h-5 text-dark-950" />
            <span>Explore All Mods</span>
            <ChevronRight className="w-4 h-4 ml-0.5" />
          </Link>

          {/* Latest Downloads */}
          <Link
            href="/mods?sort=latest"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-dark-900/90 hover:bg-dark-850 text-white font-semibold text-base flex items-center justify-center gap-2 border border-dark-700/80 hover:border-brand-cyan/50 hover:shadow-cyan-sm transition transform hover:-translate-y-0.5 backdrop-blur-md"
          >
            <TrendingUp className="w-5 h-5 text-brand-cyan" />
            <span>Latest Uploads</span>
          </Link>

          {/* Subscribe on YouTube */}
          <a
            href={siteConfig.subscribeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-red-950/40 hover:shadow-red-600/30 transition transform hover:-translate-y-0.5"
          >
            <YouTubeIcon className="w-5 h-5" />
            <span>Subscribe on YouTube</span>
          </a>
        </div>

        {/* Stats Row */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-dark-900/80 border border-dark-750/80 backdrop-blur-xl flex flex-col items-center justify-center space-y-1 hover:border-brand-cyan/50 hover:shadow-cyan-glow/20 transition-all duration-300 group"
              >
                <Icon className="w-5 h-5 text-brand-cyan mb-1 group-hover:scale-110 transition duration-300" />
                <span className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                  {s.value}
                </span>
                <span className="text-xs text-gray-400 font-medium">{s.label}</span>
              </div>
            );
          })}
        </div>

        {/* Studio Highlights Bar */}
        <div className="mt-10 max-w-4xl mx-auto pt-6 border-t border-dark-800/80 grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
          {studioHighlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-dark-900/50 border border-dark-800 text-xs text-gray-300"
              >
                <Icon className="w-4 h-4 text-brand-cyan shrink-0" />
                <span className="font-medium text-[11px] leading-tight">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
