import type { ImageSource } from 'expo-image';

import { rankPlayerImageFor } from '@/features/home/constants/rankPlayerAvatars';

import type { UserProfile } from '../types';

const defaultAvatar = require('@/assets/images/home/avatar.png');

/** Stable default avatar for the guest/user profile across home, settings, and rankings. */
export function guestProfileAvatarSource(profile: Pick<UserProfile, 'email' | 'name'>) {
  return rankPlayerImageFor(profile.email || profile.name);
}

export function resolveProfileAvatarSource(
  profile: Pick<UserProfile, 'email' | 'name' | 'avatarUri'>,
  isGuest: boolean,
): ImageSource {
  if (profile.avatarUri) {
    return { uri: profile.avatarUri };
  }

  if (isGuest) {
    return guestProfileAvatarSource(profile);
  }

  return defaultAvatar;
}
