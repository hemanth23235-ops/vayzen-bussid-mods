import React from 'react';
import Image from 'next/image';
import {
  Youtube,
  Play,
  Users,
  Film,
  ExternalLink,
  Bell,
  CheckCircle2,
} from 'lucide-react';
import { siteConfig } from '@/config/site';

export default function YouTubeSection() {
  // Official VayZenXPlayz YouTube channel videos
  const showcaseVideos = [
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
    <section id="youtube-section" className="py-20 bg-dark-950 border-t border-dark-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Creator Channel Banner Card */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-dark-900 via-dark-850 to-dark-900 border border-dark-750 p-6 sm:p-10 mb-12 shadow-2xl">
          {/* Subtle Red/Orange Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-[90px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Channel Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-brand-orange to-red-600 p-1 shrink-0 shadow-lg shadow-red-900/30">
                <div className="w-full h-full rounded-2xl bg-dark-950 flex items-center justify-center overflow-hidden">
                  <Youtube className="w-10 h-10 text-red-500 fill-red-500" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {siteConfig.channelName}
                  </h3>
                  <CheckCircle2 className="w-5 h-5 text-sky-400 fill-sky-400/20" />
                </div>

                <p className="text-gray-400 text-sm max-w-lg">
                  Join our official BUSSID gaming community for realistic Kerala bus gameplay,
                  horn reviews, secret livery downloads, truck tests, and ghat road challenges!
                </p>

                {/* Stats row */}
                <div className="flex items-center justify-center sm:justify-start gap-4 pt-1 text-xs text-gray-300">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-brand-orange" />
                    <span className="font-bold text-white">{siteConfig.subscribersCountText}</span> Subscribers
                  </div>
                  <span className="text-gray-600">•</span>
                  <div className="flex items-center gap-1.5">
                    <Film className="w-4 h-4 text-brand-orange" />
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
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-900/50 hover:shadow-red-600/50 transition transform hover:-translate-y-0.5"
              >
                <Youtube className="w-5 h-5 fill-white" />
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
              className="text-xs font-bold text-brand-orange hover:underline flex items-center gap-1 shrink-0"
            >
              <span>More Videos</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {showcaseVideos.map((vid) => (
              <div
                key={vid.id}
                className="group rounded-2xl bg-dark-900 border border-dark-750 overflow-hidden flex flex-col justify-between hover:border-brand-orange/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
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
                  <h4 className="text-sm font-bold text-white group-hover:text-brand-orange transition line-clamp-2 leading-snug">
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
                    className="w-full py-2 px-3 rounded-xl bg-dark-850 hover:bg-red-600 text-gray-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 border border-dark-750 hover:border-red-600 transition"
                  >
                    <Youtube className="w-3.5 h-3.5 text-red-500 group-hover:text-white" />
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
