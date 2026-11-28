import React from 'react';
import Image from 'next/image';
import {
  Play,
  Users,
  Film,
  ExternalLink,
  Bell,
  CheckCircle2,
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import YouTubeIcon from '@/components/common/YouTubeIcon';

export default function YouTubeSection() {
  // Official VayZenXPlayz YouTube channel videos
  const showcaseVideos = [
    {
      id: 'ZaSphn0ayoI',
      title: 'How to Download & Install BUSSID Mods in 2026 (Step-by-Step)',
      thumbnailUrl: 'https://i.ytimg.com/vi/ZaSphn0ayoI/hqdefault.jpg',
      views: 'VayZenXPlayz Official',
      duration: 'Tutorial',
      date: 'New Guide',
      url: 'https://youtube.com/shorts/ZaSphn0ayoI',
    },
    {
      id: 'MRX6tcNMF4M',
      title: 'Ultra Realistic Volvo 9600s Sleeper+Seater Bus Mod for BUSSID',
      thumbnailUrl: '/images/videos/volvo-9600s.jpg',
      views: 'VayZenXPlayz Official',
      duration: 'Gameplay',
      date: 'Latest',
      url: 'https://www.youtube.com/watch?v=MRX6tcNMF4M',
    },
    {
      id: 'Kuw5tGrY69s',
      title: 'Ashok Leyland Bus Mod for BUSSID | Complete Showcase & Review',
      thumbnailUrl: '/images/videos/ashok-leyland.jpg',
      views: 'VayZenXPlayz Official',
      duration: 'Gameplay',
      date: 'Featured',
      url: 'https://www.youtube.com/watch?v=Kuw5tGrY69s',
    },
    {
      id: 'SgOzOb79R8k',
      title: 'ZEDONE BS6 New Luxury Bus Mod for BUSSID 2026',
      thumbnailUrl: '/images/videos/zedone-bs6.jpg',
      views: 'VayZenXPlayz Official',
      duration: 'Gameplay',
      date: 'Trending',
      url: 'https://www.youtube.com/watch?v=SgOzOb79R8k',
    },
  ];

  return (
    <section id="youtube-section" className="py-20 bg-dark-950 border-t border-dark-800/80 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-brand-cyan/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-brand-crimson/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Creator Channel Banner Card */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border border-dark-750/90 p-6 sm:p-10 mb-12 shadow-2xl">
          {/* Subtle Red/Cyan Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-crimson/10 rounded-full blur-[90px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Channel Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
              {/* Official Channel Profile Picture with Dual-tone Ring */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-brand-cyan via-brand-orange to-brand-crimson p-1 shrink-0 shadow-xl shadow-cyan-950/40">
                <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-dark-950">
                  <Image
                    src="/images/channel-avatar.jpg"
                    alt={siteConfig.channelName}
                    fill
                    sizes="(max-width: 640px) 80px, 96px"
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Official YouTube badge overlay at corner */}
                <div
                  className="absolute -bottom-1 -right-1 bg-dark-950 p-1 rounded-full border border-dark-700 shadow-lg"
                  title="Official YouTube Channel"
                >
                  <YouTubeIcon className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {siteConfig.channelName}
                  </h3>
                  <CheckCircle2 className="w-5 h-5 text-brand-cyan fill-brand-cyan/20" />
                </div>

                <p className="text-gray-400 text-sm max-w-lg">
                  Join our official BUSSID gaming community for realistic Kerala bus gameplay,
                  horn reviews, secret livery downloads, truck tests, and ghat road challenges!
                </p>

                {/* Stats row */}
                <div className="flex items-center justify-center sm:justify-start gap-4 pt-1 text-xs text-gray-300">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-brand-cyan" />
                    <span className="font-bold text-white">{siteConfig.subscribersCountText}</span> Subscribers
                  </div>
                  <span className="text-gray-600">•</span>
                  <div className="flex items-center gap-1.5">
                    <Film className="w-4 h-4 text-brand-cyan" />
                    <span className="font-bold text-white">{siteConfig.videosCountText}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscribe Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <a
                href={siteConfig.subscribeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-red-950/50 hover:shadow-red-600/50 transition transform hover:-translate-y-0.5"
              >
                <YouTubeIcon className="w-5 h-5" />
                <span>Subscribe on YouTube</span>
                <Bell className="w-4 h-4 ml-1" />
              </a>

              <a
                href={siteConfig.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-dark-800 hover:bg-dark-750 text-gray-200 hover:text-white font-semibold text-sm flex items-center justify-center gap-2 border border-dark-700 transition"
              >
                <span>Visit Channel</span>
                <ExternalLink className="w-4 h-4 text-gray-400" />
              </a>
            </div>
          </div>

          {/* 500 Subscribers Goal Progress Bar */}
          {(() => {
            const currentSubs = siteConfig.subscribersCount || 311;
            const goalSubs = siteConfig.subscriberGoal || 500;
            const progressPercent = Math.min(100, Math.round((currentSubs / goalSubs) * 100));
            const remainingSubs = Math.max(0, goalSubs - currentSubs);

            return (
              <div className="mt-8 pt-6 border-t border-dark-800/80">
                <div className="bg-dark-950/70 border border-dark-750/90 rounded-2xl p-4 sm:p-5 backdrop-blur-sm shadow-inner">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-2.5 w-2.5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                        <span>Road to {goalSubs} Subscribers</span>
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                          {progressPercent}% Complete
                        </span>
                      </span>
                    </div>

                    <div className="text-xs text-gray-400 flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{currentSubs}</span>
                      <span>/</span>
                      <span className="font-semibold text-gray-400">{goalSubs} Subscribers</span>
                      <span className="text-brand-cyan font-bold text-[11px] bg-brand-cyan/10 px-2 py-0.5 rounded-md border border-brand-cyan/25">
                        {remainingSubs} to go!
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar Track */}
                  <div className="relative w-full h-3.5 bg-dark-900 rounded-full overflow-hidden p-0.5 border border-dark-700/80 shadow-inner">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-cyan via-sky-400 to-blue-600 shadow-lg shadow-cyan-500/30 transition-all duration-1000 ease-out relative overflow-hidden"
                      style={{ width: `${progressPercent}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shimmer" />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mt-2.5 text-[11px] text-gray-400">
                    <span className="flex items-center gap-1.5">
                      <span>🎉</span>
                      <span>
                        <strong className="text-gray-300">Special Community Milestone:</strong> Reaching 500 subscribers unlocks exclusive private BUSSID bus & truck mods!
                      </span>
                    </span>
                    <a
                      href={siteConfig.subscribeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-red-400 hover:text-red-300 transition hover:underline inline-flex items-center gap-1 shrink-0"
                    >
                      Subscribe & Support &rarr;
                    </a>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Latest Videos Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">Latest BUSSID Gameplay & Reviews</h3>
              <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                Watch full mod showcase, DJ horn sounds, and installation walkthroughs before downloading.
              </p>
            </div>
            <a
              href={`${siteConfig.channelUrl}/videos`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-brand-cyan hover:underline flex items-center gap-1 shrink-0"
            >
              <span>More Videos</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {showcaseVideos.map((vid) => (
              <div
                key={vid.id}
                className="group rounded-2xl bg-dark-900 border border-dark-750/80 overflow-hidden flex flex-col justify-between hover:border-brand-cyan/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-glow/20"
              >
                {/* Thumbnail */}
                <div className="relative aspect-video w-full bg-dark-950 overflow-hidden">
                  <Image
                    src={vid.thumbnailUrl}
                    alt={vid.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-red-600 transition duration-300">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <span className="absolute bottom-2.5 right-2.5 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono font-bold text-white">
                    {vid.duration}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <h4 className="text-sm font-bold text-white group-hover:text-brand-cyan transition line-clamp-2 leading-snug">
                    {vid.title}
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-dark-800">
                    <span>{vid.views}</span>
                    <span>{vid.date}</span>
                  </div>

                  <a
                    href={vid.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-xl bg-dark-850 hover:bg-red-600 text-gray-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 border border-dark-750 hover:border-red-600 transition group/btn"
                  >
                    <YouTubeIcon className="w-4 h-4 shrink-0" />
                    <span>Watch on YouTube</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
