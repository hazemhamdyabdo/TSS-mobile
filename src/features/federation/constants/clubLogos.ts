import type { ImageSource } from 'expo-image';

import type { ClubLogoId } from '../types';

export const CLUB_LOGO_SOURCES: Record<ClubLogoId, ImageSource> = {
  hilal: require('@/assets/images/clubs/hilal.png'),
  nassr: require('@/assets/images/clubs/nassr.png'),
  ahli: require('@/assets/images/clubs/ahli.png'),
  shabab: require('@/assets/images/clubs/shabab.png'),
  fayha: require('@/assets/images/clubs/fayha.png'),
  wehda: require('@/assets/images/clubs/wehda.png'),
  faisaly: require('@/assets/images/clubs/faisaly.png'),
  abha: require('@/assets/images/clubs/abha.png'),
  ittihad: require('@/assets/images/clubs/ittihad.png'),
};

export function clubLogoSource(logoId: ClubLogoId): ImageSource {
  return CLUB_LOGO_SOURCES[logoId];
}
