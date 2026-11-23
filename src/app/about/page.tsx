import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import {
  Flame,
  ShieldCheck,
  Download,
  Users,
  Bus,
  Mail,
  Send,
  ExternalLink,
} from 'lucide-react';
import YouTubeIcon from '@/components/common/YouTubeIcon';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'About VayZenXPlayz BUSSID Mods & Creator',
  description:
    'Learn about VayZenXPlayz, the dedicated Bus Simulator Indonesia mods platform for Kerala buses, trucks, cars, maps, and liveries.',
};

export default function AboutPage() {
  const highlights = [
    {
      title: '100% Hand-Tested in BUSSID',
      description:
        'Every single .bussidmod file uploaded here is personally tested in Bus Simulator Indonesia (v4.0.4 - v4.3.4+) and scanned via VirusTotal to ensure clean, crash-free gameplay.',
      icon: ShieldCheck,
      color: 'text-emerald-400 bg-emerald-950/50 border-emerald-500/30',
    },
    {
      title: 'High-Speed Direct Mirrors',
      description:
        'No confusing ad-links, no password locks, and no broken links. We prioritize high-speed Google Drive and MediaFire mirrors with backup links for fast downloads.',
      icon: Download,
      color: 'text-brand-orange bg-brand-orange/10 border-brand-orange/30',
    },
    {
      title: 'Easy Step-by-Step Installation Guides',
      description:
        'Every mod includes beginner-friendly installation instructions detailing exact Android storage paths (Internal Storage > BUSSID > Mods) and livery application steps.',
      icon: Bus,
      color: 'text-sky-400 bg-sky-950/50 border-sky-500/30',
    },
    {
      title: 'Active YouTube Community',
      description:
        'Backed by an active community of passionate BUSSID players on YouTube, with regular video showcases, horn tests, livery reveals, and mountain climb challenges.',
      icon: Users,
      color: 'text-purple-400 bg-purple-950/50 border-purple-500/30',
    },
  ];

  return (
    <div className="pt-28 pb-20 bg-dark-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border border-dark-750 p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-orange to-red-600 flex items-center justify-center mx-auto mb-6 shadow-orange-glow">
            <Flame className="w-8 h-8 text-white animate-pulse-slow" />
          </div>

          <span className="text-xs font-bold text-brand-orange uppercase tracking-wider px-3 py-1 rounded-full bg-brand-orange/15 border border-brand-orange/30 mb-4 inline-block">
            About The BUSSID Hub
          </span>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Built for BUSSID Players, Curated by{' '}
            <span className="text-brand-orange">{siteConfig.channelName}</span>
          </h1>

          <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Welcome to the official download portal for <strong>VayZenXPlayz</strong>. Our mission is to
            provide the Bus Simulator Indonesia community with the highest quality, authentic, and safest
            Kerala tourist buses, Indian heavy trucks, Mahindra Thar 4x4, Wayanad ghat maps, and 4K liveries.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href={siteConfig.subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-red-900/30 transition transform hover:-translate-y-0.5"
            >
              <YouTubeIcon className="w-4 h-4" />
              <span>Subscribe on YouTube</span>
            </a>

            <Link
              href="/mods"
              className="px-6 py-3 rounded-xl bg-dark-800 hover:bg-dark-750 text-white font-semibold text-xs flex items-center gap-2 border border-dark-700 transition"
            >
              <Bus className="w-4 h-4 text-brand-orange" />
              <span>Browse All BUSSID Mods</span>
            </Link>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {highlights.map((h, idx) => {
            const Icon = h.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-dark-900 border border-dark-750 hover:border-dark-600 transition space-y-3"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${h.color}`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white">{h.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{h.description}</p>
              </div>
            );
          })}
        </div>

        {/* Contact & Community Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-dark-900/80 border border-dark-750 max-w-3xl mx-auto text-center space-y-6">
          <h3 className="text-2xl font-bold text-white">Join Our BUSSID Community & Request Mods</h3>
          <p className="text-sm text-gray-400 max-w-lg mx-auto">
            Have a custom livery request, bus horn sound suggestion, or found a broken download link?
            Reach out directly through any of our community channels below.
          </p>

          <div className="flex flex-wrap justify-center gap-3 pt-2">
            <a
              href={siteConfig.discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-dark-850 hover:bg-dark-800 text-gray-200 text-xs font-semibold flex items-center gap-2 border border-dark-700 hover:border-indigo-500/50 transition"
            >
              <ExternalLink className="w-4 h-4 text-indigo-400" />
              <span>Discord Community</span>
            </a>

            <a
              href={siteConfig.telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-dark-850 hover:bg-dark-800 text-gray-200 text-xs font-semibold flex items-center gap-2 border border-dark-700 hover:border-sky-500/50 transition"
            >
              <Send className="w-4 h-4 text-sky-400" />
              <span>Telegram Channel</span>
            </a>

            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="px-5 py-2.5 rounded-xl bg-dark-850 hover:bg-dark-800 text-gray-200 text-xs font-semibold flex items-center gap-2 border border-dark-700 hover:border-brand-orange/50 transition"
            >
              <Mail className="w-4 h-4 text-brand-orange" />
              <span>Email Support</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
