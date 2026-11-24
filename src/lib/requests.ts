import { ModRequest } from '@/types';
import defaultRequests from '@/data/mod-requests.json';
import fs from 'fs';
import path from 'path';

const CLOUD_STORAGE_URL = 'https://api.restful-api.dev/objects/ff808181a09d98f701a20e6b02bc3962';
const REQUESTS_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'mod-requests.json');

let inMemoryRequests: ModRequest[] = (defaultRequests as ModRequest[]) || [];

// Helper to fetch from cloud storage with timeout
async function fetchFromCloud(): Promise<ModRequest[] | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(CLOUD_STORAGE_URL, {
      signal: controller.signal,
      cache: 'no-store',
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const json = await res.json();
      if (json?.data?.requests && Array.isArray(json.data.requests)) {
        return json.data.requests;
      }
    }
  } catch (err) {
    console.warn('Cloud storage read failed, using fallback:', err);
  }
  return null;
}

// Helper to sync to cloud storage
async function syncToCloud(requests: ModRequest[]): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const res = await fetch(CLOUD_STORAGE_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'VayZenXPlayz Official BUSSID Mod Requests',
        data: { requests },
      }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return res.ok;
  } catch (err) {
    console.warn('Cloud storage sync failed:', err);
    return false;
  }
}

// Helper to save to local file system if writable (e.g. local dev)
function trySaveLocal(requests: ModRequest[]) {
  try {
    fs.writeFileSync(REQUESTS_FILE_PATH, JSON.stringify(requests, null, 2), 'utf-8');
  } catch {
    // Expected in read-only serverless runtimes
  }
}

export async function getAllRequests(): Promise<ModRequest[]> {
  // First attempt cloud fetch for live data across devices
  const cloudData = await fetchFromCloud();
  if (cloudData) {
    inMemoryRequests = cloudData;
    trySaveLocal(cloudData);
    return cloudData;
  }

  // Fallback to local file
  try {
    if (fs.existsSync(REQUESTS_FILE_PATH)) {
      const fileData = fs.readFileSync(REQUESTS_FILE_PATH, 'utf-8');
      const parsed = JSON.parse(fileData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        inMemoryRequests = parsed;
        return parsed;
      }
    }
  } catch (error) {
    console.warn('Could not read from local file, using in-memory state:', error);
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

    // Sync to cloud storage and local file in parallel
    await syncToCloud(requests);
    trySaveLocal(requests);

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

    await syncToCloud(requests);
    trySaveLocal(requests);

    return { success: true, message: `Status updated to ${status}` };
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

    await syncToCloud(requests);
    trySaveLocal(requests);

    return { success: true, message: 'Request deleted successfully' };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Failed to delete request' };
  }
}
