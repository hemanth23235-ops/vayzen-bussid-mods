export type GameCategory =
  | 'BUSSID Buses'
  | 'BUSSID Trucks'
  | 'BUSSID Cars'
  | 'BUSSID Maps'
  | 'BUSSID Liveries'
  | 'BUSSID DJ Horns'
  | 'BUSSID Bikes'
  | 'BUSSID Traffic & OBB';

export type GameName = 'BUSSID';

export interface InstallationStep {
  step: number;
  title: string;
  instruction: string;
}

export interface ModItem {
  id: string;
  slug: string;
  name: string;
  game: string;
  category: GameCategory | string;
  shortDescription: string;
  description: string;
  thumbnailUrl: string;
  screenshots: string[];
  version: string;
  supportedGameVersion: string;
  fileSize: string;
  uploadDate: string; // YYYY-MM-DD
  downloadUrl: string;
  backupDownloadUrl?: string;
  author: string;
  downloadsCount: number;
  likesCount?: number;
  rating?: number;
  isFeatured: boolean;
  isTrending?: boolean;
  badge?: 'NEW' | 'UPDATED' | 'HOT' | 'VERIFIED' | 'FEATURED';
  features: string[];
  requirements: string[];
  installationGuide: InstallationStep[];
  tags: string[];
  youtubeVideoId?: string;
  liveryUrl?: string;
}

export interface CategoryInfo {
  id: string;
  name: string;
  game: string;
  description: string;
  iconName: string;
  bgGradient: string;
  bannerImage: string;
}

export interface SiteConfig {
  name: string;
  title: string;
  description: string;
  url: string;
  channelName: string;
  channelUrl: string;
  subscribeUrl: string;
  subscribersCountText: string;
  videosCountText: string;
  discordUrl: string;
  instagramUrl: string;
  twitterUrl: string;
  telegramUrl: string;
  contactEmail: string;
  turnstileSiteKey?: string;
  subscribersCount?: number;
  subscriberGoal?: number;
}

export interface ModRequest {
  id: string;
  modName: string;
  category: string;
  requesterName: string;
  emailOrSocial?: string;
  details?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  createdAt: string;
}
