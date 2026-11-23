import { NextRequest, NextResponse } from 'next/server';
import { getModBySlug, incrementDownloadCount } from '@/lib/mods';

export async function POST(req: NextRequest) {
  try {
    const { slug } = await req.json();

    if (!slug) {
      return NextResponse.json({ success: false, message: 'Mod slug/id required' }, { status: 400 });
    }

    const mod = await getModBySlug(slug);

    if (!mod) {
      return NextResponse.json({ success: false, message: 'Mod not found' }, { status: 404 });
    }

    const newCount = await incrementDownloadCount(slug);

    return NextResponse.json({
      success: true,
      downloadUrl: mod.downloadUrl,
      backupDownloadUrl: mod.backupDownloadUrl,
      downloadsCount: newCount,
      name: mod.name,
      fileSize: mod.fileSize,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || 'Download error' },
      { status: 500 }
    );
  }
}
