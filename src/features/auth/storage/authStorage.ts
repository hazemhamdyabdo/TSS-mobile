import AsyncStorage from '@react-native-async-storage/async-storage';

import type { AuthSession } from '../types';

const SESSION_KEY = '@tff/session';

export async function loadStoredSession() {
  const raw = await AsyncStorage.getItem(SESSION_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    await AsyncStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export async function persistSession(session: AuthSession | null) {
  if (!session) {
    await AsyncStorage.removeItem(SESSION_KEY);
    return;
  }

  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session));
}
