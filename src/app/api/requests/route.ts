import { NextRequest, NextResponse } from 'next/server';
import { getAllRequests, createRequest, updateRequestStatus, deleteRequest } from '@/lib/requests';
import { isUserAdmin } from '@/lib/auth';
import { ModRequest } from '@/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// GET: Fetch mod requests
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined;

    let requests = await getAllRequests();

    if (status && status !== 'all') {
      requests = requests.filter((r) => r.status === status);
    }

    if (limit && limit > 0) {
      requests = requests.slice(0, limit);
    }

    const response = NextResponse.json({
      success: true,
      count: requests.length,
      requests,
    });

    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    return response;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || 'Error fetching requests' },
      { status: 500 }
    );
  }
}

// POST: Public submission OR Admin Action
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Support admin actions via POST for 100% proxy compatibility
    if (body.action === 'update_status') {
      const isAdmin = await isUserAdmin();
      if (!isAdmin) {
        return NextResponse.json(
          { success: false, message: 'Unauthorized. Admin login required.' },
          { status: 401 }
        );
      }
      const result = await updateRequestStatus(body.id, body.status);
      return NextResponse.json(result);
    }

    if (body.action === 'delete') {
      const isAdmin = await isUserAdmin();
      if (!isAdmin) {
        return NextResponse.json(
          { success: false, message: 'Unauthorized. Admin login required.' },
          { status: 401 }
        );
      }
      const result = await deleteRequest(body.id);
      return NextResponse.json(result);
    }

    // Normal visitor mod request submission
    if (!body.modName || !body.modName.trim()) {
      return NextResponse.json(
        { success: false, message: 'Mod name or vehicle model is required.' },
        { status: 400 }
      );
    }

    const result = await createRequest({
      modName: body.modName,
      category: body.category || 'BUSSID Buses',
      requesterName: body.requesterName || 'Subscriber',
      emailOrSocial: body.emailOrSocial || '',
      details: body.details || '',
    });

    return NextResponse.json(result, { status: result.success ? 201 : 500 });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || 'Failed to submit mod request' },
      { status: 500 }
    );
  }
}

// PATCH: Update request status (Admin only)
export async function PATCH(req: NextRequest) {
  const isAdmin = await isUserAdmin();
  if (!isAdmin) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized. Admin login required.' },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: 'Request ID and new status are required.' },
        { status: 400 }
      );
    }

    const validStatuses: ModRequest['status'][] = ['pending', 'in_progress', 'completed', 'rejected'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status provided.' },
        { status: 400 }
      );
    }

    const result = await updateRequestStatus(id, status);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || 'Error updating request' },
      { status: 500 }
    );
  }
}

// DELETE: Delete request (Admin only)
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
      return NextResponse.json(
        { success: false, message: 'Request ID is required.' },
        { status: 400 }
      );
    }

    const result = await deleteRequest(id);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err?.message || 'Error deleting request' },
      { status: 500 }
    );
  }
}
