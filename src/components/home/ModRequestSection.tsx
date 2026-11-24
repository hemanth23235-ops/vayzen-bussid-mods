'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  Bus,
  Layers,
  MessageSquare,
  User,
  AtSign,
} from 'lucide-react';

const CATEGORIES = [
  'BUSSID Buses',
  'BUSSID Trucks',
  'BUSSID Cars',
  'BUSSID Maps',
  'BUSSID Liveries',
  'BUSSID DJ Horns',
];

export default function ModRequestSection() {
  const [formData, setFormData] = useState({
    modName: '',
    category: 'BUSSID Buses',
    requesterName: '',
    emailOrSocial: '',
    details: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.modName.trim()) {
      setError('Please provide the mod or vehicle name.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setFormData({
          modName: '',
          category: 'BUSSID Buses',
          requesterName: '',
          emailOrSocial: '',
          details: '',
        });
      } else {
        setError(data.message || 'Failed to submit request. Please try again.');
      }
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="mod-request-section" className="py-20 bg-dark-950 border-t border-dark-800 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Subscriber Community Requests</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Can’t Find Your Favorite Mod? <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-500">Request It!</span>
          </h2>
          <p className="text-gray-400 text-sm mt-3 leading-relaxed">
            Want a specific Indian sleeper coach, KSRTC bus, Mahindra 4x4, custom livery, or hill map?
            Send your request directly to VayZenXPlayz and we will review and upload it!
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-gradient-to-b from-dark-900 to-dark-900/90 border border-dark-750 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          {success ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Mod Request Submitted! 🎉</h3>
              <p className="text-gray-400 text-sm max-w-md mx-auto">
                Thank you! Your suggestion has been saved to our creator queue. Stay tuned to our YouTube channel videos for updates when your requested mod is released!
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setSuccess(false)}
                  className="px-6 py-2.5 rounded-xl bg-dark-800 hover:bg-dark-750 text-white font-semibold text-xs border border-dark-700 transition"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mod / Bus Name */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                    <Bus className="w-4 h-4 text-brand-orange" />
                    <span>Requested Mod Name *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.modName}
                    onChange={(e) => setFormData({ ...formData, modName: e.target.value })}
                    placeholder="e.g. Scania Metrolink Sleeper, KSRTC Minnal, Thar 4x4"
                    className="w-full px-4 py-3 rounded-xl bg-dark-850 border border-dark-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition"
                  />
                </div>

                {/* Mod Category */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-brand-orange" />
                    <span>Category</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-dark-850 border border-dark-700 text-white text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat} className="bg-dark-900 text-white">
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Requester Name / Handle */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                    <User className="w-4 h-4 text-brand-orange" />
                    <span>Your Gamer Tag / Name</span>
                  </label>
                  <input
                    type="text"
                    value={formData.requesterName}
                    onChange={(e) => setFormData({ ...formData, requesterName: e.target.value })}
                    placeholder="e.g. Rahul Kerala, GamerBoy2026"
                    className="w-full px-4 py-3 rounded-xl bg-dark-850 border border-dark-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition"
                  />
                </div>

                {/* YouTube / Instagram Handle (for shoutout) */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                    <AtSign className="w-4 h-4 text-brand-orange" />
                    <span>YouTube or Social Handle (Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.emailOrSocial}
                    onChange={(e) => setFormData({ ...formData, emailOrSocial: e.target.value })}
                    placeholder="@yourhandle (for video shoutout)"
                    className="w-full px-4 py-3 rounded-xl bg-dark-850 border border-dark-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition"
                  />
                </div>
              </div>

              {/* Special details / requirements */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-brand-orange" />
                  <span>Extra Details or Special Features (Optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Mention special details, like: 'Needs DJ bass horn tone, Kerala tourist livery, strobe lights, or steering animation'..."
                  className="w-full px-4 py-3 rounded-xl bg-dark-850 border border-dark-700 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition resize-none"
                />
              </div>

              {/* Error Alert */}
              {error && (
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <p className="text-xs text-gray-400">
                  ⚡ All requests are monitored directly by VayZenXPlayz. Free service for all subscribers!
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-orange to-red-600 hover:from-brand-orange-hover hover:to-red-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transition transform hover:-translate-y-0.5 disabled:opacity-50 shrink-0"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting Request...' : 'Send Mod Request'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
