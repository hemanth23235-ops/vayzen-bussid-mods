import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturedModsSection from '@/components/home/FeaturedModsSection';
import CategorySection from '@/components/home/CategorySection';
import LatestAndPopularSection from '@/components/home/LatestAndPopularSection';
import YouTubeSection from '@/components/home/YouTubeSection';
import { getFeaturedMods, getLatestMods, getMostDownloadedMods } from '@/lib/mods';

export const revalidate = 60; // ISR cache update every minute

export default async function HomePage() {
  const [featuredMods, latestMods, mostDownloadedMods] = await Promise.all([
    getFeaturedMods(),
    getLatestMods(6),
    getMostDownloadedMods(6),
  ]);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Mods Showcase */}
      <FeaturedModsSection mods={featuredMods} />

      {/* Game Categories */}
      <CategorySection />

      {/* Latest & Most Downloaded Mods with Interactive Tabs */}
      <LatestAndPopularSection
        latestMods={latestMods}
        mostDownloadedMods={mostDownloadedMods}
      />

      {/* YouTube Channel & Video Showcase */}
      <YouTubeSection />
    </div>
  );
}
