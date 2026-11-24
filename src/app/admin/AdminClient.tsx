'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  ShieldCheck,
  Lock,
  Plus,
  Trash2,
  Edit3,
  Download,
  Eye,
  LogOut,
  Upload,
  FileJson,
  CheckCircle,
  AlertCircle,
  Search,
  ExternalLink,
  Sparkles,
  Save,
  X,
  Bus,
  MessageSquare,
  Clock,
  CheckCheck,
} from 'lucide-react';
import { ModItem, ModRequest } from '@/types';
import { categories } from '@/data/categories';
import { formatNumber, formatDate, slugify } from '@/lib/utils';

export default function AdminClient() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  const [mods, setMods] = useState<ModItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMod, setEditingMod] = useState<ModItem | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Mod Requests Tab State
  const [activeTab, setActiveTab] = useState<'mods' | 'requests'>('mods');
  const [requests, setRequests] = useState<ModRequest[]>([]);
  const [requestSearch, setRequestSearch] = useState('');
  const [requestFilter, setRequestFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed' | 'rejected'>('all');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    game: 'BUSSID',
    category: 'BUSSID Buses',
    shortDescription: '',
    description: '',
    thumbnailUrl: '',
    screenshots: '',
    version: 'v1.0',
    supportedGameVersion: 'BUSSID v4.0.4+',
    fileSize: '35 MB',
    uploadDate: new Date().toISOString().split('T')[0],
    downloadUrl: '',
    backupDownloadUrl: '',
    author: 'VayZenXPlayz',
    isFeatured: false,
    badge: 'NEW' as ModItem['badge'],
    features: '',
    requirements: '',
    installationSteps: '',
  });

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
    loadMods();
    loadRequests();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/admin/check');
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
    } catch {
      setIsAuthenticated(false);
    }
  };

  const loadMods = async () => {
    try {
      const res = await fetch('/api/mods?limit=100');
      const data = await res.json();
      if (data.success) {
        setMods(data.mods);
      }
    } catch (err) {
      console.error('Failed to load mods:', err);
    }
  };

  const loadRequests = async () => {
    try {
      const res = await fetch('/api/requests');
      const data = await res.json();
      if (data.success) {
        setRequests(data.requests);
      }
    } catch (err) {
      console.error('Failed to load subscriber requests:', err);
    }
  };

  const handleUpdateRequestStatus = async (id: string, status: ModRequest['status']) => {
    try {
      const res = await fetch('/api/requests', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      const data = await res.json();
      if (data.success) {
        setStatusMessage({ text: `Request status updated to ${status}`, type: 'success' });
        loadRequests();
      } else {
        setStatusMessage({ text: data.message || 'Failed to update request', type: 'error' });
      }
    } catch {
      setStatusMessage({ text: 'Network error updating request', type: 'error' });
    }
  };

  const handleDeleteRequest = async (id: string) => {
    if (!confirm('Are you sure you want to delete this subscriber request?')) return;
    try {
      const res = await fetch(`/api/requests?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success) {
        setStatusMessage({ text: 'Subscriber request deleted successfully', type: 'success' });
        loadRequests();
      } else {
        setStatusMessage({ text: data.message || 'Failed to delete request', type: 'error' });
      }
    } catch {
      setStatusMessage({ text: 'Network error deleting request', type: 'error' });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();

      if (data.success) {
        setIsAuthenticated(true);
        loadMods();
        loadRequests();
      } else {
        setLoginError(data.message || 'Invalid password');
      }
    } catch {
      setLoginError('Network error logging in');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setIsAuthenticated(false);
  };

  const openAddModal = () => {
    setEditingMod(null);
    setFormData({
      name: '',
      slug: '',
      game: 'BUSSID',
      category: 'BUSSID Buses',
      shortDescription: '',
      description: '',
      thumbnailUrl: '',
      screenshots: '',
      version: 'v1.0',
      supportedGameVersion: 'BUSSID v4.0.4+',
      fileSize: '35 MB',
      uploadDate: new Date().toISOString().split('T')[0],
      downloadUrl: '',
      backupDownloadUrl: '',
      author: 'VayZenXPlayz',
      isFeatured: false,
      badge: 'NEW',
      features: 'Full 3-Stage Animations (Doors & Luggage)\nKerala DJ Bass Horn Tone & Air Hiss\nUltra 4K Interior Cabin with Disco Lights',
      requirements: 'Bus Simulator Indonesia v4.0.4 or higher installed\nMinimum 3GB RAM on Android device',
      installationSteps: 'Download: Download the .bussidmod file to your phone.\nMove to Mods: Move file to Internal Storage > BUSSID > Mods using ZArchiver.\nEquip in Game: Open BUSSID, enter Garage, select bus and tap Use (Pakai).',
    });
    setModalOpen(true);
  };

  const openEditModal = (mod: ModItem) => {
    setEditingMod(mod);
    setFormData({
      name: mod.name,
      slug: mod.slug,
      game: mod.game || 'BUSSID',
      category: mod.category,
      shortDescription: mod.shortDescription,
      description: mod.description,
      thumbnailUrl: mod.thumbnailUrl,
      screenshots: (mod.screenshots || []).join('\n'),
      version: mod.version,
      supportedGameVersion: mod.supportedGameVersion,
      fileSize: mod.fileSize,
      uploadDate: mod.uploadDate,
      downloadUrl: mod.downloadUrl,
      backupDownloadUrl: mod.backupDownloadUrl || '',
      author: mod.author,
      isFeatured: mod.isFeatured,
      badge: mod.badge,
      features: (mod.features || []).join('\n'),
      requirements: (mod.requirements || []).join('\n'),
      installationSteps: (mod.installationGuide || [])
        .map((g) => `${g.title}: ${g.instruction}`)
        .join('\n'),
    });
    setModalOpen(true);
  };

  const handleSaveMod = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const screenshotsArray = formData.screenshots
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const featuresArray = formData.features
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const requirementsArray = formData.requirements
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const stepsArray = formData.installationSteps
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((line, idx) => {
        const parts = line.split(':');
        return {
          step: idx + 1,
          title: parts.length > 1 ? parts[0].trim() : `Step ${idx + 1}`,
          instruction: parts.length > 1 ? parts.slice(1).join(':').trim() : line,
        };
      });

    const slug = formData.slug ? slugify(formData.slug) : slugify(formData.name);

    const modPayload: Partial<ModItem> = {
      id: editingMod?.id || slug,
      slug,
      name: formData.name,
      game: 'BUSSID',
      category: formData.category,
      shortDescription: formData.shortDescription,
      description: formData.description,
      thumbnailUrl: formData.thumbnailUrl,
      screenshots: screenshotsArray.length > 0 ? screenshotsArray : [formData.thumbnailUrl],
      version: formData.version,
      supportedGameVersion: formData.supportedGameVersion,
      fileSize: formData.fileSize,
      uploadDate: formData.uploadDate,
      downloadUrl: formData.downloadUrl,
      backupDownloadUrl: formData.backupDownloadUrl,
      author: formData.author,
      isFeatured: formData.isFeatured,
      badge: formData.badge,
      features: featuresArray,
      requirements: requirementsArray,
      installationGuide: stepsArray,
      downloadsCount: editingMod ? editingMod.downloadsCount : 0,
      tags: ['bussid', formData.category.toLowerCase(), slug],
    };

    try {
      const res = await fetch('/api/mods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(modPayload),
      });
      const data = await res.json();

      if (data.success) {
        setStatusMessage({ text: 'BUSSID Mod saved successfully!', type: 'success' });
        setModalOpen(false);
        loadMods();
      } else {
        setStatusMessage({ text: data.message || 'Failed to save mod', type: 'error' });
      }
    } catch {
      setStatusMessage({ text: 'Error connecting to server', type: 'error' });
    } finally {
      setLoading(false);
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  const handleDeleteMod = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/mods?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success) {
        setStatusMessage({ text: `Mod "${name}" deleted.`, type: 'success' });
        loadMods();
      } else {
        setStatusMessage({ text: data.message || 'Failed to delete mod', type: 'error' });
      }
    } catch {
      setStatusMessage({ text: 'Error connecting to server', type: 'error' });
    }
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(mods, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `bussid-mods-backup-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (Array.isArray(parsed)) {
          let count = 0;
          for (const item of parsed) {
            await fetch('/api/mods', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(item),
            });
            count++;
          }
          setStatusMessage({ text: `Successfully imported ${count} BUSSID mods!`, type: 'success' });
          loadMods();
        }
      } catch (err) {
        setStatusMessage({ text: 'Failed to parse JSON file.', type: 'error' });
      }
    };
    reader.readAsText(file);
  };

  // Filter mods by search in admin list
  const filteredMods = mods.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter requests by search and status
  const filteredRequests = requests.filter((r) => {
    const matchesSearch =
      r.modName.toLowerCase().includes(requestSearch.toLowerCase()) ||
      r.requesterName.toLowerCase().includes(requestSearch.toLowerCase()) ||
      (r.category && r.category.toLowerCase().includes(requestSearch.toLowerCase())) ||
      (r.emailOrSocial && r.emailOrSocial.toLowerCase().includes(requestSearch.toLowerCase()));

    const matchesStatus = requestFilter === 'all' || r.status === requestFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingRequestsCount = requests.filter((r) => r.status === 'pending').length;

  // If loading auth state
  if (isAuthenticated === null) {
    return (
      <div className="pt-36 pb-20 text-center min-h-screen bg-dark-950 text-gray-400">
        <div className="w-8 h-8 border-2 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p>Checking admin authorization...</p>
      </div>
    );
  }

  // Not Authenticated -> Show Login View
  if (!isAuthenticated) {
    return (
      <div className="pt-36 pb-24 bg-dark-950 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-dark-900 border border-dark-750 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-orange to-red-600 flex items-center justify-center mx-auto shadow-orange-sm">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-2xl font-extrabold text-white">VayZen BUSSID Admin</h2>
            <p className="text-xs text-gray-400">
              Enter your master secret password to add, edit, or manage BUSSID mods.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                required
                className="w-full px-4 py-3 rounded-xl bg-dark-850 border border-dark-700 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition"
              />
            </div>

            {loginError && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-400 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold text-sm shadow-orange-sm transition transform hover:-translate-y-0.5 disabled:opacity-50"
            >
              {loading ? 'Authenticating...' : 'Unlock Dashboard'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="pt-28 pb-20 bg-dark-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Toast / Status alert */}
        {statusMessage && (
          <div
            className={`p-4 rounded-2xl flex items-center gap-3 border shadow-lg animate-in slide-in-from-top-4 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                : 'bg-red-950/60 border-red-500/50 text-red-300'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
            )}
            <span className="text-sm font-semibold">{statusMessage.text}</span>
          </div>
        )}

        {/* Dashboard Top Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-dark-800">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Session Authenticated
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              BUSSID Mod Manager
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              Add new BUSSID mods, update download links, modify versions, and manage featured content.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={openAddModal}
              className="px-4 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white text-xs font-bold flex items-center gap-2 shadow-orange-sm transition transform hover:-translate-y-0.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add BUSSID Mod</span>
            </button>

            <button
              onClick={handleExportJSON}
              className="px-3.5 py-2.5 rounded-xl bg-dark-850 hover:bg-dark-800 text-gray-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 border border-dark-700 transition"
              title="Backup your mods to a JSON file"
            >
              <FileJson className="w-4 h-4 text-brand-orange" />
              <span>Export Backup</span>
            </button>

            <label className="px-3.5 py-2.5 rounded-xl bg-dark-850 hover:bg-dark-800 text-gray-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 border border-dark-700 cursor-pointer transition">
              <Upload className="w-4 h-4 text-sky-400" />
              <span>Import JSON</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportJSON}
                className="hidden"
              />
            </label>

            <button
              onClick={handleLogout}
              className="p-2.5 rounded-xl bg-dark-850 hover:bg-red-950 text-gray-400 hover:text-red-400 border border-dark-700 transition"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dashboard Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-5 rounded-2xl bg-dark-900 border border-dark-750 space-y-1">
            <span className="text-xs text-gray-400 font-medium">Total Live Mods</span>
            <p className="text-2xl font-extrabold text-white font-mono">{mods.length}</p>
          </div>
          <div className="p-5 rounded-2xl bg-dark-900 border border-dark-750 space-y-1">
            <span className="text-xs text-gray-400 font-medium">Featured Mods</span>
            <p className="text-2xl font-extrabold text-brand-orange font-mono">
              {mods.filter((m) => m.isFeatured).length}
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-dark-900 border border-dark-750 space-y-1">
            <span className="text-xs text-gray-400 font-medium">Total Downloads</span>
            <p className="text-2xl font-extrabold text-emerald-400 font-mono">
              {formatNumber(mods.reduce((acc, m) => acc + (m.downloadsCount || 0), 0))}
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-dark-900 border border-dark-750 space-y-1">
            <span className="text-xs text-gray-400 font-medium">Categories</span>
            <p className="text-2xl font-extrabold text-white font-mono">{categories.length}</p>
          </div>
          <div className="p-5 rounded-2xl bg-dark-900 border border-dark-750 space-y-1">
            <span className="text-xs text-gray-400 font-medium">Subscriber Requests</span>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-extrabold text-white font-mono">{requests.length}</p>
              {pendingRequestsCount > 0 && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 animate-pulse">
                  {pendingRequestsCount} Pending
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-dark-800 pb-3">
          <button
            onClick={() => setActiveTab('mods')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
              activeTab === 'mods'
                ? 'bg-brand-orange text-white shadow-orange-sm'
                : 'bg-dark-900 text-gray-400 hover:text-white border border-dark-750'
            }`}
          >
            <Bus className="w-4 h-4" />
            <span>BUSSID Mods Inventory</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-black/30 text-white font-mono">
              {mods.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('requests')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition ${
              activeTab === 'requests'
                ? 'bg-brand-orange text-white shadow-orange-sm'
                : 'bg-dark-900 text-gray-400 hover:text-white border border-dark-750'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Subscriber Requests</span>
            {pendingRequestsCount > 0 ? (
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-red-500 text-white font-extrabold animate-pulse font-mono">
                {pendingRequestsCount} NEW
              </span>
            ) : (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-black/30 text-white font-mono">
                {requests.length}
              </span>
            )}
          </button>
        </div>

        {/* Tab 1: Mods Inventory Section */}
        {activeTab === 'mods' && (
          <div className="bg-dark-900 border border-dark-750 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-4 sm:p-6 border-b border-dark-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search BUSSID mods to edit or delete..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-dark-850 border border-dark-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
              />
            </div>
            <span className="text-xs text-gray-400">
              Showing <strong className="text-white">{filteredMods.length}</strong> of {mods.length} mods
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-dark-850/80 border-b border-dark-800 text-gray-400 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-4">Mod Details</th>
                  <th className="py-3.5 px-4">BUSSID Category</th>
                  <th className="py-3.5 px-4">Version & Size</th>
                  <th className="py-3.5 px-4">Downloads</th>
                  <th className="py-3.5 px-4">Featured</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-800">
                {filteredMods.map((mod) => (
                  <tr key={mod.id} className="hover:bg-dark-850/50 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-9 rounded-lg overflow-hidden bg-dark-800 shrink-0">
                          <Image
                            src={mod.thumbnailUrl}
                            alt={mod.name}
                            fill
                            sizes="48px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <a
                            href={`/mods/${mod.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-bold text-white hover:text-brand-orange transition flex items-center gap-1"
                          >
                            <span>{mod.name}</span>
                            <ExternalLink className="w-3 h-3 text-gray-500" />
                          </a>
                          <span className="text-[11px] text-gray-400 block line-clamp-1">
                            {mod.shortDescription}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="font-bold text-brand-orange block">{mod.category}</span>
                    </td>

                    <td className="py-3 px-4 font-mono">
                      <span className="text-white block font-semibold">{mod.version}</span>
                      <span className="text-gray-400">{mod.fileSize}</span>
                    </td>

                    <td className="py-3 px-4 font-mono font-bold text-brand-orange">
                      {formatNumber(mod.downloadsCount)}
                    </td>

                    <td className="py-3 px-4">
                      {mod.isFeatured ? (
                        <span className="px-2 py-0.5 rounded-full bg-brand-orange/20 text-brand-orange font-bold text-[10px] border border-brand-orange/40">
                          YES
                        </span>
                      ) : (
                        <span className="text-gray-500 text-[10px]">No</span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right space-x-1">
                      <button
                        onClick={() => openEditModal(mod)}
                        className="p-1.5 rounded-lg bg-dark-800 hover:bg-dark-750 text-gray-300 hover:text-white border border-dark-700 transition"
                        title="Edit Mod"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-brand-orange" />
                      </button>

                      <button
                        onClick={() => handleDeleteMod(mod.id, mod.name)}
                        className="p-1.5 rounded-lg bg-dark-800 hover:bg-red-950 text-gray-400 hover:text-red-400 border border-dark-700 transition"
                        title="Delete Mod"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        )}

        {/* Tab 2: Subscriber Mod Requests Section */}
        {activeTab === 'requests' && (
          <div className="bg-dark-900 border border-dark-750 rounded-3xl overflow-hidden shadow-xl space-y-4">
            <div className="p-4 sm:p-6 border-b border-dark-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-orange" />
                <input
                  type="text"
                  value={requestSearch}
                  onChange={(e) => setRequestSearch(e.target.value)}
                  placeholder="Search requests by mod name, user, handle..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-dark-850 border border-dark-700 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
                />
              </div>

              {/* Status Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {(['all', 'pending', 'in_progress', 'completed', 'rejected'] as const).map((filterStatus) => (
                  <button
                    key={filterStatus}
                    onClick={() => setRequestFilter(filterStatus)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition ${
                      requestFilter === filterStatus
                        ? 'bg-brand-orange text-white shadow-sm'
                        : 'bg-dark-850 hover:bg-dark-800 text-gray-400 hover:text-white border border-dark-700'
                    }`}
                  >
                    {filterStatus === 'all'
                      ? `All (${requests.length})`
                      : filterStatus === 'in_progress'
                      ? `In Progress (${requests.filter((r) => r.status === 'in_progress').length})`
                      : `${filterStatus} (${requests.filter((r) => r.status === filterStatus).length})`}
                  </button>
                ))}
              </div>
            </div>

            {filteredRequests.length === 0 ? (
              <div className="p-12 text-center text-gray-400">
                <MessageSquare className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                <p className="text-sm font-semibold text-white">No requests found</p>
                <p className="text-xs text-gray-500 mt-1">
                  Subscriber requests submitted from the home page will appear here.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-dark-850/80 border-b border-dark-800 text-gray-400 uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="py-3.5 px-4">Requested Mod</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Requester</th>
                      <th className="py-3.5 px-4">Date</th>
                      <th className="py-3.5 px-4">Status & Action</th>
                      <th className="py-3.5 px-4 text-right">Delete</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-800">
                    {filteredRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-dark-850/50 transition">
                        <td className="py-3.5 px-4 max-w-xs">
                          <p className="font-bold text-white text-sm">{req.modName}</p>
                          {req.details && (
                            <p className="text-[11px] text-gray-400 mt-1 italic line-clamp-2">
                              &ldquo;{req.details}&rdquo;
                            </p>
                          )}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="px-2.5 py-1 rounded-lg bg-dark-800 border border-dark-700 text-gray-300 font-medium">
                            {req.category}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-semibold text-white">{req.requesterName}</p>
                          {req.emailOrSocial && (
                            <span className="text-[11px] text-brand-orange font-mono">
                              {req.emailOrSocial}
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap text-gray-400 font-mono text-[11px]">
                          {req.createdAt ? new Date(req.createdAt).toLocaleDateString() : 'Recent'}
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <select
                            value={req.status}
                            onChange={(e) =>
                              handleUpdateRequestStatus(req.id, e.target.value as ModRequest['status'])
                            }
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border focus:outline-none transition ${
                              req.status === 'completed'
                                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40'
                                : req.status === 'in_progress'
                                ? 'bg-sky-950/80 text-sky-300 border-sky-500/40'
                                : req.status === 'rejected'
                                ? 'bg-gray-900 text-gray-400 border-gray-700'
                                : 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                            }`}
                          >
                            <option value="pending" className="bg-dark-900 text-amber-300">
                              ⏳ Pending
                            </option>
                            <option value="in_progress" className="bg-dark-900 text-sky-300">
                              🛠️ In Progress
                            </option>
                            <option value="completed" className="bg-dark-900 text-emerald-300">
                              ✅ Completed
                            </option>
                            <option value="rejected" className="bg-dark-900 text-gray-400">
                              ❌ Rejected
                            </option>
                          </select>
                        </td>
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={() => handleDeleteRequest(req.id)}
                            className="p-1.5 rounded-lg bg-dark-800 hover:bg-red-950 text-gray-400 hover:text-red-400 border border-dark-700 transition"
                            title="Delete Request"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add / Edit Mod Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-dark-900 border border-dark-750 rounded-3xl p-6 sm:p-8 space-y-6 my-8 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-dark-800 pb-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-brand-orange" />
                <span>{editingMod ? 'Edit BUSSID Mod' : 'Add New BUSSID Mod'}</span>
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-dark-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMod} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Mod Name */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">BUSSID Mod Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Zedone Vega V3 Kerala Tourist Bus"
                    className="w-full px-3 py-2.5 rounded-xl bg-dark-850 border border-dark-700 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
                  />
                </div>

                {/* Custom Slug */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    Slug / URL Identifier
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="Auto-generated if left blank"
                    className="w-full px-3 py-2.5 rounded-xl bg-dark-850 border border-dark-700 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">BUSSID Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-dark-850 border border-dark-700 text-white focus:outline-none focus:border-brand-orange"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Badge */}
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Badge</label>
                  <select
                    value={formData.badge || 'NONE'}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        badge: e.target.value === 'NONE' ? undefined : (e.target.value as any),
                      })
                    }
                    className="w-full px-3 py-2.5 rounded-xl bg-dark-850 border border-dark-700 text-white focus:outline-none focus:border-brand-orange"
                  >
                    <option value="NEW">NEW</option>
                    <option value="HOT">HOT</option>
                    <option value="UPDATED">UPDATED</option>
                    <option value="FEATURED">FEATURED</option>
                    <option value="NONE">None</option>
                  </select>
                </div>
              </div>

              {/* Download URLs (Direct & Backup) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    Direct Download URL * (MediaFire, Google Drive, Dropbox, etc.)
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.downloadUrl}
                    onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
                    placeholder="https://www.mediafire.com/file/... or Google Drive"
                    className="w-full px-3 py-2.5 rounded-xl bg-dark-850 border border-dark-700 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    Backup Mirror URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.backupDownloadUrl}
                    onChange={(e) => setFormData({ ...formData, backupDownloadUrl: e.target.value })}
                    placeholder="https://drive.google.com/..."
                    className="w-full px-3 py-2.5 rounded-xl bg-dark-850 border border-dark-700 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
                  />
                </div>
              </div>

              {/* Version, Supported Version, File Size */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Mod Version</label>
                  <input
                    type="text"
                    value={formData.version}
                    onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                    placeholder="e.g. v2.4"
                    className="w-full px-3 py-2.5 rounded-xl bg-dark-850 border border-dark-700 text-white focus:outline-none focus:border-brand-orange font-mono"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">Supported BUSSID Version</label>
                  <input
                    type="text"
                    value={formData.supportedGameVersion}
                    onChange={(e) => setFormData({ ...formData, supportedGameVersion: e.target.value })}
                    placeholder="e.g. BUSSID v4.0.4 - v4.3.4+"
                    className="w-full px-3 py-2.5 rounded-xl bg-dark-850 border border-dark-700 text-white focus:outline-none focus:border-brand-orange"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">File Size</label>
                  <input
                    type="text"
                    value={formData.fileSize}
                    onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                    placeholder="e.g. 35 MB"
                    className="w-full px-3 py-2.5 rounded-xl bg-dark-850 border border-dark-700 text-white focus:outline-none focus:border-brand-orange font-mono"
                  />
                </div>
              </div>

              {/* Image & Screenshots */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    Cover Thumbnail URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.thumbnailUrl}
                    onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/... or direct image link"
                    className="w-full px-3 py-2.5 rounded-xl bg-dark-850 border border-dark-700 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    Screenshots (One URL per line)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.screenshots}
                    onChange={(e) => setFormData({ ...formData, screenshots: e.target.value })}
                    placeholder="https://image1.jpg&#10;https://image2.jpg"
                    className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-dark-700 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
                  />
                </div>
              </div>

              {/* Short & Full Description */}
              <div>
                <label className="block text-gray-300 font-semibold mb-1">Short Description *</label>
                <input
                  type="text"
                  required
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="One sentence summary shown on mod cards"
                  className="w-full px-3 py-2.5 rounded-xl bg-dark-850 border border-dark-700 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed review, credits, physics features, liveries info..."
                  className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-dark-700 text-white placeholder-gray-500 focus:outline-none focus:border-brand-orange"
                />
              </div>

              {/* Features & Requirements */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    Features List (One feature per line)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-dark-700 text-white focus:outline-none focus:border-brand-orange"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 font-semibold mb-1">
                    Requirements (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.requirements}
                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-dark-700 text-white focus:outline-none focus:border-brand-orange"
                  />
                </div>
              </div>

              {/* Installation Guide */}
              <div>
                <label className="block text-gray-300 font-semibold mb-1">
                  Installation Steps (One step per line formatted as &quot;Step Title: Instructions&quot;)
                </label>
                <textarea
                  rows={3}
                  value={formData.installationSteps}
                  onChange={(e) => setFormData({ ...formData, installationSteps: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-dark-700 text-white focus:outline-none focus:border-brand-orange"
                />
              </div>

              {/* Featured toggle */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-dark-850 border border-dark-750">
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-4 h-4 rounded text-brand-orange focus:ring-brand-orange accent-brand-orange cursor-pointer"
                />
                <label htmlFor="featuredToggle" className="text-gray-200 font-semibold cursor-pointer">
                  Feature on Homepage Hero & Top Highlights
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-dark-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-dark-800 text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-brand-orange hover:bg-brand-orange-hover text-white font-bold flex items-center gap-2 shadow-orange-sm transition"
                >
                  <Save className="w-4 h-4" />
                  <span>{loading ? 'Saving...' : 'Save & Publish BUSSID Mod'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
