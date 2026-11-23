import React from 'react';
import Link from 'next/link';
import { Gamepad2, ArrowLeft, Home, Search, Flame } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="pt-36 pb-24 bg-dark-950 min-h-screen flex items-center justify-center px-4 text-center">
      <div className="relative max-w-lg w-full bg-dark-900 border border-dark-750 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6">
        {/* Glow Sphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-orange/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-dark-850 border border-dark-700 flex items-center justify-center mx-auto text-brand-orange shadow-orange-sm">
            <Gamepad2 className="w-8 h-8 animate-bounce" />
          </div>

          <span className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-500 font-mono block">
            404
          </span>

          <h2 className="text-2xl font-extrabold text-white">Mod Not Found</h2>

          <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">
            Oops! The gaming mod or page you are looking for has been moved, renamed, or does not exist.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs flex items-center justify-center gap-2 shadow-orange-sm transition"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <Link
              href="/mods"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-dark-800 hover:bg-dark-750 text-gray-300 hover:text-white font-semibold text-xs flex items-center justify-center gap-2 border border-dark-700 transition"
            >
              <Search className="w-4 h-4 text-brand-orange" />
              <span>Browse All Mods</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
