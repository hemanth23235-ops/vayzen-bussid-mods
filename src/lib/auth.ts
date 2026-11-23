import crypto from 'crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'vayzen_admin_session';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'vayzenadmin2024';
const SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'vayzenxplayz-ultra-secure-key-2024';

export function signToken(payload: string): string {
  const hmac = crypto.createHmac('sha256', SECRET_KEY);
  hmac.update(payload);
  const signature = hmac.digest('hex');
  return `${payload}.${signature}`;
}

export function verifyToken(token: string): boolean {
  if (!token || !token.includes('.')) return false;
  const [payload, signature] = token.split('.');
  const hmac = crypto.createHmac('sha256', SECRET_KEY);
  hmac.update(payload);
  const expectedSignature = hmac.digest('hex');
  return signature === expectedSignature;
}

export function checkAdminPassword(password: string): boolean {
  if (!password) return false;
  return password === ADMIN_PASSWORD;
}

export async function isUserAdmin(): Promise<boolean> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return false;
    return verifyToken(token);
  } catch {
    return false;
  }
}

export { COOKIE_NAME };
