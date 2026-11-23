import { ModItem } from '@/types';
import defaultMods from '@/data/mods.json';
import fs from 'fs';
import path from 'path';

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'mods.json');

// In-memory cache for fast reads and runtime mutation resilience
let inMemoryMods: ModItem[] = (defaultMods as ModItem[]) || [];

export async function getAllMods(): Promise<ModItem[]> {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const fileData = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(fileData);
      if (Array.isArray(parsed)) {
        inMemoryMods = parsed;
        return parsed;
      }
    }
  } catch (error) {
    console.warn('Could not read from disk directly, using in-memory mods list:', error);
  }
  return inMemoryMods;
}

export async function getModBySlug(slug: string): Promise<ModItem | null> {
  const mods = await getAllMods();
  return mods.find((m) => m.slug === slug || m.id === slug) || null;
}

export async function getFeaturedMods(): Promise<ModItem[]> {
  const mods = await getAllMods();
  return mods.filter((m) => m.isFeatured);
}

export async function getLatestMods(limit = 6): Promise<ModItem[]> {
  const mods = await getAllMods();
  return [...mods]
    .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
    .slice(0, limit);
}

export async function getMostDownloadedMods(limit = 6): Promise<ModItem[]> {
  const mods = await getAllMods();
  return [...mods]
    .sort((a, b) => b.downloadsCount - a.downloadsCount)
    .slice(0, limit);
}

export async function getRelatedMods(currentModId: string, category: string, limit = 4): Promise<ModItem[]> {
  const mods = await getAllMods();
  return mods
    .filter((m) => m.id !== currentModId && (m.category === category || m.game === m.game))
    .slice(0, limit);
}

export async function saveMod(mod: ModItem): Promise<{ success: boolean; mod: ModItem; message: string }> {
  try {
    const mods = await getAllMods();
    const existingIndex = mods.findIndex((m) => m.id === mod.id || m.slug === mod.slug);

    if (existingIndex >= 0) {
      mods[existingIndex] = mod;
    } else {
      mods.unshift(mod);
    }

    inMemoryMods = mods;

    // Try to write to file system
    try {
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(mods, null, 2), 'utf-8');
    } catch (fsErr) {
      console.warn('File write not supported on this runtime (e.g. read-only serverless), in-memory state updated.', fsErr);
    }

    return { success: true, mod, message: 'Mod saved successfully!' };
  } catch (err: any) {
    console.error('Failed to save mod:', err);
    return { success: false, mod, message: err?.message || 'Failed to save mod' };
  }
}

export async function deleteMod(id: string): Promise<{ success: boolean; message: string }> {
  try {
    const mods = await getAllMods();
    const updated = mods.filter((m) => m.id !== id && m.slug !== id);
    inMemoryMods = updated;

    try {
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(updated, null, 2), 'utf-8');
    } catch (fsErr) {
      console.warn('File write error during delete:', fsErr);
    }

    return { success: true, message: 'Mod deleted successfully' };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to delete mod' };
  }
}

export async function incrementDownloadCount(slugOrId: string): Promise<number> {
  const mods = await getAllMods();
  const mod = mods.find((m) => m.id === slugOrId || m.slug === slugOrId);
  if (mod) {
    mod.downloadsCount = (mod.downloadsCount || 0) + 1;
    try {
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(mods, null, 2), 'utf-8');
    } catch {
      // In-memory increment suffices on serverless
    }
    return mod.downloadsCount;
  }
  return 0;
}
