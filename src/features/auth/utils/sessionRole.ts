import {
  isMockAdminPhone,
  isMockUserPhone,
  MOCK_USER_PHONE,
  SA_DIAL_CODE,
} from '../constants/dummy';
import type { AuthRole, AuthSession } from '../types';

export function roleFromNationalPhone(nationalPhone: string): AuthRole {
  if (isMockAdminPhone(nationalPhone)) {
    return 'admin';
  }
  if (isMockUserPhone(nationalPhone)) {
    return 'user';
  }
  return 'user';
}

export function withSessionRole(
  phone: string,
  token: string,
  role: AuthRole,
): AuthSession {
  return {
    phone,
    token,
    role,
    ...(role === 'guest' ? { isGuest: true as const } : { isGuest: false }),
  };
}

/** Normalize persisted sessions that predate `role`. */
export function normalizeAuthSession(
  session: AuthSession | null,
): AuthSession | null {
  if (!session) {
    return null;
  }

  if (session.role === 'admin' || session.role === 'user' || session.role === 'guest') {
    return withSessionRole(session.phone, session.token, session.role);
  }

  if (session.isGuest) {
    return withSessionRole(session.phone, session.token, 'guest');
  }

  const national = session.phone.replace(`+${SA_DIAL_CODE}`, '');
  if (national === MOCK_USER_PHONE || isMockUserPhone(national)) {
    return withSessionRole(session.phone, session.token, 'user');
  }

  return withSessionRole(session.phone, session.token, 'admin');
}

export function getAuthRole(session: AuthSession | null | undefined): AuthRole | null {
  if (!session) {
    return null;
  }
  return normalizeAuthSession(session)?.role ?? null;
}

export function isGuestSession(session: AuthSession | null | undefined) {
  return getAuthRole(session) === 'guest';
}

export function isAdminSession(session: AuthSession | null | undefined) {
  return getAuthRole(session) === 'admin';
}

export function isUserSession(session: AuthSession | null | undefined) {
  return getAuthRole(session) === 'user';
}
