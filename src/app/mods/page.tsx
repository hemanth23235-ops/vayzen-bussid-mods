import React, { Suspense } from 'react';
import { Metadata } from 'next';
import ModsClient from './ModsClient';
import { getAllMods } from '@/lib/mods';

export const metadata: Metadata = {
  title: 'VayZenXPlays Mods - Bus Simulator Indonesia Mods Library',
  description:
    'Download premium BUSSID buses, 4K liveries, 4x4 cars, heavy trucks, and offroad ghat maps by VayZenXPlays. 100% safe direct download links with installation guides.',
};

export const revalidate = 60;

export default async function ModsPage() {
  const allMods = await getAllMods();

  return (
    <Suspense
      fallback={
        <div className="pt-32 pb-20 text-center min-h-screen bg-dark-950 text-gray-400">
          <div className="w-8 h-8 border-2 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p>Loading gaming mods library...</p>
        </div>
      }
    >
      <ModsClient initialMods={allMods} />
    </Suspense>
  );
}
