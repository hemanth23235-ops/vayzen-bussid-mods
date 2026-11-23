# VayZenXPlayz Mods — Official Gaming Mods Download Platform

A modern, premium, fully responsive gaming mods download platform built for the **VayZenXPlayz** YouTube gaming channel. Built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## 🎮 Highlights & Features

### 🎨 Brand & Gaming Aesthetic
- **Theme:** Dark gaming UI crafted with matte black (`#07080b`), deep charcoal cards (`#10131a`), flame orange accents (`#ff5e00`), and subtle grey borders.
- **Visual Polish:** Futuristic glow effects, smooth card hover lifts, subtle pulse animations, and custom dark scrollbars without excessive neon.
- **Mobile Responsive:** Fully responsive across all devices with smooth mobile hamburger drawer menu.

### 🏠 Homepage
- **Hero Section:** "UPGRADE YOUR GAMEPLAY" with glowing neon gradient title and subtitle: *"Discover, explore and download the best mods for your favourite games."*
- **Action Buttons:** "Explore Mods", "Latest Downloads", and "Subscribe on YouTube".
- **Live Counters:** Active Mods, Total Downloads, Community Members, and 100% VirusTotal Clean verification.
- **Featured Mods Showcase:** Hand-picked mods with badges (HOT, NEW, UPDATED).
- **Interactive Tabs:** Switch between **Latest Mods** and **Most Downloaded Mods**.
- **Game Categories Grid:** Expandable categories for BUSSID, Minecraft, GTA V, and more.
- **YouTube Creator Showcase:** Dedicated creator banner for **VayZenXPlayz** with subscriber count, showcase videos, and "Watch on YouTube" links.
- **Gaming Footer:** Social links (YouTube, Discord, Telegram, Instagram, Twitter/X), disclaimer, and admin login link.

### 📦 Mods Library (`/mods`)
- **Instant Search:** Real-time search across mod titles, game names, categories, and tags.
- **Game Filters:** All Games, BUSSID, Minecraft, GTA V, and Other.
- **Category Filter:** Subcategory chips for easy browsing.
- **Sort By:** Latest Uploads, Most Downloaded, Highest Rated, and Oldest.
- **Rich Mod Cards:** Cover image, game badge, version pill, file size, upload date, download counter, and instant download modal.

### 📄 Mod Details Page (`/mods/[slug]`)
- Large high-resolution banner and screenshot gallery with thumbnail switcher.
- Tested game version, release date, and author information.
- Key features checklist and mod overview.
- Step-by-step installation guides tailored for BUSSID, Minecraft, and GTA V.
- Dedicated download box with VirusTotal verified safe badge and download notices.
- Working download system with countdown and direct redirects.
- Copy link button with toast feedback and WhatsApp/social sharing.
- Recommended related mods section.

### 🛡️ Admin & Content Management (`/admin`)
- **Secure Authentication:** Password-protected admin dashboard using secure server-side verification and cryptographically signed session cookies. (Never exposes passwords in frontend code).
- **Add New Mods:** Simple form with full fields: Mod name, auto-slug, game, category, description, cover thumbnail, screenshot URLs, version, file size, download link, features, and installation steps.
- **Edit & Update Mods:** Change download URLs (Google Drive, MediaFire, Dropbox, etc.) anytime without redesigning.
- **Delete Mods:** Clean removal with confirmation.
- **Backup & Restore:** One-click **Export Backup JSON** and **Import JSON** to easily backup or restore your mods database.

### 📺 YouTube Integration
- Easily customize your channel URL, channel name, subscriber count text, and video showcase in a single configuration file: `src/config/site.ts`.

---

## 🚀 Beginner Setup Guide

### 1. Requirements
- Node.js 18.17+ or 20+ installed.

### 2. Running Locally

1. Open a terminal in the project directory:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### 3. Accessing the Admin Panel

1. Go to `http://localhost:3000/admin`.
2. Enter the default master password:
   ```
   vayzenadmin2024
   ```
3. You can now add, edit, or delete mods directly through the UI!

> **To change the admin password:**
> Create a `.env.local` file in the root directory and add:
> ```env
> ADMIN_PASSWORD=your_new_secret_password_here
> ADMIN_SECRET_KEY=any_random_secure_string_here
> ```

---

## ⚙️ Customizing Links & Socials

Open `src/config/site.ts` to change your links anytime:

```typescript
export const siteConfig = {
  name: 'VayZenXPlayz Mods',
  channelName: 'VayZenXPlayz',
  channelUrl: 'https://www.youtube.com/@VayZenXPlayz',
  subscribeUrl: 'https://www.youtube.com/@VayZenXPlayz?sub_confirmation=1',
  subscribersCountText: '125K+',
  discordUrl: 'https://discord.gg/vayzenxplayz',
  instagramUrl: 'https://instagram.com/vayzenxplayz',
  twitterUrl: 'https://twitter.com/vayzenxplayz',
  telegramUrl: 'https://t.me/vayzenxplayzmods',
  contactEmail: 'contact.vayzenxplayz@gmail.com',
};
```

---

## 🌐 Deploying to Vercel (Free & Fast)

Deploying this website to Vercel takes less than 3 minutes:

1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of VayZenXPlayz Mods website"
   git remote add origin https://github.com/your-username/vayzen-mods.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select your GitHub repository.
4. In the **Environment Variables** section on Vercel, add:
   - `ADMIN_PASSWORD`: Your secret admin password
   - `ADMIN_SECRET_KEY`: A random secret key for session cookies
5. Click **Deploy**!
6. Your website is live worldwide with free SSL and lightning-fast edge CDN.

---

## 📁 Project Structure

```
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root HTML & body with dark gaming theme
│   │   ├── page.tsx                # Homepage landing
│   │   ├── globals.css             # Tailwind custom gaming styles & scrollbar
│   │   ├── not-found.tsx           # Custom 404 page
│   │   ├── about/                  # About page with creator info
│   │   ├── categories/             # Expandable categories directory
│   │   ├── mods/                   # Mods browsing library
│   │   │   ├── page.tsx
│   │   │   ├── ModsClient.tsx      # Real-time search & filtering client
│   │   │   └── [slug]/             # Mod Details page
│   │   │       ├── page.tsx
│   │   │       └── ModDetailClient.tsx # Gallery, download trigger, tutorial
│   │   ├── admin/                  # Admin portal
│   │   │   ├── page.tsx
│   │   │   └── AdminClient.tsx     # Full CRUD management dashboard
│   │   └── api/                    # Server-side API endpoints
│   │       ├── mods/route.ts       # GET, POST, DELETE mods
│   │       ├── mods/download/      # Download counter & verified redirect
│   │       └── admin/              # Login, logout, session check
│   ├── components/
│   │   ├── common/                 # SearchModal, ScrollToTop
│   │   ├── home/                   # HeroSection, FeaturedMods, YouTubeSection, etc.
│   │   ├── layout/                 # Navbar, Footer
│   │   └── mods/                   # ModCard, ModFilters, DownloadModal
│   ├── config/
│   │   └── site.ts                 # Creator & site configuration
│   ├── data/
│   │   ├── categories.ts           # Categories list
│   │   └── mods.json               # Seed mods database
│   ├── lib/
│   │   ├── auth.ts                 # HMAC token authentication & security
│   │   ├── mods.ts                 # Data read/write persistence
│   │   └── utils.ts                # Formatting and styling utilities
│   └── types/
│       └── index.ts                # TypeScript interfaces
├── tailwind.config.js              # Custom dark gaming color scheme
└── package.json
```

---

## 📜 License
Created for **VayZenXPlayz Gaming Community**. All trademarks and game assets belong to their respective owners.
