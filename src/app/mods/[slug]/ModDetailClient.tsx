'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/image';
import {
  Download,
  Calendar,
  HardDrive,
  CheckCircle,
  Copy,
  Check,
  Share2,
  ExternalLink,
  ShieldCheck,
  AlertTriangle,
  Play,
  ChevronRight,
  Layers,
  Wrench,
  CheckSquare,
  Sparkles,
  Info,
  Youtube,
} from 'lucide-react';
import { ModItem } from '@/types';
import { formatNumber, formatDate } from '@/lib/utils';
import ModCard from '@/components/mods/ModCard';
import { siteConfig } from '@/config/site';

interface ModDetailClientProps {
  mod: ModItem;
  relatedMods: ModItem[];
}

export default function ModDetailClient({ mod, relatedMods }: ModDetailClientProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadCount, setDownloadCount] = useState(mod.downloadsCount);
  const [countdown, setCountdown] = useState<number | null>(null);

  const images = mod.screenshots && mod.screenshots.length > 0 ? mod.screenshots : [mod.thumbnailUrl];

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    setCountdown(3);

    try {
      const res = await fetch('/api/mods/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: mod.slug }),
      });
      const data = await res.json();
      if (data.success && data.downloadsCount) {
        setDownloadCount(data.downloadsCount);
      }
    } catch (e) {
      console.warn('Download tracking error:', e);
    }

    let count = 3;
    const timer = setInterval(() => {
      count -= 1;
      if (count <= 0) {
        clearInterval(timer);
        setCountdown(null);
        window.open(mod.downloadUrl, '_blank', 'noopener,noreferrer');
      } else {
        setCountdown(count);
      }
    }, 800);
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = encodeURIComponent(`Download ${mod.name} for ${mod.game} on VayZenXPlayz Mods!`);

  return (
    <div className="pt-24 pb-20 bg-dark-950 min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <a href="/" className="hover:text-white transition">
            Home
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <a href="/mods" className="hover:text-white transition">
            Mods
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-brand-orange">{mod.game}</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-gray-300 truncate max-w-xs">{mod.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column (2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Large Banner / Screenshot Gallery */}
            <div className="bg-dark-900 border border-dark-750 rounded-3xl overflow-hidden shadow-2xl">
              <div className="relative aspect-video w-full bg-dark-950">
                <Image
                  src={images[activeImageIndex]}
                  alt={`${mod.name} screenshot`}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-transparent to-black/20" />

                {/* Badges on image */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-brand-orange text-white shadow-orange-sm">
                    {mod.game}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-dark-950/80 text-gray-300 border border-white/10 backdrop-blur-md">
                    {mod.category}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-white bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Tested on {mod.supportedGameVersion}</span>
                  </div>
                  <span className="text-xs text-gray-300 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 font-mono">
                    Image {activeImageIndex + 1} of {images.length}
                  </span>
                </div>
              </div>

              {/* Screenshots Thumbnail Selector */}
              {images.length > 1 && (
                <div className="p-3 bg-dark-900/95 border-t border-dark-800 flex items-center gap-3 overflow-x-auto">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition ${
                        activeImageIndex === idx
                          ? 'border-brand-orange shadow-orange-sm scale-105'
                          : 'border-dark-700 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mod Title & Quick Specs Header */}
            <div className="bg-dark-900 border border-dark-750 rounded-3xl p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {mod.name}
                  </h1>
                  <p className="text-xs text-gray-400 mt-1">
                    Uploaded by <strong className="text-brand-orange">{mod.author}</strong> on{' '}
                    {formatDate(mod.uploadDate)}
                  </p>
                </div>

                {/* Social Share & Copy Link */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-dark-800 hover:bg-dark-750 text-gray-300 hover:text-white text-xs font-semibold border border-dark-700 transition"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-brand-orange" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-dark-800 hover:bg-emerald-600 hover:text-white text-gray-400 border border-dark-700 transition"
                    title="Share on WhatsApp"
                  >
                    <Share2 className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Description */}
              <div className="pt-4 border-t border-dark-800 space-y-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Info className="w-4 h-4 text-brand-orange" />
                  <span>Mod Overview</span>
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                  {mod.description || mod.shortDescription}
                </p>
              </div>

              {/* Features List */}
              {mod.features && mod.features.length > 0 && (
                <div className="pt-6 border-t border-dark-800 space-y-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-brand-orange" />
                    <span>Key Mod Features</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {mod.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-dark-850/80 border border-dark-750 text-xs text-gray-200"
                      >
                        <CheckCircle className="w-4 h-4 text-brand-orange shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step-by-Step Installation Tutorial */}
              {mod.installationGuide && mod.installationGuide.length > 0 && (
                <div className="pt-6 border-t border-dark-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-brand-orange" />
                      <span>Step-by-Step Installation Tutorial</span>
                    </h3>
                    <span className="text-xs text-brand-orange font-semibold">100% Working</span>
                  </div>

                  <div className="space-y-3">
                    {mod.installationGuide.map((step) => (
                      <div
                        key={step.step}
                        className="p-4 rounded-2xl bg-dark-850 border border-dark-750 flex items-start gap-3.5"
                      >
                        <div className="w-7 h-7 rounded-xl bg-brand-orange text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm shadow-brand-orange/40">
                          {step.step}
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-white">{step.title}</h4>
                          <p className="text-xs text-gray-400 leading-relaxed">
                            {step.instruction}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Column (1 col): Download Box, Requirements, Meta */}
          <div className="space-y-6">
            {/* Primary Download Box */}
            <div className="bg-dark-900 border border-dark-750 rounded-3xl p-6 space-y-5 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between border-b border-dark-800 pb-4">
                <span className="text-xs font-bold text-brand-orange uppercase tracking-wider">
                  Download Package
                </span>
                <span className="text-xs text-gray-400 font-mono font-semibold">
                  {mod.fileSize}
                </span>
              </div>

              {/* Safety Badge */}
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs">
                <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-400" />
                <div>
                  <span className="font-semibold text-emerald-300">VirusTotal Verified</span>
                  <p className="text-[11px] text-emerald-400/80">No adware, no password locks</p>
                </div>
              </div>

              {/* Download CTA Button */}
              <button
                onClick={handleDownload}
                disabled={countdown !== null}
                className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-brand-orange to-red-600 hover:from-brand-orange-hover hover:to-red-500 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-orange-glow transition transform hover:-translate-y-0.5 disabled:opacity-75"
              >
                <Download className="w-5 h-5 animate-bounce" />
                <span>
                  {countdown !== null
                    ? `Generating Mirror (${countdown}s)...`
                    : downloading
                    ? 'Download Started'
                    : 'Download Mod Now'}
                </span>
              </button>

              {/* Backup Mirror */}
              {mod.backupDownloadUrl && (
                <a
                  href={mod.backupDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 rounded-xl bg-dark-800 hover:bg-dark-750 text-gray-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 border border-dark-700 transition"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                  <span>Backup Google Drive Mirror</span>
                </a>
              )}

              {/* Mod Specs Table */}
              <div className="space-y-2.5 pt-2 text-xs">
                <div className="flex items-center justify-between py-2 border-b border-dark-800/80">
                  <span className="text-gray-400">Mod Version</span>
                  <span className="font-mono font-semibold text-white">{mod.version}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-dark-800/80">
                  <span className="text-gray-400">Game Compatibility</span>
                  <span className="font-semibold text-white">{mod.supportedGameVersion}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-dark-800/80">
                  <span className="text-gray-400">Total Downloads</span>
                  <span className="font-mono font-bold text-brand-orange">
                    {formatNumber(downloadCount)}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-dark-800/80">
                  <span className="text-gray-400">File Size</span>
                  <span className="font-mono text-white">{mod.fileSize}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-gray-400">Release Date</span>
                  <span className="text-white">{formatDate(mod.uploadDate)}</span>
                </div>
              </div>
            </div>

            {/* System / Game Requirements */}
            {mod.requirements && mod.requirements.length > 0 && (
              <div className="bg-dark-900 border border-dark-750 rounded-3xl p-6 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-brand-orange" />
                  <span>Mod Requirements</span>
                </h4>
                <ul className="space-y-2 text-xs text-gray-300">
                  {mod.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-orange shrink-0 mt-1.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Warning Box */}
            <div className="bg-dark-900 border border-dark-750 rounded-3xl p-5 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-amber-400 font-semibold">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Notice for Players</span>
              </div>
              <p className="text-gray-400 leading-relaxed text-[11px]">
                Always extract files before placing them into your game folder. If any link is expired or
                broken, please notify <strong className="text-white">{siteConfig.channelName}</strong> on
                Discord or YouTube comments.
              </p>
            </div>

            {/* Creator Channel Card */}
            <div className="bg-gradient-to-br from-red-950/30 to-dark-900 border border-red-900/40 rounded-3xl p-5 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center shadow-md">
                  <Youtube className="w-5 h-5 fill-white text-white" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{siteConfig.channelName}</h4>
                  <p className="text-[11px] text-gray-400">Subscribe for weekly mod releases</p>
                </div>
              </div>
              <a
                href={siteConfig.subscribeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <Youtube className="w-4 h-4 fill-white" />
                <span>Subscribe on YouTube</span>
              </a>
            </div>
          </div>
        </div>

        {/* Related / Recommended Mods Section */}
        {relatedMods && relatedMods.length > 0 && (
          <div className="mt-20 pt-12 border-t border-dark-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">Recommended Mods</h3>
                <p className="text-xs text-gray-400 mt-1">
                  More top-rated mods you might enjoy for {mod.game}.
                </p>
              </div>
              <a
                href="/mods"
                className="text-xs font-bold text-brand-orange hover:underline flex items-center gap-1"
              >
                <span>Browse All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedMods.slice(0, 4).map((rel) => (
                <ModCard key={rel.id} mod={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
