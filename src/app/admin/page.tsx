import React from 'react';
import { Metadata } from 'next';
import AdminClient from './AdminClient';

export const metadata: Metadata = {
  title: 'Admin Mod Manager - VayZenXPlayz Mods',
  description: 'Manage gaming mods, update download links, modify versions, and configure featured content.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return <AdminClient />;
}
