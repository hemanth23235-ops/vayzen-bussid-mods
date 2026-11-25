'use client';

import React, { useState, useEffect } from 'react';
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
  Clock,
  Wrench,
  XCircle,
  Search,
  RefreshCw,
  Star,
  ExternalLink,
} from 'lucide-react';
import { ModRequest } from '@/types';

const CATEGORIES = [
  'BUSSID Buses',
  'BUSSID Liveries',
  'BUSSID Cars',
  'BUSSID Trucks',
  'BUSSID Maps',
];

const LOCAL_STORAGE_KEY = 'vayzen_my_mod_requests';

export default function ModRequestSection() {
  const [activeTab, setActiveTab] = useState<'submit' | 'track'>('submit');

  // Form State
  const [formData, setFormData] = useState({
    modName: '',
    category: 'BUSSID Buses',
    requesterName: '',
    emailOrSocial: '',
    details: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [lastSubmittedId, setLastSubmittedId] = useState<string | null>(null);
  const [error, setError] = useState('');

  // Tracker State
  const [requests, setRequests] = useState<ModRequest[]>([]);
  const [myRequestIds, setMyRequestIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed' | 'rejected'>('all');
  const [fetchingRequests, setFetchingRequests] = useState(false);

  // Load user's saved request IDs from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setMyRequestIds(JSON.parse(stored));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Fetch community requests
  const fetchRequests = async () => {
    setFetchingRequests(true);
    try {
      const res = await fetch(`/api/requests?t=${Date.now()}`, { cache: 'no-store' });
      const data = await res.json();
      if (data.success && Array.isArray(data.requests)) {
        setRequests(data.requests);
      }
    } catch (err) {
      console.error('Failed to load requests:', err);
    } finally {
      setFetchingRequests(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

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

      if (data.success && data.request) {
        setSuccess(true);
        const newId = data.request.id;
        setLastSubmittedId(newId);

        // Save to user's localStorage
        const updatedMyIds = [newId, ...myRequestIds];
        setMyRequestIds(updatedMyIds);
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedMyIds));
        } catch {
          // ignore
        }

        // Prepend to current list
        setRequests((prev) => [data.request, ...prev]);

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

  // Filter requests
  const filteredRequests = requests.filter((r) => {
    const matchesSearch =
      r.modName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.requesterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.category && r.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (r.emailOrSocial && r.emailOrSocial.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Separate user's own requests
  const myRequests = requests.filter((r) => myRequestIds.includes(r.id));

  const getStatusBadge = (status: ModRequest['status']) => {
    switch (status) {
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-400 border border-sky-500/30">
            <Wrench className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} />
            <span>In Progress (Building/Testing)</span>
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Completed & Released 🎉</span>
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-gray-800 text-gray-400 border border-gray-700">
            <XCircle className="w-3.5 h-3.5" />
            <span>Not Possible</span>
          </span>
        );
      case 'pending':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Clock className="w-3.5 h-3.5" />
            <span>Under Review (In Queue)</span>
          </span>
        );
    }
  };

  return (
    <section id="mod-request-section" className="py-20 bg-dark-950 border-t border-dark-800 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-brand-orange/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/10 border border-brand-orange/20 text-brand-orange text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Subscriber Community Hub</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            BUSSID Mod Request & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-red-500">Live Status Tracker</span>
          </h2>
          <p className="text-gray-400 text-sm mt-3 leading-relaxed">
            Request your favorite Kerala tourist bus, KSRTC coach, Indian truck, or hill map — and track its live development progress right here!
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab('submit')}
            className={`px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition ${
              activeTab === 'submit'
                ? 'bg-gradient-to-r from-brand-orange to-red-600 text-white shadow-orange-sm'
                : 'bg-dark-900 text-gray-400 hover:text-white border border-dark-750'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Submit a Mod Request</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('track');
              fetchRequests();
            }}
            className={`px-6 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition ${
              activeTab === 'track'
                ? 'bg-gradient-to-r from-brand-orange to-red-600 text-white shadow-orange-sm'
                : 'bg-dark-900 text-gray-400 hover:text-white border border-dark-750'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Live Request Status</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] bg-black/40 text-brand-orange border border-brand-orange/30 font-mono">
              {requests.length}
            </span>
          </button>
        </div>

        {/* Tab 1: Submit Form */}
        {activeTab === 'submit' && (
          <div className="bg-gradient-to-b from-dark-900 to-dark-900/90 border border-dark-750 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
            {success ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Mod Request Submitted! 🎉</h3>
                <p className="text-gray-400 text-sm max-w-md mx-auto">
                  Thank you! Your suggestion is now in VayZenXPlayz’s creator queue. You can track the real-time status of your request anytime!
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('track');
                      fetchRequests();
                    }}
                    className="px-6 py-3 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-xs shadow-orange-sm transition"
                  >
                    View Status on Live Board &rarr;
                  </button>
                  <button
                    type="button"
                    onClick={() => setSuccess(false)}
                    className="px-5 py-3 rounded-xl bg-dark-800 hover:bg-dark-750 text-gray-300 hover:text-white font-semibold text-xs border border-dark-700 transition"
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
                    ⚡ Monitored directly by VayZenXPlayz. Free service for all subscribers!
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
        )}

        {/* Tab 2: Live Status Tracker */}
        {activeTab === 'track' && (
          <div className="space-y-6">
            {/* User's Own Pinned Requests */}
            {myRequests.length > 0 && (
              <div className="bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border border-brand-orange/40 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-4 h-4 text-brand-orange fill-brand-orange" />
                  <h3 className="text-base font-extrabold text-white">Your Submitted Requests</h3>
                  <span className="text-xs text-gray-400">({myRequests.length})</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {myRequests.map((req) => (
                    <div
                      key={req.id}
                      className="p-4 rounded-2xl bg-dark-950/70 border border-dark-750 flex flex-col justify-between space-y-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-gray-400">{req.category}</span>
                          {getStatusBadge(req.status)}
                        </div>
                        <h4 className="text-lg font-bold text-white">{req.modName}</h4>
                        {req.details && (
                          <p className="text-xs text-gray-400 italic line-clamp-2">
                            &ldquo;{req.details}&rdquo;
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-dark-800">
                        <span>Submitted: {new Date(req.createdAt).toLocaleDateString()}</span>
                        {req.status === 'completed' ? (
                          <a
                            href="/mods"
                            className="font-bold text-brand-orange hover:underline flex items-center gap-1"
                          >
                            <span>Download Mod</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : req.status === 'in_progress' ? (
                          <span className="text-sky-400 font-semibold">In development 🛠️</span>
                        ) : (
                          <span className="text-amber-400 font-semibold">In creator queue ⏳</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Community Requests Explorer */}
            <div className="bg-dark-900 border border-dark-750 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
              {/* Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-dark-800">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by your name or mod name..."
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-850 border border-dark-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={fetchRequests}
                    disabled={fetchingRequests}
                    className="p-2.5 rounded-xl bg-dark-850 hover:bg-dark-800 text-gray-300 hover:text-white border border-dark-700 flex items-center gap-1.5 text-xs font-semibold transition"
                    title="Refresh Live Status"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-brand-orange ${fetchingRequests ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </button>

                  <div className="flex flex-wrap items-center gap-1">
                    {(['all', 'in_progress', 'pending', 'completed'] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => setStatusFilter(st)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold capitalize transition ${
                          statusFilter === st
                            ? 'bg-brand-orange text-white shadow-sm'
                            : 'bg-dark-850 hover:bg-dark-800 text-gray-400 hover:text-white border border-dark-700'
                        }`}
                      >
                        {st === 'all'
                          ? `All (${requests.length})`
                          : st === 'in_progress'
                          ? `In Progress (${requests.filter((r) => r.status === 'in_progress').length})`
                          : st === 'completed'
                          ? `Completed (${requests.filter((r) => r.status === 'completed').length})`
                          : `Pending (${requests.filter((r) => r.status === 'pending').length})`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status Board Cards */}
              {filteredRequests.length === 0 ? (
                <div className="py-12 text-center text-gray-400 space-y-2">
                  <Clock className="w-10 h-10 text-gray-600 mx-auto" />
                  <p className="text-sm font-semibold text-white">No requests match your search</p>
                  <p className="text-xs text-gray-500">
                    Try another search term or submit your requested mod above!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredRequests.map((req) => (
                    <div
                      key={req.id}
                      className="p-5 rounded-2xl bg-dark-850/80 border border-dark-750 flex flex-col justify-between space-y-4 hover:border-brand-orange/30 transition hover:-translate-y-0.5"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[11px] font-semibold text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded-md">
                            {req.category}
                          </span>
                          <span className="text-[10px] text-gray-500 font-mono">
                            {new Date(req.createdAt).toLocaleDateString()}
                          </span>
                        </div>

                        <h4 className="text-base font-bold text-white leading-snug">
                          {req.modName}
                        </h4>

                        {req.details && (
                          <p className="text-xs text-gray-400 line-clamp-2 italic">
                            &ldquo;{req.details}&rdquo;
                          </p>
                        )}
                      </div>

                      <div className="space-y-3 pt-3 border-t border-dark-750/80">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs text-gray-300">
                            <User className="w-3.5 h-3.5 text-gray-500" />
                            <span className="font-semibold text-white">{req.requesterName}</span>
                            {req.emailOrSocial && (
                              <span className="text-[10px] text-brand-orange font-mono">
                                ({req.emailOrSocial})
                              </span>
                            )}
                          </div>
                        </div>

                        <div>{getStatusBadge(req.status)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
