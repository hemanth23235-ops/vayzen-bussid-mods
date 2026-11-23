import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getModBySlug, getAllMods, getRelatedMods } from '@/lib/mods';
import ModDetailClient from './ModDetailClient';
import { siteConfig } from '@/config/site';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const mod = await getModBySlug(params.slug);

  if (!mod) {
    return {
      title: 'Mod Not Found',
    };
  }

  return {
    title: `${mod.name} (${mod.version}) - Download for ${mod.game}`,
    description: mod.shortDescription,
    openGraph: {
      title: `${mod.name} - ${siteConfig.name}`,
      description: mod.shortDescription,
      images: [
        {
          url: mod.thumbnailUrl,
          width: 1200,
          height: 675,
          alt: mod.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${mod.name} - Download Now`,
      description: mod.shortDescription,
      images: [mod.thumbnailUrl],
    },
  };
}

export async function generateStaticParams() {
  const mods = await getAllMods();
  return mods.map((m) => ({
    slug: m.slug,
  }));
}

export const revalidate = 60;

export default async function ModPage({ params }: Props) {
  const mod = await getModBySlug(params.slug);

  if (!mod) {
    notFound();
  }

  const relatedMods = await getRelatedMods(mod.id, mod.category, 4);

  return <ModDetailClient mod={mod} relatedMods={relatedMods} />;
}
