import { NextRequest, NextResponse } from 'next/server';
import { getAllMods, saveMod, deleteMod } from '@/lib/mods';
import { isUserAdmin } from '@/lib/auth';
import { ModItem } from '@/types';
import { slugify } from '@/lib/utils';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get('q')?.toLowerCase() || '';
    const category = searchParams.get('category') || '';
    const game = searchParams.get('game') || '';
    const sort = searchParams.get('sort') || 'newest';
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;

    let mods = await getAllMods();

    if (search) {
      mods = mods.filter(
        (m) =>
          m.name.toLowerCase().includes(search) ||
          m.game.toLowerCase().includes(search) ||
          m.category.toLowerCase().includes(search) ||
          m.shortDescription.toLowerCase().includes(search) ||
          (m.tags && m.tags.some((t) => t.toLowerCase().includes(search)))
      );
    }

    if (category && category !== 'all') {
      mods = mods.filter(
        (m) => m.category.toLowerCase() === category.toLowerCase() || slugify(m.category) === category
      );
    }

    if (game && game !== 'all') {
      mods = mods.filter((m) => m.game.toLowerCase() === game.toLowerCase());
    }

    if (sort === 'most-downloaded') {
      mods.sort((a, b) => b.downloadsCount - a.downloadsCount);
    } else if (sort === 'rating') {
      mods.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sort === 'oldest') {
      mods.sort((a, b) => new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime());
    } else {
      // default: newest
      mods.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
    }

    if (limit && limit > 0) {
      mods = mods.slice(0, limit);
    }

    return NextResponse.json({ success: true, count: mods.length, mods });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || 'Error fetching mods' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const isAdmin = await isUserAdmin();
  if (!isAdmin) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized. Admin login required.' },
      { status: 401 }
    );
  }

  try {
    const body = (await req.json()) as Partial<ModItem>;

    if (!body.name || !body.game || !body.downloadUrl) {
      return NextResponse.json(
        { success: false, message: 'Mod name, game, and download URL are required.' },
        { status: 400 }
      );
    }

    const slug = body.slug ? slugify(body.slug) : slugify(body.name);
    const id = body.id || slug;

    const mod: ModItem = {
      id,
      slug,
      name: body.name,
      game: body.game,
      category: body.category || 'Other Games',
      shortDescription: body.shortDescription || '',
      description: body.description || body.shortDescription || '',
      thumbnailUrl:
        body.thumbnailUrl ||
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
      screenshots:
        Array.isArray(body.screenshots) && body.screenshots.length > 0
          ? body.screenshots
          : [
              body.thumbnailUrl ||
                'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
            ],
      version: body.version || 'v1.0',
      supportedGameVersion: body.supportedGameVersion || 'Latest',
      fileSize: body.fileSize || '25 MB',
      uploadDate: body.uploadDate || new Date().toISOString().split('T')[0],
      downloadUrl: body.downloadUrl,
      backupDownloadUrl: body.backupDownloadUrl || '',
      author: body.author || 'VayZenXPlayz',
      downloadsCount: body.downloadsCount || 0,
      likesCount: body.likesCount || 0,
      rating: body.rating || 5.0,
      isFeatured: !!body.isFeatured,
      isTrending: !!body.isTrending,
      badge: body.badge,
      features: Array.isArray(body.features) ? body.features : [],
      requirements: Array.isArray(body.requirements) ? body.requirements : [],
      installationGuide: Array.isArray(body.installationGuide) ? body.installationGuide : [],
      tags: Array.isArray(body.tags) ? body.tags : [],
      youtubeVideoId: body.youtubeVideoId || '',
    };

    const result = await saveMod(mod);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || 'Failed to save mod' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const isAdmin = await isUserAdmin();
  if (!isAdmin) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized. Admin login required.' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, message: 'Mod ID is required' }, { status: 400 });
    }

    const result = await deleteMod(id);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || 'Failed to delete mod' },
      { status: 500 }
    );
  }
}
