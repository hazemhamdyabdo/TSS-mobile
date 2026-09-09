import type { ImageSource } from 'expo-image';

import type { NewsImageId } from '../types';

export const NEWS_IMAGE_SOURCES: Record<NewsImageId, ImageSource> = {
  hero1: require('@/assets/images/news/hero-1.png'),
  tournament: require('@/assets/images/news/card-tournament.png'),
  national: require('@/assets/images/news/card-national.png'),
  details: require('@/assets/images/news/details-hero.png'),
};

export function newsImageSource(imageId: NewsImageId): ImageSource {
  return NEWS_IMAGE_SOURCES[imageId];
}
