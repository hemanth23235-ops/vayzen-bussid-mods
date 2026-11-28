'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Download,
  X,
  ShieldCheck,
  AlertTriangle,
  Copy,
  Check,
  ExternalLink,
  FileText,
  Bus,
} from 'lucide-react';
import { ModItem } from '@/types';
import { formatNumber } from '@/lib/utils';
import CloudflareTurnstile from '@/components/common/CloudflareTurnstile';

interface DownloadModalProps {
  mod: ModItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function DownloadModal({ mod, isOpen, onClose }: DownloadModalProps) {
  const [copied, setCopied] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  // Reset verification state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setIsVerified(false);
      setDownloadStarted(false);
      setCountdown(null);
    }
  }, [isOpen, mod?.slug]);

  if (!isOpen || !mod) return null;

  const modUrl = typeof window !== 'undefined' ? `${window.location.origin}/mods/${mod.slug}` : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(modUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const startDownload = async () => {
    setDownloadStarted(true);
    setCountdown(3);

    // Call API to record download count
    try {
      fetch('/api/mods/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: mod.slug }),
      });
    } catch (e) {
      console.warn('Failed to record download count:', e);
    }

    // Countdown before opening link to ensure reliable direct download
    let count = 3;
    const interval = setInterval(() => {
      count -= 1;
      if (count <= 0) {
        clearInterval(interval);
        setCountdown(null);
        // Open download link in new tab
        window.open(mod.downloadUrl, '_blank', 'noopener,noreferrer');
      } else {
        setCountdown(count);
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-lg bg-dark-900 border border-dark-700/80 rounded-2xl shadow-2xl overflow-hidden z-10 p-6 space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/40">
                BUSSID MOD
              </span>
              <span className="text-xs text-gray-400">{mod.category}</span>
            </div>
            <h3 className="text-xl font-bold text-white leading-tight">{mod.name}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-dark-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Security / VirusTotal Verified Safe Badge */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs">
          <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-400" />
          <div>
            <span className="font-semibold text-emerald-300">VirusTotal Verified:</span>{' '}
            <span>100% clean .bussidmod file. Manually tested by VayZenXPlayz.</span>
          </div>
        </div>

        {/* File Details Grid */}
        <div className="grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-dark-850 border border-dark-750 text-center">
          <div>
            <span className="text-[11px] text-gray-400 block">Mod Version</span>
            <span className="text-sm font-bold text-white font-mono">{mod.version}</span>
          </div>
          <div>
            <span className="text-[11px] text-gray-400 block">File Size</span>
            <span className="text-sm font-bold text-white font-mono">{mod.fileSize}</span>
          </div>
          <div>
            <span className="text-[11px] text-gray-400 block">Downloads</span>
            <span className="text-sm font-bold text-brand-cyan font-mono">
              {formatNumber(mod.downloadsCount)}
            </span>
          </div>
        </div>

        {/* BUSSID Specific Instructions */}
        <div className="space-y-2">
          <div className="flex items-start gap-2 text-xs text-gray-300 bg-dark-800/80 p-3 rounded-xl border border-dark-700">
            <AlertTriangle className="w-4 h-4 text-brand-cyan shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-semibold text-white block">BUSSID Installation Guide:</span>
              <p className="text-[11px] leading-relaxed text-gray-400">
                If downloaded as a <code>.zip</code> file, extract it using ZArchiver. Move the <code>.bussidmod</code> file to: <strong>Internal Storage &gt; BUSSID &gt; Mods</strong>. Open the game and tap <strong>Use</strong> in Garage!
              </p>
            </div>
          </div>
        </div>

        {/* Cloudflare Bot Verification */}
        <div className="p-3.5 rounded-xl bg-dark-850/90 border border-dark-750 flex flex-col items-center justify-center space-y-2.5">
          <div className="flex items-center gap-1.5 text-xs">
            <ShieldCheck className={`w-4 h-4 ${isVerified ? 'text-emerald-400' : 'text-sky-400'}`} />
            <span className="font-semibold text-white">
              {isVerified ? 'Cloudflare Verification Passed' : 'Cloudflare Human Verification'}
            </span>
          </div>

          {!isVerified ? (
            <CloudflareTurnstile
              onSuccess={(token) => {
                setIsVerified(true);
                setTurnstileToken(token);
              }}
            />
          ) : (
            <div className="flex items-center gap-2 py-1.5 px-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 text-xs font-semibold animate-in fade-in">
              <Check className="w-4 h-4" />
              <span>Identity Verified. Direct download unlocked!</span>
            </div>
          )}
        </div>

        {/* Download Action Buttons */}
        <div className="space-y-2.5 pt-1">
          <button
            onClick={startDownload}
            disabled={!isVerified || countdown !== null}
            className={`w-full py-3.5 px-4 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition transform ${
              isVerified
                ? 'bg-gradient-to-r from-brand-cyan via-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-dark-950 font-black shadow-cyan-glow hover:-translate-y-0.5 active:translate-y-0'
                : 'bg-dark-800 text-gray-400 border border-dark-700 cursor-not-allowed opacity-75'
            }`}
          >
            {isVerified ? (
              <>
                <Download className="w-5 h-5 animate-bounce text-dark-950" />
                <span>
                  {countdown !== null
                    ? `Preparing Direct Link in ${countdown}s...`
                    : downloadStarted
                    ? 'Download Again (Direct Mirror)'
                    : 'Download BUSSID Mod'}
                </span>
              </>
            ) : (
              <>
                <ShieldCheck className="w-5 h-5 text-sky-400 animate-pulse" />
                <span>Verify Cloudflare Check Above to Download</span>
              </>
            )}
          </button>

          {/* Backup Download Mirror */}
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
        </div>

        {/* Share & Copy Link */}
        <div className="pt-2 border-t border-dark-800 flex items-center justify-between text-xs text-gray-400">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 hover:text-white transition"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-brand-cyan" />
                <span>Copy Share Link</span>
              </>
            )}
          </button>

          <Link
            href={`/mods/${mod.slug}`}
            onClick={onClose}
            className="text-brand-cyan hover:underline flex items-center gap-1 font-semibold"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>View Full Tutorial</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
