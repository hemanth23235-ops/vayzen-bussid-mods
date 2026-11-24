import { ModRequest } from '@/types';
import defaultRequests from '@/data/mod-requests.json';
import fs from 'fs';
import path from 'path';

const REQUESTS_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'mod-requests.json');

let inMemoryRequests: ModRequest[] = (defaultRequests as ModRequest[]) || [];

export async function getAllRequests(): Promise<ModRequest[]> {
  try {
    if (fs.existsSync(REQUESTS_FILE_PATH)) {
      const fileData = fs.readFileSync(REQUESTS_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(fileData);
      if (Array.isArray(parsed)) {
        inMemoryRequests = parsed;
        return parsed;
      }
    }
  } catch (error) {
    console.warn('Could not read mod requests from disk, using in-memory state:', error);
  }
  return inMemoryRequests;
}

export async function createRequest(
  data: Omit<ModRequest, 'id' | 'status' | 'createdAt'>
): Promise<{ success: boolean; request: ModRequest; message: string }> {
  try {
    const requests = await getAllRequests();
    const newRequest: ModRequest = {
      id: `req-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      modName: data.modName.trim(),
      category: data.category.trim() || 'BUSSID Buses',
      requesterName: data.requesterName.trim() || 'Subscriber',
      emailOrSocial: data.emailOrSocial ? data.emailOrSocial.trim() : '',
      details: data.details ? data.details.trim() : '',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    requests.unshift(newRequest);
    inMemoryRequests = requests;

    try {
      fs.writeFileSync(REQUESTS_FILE_PATH, JSON.stringify(requests, null, 2), 'utf-8');
    } catch (fsErr) {
      console.warn('File write not supported on serverless runtime, in-memory updated:', fsErr);
    }

    return {
      success: true,
      request: newRequest,
      message: 'Mod request submitted successfully!',
    };
  } catch (err: any) {
    console.error('Failed to create mod request:', err);
    return {
      success: false,
      request: null as any,
      message: err?.message || 'Failed to submit mod request',
    };
  }
}

export async function updateRequestStatus(
  id: string,
  status: ModRequest['status']
): Promise<{ success: boolean; message: string }> {
  try {
    const requests = await getAllRequests();
    const index = requests.findIndex((r) => r.id === id);
    if (index === -1) {
      return { success: false, message: 'Request not found' };
    }

    requests[index].status = status;
    inMemoryRequests = requests;

    try {
      fs.writeFileSync(REQUESTS_FILE_PATH, JSON.stringify(requests, null, 2), 'utf-8');
    } catch (fsErr) {
      console.warn('File write failed, updated in-memory state:', fsErr);
    }

    return { success: true, message: 'Status updated' };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to update request' };
  }
}

export async function deleteRequest(id: string): Promise<{ success: boolean; message: string }> {
  try {
    let requests = await getAllRequests();
    const initialLen = requests.length;
    requests = requests.filter((r) => r.id !== id);

    if (requests.length === initialLen) {
      return { success: false, message: 'Request not found' };
    }

    inMemoryRequests = requests;

    try {
      fs.writeFileSync(REQUESTS_FILE_PATH, JSON.stringify(requests, null, 2), 'utf-8');
    } catch (fsErr) {
      console.warn('File write failed, updated in-memory state:', fsErr);
    }

    return { success: true, message: 'Request deleted successfully' };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to delete request' };
  }
}
