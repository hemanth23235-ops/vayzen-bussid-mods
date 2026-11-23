'use client';

import React from 'react';
import Link from 'next/link';
import {
  Download,
  Flame,
  Youtube,
  ShieldCheck,
  Bus,
  Users,
  ChevronRight,
  TrendingUp,
  Layers,
} from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function HeroSection() {
  const stats = [
    { label: 'Active BUSSID Mods', value: '120+', icon: Bus },
    { label: 'Total Downloads', value: '2.8M+', icon: Download },
    { label: 'YouTube Community', value: siteConfig.subscribersCountText, icon: Users },
    { label: 'Clean .bussidmod Files', value: '100%', icon: ShieldCheck },
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-hero-glow bg-cover">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

      {/* Subtle Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-brand-orange/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[250px] bg-red-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Creator Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark-900/90 border border-brand-orange/40 shadow-orange-sm mb-6 animate-pulse-slow">
          <Flame className="w-4 h-4 text-brand-orange" />
          <span className="text-xs font-bold text-gray-200 tracking-wide">
            OFFICIAL BUSSID HUB FOR <strong className="text-brand-orange">{siteConfig.channelName}</strong>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
        </div>

        {/* Main Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white uppercase leading-[1.1]">
          UPGRADE YOUR{' '}
          <span className="bg-gradient-to-r from-brand-orange via-orange-400 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,94,0,0.45)]">
            BUSSID
          </span>{' '}
          GAMEPLAY
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed">
          Discover, explore and download the best mods for Bus Simulator Indonesia.
          <span className="block text-gray-400 text-sm sm:text-base mt-1">
            Kerala tourist buses, Mahindra Thar 4x4, heavy tipper trucks, Wayanad ghat maps & 4K liveries. Free direct mirrors.
          </span>
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          {/* Explore Mods */}
          <Link
            href="/mods"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-orange to-red-600 hover:from-brand-orange-hover hover:to-red-500 text-white font-bold text-base flex items-center justify-center gap-2 shadow-orange-glow transition transform hover:-translate-y-0.5"
          >
            <Bus className="w-5 h-5" />
            <span>Explore BUSSID Mods</span>
            <ChevronRight className="w-4 h-4 ml-0.5" />
          </Link>

          {/* Latest Downloads */}
          <Link
            href="/mods?sort=latest"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-dark-850 hover:bg-dark-800 text-white font-semibold text-base flex items-center justify-center gap-2 border border-dark-700 hover:border-brand-orange/50 transition transform hover:-translate-y-0.5"
          >
            <TrendingUp className="w-5 h-5 text-brand-orange" />
            <span>Latest Downloads</span>
          </Link>

          {/* Subscribe on YouTube */}
          <a
            href={siteConfig.subscribeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-red-600/90 hover:bg-red-600 text-white font-semibold text-base flex items-center justify-center gap-2 shadow-lg shadow-red-900/30 transition transform hover:-translate-y-0.5"
          >
            <Youtube className="w-5 h-5 fill-white" />
            <span>Subscribe on YouTube</span>
          </a>
        </div>

        {/* Stats Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-dark-900/70 border border-dark-750/80 backdrop-blur-md flex flex-col items-center justify-center space-y-1 hover:border-brand-orange/40 transition group"
              >
                <Icon className="w-5 h-5 text-brand-orange mb-1 group-hover:scale-110 transition duration-300" />
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                  {s.value}
                </span>
                <span className="text-xs text-gray-400 font-medium">{s.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
