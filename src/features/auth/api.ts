import {
  isMockQaPhone,
  MOCK_OTP,
  MOCK_USER_PHONE,
  SA_DIAL_CODE,
} from './constants/dummy';
import { persistSession, loadStoredSession } from './storage/authStorage';
import {
  markAuthHydrated,
  setAuthSessionInState,
} from './store/authState';
import type { ContactMessage } from './types';
import {
  normalizeAuthSession,
  roleFromNationalPhone,
  withSessionRole,
} from './utils/sessionRole';
import {
  DUMMY_PROFILE,
  DUMMY_USER_PROFILE,
} from '@/features/more/constants/dummy';
import { updateProfileInState } from '@/features/more/store/moreState';
import { createMockId, mockDelay, MockApiError } from '@/utils/mockApi';
import { resetMockStores } from '@/utils/resetMockStores';

function applyProfileForRole(role: 'admin' | 'user' | 'guest') {
  switch (role) {
    case 'admin':
      updateProfileInState({ ...DUMMY_PROFILE });
      return;
    case 'user':
      updateProfileInState({ ...DUMMY_USER_PROFILE });
      return;
    case 'guest':
      return;
    default: {
      const exhaustive: never = role;
      throw new Error(`Unhandled auth role: ${exhaustive}`);
    }
  }
}

export async function hydrateAuthState() {
  const session = normalizeAuthSession(await loadStoredSession());
  setAuthSessionInState(session);
  if (session) {
    applyProfileForRole(session.role);
  }
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

  const role = roleFromNationalPhone(phone);
  const session = withSessionRole(
    `+${SA_DIAL_CODE}${phone}`,
    createMockId('token'),
    role,
  );

  applyProfileForRole(role);
  setAuthSessionInState(session);
  await persistSession(session);
  return session;
}

export async function enterAsGuest() {
  await mockDelay();

  const session = withSessionRole(
    `+${SA_DIAL_CODE}${MOCK_USER_PHONE}`,
    createMockId('token'),
    'guest',
  );

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
