import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Flame,
  Send,
  Instagram,
  Twitter,
  ShieldAlert,
  ExternalLink,
  Lock,
} from 'lucide-react';
import YouTubeIcon from '@/components/common/YouTubeIcon';
import DiscordIcon from '@/components/common/DiscordIcon';
import { siteConfig } from '@/config/site';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'YouTube',
      href: siteConfig.channelUrl,
      icon: YouTubeIcon,
      color: 'hover:text-red-500 hover:border-red-500/50',
    },
    {
      name: 'Discord',
      href: siteConfig.discordUrl,
      icon: DiscordIcon,
      color: 'hover:text-indigo-400 hover:border-indigo-500/50',
    },
    {
      name: 'Telegram',
      href: siteConfig.telegramUrl,
      icon: Send,
      color: 'hover:text-sky-400 hover:border-sky-500/50',
    },
    {
      name: 'Instagram',
      href: siteConfig.instagramUrl,
      icon: Instagram,
      color: 'hover:text-pink-500 hover:border-pink-500/50',
    },
    {
      name: 'Twitter / X',
      href: siteConfig.twitterUrl,
      icon: Twitter,
      color: 'hover:text-cyan-400 hover:border-cyan-500/50',
    },
  ];

  return (
    <footer className="bg-dark-950 border-t border-dark-800/80 pt-16 pb-10 text-gray-400 text-sm relative">
      {/* Top subtle cyan accent line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-cyan/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-dark-800">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-cyan via-brand-orange to-brand-crimson p-0.5 shadow-cyan-sm overflow-hidden shrink-0">
                <Image
                  src="/images/channel-avatar.jpg"
                  alt="VayZenXPlayz"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover rounded-[10px]"
                />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-brand-cyan transition">
                VAYZEN<span className="text-brand-cyan">X</span>PLAYS{' '}
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30 uppercase tracking-widest">
                  STUDIO
                </span>
              </span>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              The premier destination for high-performance Bus Simulator Indonesia mods. Kerala tourist
              buses, heavy tipper lorries, Mahindra Thar 4x4, offroad hill ghat maps, and 4K liveries curated
              by <strong className="text-white">{siteConfig.channelName}</strong>.
            </p>

            {/* Social badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-dark-900 border border-dark-750 text-xs font-medium text-gray-300 transition ${s.color}`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{s.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold tracking-wider text-xs uppercase">BUSSID Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-brand-cyan transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/mods" className="hover:text-brand-cyan transition">
                  All BUSSID Mods
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-brand-cyan transition">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/mods?sort=latest" className="hover:text-brand-cyan transition">
                  Latest Uploads
                </Link>
              </li>
              <li>
                <Link href="/mods?sort=most-downloaded" className="hover:text-brand-cyan transition">
                  Top Downloaded
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-brand-cyan transition">
                  About Creator
                </Link>
              </li>
              <li>
                <Link href="/readme" className="hover:text-brand-cyan transition font-semibold text-brand-cyan">
                  README & Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Top BUSSID Categories */}
          <div className="space-y-3">
            <h4 className="text-white font-bold tracking-wider text-xs uppercase">Categories</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/mods?category=bussid-buses" className="hover:text-brand-cyan transition">
                  BUSSID Buses
                </Link>
              </li>
              <li>
                <Link href="/mods?category=bussid-liveries" className="hover:text-brand-cyan transition">
                  BUSSID Liveries
                </Link>
              </li>
              <li>
                <Link href="/mods?category=bussid-cars" className="hover:text-brand-cyan transition">
                  BUSSID Cars
                </Link>
              </li>
              <li>
                <Link href="/mods?category=bussid-trucks" className="hover:text-brand-cyan transition">
                  BUSSID Trucks
                </Link>
              </li>
              <li>
                <Link href="/mods?category=bussid-maps" className="hover:text-brand-cyan transition">
                  BUSSID Maps
                </Link>
              </li>
            </ul>
          </div>

          {/* Safety & Legal */}
          <div className="space-y-3">
            <h4 className="text-white font-bold tracking-wider text-xs uppercase">Mod Safety</h4>
            <p className="text-xs text-gray-400 leading-relaxed">
              Every .bussidmod file is manually tested inside Bus Simulator Indonesia v4.0.4+ and virus-scanned with VirusTotal.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400">
              <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold">100% Virus-Free & Safe</span>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2 text-center md:text-left">
            <ShieldAlert className="w-4 h-4 text-brand-cyan shrink-0" />
            <span>
              Disclaimer: VayZenXPlayz BUSSID Mods is a fan portal. Bus Simulator Indonesia is a trademark of Maleo. All mods and liveries are fan-created for entertainment.
            </span>
          </div>
          <div className="shrink-0 text-center md:text-right">
            <p>© {currentYear} VayZenXPlayz Studio. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
