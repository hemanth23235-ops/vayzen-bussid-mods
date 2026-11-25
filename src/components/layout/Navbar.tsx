'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Flame,
  Search,
  Menu,
  X,
  Bus,
  ShieldCheck,
} from 'lucide-react';
import YouTubeIcon from '@/components/common/YouTubeIcon';
import { siteConfig } from '@/config/site';
import SearchModal from '@/components/common/SearchModal';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Shortcut for Ctrl+K search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'All Mods', href: '/mods' },
    { name: 'Buses', href: '/mods?category=bussid-buses' },
    { name: 'Livery', href: '/mods?category=bussid-liveries' },
    { name: 'Cars', href: '/mods?category=bussid-cars' },
    { name: 'Trucks', href: '/mods?category=bussid-trucks' },
    { name: 'Maps', href: '/mods?category=bussid-maps' },
    { name: 'Request Mod', href: '/#mod-request-section' },
    { name: 'YouTube', href: '/#youtube-section' },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return false;
    return pathname.startsWith(href.split('?')[0]);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-dark-950/90 backdrop-blur-md border-b border-dark-700/80 shadow-lg shadow-black/40 py-3'
            : 'bg-dark-950/40 backdrop-blur-sm border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-brand-orange to-red-600 p-0.5 shadow-orange-sm group-hover:shadow-orange-glow transition duration-300 transform group-hover:scale-105 shrink-0 overflow-hidden">
                <Image
                  src="/images/channel-avatar.jpg"
                  alt="VayZenXPlayz"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover rounded-[10px]"
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-brand-orange transition">
                    VAYZEN<span className="text-brand-orange">X</span>PLAYS
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-brand-orange/20 text-brand-orange border border-brand-orange/40 uppercase tracking-wider">
                    MODS
                  </span>
                </div>
                <span className="text-[10px] text-gray-400 font-medium tracking-wide">
                  Ultimate BUSSID Mods Hub
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1 bg-dark-900/80 px-4 py-1.5 rounded-full border border-dark-700/60 shadow-inner">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 relative ${
                      active
                        ? 'text-white bg-brand-orange shadow-orange-sm'
                        : 'text-gray-300 hover:text-white hover:bg-dark-750'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5">
              {/* Quick Search Button */}
              <button
                onClick={() => setSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-850 hover:bg-dark-750 text-gray-300 hover:text-white border border-dark-700 transition group text-sm"
                title="Search BUSSID mods (Ctrl + K)"
              >
                <Search className="w-4 h-4 text-brand-orange group-hover:scale-110 transition" />
                <span className="hidden sm:inline text-xs text-gray-400 font-medium">Search...</span>
                <kbd className="hidden lg:inline-block text-[10px] px-1.5 py-0.5 rounded bg-dark-950 text-gray-400 border border-dark-700 font-mono">
                  ⌘K
                </kbd>
              </button>

              {/* YouTube Subscribe CTA */}
              <a
                href={siteConfig.subscribeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-900/30 hover:shadow-red-700/50 transition transform hover:-translate-y-0.5"
              >
                <YouTubeIcon className="w-4 h-4 shrink-0" />
                <span>Subscribe</span>
              </a>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg bg-dark-850 hover:bg-dark-750 text-gray-300 hover:text-white border border-dark-700 transition"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-dark-950/95 border-b border-dark-700 px-4 pt-3 pb-6 mt-3 space-y-2 backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive(link.href)
                    ? 'bg-brand-orange text-white font-semibold shadow-orange-sm'
                    : 'text-gray-300 hover:bg-dark-800 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-3 border-t border-dark-800 flex flex-col gap-2">
              <a
                href={siteConfig.subscribeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition shadow-lg"
              >
                <YouTubeIcon className="w-5 h-5 shrink-0" />
                <span>Subscribe to {siteConfig.channelName}</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Global Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
