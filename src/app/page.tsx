import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import FeaturedModsSection from '@/components/home/FeaturedModsSection';
import CategorySection from '@/components/home/CategorySection';
import LatestAndPopularSection from '@/components/home/LatestAndPopularSection';
import YouTubeSection from '@/components/home/YouTubeSection';
import ModRequestSection from '@/components/home/ModRequestSection';
import { getFeaturedMods, getLatestMods, getMostDownloadedMods } from '@/lib/mods';
import { siteConfig } from '@/config/site';

export const revalidate = 60; // ISR cache update every minute

export default async function HomePage() {
  const [featuredMods, latestMods, mostDownloadedMods] = await Promise.all([
    getFeaturedMods(),
    getLatestMods(6),
    getMostDownloadedMods(6),
  ]);

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: {
      '@type': 'Organization',
      name: siteConfig.channelName,
      url: siteConfig.channelUrl,
      sameAs: [siteConfig.channelUrl, siteConfig.discordUrl],
    },
  };

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
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

      {/* Subscriber Community Mod Request Form */}
      <ModRequestSection />

      {/* YouTube Channel & Video Showcase */}
      <YouTubeSection />
    </div>
  );
}
