import { MOCK_OTP, SA_DIAL_CODE } from './constants/dummy';
import { persistSession, loadStoredSession } from './storage/authStorage';
import {
  markAuthHydrated,
  setAuthSessionInState,
} from './store/authState';
import type { ContactMessage } from './types';
import { createMockId, mockDelay, MockApiError } from '@/utils/mockApi';

export async function hydrateAuthState() {
  const session = await loadStoredSession();
  setAuthSessionInState(session);
  markAuthHydrated();
}

export async function requestOtp(_phone: string) {
  await mockDelay();
}

export async function verifyOtp(phone: string, otp: string) {
  await mockDelay();

  if (otp !== MOCK_OTP) {
    throw new MockApiError('auth.errors.otpInvalid', 400);
  }

  const session = {
    phone: `+${SA_DIAL_CODE}${phone}`,
    token: createMockId('token'),
  };

  setAuthSessionInState(session);
  await persistSession(session);
  return session;
}

export async function submitContactMessage(input: Omit<ContactMessage, 'id'>) {
  await mockDelay();
  return {
    ...input,
    id: createMockId('contact'),
  };
}

export async function signOut() {
  await mockDelay(150, 250);
  setAuthSessionInState(null);
  await persistSession(null);
}
