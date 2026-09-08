import type { ImageSource } from 'expo-image';

import type { UserProfile } from '../types';

const defaultAvatar = require('@/assets/images/home/avatar.png');
const playerAvatar = require('@/assets/images/rank-player-5.jpg');

/** Figma player avatar shared by the guest home, settings, and profile screens. */
export function guestProfileAvatarSource(_profile: Pick<UserProfile, 'email' | 'name'>) {
  return playerAvatar;
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
