import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import {
  BookOpen,
  FolderDown,
  Palette,
  Volume2,
  ShieldCheck,
  HelpCircle,
  ChevronRight,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  FolderTree,
  Terminal,
  Sparkles,
  Bus,
  Play,
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import YouTubeIcon from '@/components/common/YouTubeIcon';

export const metadata: Metadata = {
  title: 'README & Installation Guide - VayZenXPlays BUSSID Mods',
  description:
    'Complete README, step-by-step BUSSID mod installation guide, 4K livery tutorial, horn sound setup, and FAQ by VayZenXPlays.',
  alternates: {
    canonical: `${siteConfig.url}/readme`,
  },
};

export default function ReadmePage() {
  const installationSteps = [
    {
      step: '01',
      title: 'Download the Mod File',
      description:
        'Choose any bus, car, truck, or map on the VayZenXPlays library and tap Download. You will receive a clean .bussidmod or .zip file directly.',
      tip: 'Our direct mirrors are 100% virus-scanned with zero deceptive popup ads.',
    },
    {
      step: '02',
      title: 'Extract Archive (If Needed)',
      description:
        'If the file downloaded as a .zip or .rar archive, open ZArchiver (free on Google Play Store) or your device file manager and extract it to reveal the .bussidmod file.',
      tip: 'Do not rename the file extension — it must end in .bussidmod or .bussidvehicle.',
    },
    {
      step: '03',
      title: 'Move to BUSSID Directory',
      description:
        'Copy or Move your .bussidmod file into your phone’s internal storage path:',
      path: 'Internal Storage > BUSSID > Mods',
      tip: 'If the BUSSID folder doesn’t exist, launch Bus Simulator Indonesia once and close it to auto-generate the folders.',
    },
    {
      step: '04',
      title: 'Activate in Game Garage',
      description:
        'Open Bus Simulator Indonesia > Tap "Garage" on the main menu > Tap the arrow buttons (< or >) until your newly installed vehicle appears > Tap "USE"!',
      tip: 'You are now ready to hit the road in Free Play, Career, or Multiplayer convoy mode!',
    },
  ];

  const liverySteps = [
    {
      title: 'Select Your Vehicle',
      text: 'Open BUSSID, head to the Garage, and select the specific bus model matching your downloaded livery.',
    },
    {
      title: 'Open Palette Menu',
      text: 'Tap the Paint Palette icon located near the top of the garage screen.',
    },
    {
      title: 'Load Livery Image',
      text: 'Tap "Browse Livery" > Choose "Device Gallery" > Pick the downloaded 4K .png image.',
    },
    {
      title: 'Enable High Resolution',
      text: 'IMPORTANT: Check the "High Resolution" box before applying so your bus displays crisp, uncompressed 4K graphics.',
    },
  ];

  const faqs = [
    {
      q: 'Why is the mod not appearing inside the BUSSID Garage?',
      a: 'Make sure your file ends in .bussidmod or .bussidvehicle. If it is still inside a .zip file, it will not be detected. Also confirm it is placed in "Internal Storage/BUSSID/Mods" (not in Downloads or Android/data). Completely restart BUSSID after moving files.',
    },
    {
      q: 'Are these mods safe for my Android device?',
      a: 'Yes, 100%. Every mod, livery, and audio track on VayZenXPlays is manually tested inside Bus Simulator Indonesia and scanned through VirusTotal before being published. No adware, passwords, or root permissions required.',
    },
    {
      q: 'How do I install custom sound horns (Basuri / DJ horns)?',
      a: 'Download your .mp3 horn audio > Open BUSSID Garage > Tap the Horn/Audio icon > Select Horn slot 1, 2, or 3 > Browse your .mp3 file and tap Use.',
    },
    {
      q: 'Can I request a custom Kerala tourist bus or KSRTC livery?',
      a: 'Absolutely! Go to our homepage and use the "Mod Request & Live Status Tracker" tab. Enter your vehicle request, and track its real-time development status.',
    },
  ];

  return (
    <div className="pt-28 pb-24 bg-dark-950 min-h-screen text-gray-300">
      {/* Background Decorative Lighting */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-cyan/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-white transition">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-cyan font-bold">README & Guide</span>
        </div>

        {/* Hero Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-brand-cyan text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <BookOpen className="w-3.5 h-3.5" />
            <span>OFFICIAL DOCUMENTATION & README</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            BUSSID Mod README &{' '}
            <span className="bg-gradient-to-r from-brand-cyan via-sky-300 to-blue-500 bg-clip-text text-transparent">
              Installation Guide
            </span>
          </h1>

          <p className="text-base text-gray-400 leading-relaxed">
            The official master guide for installing Bus Simulator Indonesia mods, 4K liveries,
            realistic diesel engine audio, and custom ghat maps safely.
          </p>
        </div>

        {/* Featured Video Tutorial Embed */}
        <section className="bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border border-dark-750/90 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center gap-8 justify-between">
            <div className="space-y-4 max-w-lg text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/15 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-wider">
                <Play className="w-3.5 h-3.5 fill-red-400" />
                <span>OFFICIAL VIDEO TUTORIAL</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">
                Prefer a Video Guide? Watch How to Install Mods Step-by-Step
              </h2>
              <p className="text-xs text-gray-400 leading-relaxed">
                Watch our quick step-by-step walkthrough showing how to download from the website,
                unlock links safely, and move files to the BUSSID folder on your phone.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href="https://youtube.com/shorts/ZaSphn0ayoI"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition"
                >
                  <YouTubeIcon className="w-4 h-4" />
                  <span>Open on YouTube Shorts</span>
                </a>
              </div>
            </div>

            {/* Embedded Player */}
            <div className="w-full sm:w-[320px] aspect-[9/16] max-h-[560px] rounded-2xl overflow-hidden border border-dark-700 shadow-2xl bg-black shrink-0 relative">
              <iframe
                src="https://www.youtube-nocookie.com/embed/ZaSphn0ayoI"
                title="How to download and install BUSSID mods"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Section 1: Mod Installation Steps */}
        <section className="bg-dark-900/90 border border-dark-750/90 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-8">
          <div className="flex items-center gap-3 pb-6 border-b border-dark-800">
            <div className="w-12 h-12 rounded-2xl bg-brand-cyan/15 border border-brand-cyan/40 flex items-center justify-center text-brand-cyan shadow-sm">
              <FolderDown className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-cyan">
                CORE TUTORIAL
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                How to Install .bussidmod Files
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {installationSteps.map((s) => (
              <div
                key={s.step}
                className="p-5 rounded-2xl bg-dark-850/80 border border-dark-750/80 flex flex-col justify-between space-y-4 hover:border-brand-cyan/40 transition"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-black px-2.5 py-1 rounded-lg bg-gradient-to-r from-brand-cyan to-blue-600 text-dark-950 shadow-sm">
                      STEP {s.step}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <h3 className="text-base font-bold text-white pt-1">{s.title}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">{s.description}</p>
                  {s.path && (
                    <div className="mt-2 p-2.5 rounded-xl bg-dark-950 border border-dark-700 font-mono text-xs text-brand-cyan flex items-center gap-2">
                      <FolderTree className="w-4 h-4 shrink-0 text-brand-cyan" />
                      <span>{s.path}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-dark-800 text-[11px] text-gray-500 italic">
                  💡 {s.tip}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: 4K Livery Application Tutorial */}
        <section className="bg-dark-900/90 border border-dark-750/90 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-8">
          <div className="flex items-center gap-3 pb-6 border-b border-dark-800">
            <div className="w-12 h-12 rounded-2xl bg-brand-cyan/15 border border-brand-cyan/40 flex items-center justify-center text-brand-cyan shadow-sm">
              <Palette className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-cyan">
                VISUAL CUSTOMIZATION
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                How to Apply 4K Liveries (.png)
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {liverySteps.map((step, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-dark-850/80 border border-dark-750 flex flex-col justify-between space-y-2"
              >
                <div className="w-7 h-7 rounded-xl bg-dark-950 border border-brand-cyan/30 flex items-center justify-center text-xs font-bold text-brand-cyan">
                  {idx + 1}
                </div>
                <h4 className="text-sm font-bold text-white">{step.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Safety & VirusTotal Transparency */}
        <section className="bg-gradient-to-r from-emerald-950/40 via-dark-900 to-dark-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-white">
                100% VirusTotal Clean Guarantee
              </h3>
              <p className="text-xs text-gray-400 mt-0.5">
                Every file on VayZenXPlays is checked with enterprise-grade antivirus engines.
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-300 leading-relaxed">
            Unlike many third-party mod aggregation portals that force users through deceptive link shorteners,
            malware-ridden landing pages, or locked password archives, VayZenXPlays provides direct,
            safe mirrors tested inside official Bus Simulator Indonesia releases (v4.0.4+).
          </p>
        </section>

        {/* Section 4: Frequently Asked Questions */}
        <section className="bg-dark-900/90 border border-dark-750/90 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-dark-800">
            <HelpCircle className="w-6 h-6 text-brand-cyan" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Frequently Asked Questions (FAQ)
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-dark-850/80 border border-dark-750 space-y-2"
              >
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="text-brand-cyan">Q:</span>
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed pl-5">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Creator Community CTA */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border border-dark-750 text-center space-y-5">
          <h3 className="text-2xl font-black text-white">
            Need Help or Want to Request a Custom Mod?
          </h3>
          <p className="text-xs text-gray-400 max-w-md mx-auto">
            Join thousands of BUSSID players on the official VayZenXPlays YouTube channel.
            Drop a comment or submit your request directly to our creator queue!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/#mod-request-section"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-cyan to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-dark-950 font-black text-xs shadow-cyan-sm transition"
            >
              Request a Mod on Board
            </Link>

            <a
              href={siteConfig.subscribeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition"
            >
              <YouTubeIcon className="w-4 h-4" />
              <span>Subscribe on YouTube</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
