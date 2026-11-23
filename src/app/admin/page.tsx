import React from 'react';
import { Metadata } from 'next';
import AdminClient from './AdminClient';

export const metadata: Metadata = {
  title: 'Admin Access',
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminPage() {
  return <AdminClient />;
}
