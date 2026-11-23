import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/common/ScrollToTop';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - Premium Bus Simulator Indonesia Mods, Liveries & Maps`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'BUSSID mods',
    'Bus Simulator Indonesia',
    'Kerala bus mod',
    'Zedone Vega BUSSID',
    'Prakash Capella sleeper',
    'KSRTC SWIFT bus',
    'Mahindra Thar 4x4 bussid',
    'Tata Signa tipper truck',
    'Ashok Leyland lorry',
    'Wayanad hairpin ghat map',
    'Basuri V3 DJ horn',
    'Kerala tourist bus 4k livery',
    'VayZenXPlayz',
    'bussid mod download',
  ],
  authors: [{ name: siteConfig.channelName }],
  creator: siteConfig.channelName,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    creator: `@${siteConfig.channelName}`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-dark-950 text-gray-100 min-h-screen flex flex-col antialiased selection:bg-brand-orange selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}
