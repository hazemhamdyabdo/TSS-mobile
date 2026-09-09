import type { ImageSource } from 'expo-image';

import type { AuthRole } from '@/features/auth/types';

import type { UserProfile } from '../types';

const defaultAvatar = require('@/assets/images/home/avatar.png');
const playerAvatar = require('@/assets/images/rank-player-5.jpg');

/** Figma player avatar shared by guest and authenticated user (player) screens. */
export function playerProfileAvatarSource(
  _profile: Pick<UserProfile, 'email' | 'name'>,
) {
  return playerAvatar;
}

/** @deprecated Prefer `playerProfileAvatarSource`. */
export function guestProfileAvatarSource(
  profile: Pick<UserProfile, 'email' | 'name'>,
) {
  return playerProfileAvatarSource(profile);
}

export function resolveProfileAvatarSource(
  profile: Pick<UserProfile, 'email' | 'name' | 'avatarUri'>,
  role: AuthRole | null | undefined,
): ImageSource {
  if (profile.avatarUri) {
    return { uri: profile.avatarUri };
  }

  if (role === 'guest' || role === 'user') {
    return playerProfileAvatarSource(profile);
  }

  return defaultAvatar;
}
