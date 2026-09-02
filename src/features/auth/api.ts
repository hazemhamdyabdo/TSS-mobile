import { isMockQaPhone, MOCK_OTP, SA_DIAL_CODE } from './constants/dummy';
import { persistSession, loadStoredSession } from './storage/authStorage';
import {
  markAuthHydrated,
  setAuthSessionInState,
} from './store/authState';
import type { ContactMessage } from './types';
import { createMockId, mockDelay, MockApiError } from '@/utils/mockApi';
import { resetMockStores } from '@/utils/resetMockStores';

export async function hydrateAuthState() {
  const session = await loadStoredSession();
  setAuthSessionInState(session);
  markAuthHydrated();
}

export async function requestOtp(phone: string) {
  await mockDelay();

  if (!isMockQaPhone(phone)) {
    throw new MockApiError('auth.errors.phoneUnknown', 401);
  }
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
  await persistSession(null);
  resetMockStores();
}
