import React, { Suspense } from 'react';
import { Metadata } from 'next';
import ModsClient from './ModsClient';
import { getAllMods } from '@/lib/mods';

export const metadata: Metadata = {
  title: 'All Gaming Mods & Addons',
  description:
    'Browse and download premium BUSSID buses, trucks, cars, maps, Minecraft shaders, and GTA mods. Free direct downloads with installation guides.',
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
